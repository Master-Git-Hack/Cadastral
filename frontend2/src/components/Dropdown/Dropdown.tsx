/** @format */
import { ButtonGroup, Dropdown as Component } from "react-bootstrap";
import { DropdownProps } from "./Dropdown.types";

export const Dropdown = (props: DropdownProps): JSX.Element => {
	const { index, name, btnText, btnType, btnStyle, options, currentItem, menuStyle, onClick } =
		props;
	return (
		<Component as={ButtonGroup} focusFirstItemOnShow="keyboard">
			<Component.Toggle
				variant={btnType ?? "link"}
				id={`Component for component ${index} ${name}`}
				className={btnStyle ?? ""}
			>
				{btnText ?? "Seleccione"}
			</Component.Toggle>
			<Component.Menu className={menuStyle ?? ""}>
				{options.map((option: string, id: number) => (
					<Component.Item
						key={`Component menu for component ${index} ${name} ${id}`}
						eventKey={currentItem}
						active={(currentItem === id || currentItem === option) ?? false}
						onClick={() => onClick(option, id)}
					>
						{option}
					</Component.Item>
				))}
			</Component.Menu>
		</Component>
	);
};
