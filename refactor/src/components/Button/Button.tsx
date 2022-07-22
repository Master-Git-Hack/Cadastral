/** @format */

import { ButtonProps } from "./Button.types";
export const Button = (props: ButtonProps): JSX.Element => (
	<div className="input-group input-group-sm">
		<button
			className={`btn btn-sm btn-${props.outline ? "outline-" : ""}${props.type} ${
				props.className
			}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	</div>
);
