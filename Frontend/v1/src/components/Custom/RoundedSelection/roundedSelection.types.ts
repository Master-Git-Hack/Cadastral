/** @format */
export interface RoundedSelectionProps {
	currentItem: number;
	disabled?: boolean;
	onSelect: (currentItem: number) => void;
	placement?:
		| "bottomStart"
		| "bottomEnd"
		| "topStart"
		| "topEnd"
		| "leftStart"
		| "leftEnd"
		| "rightStart"
		| "rightEnd"
		| undefined;
}
