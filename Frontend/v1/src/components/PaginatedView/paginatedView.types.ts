/** @format */



export interface PaginatedViewProps {
	children: { [key: string | number]: JSX.Element | JSX.Element[] } | any[];
	title?: JSX.Element | JSX.Element[];
	footer?: JSX.Element | JSX.Element[];
	errors?: any[];
	showErrors?: boolean;
	startAt?: number;
	totalPages: number;
	limit?: number;
	actions: {
		children: JSX.Element | JSX.Element[];
		position?: "top" | "bottom";
		show?: "first" | "last" | "all" | "beforeLast" | "afterFirst";
	};
	hidePage?: number;
	currentPage?: (page: number) => void;
}
