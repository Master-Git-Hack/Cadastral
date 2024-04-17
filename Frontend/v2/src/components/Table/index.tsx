/** @format */
import { useState } from "react";
import { Table as Component } from "./table";
import { Body } from "./body";
import { Footer } from "./footer";
import { Head } from "./head";
import { Header } from "./header";
import { Row } from "./row";
import { Cell } from "./cell";
import { Caption } from "./caption";
export const Table = Object.assign(Component, { Body, Footer, Head, Header, Row, Cell, Caption });
export const DataTable = ({
	data,
	columns,
	table,
	body,
	footer,
	head,
	header,
	row,
	cell,
	caption,
}) => {
	// Automatically generate columns if not provided
	if (!columns && data.length > 0) {
		columns = Object.keys(data[0]);
	}

	return (
		<div>
			<Component {...table}>
				<Caption {...caption} />
				<Head {...head}>
					<Header {...header}>
						{columns.map((column) => (
							<Cell key={column} className="capitalize">
								{column}
							</Cell>
						))}
					</Header>
				</Head>
				<Body {...body}>
					{data.map((rowData, rowIndex) => (
						<Row key={rowIndex} {...row}>
							{columns.map((column, columnIndex) => (
								<Cell key={columnIndex} {...cell}>
									{rowData[column]}
								</Cell>
							))}
						</Row>
					))}
				</Body>
			</Component>
		</div>
	);
};

export default Table;
