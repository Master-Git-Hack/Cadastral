/** @format */

import { Alert } from "react-bootstrap";
import { AlertProps } from "./Alert.types";
export const AlertComponent = (props: AlertProps): JSX.Element => (
	<Alert variant={props.type ?? "success"}>
		<Alert.Heading className={props.headerStyle ?? ""}>{props.header ?? ""}</Alert.Heading>
		<p className={props.bodyStyle ?? ""}>{props.body}</p>
	</Alert>
);
module.exports = { Alert: AlertComponent };
