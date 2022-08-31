import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

export default class DatabaseError extends CustomError {
    statusCode: number = 500;

    constructor() {
    	super();
    	this.statusCode = 500;

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    constructErrorResponse(): ErrorResponse {
        return {
            errors: [{ message: 'Unable to connect to Database' }]
        };
    }

}