/** @format */

import { Dropdown, Button as Component, ButtonGroup } from "react-bootstrap";
import { ButtonActionsProps } from "./Button.actions.types";
export const Button = (props: ButtonActionsProps): JSX.Element => {
	return (
		<Dropdown as={ButtonGroup}>
			<Component variant={`${props.outline ? "outline-" : ""}${props.type}`}>
				{props.text}
			</Component>
			<Dropdown.Toggle
				split
				variant={`${props.outline ? "outline-" : ""}${props.type}`}
				id="dropdown button with actions"
			/>
			<Dropdown.Menu>
				{props.actions &&
					props.actions.map((action: string, index: number) => (
						<Dropdown.Item
							key={`actions menu for button actions ${index}`}
							onClick={() => props.onClick(action, index)}
							value={index}
						>
							{action}
						</Dropdown.Item>
					))}
				{props.customActions}
			</Dropdown.Menu>
		</Dropdown>
	);
};
