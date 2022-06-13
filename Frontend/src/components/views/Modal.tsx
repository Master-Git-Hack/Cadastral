/** @format */

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalComponent = (props: { actionToDo: string; Header: string; Body: any }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				{props.actionToDo}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.Header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.Body}</Modal.Body>
			</Modal>
		</>
	);
};
