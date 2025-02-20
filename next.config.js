/**
 * @format
 * @type {import('next').NextConfig}
 */
const backendURL = process.env.NEXT_PUBLIC_API_URL;

if (!backendURL) {
	throw new Error(
		"NEXT_PUBLIC_API_URL is not set. Please check your environment variables.",
	);
}

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

	experimental: {
		turbo: {
			resolveExtensions: [
				".mdx",
				".tsx",
				".ts",
				".jsx",
				".js",
				".mjs",
				".json",
				".pdf",
			],
		},
	},
	rewrites: async () => {
		return [
			{
				source: "/api/py/:path*",
				destination: `${backendURL}/api/py/:path*`,
			},
			{
				source: "/docs",
				destination: `${backendURL}/api/py/docs`,
			},
			{
				source: "/openapi.json",
				destination: `${backendURL}/api/py/openapi.json`,
			},
		];
	},
};

module.exports = nextConfig;
