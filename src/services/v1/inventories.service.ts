import { Inventory } from "../../models/inventories.model";
import { Inventory as InventoryI } from "../../shared/interfaces/inventory.interface";
import { inventories } from "../../shared/mock-data/inventories.mock";

export const addInventory = async (inventory: InventoryI) => {
	const inventoryItem = new Inventory(inventory);
	const item = await inventoryItem.save();

	return item;
}

export const addMultipleInventory = async (inventories: Array<InventoryI>) => {
	const items = await Inventory.insertMany(inventories);

	return items;
}

export const getInventories = async (page: number, size: number, query: string, category: string) => {
	const searchRegex = new RegExp( query , 'gi');
	const inventories = await Inventory.find({ 
		title: searchRegex,
		'skus.qty': {$gt: 0},
		category: category
	}).skip(page * size).limit(size)
	.sort({ price: -1 });

	return inventories;
}