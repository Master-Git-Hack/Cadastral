/** @format */

import { Dropdown } from "../../Dropdown";
import { RoundedSelectionProps } from "./roundedSelection.types";
const options = [
	"Sin Redondeo",
	"Unidad ----------- (1x10^0)",
	"Decena ----------- (1x10^1)",
	"Centena ---------- (1x10^2)",
	"Unidad de Millar -- (1x10^3)",
	"Decena de Millar -- (1x10^4)",
	"Centena de Millar - (1x10^5)",
	"Unidad de Millón -- (1x10^6)",
	"Decena de Millón -- (1x10^7)",
	"Centena de Millón - (1x10^8)",
];
const activeKey = (item: number) => options[item];
export const RoundedSelection = ({
	currentItem,
	onSelect,
	disabled,
	placement,
}: RoundedSelectionProps): JSX.Element => (
	<div>
		<Dropdown
			items={options}
			trigger="click"
			activeKey={activeKey(currentItem + 1)}
			title={`Redondeo: A la ${activeKey(currentItem + 1).split("-")[0]}`}
			onSelect={(eventKey: string, event: any) =>
				onSelect(options.findIndex((option) => option === eventKey) - 1)
			}
			disabled={disabled}
			placement={placement ?? "rightStart"}
		/>
	</div>
);
