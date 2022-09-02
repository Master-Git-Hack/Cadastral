/** @format */
import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Card, Collapse } from "react-bootstrap";

export const PopoverComponent = (props: {
	placement: string;
	name: string;
	children: any;
	actionToDo: string;
}) => (
	<OverlayTrigger
		trigger="click"
		key={props.name}
		placement={props.placement}
		overlay={<Popover>{props.children}</Popover>}
	>
		<Button variant="primary">{props.actionToDo}</Button>
	</OverlayTrigger>
);

export const Pop = (props: { children: any }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				onClick={() => setOpen(!open)}
				aria-controls="example-collapse-text"
				aria-expanded={open}
			>
				click
			</Button>
			<div style={{ minHeight: "150px" }}>
				<Collapse in={open} dimension="width">
					<div id="example-collapse-text">
						<Card body style={{ width: "400px" }}>
							{props.children}
						</Card>
					</div>
				</Collapse>
			</div>
		</>
	);
};
