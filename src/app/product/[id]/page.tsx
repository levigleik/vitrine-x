"use client";

import { Footer } from "@/components/Footer";
import { getProduct } from "@/services/products";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ViaCepResponse {
	cep: string;
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	erro?: boolean;
}

export default function ProductPage() {
	const router = useRouter();
	const { id } = useParams();
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [cep, setCep] = useState("");
	const [address, setAddress] = useState<ViaCepResponse | null>(null);

	const { data: product, isLoading } = useQuery<Product>({
		queryKey: ["product", id],
		queryFn: () => getProduct(id as string),
	});

	const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		setCep(value);

		if (value.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
				const data: ViaCepResponse = await response.json();
				if (!data.erro) {
					setAddress(data);
					const expirationTime = new Date().getTime() + 15 * 60 * 1000;
					localStorage.setItem(
						"cepData",
						JSON.stringify({ data, expirationTime }),
					);
				}
			} catch (error) {
				console.error("Erro ao buscar CEP:", error);
			}
		}
	};

	useEffect(() => {
		const savedCepData = localStorage.getItem("cepData");
		if (savedCepData) {
			const { data, expirationTime } = JSON.parse(savedCepData);
			if (new Date().getTime() < expirationTime) {
				setAddress(data);
				setCep(data.cep.replace(/\D/g, ""));
			} else {
				localStorage.removeItem("cepData");
			}
		}

		const savedSelections = localStorage.getItem("productSelections");
		if (savedSelections) {
			const { color, size, expirationTime } = JSON.parse(savedSelections);
			if (new Date().getTime() < expirationTime) {
				setSelectedColor(color);
				setSelectedSize(size);
			} else {
				localStorage.removeItem("productSelections");
			}
		}
	}, []);

	const saveSelections = (color: string, size: string) => {
		const expirationTime = new Date().getTime() + 15 * 60 * 1000;
		localStorage.setItem(
			"productSelections",
			JSON.stringify({ color, size, expirationTime }),
		);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
			</div>
		);
	}

	if (!product) return null;

	return (
		<>
			<main className="container mx-auto px-4 py-8 min-h-screen">
				<nav aria-label="Navegação">
					<button
						type="button"
						onClick={() => router.back()}
						className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
						aria-label="Voltar para página anterior"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5 mr-2"
							aria-hidden="true"
						>
							<title>Ícone de voltar</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
						Voltar
					</button>
				</nav>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<section
						aria-label="Galeria de imagens do produto"
						className="space-y-4"
					>
						<motion.div
							key={selectedImage}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="relative h-[500px] w-full rounded-lg overflow-hidden"
						>
							<Image
								src={product.images[selectedImage]}
								alt={`${product.name} - Imagem ${selectedImage + 1}`}
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority={selectedImage === 0}
							/>
						</motion.div>

						<div
							className="flex gap-4 overflow-x-auto pb-2"
							role="tablist"
							aria-label="Miniaturas das imagens do produto"
						>
							{product.images.map((image, index) => (
								<button
									type="button"
									key={image}
									onClick={() => setSelectedImage(index)}
									className={`relative h-20 w-20 rounded-md overflow-hidden ${
										selectedImage === index ? "ring-2 ring-blue-500" : ""
									}`}
									role="tab"
									aria-selected={selectedImage === index}
									aria-label={`Visualizar imagem ${index + 1} do produto`}
								>
									<Image
										src={image}
										alt={`${product.name} - Miniatura ${index + 1}`}
										fill
										className="object-cover"
										sizes="80px"
									/>
								</button>
							))}
						</div>
					</section>

					<section aria-label="Informações do produto" className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold">{product.name}</h1>
							<p className="text-gray-600 mt-2">{product.description}</p>
						</div>

						<p className="text-4xl font-bold text-gray-900" aria-label="Preço">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(product.price)}
						</p>

						<div role="radiogroup" aria-label="Selecione a cor">
							<h3 className="text-lg font-semibold mb-2" id="colors-label">
								Cores
							</h3>
							<div className="flex gap-2">
								{product.colors.map((color) => (
									<button
										type="button"
										key={color.name}
										onClick={() => {
											setSelectedColor(color.name);
											saveSelections(color.name, selectedSize);
										}}
										className={`w-12 h-12 rounded-full border-2 transition-all ${
											selectedColor === color.name
												? "ring-2 ring-blue-500 ring-offset-2"
												: "hover:scale-110"
										}`}
										style={{ backgroundColor: color.hex }}
										aria-label={`Cor ${color.name}`}
										aria-pressed={selectedColor === color.name}
									/>
								))}
							</div>
						</div>

						<div role="radiogroup" aria-label="Selecione a capacidade">
							<h3 className="text-lg font-semibold mb-2" id="sizes-label">
								Capacidade
							</h3>
							<div className="flex gap-2">
								{product.sizes.map((size) => (
									<button
										type="button"
										key={size.name}
										onClick={() => {
											if (size.inStock) {
												setSelectedSize(size.name);
												saveSelections(selectedColor, size.name);
											}
										}}
										disabled={!size.inStock}
										className={`px-4 py-2 rounded-md transition-all ${
											!size.inStock
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: selectedSize === size.name
													? "bg-blue-500 text-white"
													: "bg-gray-100 hover:bg-gray-200"
										}`}
										aria-label={`Capacidade ${size.name}${!size.inStock ? " - Indisponível" : ""}`}
										aria-pressed={selectedSize === size.name}
									>
										{size.name}
										{!size.inStock && (
											<span className="sr-only"> - Indisponível</span>
										)}
									</button>
								))}
							</div>
						</div>

						<section aria-labelledby="specs-title">
							<h3 className="text-lg font-semibold mb-2" id="specs-title">
								Especificações
							</h3>
							<dl className="bg-gray-50 rounded-lg p-4 space-y-2">
								{Object.entries(product.specifications).map(([key, value]) => (
									<div key={key} className="flex justify-between">
										<dt className="text-gray-600 capitalize">{key}:</dt>
										<dd className="font-medium">{value}</dd>
									</div>
								))}
							</dl>
						</section>

						<section aria-labelledby="shipping-title">
							<h3 className="text-lg font-semibold" id="shipping-title">
								Calcular Frete
							</h3>
							<div className="space-y-4">
								<div className="flex gap-4">
									<input
										type="text"
										value={cep}
										onChange={handleCepChange}
										placeholder="Digite seu CEP"
										className="flex-1 px-4 py-2 border rounded-md"
										maxLength={8}
										aria-label="CEP para cálculo de frete"
									/>
								</div>

								{address && (
									<div
										className="bg-gray-50 p-4 rounded-md"
										aria-label="Informações do endereço"
									>
										<p className="font-medium">{address.logradouro}</p>
										<p>
											{address.bairro} - {address.localidade}/{address.uf}
										</p>
										<p className="text-sm text-gray-500">CEP: {address.cep}</p>
									</div>
								)}
							</div>
						</section>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
