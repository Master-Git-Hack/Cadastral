/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV ==="production";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
		URL: env ?process.env.NEXT_PUBLIC_API_URL:"localhost",
		PORT: env ?process.env.NEXT_PUBLIC_API_PORT:5000,
		ENDPOINT:env ? process.env.NEXT_PUBLIC_API_ENDPOINT:"api",
		VERSION: env ?process.env.NEXT_PUBLIC_API_VERSION:"v2",
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	},
}

module.exports = nextConfig
