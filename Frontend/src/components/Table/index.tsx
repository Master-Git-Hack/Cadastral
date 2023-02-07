/** @format */

import { AutoTableProps, CustomTableProps } from "./table.interfaces";

import {
	TableBody,
	Table as Component,
	TableHead,
	TableContainer,
	TablePagination,
	TableFooter,
	Paper,
	Box,
	Skeleton,
	Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const AutoTable = ({ box, ...props }: AutoTableProps) => (
	<Box {...box}>
		<DataGrid {...props} />
	</Box>
);
const LoadingHeaders = () => (
	<Stack direction="row" spacing={5.5}>
		{[...Array(3)].map((_, i) => (
			<Skeleton
				key={`loading row header ${i}`}
				variant="text"
				width={250}
				height={30}
				animation="wave"
			/>
		))}
	</Stack>
);
const LoadingBody = () => (
	<Stack direction="column">
		{[...Array(3)].map((_, i) => (
			<Stack key={`loading column body ${i}`} direction="row" spacing={3}>
				{[...Array(6)].map((_, j) => (
					<Skeleton
						key={`loading row body ${i}${j}`}
						variant="text"
						width={120}
						height={30}
						animation="wave"
					/>
				))}
			</Stack>
		))}
	</Stack>
);
export const Table = ({
	container,
	table,
	head,
	body,
	footer,
	pagination,
	children,
	loading,
	...props
}: CustomTableProps) => (
	<Paper {...props}>
		<TableContainer {...container}>
			<Component {...table}>
				{loading ? <LoadingHeaders /> : head && <TableHead {...head} />}
				{loading ? (
					<LoadingBody />
				) : (
					<TableBody {...body}>
						{body?.children}
						{children}
					</TableBody>
				)}
				{loading ? (
					<Stack direction="row-reverse">
						<Skeleton variant="text" width={280} height={30} animation="wave" />
					</Stack>
				) : (
					footer && <TableFooter {...footer} />
				)}
			</Component>
		</TableContainer>
		{pagination && <TablePagination {...pagination} />}
	</Paper>
);
