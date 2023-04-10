/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
	URL: process.env.NEXT_PUBLIC_API_URL,
	PORT: process.env.NEXT_PUBLIC_API_PORT,
	ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
	VERSION: process.env.NEXT_PUBLIC_API_VERSION,
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
