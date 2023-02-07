/** @format */

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "../Tooltip";
import { ChipProps } from "./interfaces";
import { Stack, Skeleton, Chip as Component } from "@mui/material";
export const Chip = ({
	children,
	helpText,
	successful,
	loading,
	justifyContent,
	...props
}: ChipProps) => (
	<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
		{loading ? (
			<Skeleton variant="circular" width={25} height={25} animation="wave" />
		) : (
			<Tooltip helpText={helpText}>
				<Component
					label={children}
					{...props}
					deleteIcon={
						successful !== undefined ? (
							successful ? (
								<DoneIcon />
							) : (
								<ClearIcon />
							)
						) : undefined
					}
				/>
			</Tooltip>
		)}
	</Stack>
);
