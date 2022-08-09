/** @format */

import { Alert as Component } from "react-bootstrap";
import { AlertProps } from "./Alert.types";
export const Alert = (props: AlertProps): JSX.Element => (
	<Component variant={props.type ?? "success"}>
		<Component.Heading className={props.headerStyle ?? ""}>{props.header}</Component.Heading>
		<p className={props.bodyStyle ?? ""}>{props.children}</p>
	</Component>
);
