/** @format */

import { Drawer } from "rsuite";
import { useState } from "react";
import { PopPanelProps } from "./popPanel.types";
import { Button } from "../Button";

export const PopPanel = ({
	children,
	placement,
	size,
	header,
	customPanelActions,
	action,
	btnType,
	btnAppearance,
	block,
	loading,
	btnSize,
	onEnter,
}: PopPanelProps) => {
	const [show, setShow] = useState(false);
	return (
		<>
			<Button
				type={btnType}
				appearance={btnAppearance}
				block={block}
				loading={loading}
				size={btnSize}
				onClick={() => setShow(!show)}
			>
				{action ?? "Abrir"}
			</Button>
			<Drawer
				size={size}
				placement={placement}
				open={show}
				onClose={() => setShow(false)}
				backdrop
				autoFocus
				enforceFocus
				keyboard
				onEnter={onEnter}
			>
				{(header || customPanelActions) && (
					<Drawer.Header>
						<Drawer.Title>{header}</Drawer.Title>
						<Drawer.Actions>{customPanelActions}</Drawer.Actions>
					</Drawer.Header>
				)}
				<Drawer.Body>{children}</Drawer.Body>
			</Drawer>
		</>
	);
};
