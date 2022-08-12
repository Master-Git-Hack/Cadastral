/** @format */

import { Tooltip as Component, Whisper } from "rsuite";
import { TooltipProps } from "./tooltip.types";
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
		trigger={trigger || ["click", "hover", "focus"]}
		placement={placement ?? "auto"}
		controlId={id}
		followCursor={followCursor}
		delay={delay}
		speaker={
			<Component arrow id={id}>
				{tooltip}
			</Component>
		}
	>
		<div id={id}>{children}</div>
	</Whisper>
);
