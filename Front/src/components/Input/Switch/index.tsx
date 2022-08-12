/** @format */

import { useState, useEffect } from "react";
import { Toggle } from "rsuite";
import { SwitchProps } from "./switch.types";

export const Switch = ({
	checked,
	onChange,
	label,
	withText,
	checkedText,
	uncheckedText,
	size,
	reverse,
}: SwitchProps) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		loading &&
			setTimeout(() => {
				setLoading(false);
			}, 1000);
	}, [loading]);
	return (
		<div className="d-flex my-auto">
			<span className="me-2 ">{reverse && label}</span>
			<Toggle
				checked={checked}
				checkedChildren={withText ? checkedText ?? "Habilitar" : ""}
				unCheckedChildren={withText ? uncheckedText ?? "Desabilitar" : ""}
				loading={loading}
				onChange={(value: boolean, event: any) => {
					setLoading(true);
					onChange(value);
				}}
				size={size}
			/>
			<span className="ms-2 ">{!reverse && label}</span>
		</div>
	);
};
