/** @format */

import { Pagination } from "./Pagination";
import { Container } from "../Container";
import { useState, useEffect } from "react";
import { PaginatedViewProps } from "./index.types";
export const PaginatedView = ({
	children,
	title,
	footer,
	sidebar,
	startAt,
	totalPages,
}: PaginatedViewProps): JSX.Element => {
	const [activePage, setActivePage] = useState(startAt ?? 1);
	useEffect(() => {
		startAt && activePage !== startAt && setActivePage(startAt);
	}, [activePage, startAt]);
	return (
		<Container
			header={title}
			footer={<Pagination activePage onChange={setActivePage} totalPages={totalPages} />}
		>
			{children[activePage]}
		</Container>
	);
};
