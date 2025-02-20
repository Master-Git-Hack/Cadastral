/** @format */

import { Custom } from "../../Input/Select";
import { SelectUnitProps } from "./selectedUnit.types";
const options = [
	{ label: "m2", value: "m2" },
	{ label: "m3", value: "m3" },
	{ label: "ml", value: "ml" },
	{ label: "lote", value: "lote" },
	{ label: "pza", value: "pza" },
];

export const SelectUnit = ({ currentItem, onSelect }: SelectUnitProps) => (
	<Custom
		block
		data={options.map((option) => ({
			label: option.label,
			value: <span>{option.value}</span>,
		}))}
		placement="autoHorizontalStart"
		value={currentItem}
		onSelect={(eventKey: string, event: any) => onSelect(eventKey)}
		size="lg"
	/>
);
