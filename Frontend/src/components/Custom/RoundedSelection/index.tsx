/** @format */

import { Dropdown } from "../../Dropdown";
import { RoundedSelectionProps } from "./roundedSelection.types";
const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];
const activeKey = (item: number) => options[item];
export const RoundedSelection = ({
	currentItem,
	onSelect,
	disabled,
}: RoundedSelectionProps): JSX.Element => (
	<div>
		<Dropdown
			items={options}
			trigger="click"
			activeKey={activeKey(currentItem + 1)}
			title={`Redondeo: ${activeKey(currentItem + 1)}`}
			onSelect={(eventKey: string, event: any) =>
				onSelect(options.findIndex((option) => option === eventKey) - 1)
			}
			disabled={disabled}
			placement="rightStart"
		/>
	</div>
);
