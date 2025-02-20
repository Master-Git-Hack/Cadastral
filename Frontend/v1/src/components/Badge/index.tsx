/** @format */

import { Badge as Component } from "rsuite";
import { colorPicker } from "../../utils/color";
import { BadgeProps } from "./badge.types";
import { ReactNode } from "react";
export const Badge = ({ children, type, text }: BadgeProps) => (
	<div>
		<Component
			color={colorPicker[type ?? "primary"]}
			content={<div className="my-auto">{text}</div>}
		>
			{children}
		</Component>
	</div>
);
