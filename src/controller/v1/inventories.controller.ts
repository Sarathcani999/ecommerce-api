import { Request, Response } from "express";
import { addInventory, addMultipleInventory, getInventories as getInventoriesService } from "../../services/v1/inventories.service";
import { StatusCodes } from "../../shared/constants/status-code.enum";
import BadRequest from "../../shared/errors/bad-request.error";
import { Inventory } from "../../shared/interfaces/inventory.interface";
import { inventories } from "../../shared/mock-data/inventories.mock";
import { createResponseMessage } from "../../shared/utils/response.util";

export const addItem = async (req: Request, res: Response) => {

	if (
		!!!req.body.title ||
		!!!req.body.description ||
		!!!req.body.category ||
		!!!req.body.skus
	) {
		throw new BadRequest([{ message: 'request validation failed' }]);
	}

	const newItem: Inventory = {
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		comments: [],
		imgs: [],
		skus: req.body.skus
	};

	const savedItem = await addInventory(newItem);

	return res.status(StatusCodes.CREATED).json(createResponseMessage('success', { item: savedItem }));
}

export const addMockData = async (req: Request, res: Response) => {
	const savedItems = await addMultipleInventory(inventories);

	return res.status(StatusCodes.CREATED).json(createResponseMessage('success', { items: savedItems }));
}

export const getInventories = async (req: Request, res: Response) => {

	const {
		page = 0,
		size = 2,
		q = '',
		category = ''
	} = req.body;

	console.log(req.body)

	const inventories = await getInventoriesService(page, size, q, category);

	return res.status(StatusCodes.OK).json(createResponseMessage('success', { inventories }));
}