/** @format */
import { useState } from "react";
import { Input as Component, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { TextProps } from "./input.types";
import { Fancy } from "./Fancy";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { InputRange } from "./Range";
import { File } from "./File";
import { EnabledInputNumber } from "./EnabledNumber";
import { InputNumber } from "./Number";

export const Text = ({
	isArea,
	onChange,
	type,
	placeholder,
	size,
	rows,
	value,
	disabled,
}: TextProps): JSX.Element => {
	const [visible, setVisible] = useState(false);

	return (
		<InputGroup inside size={size}>
			<Component
				value={value}
				size={size}
				as={isArea ? "textarea" : undefined}
				onChange={(value: string, event: any) => onChange(value)}
				type={type?.includes("password") ? (visible ? "text" : "password") : type}
				rows={rows ?? 1}
				placeholder={placeholder}
				disabled={disabled}
			/>
			{type?.includes("password") && (
				<>
					<InputGroup.Button onClick={() => setVisible(!visible)}>
						{visible ? <EyeIcon /> : <EyeSlashIcon />}
					</InputGroup.Button>
				</>
			)}
		</InputGroup>
	);
};

export const Input = {
	Text,
	Fancy,
	File,
	InputRange,
	Select,
	Switch,
	EnabledInputNumber,
	InputNumber,
};
