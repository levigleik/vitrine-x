import withSerwistInit from "@serwist/next";

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

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
});

export default withSerwist({
	...nextConfig,
});
