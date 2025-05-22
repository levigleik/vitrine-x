"use client";

import { getProduct } from "@/services/products";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
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
					// Salvar no localStorage por 15 minutos
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

	// Efeito para carregar dados salvos do localStorage
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

	// Salvar seleções no localStorage
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
		<main className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Imagens do Produto */}
				<div className="space-y-4">
					<motion.div
						key={selectedImage}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative h-[500px] w-full rounded-lg overflow-hidden"
					>
						<Image
							src={product.images[selectedImage]}
							alt={product.name}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>

					<div className="flex gap-4 overflow-x-auto pb-2">
						{product.images.map((image, index) => (
							<button
								type="button"
								key={image}
								onClick={() => setSelectedImage(index)}
								className={`relative h-20 w-20 rounded-md overflow-hidden ${
									selectedImage === index ? "ring-2 ring-blue-500" : ""
								}`}
							>
								<Image
									src={image}
									alt={`${product.name} - Imagem ${index + 1}`}
									fill
									className="object-cover"
									sizes="80px"
								/>
							</button>
						))}
					</div>
				</div>

				{/* Informações do Produto */}
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-gray-600 mt-2">{product.description}</p>
					</div>

					<p className="text-4xl font-bold text-gray-900">
						{new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(product.price)}
					</p>

					{/* Seletor de Cores */}
					<div>
						<h3 className="text-lg font-semibold mb-2">Cores</h3>
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
									title={color.name}
								/>
							))}
						</div>
					</div>

					{/* Seletor de Tamanhos */}
					<div>
						<h3 className="text-lg font-semibold mb-2">Capacidade</h3>
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
								>
									{size.name}
									{!size.inStock && " (Indisponível)"}
								</button>
							))}
						</div>
					</div>

					{/* Especificações */}
					<div>
						<h3 className="text-lg font-semibold mb-2">Especificações</h3>
						<div className="bg-gray-50 rounded-lg p-4 space-y-2">
							{Object.entries(product.specifications).map(([key, value]) => (
								<div key={key} className="flex justify-between">
									<span className="text-gray-600 capitalize">{key}:</span>
									<span className="font-medium">{value}</span>
								</div>
							))}
						</div>
					</div>

					{/* Calculadora de Frete */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Calcular Frete</h3>
						<div className="flex gap-4">
							<input
								type="text"
								value={cep}
								onChange={handleCepChange}
								placeholder="Digite seu CEP"
								className="flex-1 px-4 py-2 border rounded-md"
								maxLength={8}
							/>
						</div>

						{address && (
							<div className="bg-gray-50 p-4 rounded-md">
								<p className="font-medium">{address.logradouro}</p>
								<p>
									{address.bairro} - {address.localidade}/{address.uf}
								</p>
								<p className="text-sm text-gray-500">CEP: {address.cep}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
