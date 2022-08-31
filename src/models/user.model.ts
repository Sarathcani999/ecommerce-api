import { model, Schema } from 'mongoose';

/* File imports */
import { UserTypes } from '../shared/constants/user-types.enum';
import { addressSchema as billingAddressSchema } from './address.model';

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	hashedPassword: { type: String, required: true },
	role: { type: String, default: UserTypes.CUSTOMER },
	refreshToken: { type: String, default: '' },
	billingAddress: billingAddressSchema
});

export const User = model('user', userSchema);