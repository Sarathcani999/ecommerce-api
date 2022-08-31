import { Request, Response, NextFunction } from 'express';

/* File imports */
import { CustomError } from '../shared/errors/custom.error';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

	if (err instanceof CustomError) return res.status(err.statusCode).json(err.constructErrorResponse());

	return res.status(500).json({
		errors: [ { message: 'Unknown Error' } ]
	});
	
}