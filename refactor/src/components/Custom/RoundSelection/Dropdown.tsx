/** @format */
import { Dropdown as Component } from "../../Dropdown/Dropdown";
import { DropdownProps } from "./Dropdown.types";
export const Dropdown = (props: DropdownProps) => {
	const { name, currentItem, onClick } = props;
	const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];
	return (
		<Component
			name={name}
			btnText={`Redondeo: ${options[currentItem]}`}
			btnType="link"
			currentItem={currentItem}
			options={options}
			onClick={onClick}
		/>
	);
};
