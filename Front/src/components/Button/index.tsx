/** @format */

import { Button as Component } from "rsuite";
import { ButtonProps } from "./index.types";
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
