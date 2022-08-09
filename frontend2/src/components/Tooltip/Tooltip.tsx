/** @format */

import { TooltipProps } from "./Tooltip.types";
import { Tooltip as Tip, OverlayTrigger } from "react-bootstrap";

export const Tooltip = (props: TooltipProps): JSX.Element => (
	<OverlayTrigger
		placement={props.placement}
		delay={{ show: 250, hide: 400 }}
		overlay={<Tip id={props.id}>{props?.customTooltip ?? props?.tooltip}</Tip>}
	>
		{props.children}
	</OverlayTrigger>
);
