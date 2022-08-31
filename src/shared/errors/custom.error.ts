import { ErrorResponse } from "../interfaces/error-response.interface";

export abstract class CustomError extends Error {

	abstract statusCode: number;

	constructor(message: string = '') {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract constructErrorResponse(): ErrorResponse;
}