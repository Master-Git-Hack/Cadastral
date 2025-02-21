/** @format */

import { Slider } from "rsuite";
import type { RangeProps } from "./range.types";
export const InputRange = ({
	defaultValue,
	onChange,
	min,
	max,
	step,
	progress,
	value,
	customTooltip,
}: RangeProps) => (
	<Slider
		defaultValue={defaultValue ?? 0}
		value={value}
		onChange={onChange}
		progress={progress}
		min={min ?? 0}
		max={max ?? 100}
		step={step ?? 1}
		tooltip
		renderTooltip={(value: number | undefined) =>
			customTooltip && customTooltip(Number(value ?? 0))
		}
	/>
);
