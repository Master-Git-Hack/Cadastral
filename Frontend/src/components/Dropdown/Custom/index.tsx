/** @format */

import { Dropdown as Component, Popover, Whisper, IconButton, ButtonGroup } from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import { DropdownProps } from "./dropdown.types";
import { colorPicker, appearancePicker } from "../../../utils/color";
import { Button } from "../../Button";
export const Dropdown = ({
	items,
	children,
	trigger,
	placement,
	title,
	onSelect,
	type,
	appearance,
	btnSize,
}: DropdownProps): JSX.Element => (
	<Whisper
		placement={placement}
		trigger={trigger ?? ["click", "hover"]}
		speaker={({ onClose, left, top, className }, ref) => {
			const handleSelect = (eventKey: any) => {
				onClose();
				onSelect(eventKey);
			};
			return (
				<Popover ref={ref} className={className} style={{ left, top }}>
					<Component.Menu onSelect={handleSelect}>
						{children ?? (
							<>
								{items &&
									items.map((item: string, index: number) => (
										<Component.Item
											key={`dropdown menu item ${index}`}
											eventKey={index}
										>
											{item}
										</Component.Item>
									))}
							</>
						)}
					</Component.Menu>
				</Popover>
			);
		}}
	>
		<ButtonGroup>
			<Button type={type} appearance={appearance ?? "link"} size={btnSize}>
				{title}
			</Button>

			<IconButton
				color={colorPicker[type ?? "primary"]}
				appearance={appearancePicker[appearance ?? "link"]}
				icon={<ArrowDownIcon />}
				size={btnSize}
			/>
		</ButtonGroup>
	</Whisper>
);
