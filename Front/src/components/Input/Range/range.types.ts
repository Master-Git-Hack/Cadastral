/** @format */

export interface RangeProps {
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	progress?: boolean;
}
