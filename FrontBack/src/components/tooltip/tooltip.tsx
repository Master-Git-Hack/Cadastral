/** @format
 * 
 * example=\n
 * <TooltipComponent
					id="text"
					placement="bottom"
					tooltip="text"
					component={
						<input
							
						/>
					}
				/>
 */

import { Tooltip, OverlayTrigger } from "react-bootstrap";
export const TooltipComponent = (props: {
	id: string;
	placement: string;
	tooltip: any;
	component: any;
}) => (
	<OverlayTrigger
		placement={props.placement}
		delay={{ show: 250, hide: 400 }}
		overlay={
			<Tooltip className="bg-light" id={props.id}>
				{props.tooltip}
			</Tooltip>
		}
	>
		{props.component}
	</OverlayTrigger>
);
