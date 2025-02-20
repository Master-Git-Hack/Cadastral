/** @format */

export interface PaginatedViewProps {
	children: { [key: string | number]: React.ReactNode|React.ReactNode[] } | any[];
	title?: React.ReactNode|React.ReactNode[];
	footer?: React.ReactNode|React.ReactNode[];
	errors?: any[];
	showErrors?: boolean;
	startAt?: number;
	totalPages: number;
	limit?: number;
	actions: {
		children: React.ReactNode|React.ReactNode[];
		position?: "top" | "bottom";
		show?: "first" | "last" | "all" | "beforeLast" | "afterFirst";
	};
	hidePage?: number;
	currentPage?: (page: number) => void;
}
