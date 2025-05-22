import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const product = products.find((p) => p.id === params.id);

		if (!product) {
			return NextResponse.json(
				{ error: "Produto não encontrado" },
				{ status: 404 },
			);
		}

		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao buscar produto" },
			{ status: 500 },
		);
	}
}
