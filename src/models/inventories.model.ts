import { model, Schema } from 'mongoose';

const Sku = new Schema({
	price: { type: Number, required: true },
	qty: { type: Number, required: true },
	sku: { type: String, required: true },
	features: new Schema({}, { strict: false })
});

const inventorySchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	rating: { type: Number, default: 0 },
	brand: String,
	description: { type: String, required: true },
	imgs: [String],
	comments: [{
		username: { type: String, required: true },
		comment: { type: String, default: '' }
	}],
	skus: [Sku]
});

export const Inventory = model('inventories', inventorySchema);