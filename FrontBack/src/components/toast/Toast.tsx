/** @format */

import { Toast } from "react-bootstrap";
export const ToastComponent = (props: {
	className?: string;
	bg?: string;
	header: string;
	headerStrong?: boolean;
	body: string;
}) => (
	<Toast>
		<Toast.Header>
			{props.headerStrong && <strong>{props.header}</strong>}
			{props.headerStrong === undefined && <>{props.header}</>}
		</Toast.Header>
		<Toast.Body>{props.body}</Toast.Body>
	</Toast>
);
