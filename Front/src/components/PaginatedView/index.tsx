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
	limit,
}: PaginatedViewProps): JSX.Element => {
	const [activePage, setActivePage] = useState(startAt ?? 1);
	useEffect(() => {
		startAt && activePage !== startAt && setActivePage(startAt);
	}, [activePage, startAt]);
	return (
		<Container
			header={title}
			footer={
				<>
					{footer}
					<br />
					<Pagination
						activePage={activePage}
						onChange={setActivePage}
						limit={limit ?? totalPages}
						totalPages={totalPages}
					/>
				</>
			}
			sidebar={sidebar}
		>
			{children[activePage]}
		</Container>
	);
};
