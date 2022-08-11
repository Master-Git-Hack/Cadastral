/** @format */
import { useState } from "react";
import { Input as Component, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { TextProps } from "./index.types";
import { Fancy } from "./Fancy";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { Range } from "./Range";
import { File } from "./File";

export const Text = ({
	isArea,
	onChange,
	type,
	placeholder,
	size,
	rows,
	value,
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
	Range,
	Select,
	Switch,
};
