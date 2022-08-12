/** @format */

import { Dropdown } from "../../Dropdown";
import { RoundedSelectionProps } from "./roundedSelection.types";
const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];
const activeKey = (item: number) => options[item];
export const RoundedSelection = ({ currentItem, onSelect }: RoundedSelectionProps): JSX.Element => (
	<Dropdown
		items={options}
		activeKey={activeKey(currentItem + 1)}
		title={`Redondeo: ${activeKey(currentItem + 1)}`}
		onSelect={(eventKey: string, event: any) =>
			onSelect(options.findIndex((option) => option === eventKey) - 1)
		}
	/>
);
