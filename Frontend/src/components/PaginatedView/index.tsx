/** @format */

import { Pagination } from "./Pagination";
import { Container } from "../Container";
import { useState, useEffect, forwardRef } from "react";
import { PaginatedViewProps } from "./paginatedView.types";
import { Divider, Animation, Grid, Row, Col } from "rsuite";
import { Errors } from "../Custom/Errors";

const Panel = forwardRef(({ children, ...props }: any, ref) => (
	<div {...props} ref={ref}>
		{children}
	</div>
));

export const PaginatedView = ({
	children,
	title,
	footer,
	startAt,
	totalPages,
	limit,
	actions,
	errors,
	showErrors,
	...props
}: PaginatedViewProps): JSX.Element => {
	const [activePage, setActivePage] = useState(startAt ?? 1);
	useEffect(() => {
		startAt !== undefined && startAt !== 1 && setActivePage(startAt);
	}, [startAt]);

	const showActions = actions?.show ?? "all";
	const actionPosition = actions?.position ?? "top";
	const Actions = () => (
		<>
			{actionPosition.includes("top") && <Divider />}
			<div className="d-flex justify-content-between align-items-start px-4 ">
				{actions.children}
			</div>
			{actionPosition.includes("bottom") && <Divider />}
		</>
	);
	const hidePage = props?.hidePage ?? 0;
	const [showAnimation, setShowAnimation] = useState(false);
	useEffect(() => {
		hidePage === activePage &&
			setActivePage(
				activePage > 0 && activePage < totalPages
					? activePage + 1
					: activePage === totalPages
					? activePage - 1
					: activePage - 1 !== 0
					? activePage - 1
					: activePage,
			);
		window.scrollTo(0, 0);
		window.resizeTo(window.innerWidth, window.innerHeight);
	}, [activePage]);
	useEffect(() => {
		!showAnimation &&
			setTimeout(() => {
				setShowAnimation(true);
			}, 300);
	}, [showAnimation]);

	return (
		<Container
			header={
				<>
					<div className="d-flex justify-content-between align-items-start my-3 px-4 py-auto">
						{title}
					</div>

					{actions && showActions.includes("all") && <Actions />}
					{actions && showActions.includes("first") && activePage === 1 && <Actions />}
					{actions &&
						showActions.includes("afterFirst") &&
						((totalPages > 1 && activePage > 1) || activePage === 1) && <Actions />}
					{actions &&
						showActions.includes("beforeLast") &&
						((totalPages > 1 && activePage < totalPages) || activePage === 1) && (
							<Actions />
						)}
					{actions && showActions.includes("last") && activePage === totalPages && (
						<Actions />
					)}
				</>
			}
			footer={
				<div className="d-flex flex-column justify-content-center sticky-xxl-bottom mx-4 mt-2">
					{actions && actions.position === "bottom" && (
						<>
							<div className="d-flex justify-content-between align-items-start px-4 ">
								{actions.children}
							</div>
							<Divider />
						</>
					)}
					<div className="d-flex flex-row justify-content-between sticky-xxl-bottom">
						{footer}
					</div>
					<div className="d-flex flex-row justify-content-center mb-5 mt-1">
						{totalPages > 1 && (
							<Pagination
								size="sm"
								activePage={activePage}
								onChangePage={(page: number) => {
									setShowAnimation(false);
									setActivePage(page);
								}}
								limit={limit}
								totalPages={totalPages}
							/>
						)}
					</div>
				</div>
			}
		>
			<div className="shadow-lg p-3 my-2 bg-body rounded h-auto vw-75 ">
				<Grid fluid>
					<Row>
						{showErrors && (
							<Col xs={24} sm={13} md={8} lg={7} xl={7} xxl={6}>
								<Errors name="PaginatedView" errors={errors} show={showErrors} />
							</Col>
						)}
						<Col
							xs={24}
							sm={showErrors ? 11 : 24}
							md={showErrors ? 16 : 24}
							lg={showErrors ? 17 : 24}
							xl={showErrors ? 17 : 24}
							xxl={showErrors ? 18 : 24}
						>
							<Animation.Fade in={showAnimation}>
								{(props, ref) => (
									<Panel ref={ref} {...props}>
										{hidePage !== activePage && children[activePage]}
									</Panel>
								)}
							</Animation.Fade>
						</Col>
					</Row>
				</Grid>
			</div>
		</Container>
	);
};
