/** @format */

import { Slider } from "rsuite";
import { RangeProps } from "./range.types";
export const Range = ({
	defaultValue,
	onChange,
	min,
	max,
	step,
	progress,
}: RangeProps): JSX.Element => (
	<Slider
		defaultValue={defaultValue ?? 0}
		onChange={onChange}
		progress={progress}
		min={min ?? 0}
		max={max ?? 100}
		step={step ?? 1}
		tooltip
	/>
);
