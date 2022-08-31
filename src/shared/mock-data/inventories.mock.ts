import { Categories } from "../constants/categories.enum";
import { Inventory } from "../interfaces/inventory.interface";

export const inventories: Array<Inventory> = [
	{
	    "title": "Macbook Pro 16",
	    "description": "16-inch Macbook Pro 512SSD | Retina Display | OSX",
	    "brand": "Apple Inc.",
	    "category": Categories.ELECTRONICS,
	    "imgs": [],
	    "comments": [],
	    "skus": [
	    	{
	    		"sku": "16GB",
	    		"qty": 20,
			    "price": 249990,
			    "features": {
			    	"ram": "16GB",
			    	"color": "Space Grey"
			    }
	    	},
	    	{
	    		"sku": "32GB",
	    		"qty": 30,
	    		"price": 249990,
	    		"features": {
	    			"ram": "32GB",
	    			"color": "Space Grey"
	    		}
	    	}
	    ]
	},
	{
	    "title": "iPhone 13 Pro",
	    "description": "iPhone 13 Pro | 512GB",
	    "brand": "Apple Inc.",
	    "category": Categories.ELECTRONICS,
	    "imgs": [],
	    "comments": [],
	    "skus": [
	    	{
	    		"sku": "Blue",
	    		"price": 159999,
	    		"qty": 10,
	    		"features": {
	    			"ram": "16GB",
	    			"color": "Blue",
	    			"camera": "102MP"
	    		}
	    	}
	    ]
	},
	{
	    "title": "Levi's Denim Jean",
	    "description": "Levi's scratched Denim Jean",
	    "brand": "Levi's",
	    "category": Categories.CLOTHING,
	    "imgs": [],
	    "comments": [],
	    "skus": [
	    	{
	    		"sku": "28",
	    		"qty": 200,
	    		"price": 2400,
	    		"features": {
	    			"material": "Denim",
	    			"color": "Denim Blue",
	    			"fit": "Slim",
	    			"size": 28
	    		}
	    	},
	    	{
	    		"sku": "30",
	    		"price": 2400,
	    		"qty": 300,
	    		"features": {
	    			"material": "Denim",
	    			"color": "Denim Blue",
	    			"fit": "Slim",
	    			"size": 30
	    		}
	    	}
	    ]
	}
];