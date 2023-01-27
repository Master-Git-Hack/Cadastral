/** @format */
import React from "react";
import { TooltipProps } from "./tooltip.interfaces";
import { Tooltip as MuiToolTip } from "@mui/material";
import Box from "@mui/material/Box";

export const Tooltip = ({ children, sx, placement, helpText }: TooltipProps) => (
	<Box sx={sx}>
		<MuiToolTip title={helpText} placement={placement}>
			{children}
		</MuiToolTip>
	</Box>
);
export default Tooltip;
