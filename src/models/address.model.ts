import { Schema } from 'mongoose';

export const addressSchema = new Schema({
	firstLine: { type: String, required: true },
	secondLine: { type: String },
	zip: { type: String, required: true },
	phone: { type: String, required: true }
});