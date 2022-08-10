/** @format */

import { useState, useEffect } from "react";
import { Toggle } from "rsuite";
import { SwitchProps } from "./index.types";

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
		<>
			{reverse && label}
			<Toggle
				checked={checked}
				checkedChildren={withText ? checkedText : ""}
				unCheckedChildren={withText ? uncheckedText : ""}
				loading={loading}
				onChange={(value: boolean, event: any) => {
					setLoading(true);
					return onChange(value);
				}}
				size={size}
			/>
			{!reverse && label}
		</>
	);
};
