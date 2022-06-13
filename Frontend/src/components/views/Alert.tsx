/** @format */

import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
export const AlertComponent = (props: {
	variant: string;
	Header: string;
	Body: any;
	Show: boolean;
}) => {
	const [show, setShow] = useState(props.Show);
	useEffect(() => {
		!show && setTimeout(() => setShow(true), 30000);
	}, [show]);
	return (
		<>
			{show && (
				<Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
					<Alert.Heading>{props.Header}</Alert.Heading>
					<hr />
					{props.Body}
				</Alert>
			)}
		</>
	);
};
//Se encontró, el siguiente error.
