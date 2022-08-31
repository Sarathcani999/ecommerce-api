export interface InventoriesRequestPayload {
	filters: Array<Filter>
	pagination: Pagination
	searchValue: string
}

interface Pagination {
	page: number,
	size: number
}

interface Filter {
	filterName: string
	filterValues: Array<string>
}