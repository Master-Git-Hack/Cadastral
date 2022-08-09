/** @format */

import { Spinner as Component } from "react-bootstrap";
import { SpinnerProps } from "./Spinner.types";
export const Spinner = (props: SpinnerProps): JSX.Element => {
	return (
		<Component
			animation={props.animation ?? "border"}
			role="status"
			variant={props.type ?? "secondary"}
		>
			{props.text && <span className={props.className ?? ""}>{props.text}</span>}
		</Component>
	);
};
