/** @format */
import { useState, useEffect, ChangeEvent } from "react";
import { ContainerProps } from "./interfaces";
import { Container as Component, Pagination, Box, Paper, Fade, Stack } from "@mui/material";

export const Container = ({
	children,
	pagination,
	header,
	footer,
	startAt,
	hide,
	actions,
	totalPages,
	shadow,
	justifyContent,
	...props
}: ContainerProps) => {
	const [page, setPage] = useState(startAt ?? 1);

	useEffect(() => {
		startAt !== undefined && startAt !== 1 && setPage(startAt);
	}, [startAt]);
	const [animation, setAnimation] = useState(false);
	const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
		setAnimation(false);
		setPage(value);
	};
	totalPages = totalPages ?? 2;
	hide = hide ?? 0;

	useEffect(() => {
		page &&
			!animation &&
			setTimeout(() => {
				setAnimation(true);
			}, 500);
	}, [page, animation]);
	const showActions = actions?.show ?? "all";
	const showPosition = actions?.position ?? "top";
	const Actions = () => <Box sx={{ m: 1 }}>{actions && <>{actions?.component}</>}</Box>;
	const Extra = () => (
		<Paper elevation={actions?.shadow ?? 0}>
			{actions?.title}
			{showActions === "all" && <Actions />}
			{showActions === "first" && page === 1 && <Actions />}
			{showActions === "last" && page === totalPages && <Actions />}
			{showActions === "afterFirst" && page > 1 && <Actions />}
			{showActions === "beforeLast" && page < totalPages && <Actions />}
		</Paper>
	);
	return (
		<>
			{header}

			<Paper elevation={shadow ?? 0} sx={{ m: 1, py: 1 }}>
				<Stack
					direction="row"
					justifyContent={justifyContent}
					alignItems="center"
					sx={{ m: 1 }}
				>
					{(showPosition === "top" || showPosition === "both") && <Extra />}
					<Component fixed {...props} sx={{ my: 1 }}>
						<Fade in={animation}>
							<Box>{hide !== page && (children[page] ?? undefined)}</Box>
						</Fade>
					</Component>
					{(showPosition === "bottom" || showPosition === "both") && <Extra />}
				</Stack>
			</Paper>
			{footer}
			<Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
				{pagination && (
					<Pagination
						{...pagination}
						page={page}
						onChange={handlePageChange}
						sx={{
							display: "flex",
							position: "absolute",
							bottom: 0,
							mb: 3,
						}}
					/>
				)}
			</Box>
		</>
	);
};
