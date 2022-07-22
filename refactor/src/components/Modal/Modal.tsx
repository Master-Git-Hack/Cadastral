/** @format */
import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { Modal as Component } from "react-bootstrap";
import { ModalProps } from "./Modal.types";
import { Alert } from "../../utils/utils.alert";
export const Regular = (props: ModalProps) => {
	const { actionToDo, btnType, children, title } = props;
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);
	const html = children;

	return (
		<>
			<Button text={actionToDo} type={btnType ?? "link"} onClick={handleShow} />
			<Component show={show} onHide={handleShow}>
				<Component.Header closeButton>
					<Component.Title>{title}</Component.Title>
				</Component.Header>
				<Component.Body>{children}</Component.Body>
			</Component>
		</>
	);
};
export const Sweet = (props: ModalProps) => {
	const { actionToDo, btnType, children, title } = props;
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);
	const html = children;
	useEffect(() => {
		show && Alert.Component({ title, text: "", html, showCloseButton: true });
	}, [show]);
	return <Button text={actionToDo} type={btnType ?? "link"} onClick={handleShow} />;
};

export const Modal = { Regular, Sweet };
