/** @format */

export interface Pagination {
	activePage: number;
	limit?: number;
	totalPages: number;
	maxButtons?: number;
	size?: "xs" | "sm" | "md" | "lg";
	onChangePage: (page: number) => void;
}
