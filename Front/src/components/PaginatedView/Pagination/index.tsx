/** @format */

import { useState, useEffect } from "react";
import { Pagination as Component } from "rsuite";

import { PaginationProps } from "./pagination.types";

export const Pagination = ({
	activePage,
	limit,
	totalPages,
	maxButtons,
	size,
}: PaginationProps): JSX.Element => {
	const [current, setCurrent] = useState(activePage);
	useEffect(() => {
		current !== activePage && setCurrent(activePage);
	}, [activePage, current]);
	return (
		<Component
			prev
			first
			last
			next
			limit={limit ?? totalPages}
			activePage={current}
			total={totalPages}
			maxButtons={maxButtons ?? totalPages / 3}
			onChangePage={setCurrent}
			size={size}
		/>
	);
};
