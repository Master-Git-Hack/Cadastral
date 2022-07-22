/** @format */

import { ButtonGroup, Dropdown } from "react-bootstrap";
export const DropdownComponent = (props: {
	index?: number;
	name: string;
	btnText?: string;
	options: Array<any>;
	btnType?: string;
	itemSelected?: number;
	menuStyle?: string;
	dropdownStyle?: string;

	onClick: (option: any, index: number) => void;
}) => {
	const {
		index,
		name,
		btnText,
		options,
		btnType,
		menuStyle,
		onClick,
		dropdownStyle,
		itemSelected,
	} = props;
	return (
		<Dropdown as={ButtonGroup} d>
			<Dropdown.Toggle
				variant={btnType !== undefined ? btnType : "primary"}
				id={`dropdown for component ${index} ${name}`}
				className={`dropdown-toggle ${dropdownStyle}`}
			>
				{btnText !== undefined ? btnText : "Seleccione"}
			</Dropdown.Toggle>
			<Dropdown.Menu className={menuStyle !== undefined ? menuStyle : ""}>
				{options.map((option: any, id: number) => (
					<Dropdown.Item
						key={`dropdown menu for component ${index} ${name} ${id}`}
						eventKey={id}
						active={itemSelected !== undefined && itemSelected === id}
						onClick={() => onClick(option, id)}
					>
						{option}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
