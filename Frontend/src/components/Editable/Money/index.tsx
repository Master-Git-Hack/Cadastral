/** @format */
import { useState, forwardRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "../../Tooltip";
import { asFancyNumber } from "../../../utils/number";
import { MoneyProps } from "./money.interfaces";

import Skeleton from "@mui/material/Skeleton";
const NumberFormatCustom = forwardRef<NumberFormat<InputAttributes>, CustomProps>(
	function NumberFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={({ formattedValue, value, floatValue }) =>
					onChange({ value: floatValue ?? 0, label: value, formattedValue })
				}
				decimalScale={props.decimals}
				decimalSeparator="."
				thousandSeparator=", "
				prefix={"$ "}
				allowNegative={false}
				isAllowed={({ floatValue }) => floatValue ?? 0 <= 999_999_999_999.999}
			/>
		);
	},
);
export const Money = ({
	label,
	value,
	decimals,
	helpText,
	editing,
	loading,
	onChange,
	justifyContent,
	...props
}: MoneyProps) => {
	const [amount, setAmount] = useState({
		label: label ?? "Monto",
		value: value ?? 0,
		decimals: decimals ?? 3,
		helpText: helpText ?? "El valor debe ser un número",
	});
	const [formattedValue, setFormattedValue] = useState(
		asFancyNumber(amount.value, {
			isCurrency: true,
			decimals: amount.decimals,
		}),
	);
	useEffect(() => {
		value !== amount.value &&
			setAmount((currentState) => ({ ...currentState, value: value ?? 0 }));
	}, [value, amount]);
	return (
		<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
			{loading ? (
				<Skeleton variant="text" width={100} height={50} animation="wave" />
			) : editing ? (
				<Tooltip helpText={amount.helpText} placement="bottom">
					<TextField
						label={amount.label}
						InputProps={{
							inputComponent: NumberFormatCustom as any,
							inputProps: { decimals: amount.decimals },
						}}
						onChange={({ value, formattedValue }: any) => {
							onChange(value);
							setFormattedValue(formattedValue);
						}}
						{...props}
						focused
						margin="dense"
						fullWidth
					/>
				</Tooltip>
			) : (
				<p>{formattedValue}</p>
			)}
		</Stack>
	);
};
