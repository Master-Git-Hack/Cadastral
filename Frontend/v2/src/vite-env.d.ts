/** @format */

/// <reference types="vite/client" />
declare module "*.pdf";
interface ImportMetaEnv {
	readonly VITE_API_URL_DEV: string;
	readonly VITE_API_URL_PROD: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
