import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

export default class BadRequest extends CustomError {
    statusCode: number = 400;

    constructor(private errors: Array<{message: string, field?: string}>) {
    	super();

        Object.setPrototypeOf(this, BadRequest.prototype);
    }

    constructErrorResponse(): ErrorResponse {
        return { errors: this.errors };
    }

}