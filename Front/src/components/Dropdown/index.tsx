/** @format */

import { Dropdown as Component, ButtonToolbar } from "rsuite";
import { DropdownProps } from "./dropdown.types";
import { colorPicker, appearancePicker } from "../../utils/color";
export const Dropdown = ({
	items,
	trigger,
	placement,
	activeKey,
	title,
	onSelect,
	size,
	type,
	appearance,
}: DropdownProps): JSX.Element => (
	<ButtonToolbar>
		<Component
			title={title}
			trigger={trigger ?? ["click", "hover"]}
			placement={placement}
			onSelect={onSelect}
			color={type ? colorPicker[type] : undefined}
			appearance={appearance ? appearancePicker[appearance] : undefined}
			toggleAs={undefined}
		>
			{items.map((item: string, index: number) => (
				<Component.Item
					key={`dropdown component for ${title} ${index}`}
					eventKey={item}
					active={item === activeKey}
				>
					{item}
				</Component.Item>
			))}
		</Component>
	</ButtonToolbar>
);
