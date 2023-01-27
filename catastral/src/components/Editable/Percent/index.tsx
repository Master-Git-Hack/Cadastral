/** @format */
import { useState, forwardRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "../../Tooltip";
import { asFancyNumber } from "../../../utils/number";
import { PercentProps } from "./percent.interfaces";

import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
const NumberFormatCustom = forwardRef<NumberFormat<InputAttributes>, CustomProps>(
	function NumberFormatCustom({ onChange, ...props }, ref) {
		return (
			<NumericFormat
				{...props}
				getInputRef={ref}
				onValueChange={({ formattedValue, value, floatValue }) =>
					onChange({ value: (floatValue ?? 0) / 100 ?? 0, formattedValue })
				}
				decimalScale={props.decimals}
				decimalSeparator="."
				suffix={" %"}
				allowNegative={false}
				isAllowed={({ floatValue }) => floatValue ?? 0 <= 100}
			/>
		);
	},
);
export const Percent = ({
	label,
	value,
	helpText,
	decimals,
	onChange,
	loading,
	editing,
	justifyContent,
	...props
}: PercentProps) => {
	const [percent, setPercent] = useState({
		label: label ?? "Porcentaje",
		value: value * 100 ?? 0,
		decimals: decimals ?? 2,
		helpText: helpText ?? "El valor debe ser un número",
	});
	const [formattedValue, setFormattedValue] = useState(
		asFancyNumber(percent.value, {
			isPercentage: true,
			decimals: percent.decimals,
		}),
	);
	useEffect(() => {
		value !== percent.value &&
			setPercent((currentState) => ({ ...currentState, value: value * 100 ?? 0 }));
	}, [value, percent]);
	return (
		<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
			{loading ? (
				<Skeleton variant="text" width={100} height={50} animation="wave" />
			) : editing ? (
				<Tooltip helpText={percent.helpText} placement="bottom">
					<TextField
						label={percent.label}
						InputProps={{
							inputComponent: NumberFormatCustom as any,
							inputProps: { decimals: percent.decimals },
						}}
						onChange={({ value, formattedValue }: any) => {
							onChange(value);
							setFormattedValue(formattedValue);
						}}
						{...props}
						focused
						fullWidth
						margin="dense"
					/>
				</Tooltip>
			) : (
				<p>{formattedValue}</p>
			)}
		</Stack>
	);
};
