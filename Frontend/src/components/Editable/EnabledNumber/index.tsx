/** @format */

import { Switch } from "../../Switch";
import { Box, TextField, Stack } from "@mui/material";
import { useState } from "react";
import Tooltip from "../../Tooltip";
import Skeleton from "@mui/material/Skeleton";
import { EnabledNumberProps } from "./enabledNumber.interfaces";
export const EnabledNumber = ({
	value,
	defaultValue,
	checkedText,
	uncheckedText,
	editing,
	helpText,
	loading,
	justifyContent,
	...props
}: EnabledNumberProps) => {
	const [checked, setChecked] = useState(false);
	defaultValue = defaultValue ?? "N/A";
	return (
		<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
			{loading ? (
				<Skeleton variant="text" width={100} height={50} animation="wave" />
			) : (
				<Tooltip
					helpText={
						helpText ??
						`El valor por defecto es: ${defaultValue}, esto sino existe un valor`
					}
					placement="bottom"
				>
					{editing ? (
						<TextField
							InputProps={{
								startAdornment: (
									<Switch
										checked={checked}
										onChange={(value: boolean) => setChecked(value)}
										size="small"
										withText
										checkedText={checkedText}
										uncheckedText={uncheckedText}
									/>
								),
							}}
							{...props}
							onChange
							focused
							margin="dense"
							fullWidth
						/>
					) : (
						<p>{checked ? value ?? defaultValue : defaultValue}</p>
					)}
				</Tooltip>
			)}
		</Stack>
	);
};
