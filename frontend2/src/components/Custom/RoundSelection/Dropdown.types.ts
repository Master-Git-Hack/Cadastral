/** @format */

export interface DropdownProps {
	name: string;
	currentItem: number;
	onClick: (option: string, index: number) => void;
}
