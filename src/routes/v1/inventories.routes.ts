import { Router } from "express";
import { addItem, addMockData, getInventories } from "../../controller/v1/inventories.controller";

const inventoryRouter = Router();

/* Craete mock data */
inventoryRouter.post('/mock', addMockData);

/* Create new item */
inventoryRouter.post('/', addItem);

/* Get items */
inventoryRouter.post('/fetch', getInventories);

export default inventoryRouter;