/** @format */
import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { Modal as Container } from "rsuite";
import { Modal as Component } from "react-bootstrap";
import { ModalProps } from "./Modal.types";
import { Alert } from "../../utils/utils.alert";
export const Modal = (props: ModalProps) => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);
	const { type, action, overflow, backdrop, size, title, children, footer } = props;
	return (
		<>
			<Button type={type ?? "link"} onClick={handleShow}>
				{action}
			</Button>
			<Container
				autoFocus
				overflow={overflow}
				backdrop={backdrop ?? "static"}
				role="alertdialog"
				open={show}
				onClose={handleShow}
				size={size ?? "lg"}
			>
				{title ?? (
					<Container.Header>
						<Container.Title>{title}</Container.Title>
					</Container.Header>
				)}
				<Container.Body>{children}</Container.Body>
				{footer ?? <Container.Footer>{footer}</Container.Footer>}
			</Container>
		</>
	);
};
