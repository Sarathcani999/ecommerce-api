export interface Inventory {
	title: string,
	category: string,
	brand?: string,
	rating?: number,
	description: string,
	imgs: Array<String>,
	comments: Array<Comment>,
	skus: Array<Sku>
}

interface Comment {
	username: string,
	comment?: string
}

interface Sku {
	price: number,
	sku: string,
	qty: number,
	features: {
		[key: string]: string | number
	}
}