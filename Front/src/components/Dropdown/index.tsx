/** @format */

import { Dropdown as Component } from "rsuite";
import { DropdownProps } from "./index.types";
export const Dropdown = ({
	items,
	trigger,
	placement,
	activeKey,
	title,
	onSelect,
	size,
}: DropdownProps): JSX.Element => (
	<Component
		title={title}
		trigger={trigger ?? ["click", "hover"]}
		placement={placement}
		onSelect={onSelect}
		size={size}
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
);
