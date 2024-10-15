/**
 * @format
 * @type {import('next').NextConfig}
 */
// import MillionLint from "@million/lint";
const nextConfig = {
	rewrites: async () => {
		return [
			{
				source: '/api/py/:path*',
				destination:
					process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/api/py/:path*' : '/api/',
			},
			{
				source: '/docs',
				destination:
					process.env.NODE_ENV === 'development'
						? 'http://127.0.0.1:5000/api/py/docs'
						: '/api/py/docs',
			},
			{
				source: '/openapi.json',
				destination:
					process.env.NODE_ENV === 'development'
						? 'http://127.0.0.1:5000/api/py/openapi.json'
						: '/api/py/openapi.json',
			},
		];
	},
};
// export default MillionLint.next({ rsc: true,filter: {
//     include: "**/components/*.{mtsx,mjsx,tsx,jsx}",
//   },})(nextConfig);
module.exports = nextConfig;
