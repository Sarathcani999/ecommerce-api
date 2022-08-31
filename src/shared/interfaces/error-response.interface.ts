export interface ErrorResponse {
	errors: Array<{ message: string, field?: string}>
}