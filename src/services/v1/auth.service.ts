import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

/* File imports */
import { User } from '../../models/user.model';
import { UserTypes } from '../../shared/constants/user-types.enum';
import DatabaseError from '../../shared/errors/database.error';
import { Address } from '../../shared/interfaces/address.interface';
import BadRequest from '../../shared/errors/bad-request.error';
import { AccessTokenPayload } from '../../shared/interfaces/access-token-payload.interface';

config();

export const addUser = async (
	email: string, 
	hashedPassword: string, 
	name: string, 
	billingAddress: Address, 
	role: string = UserTypes.CUSTOMER, 
	refreshToken: string = '') => {

	const userData = {
		email,
		name,
		hashedPassword,
		billingAddress,
		role,
		refreshToken
	};

	const user = new User(userData);

	try {
		const doc = await user.save();
	} catch (e) {
		throw new DatabaseError();
	}

	return userData;

}

export const isUserExist = async ( email: string ) => {

	const doc = (await User.findOne({ email }).exec())?.toObject();

	if (!!doc) {
		return doc;
	} else {
		return null;
	}

}

export const isPasswordMatch = async (plainPassword: string, hashedPassword: string) => {
	const isMatch = await compare(plainPassword, hashedPassword);

	return isMatch;
}

export const createTokens = (userData: any): { accessToken: string, refreshToken: string } => {

	const accessTokenSecret: string | undefined = process.env.ACCESS_KEY_SECRET;
	const refreshTokenSecret: string | undefined = process.env.REFRESH_KEY_SECRET;

	if (accessTokenSecret === undefined || refreshTokenSecret === undefined) {
		throw new Error();
	}

	const { hashedPassword, ...payload} = userData;
	const email = payload.email;

	const accessToken: string = jwt.sign(payload, accessTokenSecret, { expiresIn: '60s' });
	const refreshToken: string = jwt.sign({ email }, refreshTokenSecret, { expiresIn: '90d' });

	return { accessToken, refreshToken };
}

export const updateUser = async (email: string, updatedUserDetails: any) => {

	const newUserDetails = (await User.findOneAndUpdate({ email }, updatedUserDetails ).exec())?.toObject();

	return newUserDetails;
}

export const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
	res.cookie('accessToken', accessToken, { maxAge: 1000 * 60, httpOnly: true });
	res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true });
}

export const getCookies = (req: Request): {accessToken: string, refreshToken: string} => {
	const accessToken = req.cookies['accessToken'];
	const refreshToken = req.cookies['refreshToken'];

	return { accessToken, refreshToken };
}

export const verifyAccessToken = async (accessToken: string) => {
	const accessTokenSecret: string | undefined = process.env.ACCESS_KEY_SECRET;

	if (accessToken === undefined) {
		return null;
	}

	const payload: AccessTokenPayload = jwt.verify(accessToken, accessTokenSecret as string) as AccessTokenPayload;

	if (payload == null) return null;

	// check if the corresponding user present in the DB
	const user = (await User.findOne({ email: payload.email }).exec())?.toObject();

	// remove password
	return user;
}

export const verifyRefreshToken = async (refreshToken: string) => {
	const refershTokenSecret: string | undefined = process.env.REFRESH_KEY_SECRET;

	if (refreshToken === undefined || refershTokenSecret === undefined) return null;

	const payload = jwt.verify(refreshToken, refershTokenSecret as string);

	if (!!!payload) return null;

	const user = (await User.findOne({ refreshToken }).exec())?.toObject();

	if (user === null) return null;

	return user;
}