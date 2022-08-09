/** @format */
export interface PaginationProps {
	activePage: number;
	limitPages: number;
	totalPages?: number;
	size?: "sm" | "md" | "lg" | "xs";
	maxButtons?: number;
	onChangePage: (page: number) => void;
	onChangeLimit?: (limit: number) => void;
}
