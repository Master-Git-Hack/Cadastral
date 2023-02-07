/** @format */

import { Box, FormControlLabel, Switch as MuiSwitch } from "@mui/material";

export const Switch = ({
	checked,
	onChange,
	size,
	withText,
	uncheckedText,
	checkedText,
	...props
}) => {
	withText = withText ?? false;
	checkedText = checkedText ?? "Deshabilitar";
	uncheckedText = uncheckedText ?? "Habilitar";
	const defaultText = withText ? (checked ? checkedText : uncheckedText) : "";
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap" }}>
			{withText ? (
				<FormControlLabel
					checked={checked}
					control={<MuiSwitch size={size} />}
					onChange={({ target: { checked } }) => onChange(checked)}
					{...props}
					label={defaultText}
				/>
			) : (
				<MuiSwitch
					checked={checked}
					size={size}
					onChange={({ target: { checked } }) => onChange(checked)}
				/>
			)}
		</Box>
	);
};
