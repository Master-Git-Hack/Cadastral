/** @format */

import { useEffect } from "react";
import { InputNumber as Component, InputGroup } from "rsuite";
import { NumberProps } from "./number.types";
import { v4 as uuidv4 } from "uuid";
export const InputNumber = ({
	defaultValue,
	disabled,
	max,
	min,
	step,
	value,
	onChange,
	size,
	...props
}: NumberProps) => {
	const currentStep = step ?? 1;
	const currentMin = min ?? -999_999_999_999;
	const currentMax = max ?? 999_999_999_999;
	const handleMinus = () =>
		onChange(value - currentStep >= currentMin ? value - currentStep : value);
	const handlePlus = () =>
		onChange(value + currentStep <= currentMax ? value + currentStep : value);
	const id = `custom-input-number ${props?.id ?? uuidv4()}`;
	useEffect(() => {
		const buttons = document.getElementsByClassName("rs-input-number-btn-group-vertical");
		//buttons.item(0)?.replaceChildren();
		buttons[0].parentNode?.removeChild(buttons[0]);
		const input = document.getElementById(id);
		input?.setAttribute("style", "text-align: center;");
	}, []);
	return (
		<InputGroup size={size} disabled={disabled} style={{ minWidth: 250 }}>
			<InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
			<Component
				id={id}
				defaultValue={defaultValue}
				disabled={disabled}
				max={max}
				min={min}
				step={step}
				value={value as number}
				onChange={(current: number | string, event: any): void => onChange(Number(current))}
				size={size}
				scrollable
			/>
			<InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
		</InputGroup>
	);
};
