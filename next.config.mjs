/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
		domains: ["localhost"],
		unoptimized: true,
	},
};

export default nextConfig;
