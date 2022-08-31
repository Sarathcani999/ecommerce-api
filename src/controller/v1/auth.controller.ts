import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';

/* File imports */
import { User } from '../../models/user.model';
import BadRequest from '../../shared/errors/bad-request.error';
import { addUser, createTokens, getCookies, isPasswordMatch, isUserExist, setCookies, updateUser, verifyAccessToken, verifyRefreshToken } from '../../services/v1/auth.service';
import { StatusCodes } from '../../shared/constants/status-code.enum';
import { createResponseMessage } from '../../shared/utils/response.util';

export const register = async (req: Request, res: Response, next: NextFunction) => {

	// extract the user details
	// throw error if any missing or validation fails
	const { email, password, name, billingAddress } = req.body;

	if (!!!email || !!!password || !!!name || !!!billingAddress) {
		throw new BadRequest([{ message: 'invalid request' }]);
	}
	// Check for the essential field in billingAddress
	if (!!!billingAddress.firstLine || !!!billingAddress.zip || !!!billingAddress.phone ) {
		throw new BadRequest([{ message: 'invalid address request' }]);
	}	

	// check the DB if the username/email already used
	const doc = (await User.findOne({ email }).exec())?.toObject();
	if (!!doc) {
		throw new BadRequest([{ message: 'user already present' }]);
	}

	// if not used
	// hash the password
	const salt = 10;
	const hashPassword = await hash(password, salt);

	// create the user object with the hashed password
	// save the user to DB
	const { hashedPassword, ...user } = await addUser(email, hashPassword, name, billingAddress);

	// return response with 201 status and success message
	return res.status(StatusCodes.CREATED).json(createResponseMessage('user created success', { user }));

}

export const login = async (req: Request, res: Response) => {

	// extract the user details
	const { email, password } = req.body;

	// throw error if any missing or validation fails
	if ( !!!email || !!!password ) {
		throw new BadRequest([{ message: "invalid request" }]);
	}

	// check the DB if username/email exist
	const userData = await isUserExist( email );

	// if not existing
	// throw error 'User doesnot exist'
	if ( userData === null ) {
		throw new BadRequest([{ message: "user doesnot exist" }]);
	}

	// if exist
	// check password
	const isMatch = await isPasswordMatch(password, userData.hashedPassword);
	if (!isMatch) throw new BadRequest([ { message: 'password wrong' }]);

	// if password match
	// create accessToken and refreshToken
	const { accessToken, refreshToken } = createTokens(userData);

	// save the refresh token in DB
	const newUserDetails = await updateUser(userData.email, { refreshToken });

	// set it as cookie
	setCookies(res, accessToken, refreshToken);

	// return response with 200 status and user details
	return res.status(StatusCodes.OK).json(createResponseMessage( 'success', { user: newUserDetails } ));
}

export const validate = async (req: Request, res: Response) => {

	// extract the cookie
	// throw error if both accessToken and refreshToken not present
	const { accessToken, refreshToken} = getCookies(req);

	if (!!!accessToken && !!!refreshToken) throw new BadRequest([{ message: 'invalid token' }]);

	// if accessToken present

	// verify it
	let user = await verifyAccessToken(accessToken);

	// if verification success
	// return response with 200 status and user details
	if (!!user) return res.status(StatusCodes.OK).json(createResponseMessage('success', { user }));

	user = await verifyRefreshToken(refreshToken);

	if (user === null) throw new BadRequest([{message: 'invalid token (r)'}]);

	const _ = createTokens(user);
	setCookies(res, _.accessToken, _.refreshToken);

	return res.status(StatusCodes.OK).json(createResponseMessage('success', { user }));

		
}