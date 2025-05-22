export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	colors: {
		name: string;
		hex: string;
	}[];
	sizes: {
		name: string;
		inStock: boolean;
	}[];
	category: string;
	specifications: {
		[key: string]: string;
	};
}

export type ProductList = Product[];
