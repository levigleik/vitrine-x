import type { Product } from "@/types/product";

export const products: Product[] = [
	{
		id: "iphone-16",
		name: "iPhone 16 Pro",
		description:
			"O iPhone mais avançado já criado, com câmera revolucionária e chip A18 Pro.",
		price: 9999.0,
		images: [
			"/images/products/iphone-16/front.webp",
			"/images/products/iphone-16/back.webp",
			"/images/products/iphone-16/edge.webp",
			"/images/products/iphone-16/camera-ai.webp",
		],
		colors: [
			{ name: "Titânio Natural", hex: "#9E9E9E" },
			{ name: "Titânio Preto", hex: "#2B2B2B" },
			{ name: "Titânio Azul", hex: "#1E3A5F" },
		],
		sizes: [
			{ name: "128GB", inStock: true },
			{ name: "256GB", inStock: true },
			{ name: "512GB", inStock: false },
			{ name: "1TB", inStock: true },
		],
		category: "Smartphones",
		specifications: {
			tela: "6.7 polegadas OLED",
			processador: "A18 Pro",
			ram: "8GB",
			camera: "48MP + 12MP + 12MP",
		},
	},
	{
		id: "galaxy-a25",
		name: "Samsung Galaxy A25 5G",
		description:
			"Experiência 5G acessível com câmera de 50MP e tela Super AMOLED.",
		price: 1799.0,
		images: [
			"/images/products/galaxy-a25/front.webp",
			"/images/products/galaxy-a25/camera.webp",
			"/images/products/galaxy-a25/performance.webp",
			"/images/products/galaxy-a25/screen.webp",
		],
		colors: [
			{ name: "Preto", hex: "#000000" },
			{ name: "Azul", hex: "#1428A0" },
			{ name: "Verde Limão", hex: "#C5E384" },
		],
		sizes: [
			{ name: "128GB", inStock: true },
			{ name: "256GB", inStock: true },
		],
		category: "Smartphones",
		specifications: {
			tela: "6.5 polegadas Super AMOLED",
			processador: "Exynos 1280",
			ram: "6GB",
			camera: "50MP + 8MP + 2MP",
		},
	},
	{
		id: "edge-50-neo",
		name: "Motorola Edge 50 Neo",
		description:
			"Design premium com câmera avançada e carregamento TurboPower.",
		price: 2499.0,
		images: [
			"/images/products/edge-50-neo/front.webp",
			"/images/products/edge-50-neo/ai.webp",
			"/images/products/edge-50-neo/back.webp",
			"/images/products/edge-50-neo/resistance.webp",
		],
		colors: [
			{ name: "Preto Místico", hex: "#2B2B2B" },
			{ name: "Rosa Magenta", hex: "#FF1493" },
			{ name: "Azul Marinho", hex: "#000080" },
		],
		sizes: [
			{ name: "128GB", inStock: true },
			{ name: "256GB", inStock: false },
		],
		category: "Smartphones",
		specifications: {
			tela: "6.6 polegadas pOLED",
			processador: "Dimensity 7030",
			ram: "8GB",
			camera: "64MP + 13MP + 2MP",
		},
	},
];
