/** @format */

import { EnabledNumberProps } from "./enabledNumber.types";
import { InputNumber } from "rsuite";
import { Switch } from "../Switch";
import { SyntheticEvent } from "react";
export const EnabledInputNumber = ({
	defaultValue,
	max,
	min,
	step,
	value,
	onChange,
	size,
	postfix,
	prefix,
	checked,
	setChecked,
}: EnabledNumberProps) => {
	const Check = () => (
		<Switch
			checked={checked}
			onChange={(checked: boolean) => setChecked(checked)}
			withText
			size={"sm"}
			uncheckedText="Con Número"
			checkedText="Sin Número"
		/>
	);
	return (
		<div className="d-flex justify-content-center">
			{checked ? (
				<>
					<Check />
				</>
			) : (
				<InputNumber
					prefix={prefix ?? <Check />}
					postfix={postfix}
					size={size ?? "md"}
					min={min}
					max={max}
					step={step}
					defaultValue={defaultValue}
					value={value}
					onChange={(
						value: number | string,
						event: SyntheticEvent<Element, Event>,
					): void => {
						onChange(Number(value));
					}}
				/>
			)}
		</div>
	);
};
