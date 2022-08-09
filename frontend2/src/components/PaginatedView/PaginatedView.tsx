/** @format */

import React, { useState, useEffect } from "react";
import { Pagination } from "../Pagination/Pagination";
import { Container } from "../Container/Container";
import { ViewProps } from "./PaginatedView.types";
import { Row } from "rsuite";

export const View = (props: ViewProps) => {
	const { title, limitPages, pages, startAt, hidePage } = props;
	const hiddenPage = hidePage ?? 0;
	const [activePage, setActivePage] = useState(startAt ?? 1);
	useEffect(() => {
		setActivePage(startAt ?? activePage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startAt]);
	return (
		<div className="shadow-lg p-3 my-4 bg-body rounded h-auto vw-75 ">
			<Container
				hasHeader
				headerChildren={title}
				hasFooter
				footerChildren={
					<Pagination
						activePage={activePage}
						limitPages={limitPages}
						maxButtons={limitPages}
						onChangePage={setActivePage}
					/>
				}
			>
				{hiddenPage !== activePage && pages[activePage]}
			</Container>
		</div>
	);
};
