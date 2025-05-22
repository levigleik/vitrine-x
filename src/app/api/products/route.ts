import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao buscar produtos" },
			{ status: 500 },
		);
	}
}
