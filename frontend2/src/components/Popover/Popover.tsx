/** @format */

import { Popover as Component, Whisper } from "rsuite";
export const Popover = (props: any): JSX.Element => {
	const { children, placement, trigger, id, tooltip, title } = props;
	return (
		<>
			<Whisper
				preventOverflow
				placement={placement ?? "top"}
				trigger={trigger ?? "hover"}
				controlId={id}
				speaker={<Component title={title}>{tooltip}</Component>}
				enterable
			>
				{children}
			</Whisper>
		</>
	);
};
