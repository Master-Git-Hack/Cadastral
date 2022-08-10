/** @format */

import { Badge as Component } from "rsuite";
import { colorPicker } from "../../utils/color";
import { BadgeProps } from "./index.types";
export const Badge = ({ children, type, text }: BadgeProps): JSX.Element => (
	<Component color={colorPicker[type ?? "primary"]}>{children}</Component>
);
