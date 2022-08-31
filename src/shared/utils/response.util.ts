export const createResponseMessage = <T>(message: string, data?: T ): { message: string, data?: T } => {

	const responseObj: { message: string, data?: T } = { message };

	if (!!data) {
		responseObj.data = data;
	}

	return responseObj;
}