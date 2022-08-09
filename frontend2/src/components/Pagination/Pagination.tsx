/** @format */
import { PaginationProps } from "./Pagination.types";
import { Pagination as Component } from "rsuite";
/** @format */
export const Pagination = (props: PaginationProps) => {
	const { activePage, limitPages, totalPages, maxButtons, onChangePage, onChangeLimit, size } =
		props;

	return (
		<Component
			activePage={activePage}
			prev
			first
			last
			next
			limit={limitPages}
			total={totalPages ?? limitPages ** 2}
			size={size ?? "xs"}
			maxButtons={maxButtons ?? limitPages}
			onChangePage={onChangePage}
			onChangeLimit={onChangeLimit}
		/>
	);
};
