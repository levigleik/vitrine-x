"use client";

import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const { data: products, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Nossos Produtos</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products?.map((product) => (
					<motion.div
						key={product.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
					>
						<Link href={`/product/${product.id}`} className="block">
							<div className="relative h-64 w-full">
								<Image
									src={product.images[0]}
									alt={product.name}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>

							<div className="p-4">
								<h2 className="text-xl font-semibold mb-2">{product.name}</h2>
								<p className="text-sm text-gray-600 mb-4 line-clamp-2">
									{product.description}
								</p>
								<p className="text-2xl font-bold text-gray-900">
									{new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL",
									}).format(product.price)}
								</p>

								<div className="mt-4 flex gap-2">
									{product.colors.map((color) => (
										<span
											key={color.name}
											className="w-6 h-6 rounded-full border border-gray-200"
											style={{ backgroundColor: color.hex }}
											title={color.name}
										/>
									))}
								</div>

								<div className="mt-2 flex gap-2">
									{product.sizes.map((size) => (
										<span
											key={size.name}
											className={`inline-block px-2 py-1 text-sm rounded ${
												size.inStock
													? "bg-gray-100 text-gray-800"
													: "bg-gray-50 text-gray-400 line-through"
											}`}
										>
											{size.name}
										</span>
									))}
								</div>
							</div>
						</Link>
					</motion.div>
				))}
			</div>
		</main>
	);
}
