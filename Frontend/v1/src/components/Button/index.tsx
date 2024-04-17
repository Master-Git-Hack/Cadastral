/** @format */

import { Button as Component } from "rsuite";
import { ButtonProps, SaveProps } from "./button.types";
import { colorPicker, appearancePicker } from "../../utils/color";
export const Button = ({
	children,
	type,
	appearance,
	block,
	href,
	loading,
	size,
	onClick,
}: ButtonProps): JSX.Element => (
	<Component
		color={colorPicker[type ?? "primary"]}
		appearance={appearancePicker[appearance ?? "default"]}
		block={block}
		href={href}
		loading={loading}
		size={size}
		onClick={onClick}
	>
		{children}
	</Component>
);
export const Success = ({
	children,
	appearance,
	block,
	loading,
	size,
	onClick,
}: ButtonProps): JSX.Element => (
	<Component
		color={colorPicker["success"]}
		appearance={appearancePicker[appearance ?? "default"]}
		block={block}
		loading={loading}
		size={size}
		onClick={onClick}
	>
		{children}
	</Component>
);
export const Danger = ({
	children,
	appearance,
	block,
	loading,
	size,
	onClick,
}: ButtonProps): JSX.Element => (
	<Component
		color={colorPicker["danger"]}
		appearance={appearancePicker[appearance ?? "link"]}
		block={block}
		loading={loading}
		size={size}
		onClick={onClick}
	>
		{children}
	</Component>
);
export const Save = ({
	appearance,
	block,
	loading,
	size,
	onClick,
	status,
}: SaveProps): JSX.Element => (
	<Component
		color={colorPicker["success"]}
		appearance={appearancePicker[appearance ?? "primary"]}
		block={block}
		loading={loading}
		size={size}
		onClick={onClick}
	>
		{status.includes("newOne") ? "Guardar" : "Actualizar"}
	</Component>
);
