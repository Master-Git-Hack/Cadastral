/** @format */

import { useState } from "react";
import { Modal as Component } from "rsuite";
import { Button } from "../Button";
import { ModalProps } from "./index.types";
export const Modal = ({
	action,
	children,
	type,
	appearance,
	btnSize,
	size,
	header,
	title,
	footer,
}: ModalProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	return (
		<>
			<Button
				type={type}
				appearance={appearance ?? "link"}
				onClick={handleOpen}
				size={btnSize}
			>
				{action}
			</Button>
			<Component autoFocus enforceFocus keyboard open={open} onClose={handleOpen} size={size}>
				<Component.Header closeButton>
					{header}
					{title && <Component.Title>{title}</Component.Title>}
				</Component.Header>
				<Component.Body>{children}</Component.Body>
				{footer && <Component.Footer>{footer}</Component.Footer>}
			</Component>
		</>
	);
};
