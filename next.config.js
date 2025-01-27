/**
 * @format
 * @type {import('next').NextConfig}
 */
// import MillionLint from "@million/lint";
const getItem = (item) => {
	if (typeof window === "undefined") return undefined;
	try {
		if (item === "token") return localStorage.getItem(item);
		const data = localStorage.getItem(item);
		if (data === null) return undefined;
		// Check if data is an object or a string
		if (/^\{.*\}$/.test(data)) {
			return JSON.parse(data);
		} else if (/^".*"$/.test(data)) {
			return data.slice(1, -1);
		} else {
			return data;
		}
	} catch (error) {
		console.error(`Error getting localStorage item '${item}':`, error);
		return undefined;
	}
};
const backendURL =
	process.env.NODE_ENV === "development"
		? process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"
		: "/api/";
const nextConfig = {
	experimental: {
		turbo: {
			resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json", ".pdf"],
		},
	},
	rewrites: async () => {
		return [
			{
				source: "/api/py/:path*",
				destination:
					process.env.NODE_ENV === "development"
						? `${backendURL}/api/py/:path*`
						: "/api/",
				has: [
					{
						type: "header",
						key: "authorization",
						value: `Bearer ${getItem("user-storage")?.state?.token}`,
					},
				],
			},
			{
				source: "/docs",
				destination:
					process.env.NODE_ENV === "development"
						? `${backendURL}/api/py/docs`
						: "/api/py/docs",
			},
			{
				source: "/openapi.json",
				destination:
					process.env.NODE_ENV === "development"
						? `${backendURL}/api/py/openapi.json`
						: "/api/py/openapi.json",
			},
		];
	},
};
// export default MillionLint.next({ rsc: true,filter: {
//     include: "**/components/*.{mtsx,mjsx,tsx,jsx}",
//   },})(nextConfig);
module.exports = nextConfig;
