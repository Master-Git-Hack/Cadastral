/** @format */

import { Button as Component } from "rsuite";
import type { ButtonProps, SaveProps } from "./button.types";
import { colorPicker, appearancePicker } from "../../utils/color";
import { ReactNode } from "react";
export const Button = ({
	children,
	type,
	appearance,
	block,
	href,
	loading,
	size,
	onClick,
	...props
}: ButtonProps) => (
	<Component
		color={colorPicker[type ?? "primary"]}
		appearance={appearancePicker[appearance ?? "default"]}
		block={block}
		href={href}
		loading={loading}
		size={size}
		onClick={onClick}
		{...props}
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
}: ButtonProps) => (
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
}: ButtonProps) => (
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
}: SaveProps) => (
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
