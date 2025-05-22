import type { Product, ProductList } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getProducts(): Promise<ProductList> {
	const response = await fetch(`${API_URL}/products`);

	if (!response.ok) {
		throw new Error("Falha ao buscar produtos");
	}

	return response.json();
}

export async function getProduct(id: string): Promise<Product> {
	const response = await fetch(`${API_URL}/products/${id}`);

	if (!response.ok) {
		throw new Error("Falha ao buscar produto");
	}

	return response.json();
}
