/** @format */

import { Tooltip as Component, Whisper } from "rsuite";
import { TooltipProps } from "./index.types";
export const Tooltip = ({
	id,
	children,
	tooltip,
	trigger,
	delay,
	followCursor,
	placement,
}: TooltipProps): JSX.Element => (
	<Whisper
		trigger={trigger || ["click", "hover"]}
		placement={placement ?? "auto"}
		controlId={id}
		followCursor={followCursor}
		delay={delay}
		speaker={<Component arrow>{tooltip}</Component>}
	>
		{children}
	</Whisper>
);
