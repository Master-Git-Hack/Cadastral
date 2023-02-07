/** @format */
export interface HeaderProps {
	[key: string]: any;
}

export interface ApiProps {
	url: string;
	responseType?: "blob" | "json";
	payload?: any;
	headers?: HeaderProps;
	method?: "get" | "post" | "patch" | "delete";
}
