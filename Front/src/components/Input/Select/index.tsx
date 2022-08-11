/** @format */
import { SelectPicker } from "rsuite";
import { Tooltip } from "../../Tooltip";
import { SelectProps, Item } from "./index.types";
export const Normal = ({
	index,
	className,
	label,
	defaultValue,
	data,
	onChange,
	value,
}: SelectProps): JSX.Element => {
	const id = `select component for ${label ?? "select"} ${index}`;

	const current = defaultValue.label ?? defaultValue.value ?? 0;
	return (
		<div className="d-flex d-flex-row">
			<label htmlFor={id} className="invisible disabled">
				{label}
			</label>
			<Tooltip id={id} tooltip={current}>
				<select
					id={id}
					onChange={onChange}
					defaultValue={current}
					value={value}
					className={`form-select form-select-sm mx-auto ${className}`}
				>
					{data.map((item: Item, indx: number) => (
						<option
							key={`option for select component ${label} ${index} ${indx}`}
							className="bg-light"
							value={item.value ?? index}
						>
							{item.label}
						</option>
					))}
				</select>
			</Tooltip>
		</div>
	);
};
export const Custom = ({
	label,
	labelKey,
	valueKey,
	defaultValue,
	data,
	placement,
	block,
	onSelect,
	size,
	value,
}: SelectProps): JSX.Element => (
	<SelectPicker
		label={label}
		labelKey={labelKey}
		valueKey={valueKey}
		defaultValue={defaultValue}
		data={data}
		placement={placement}
		block={block}
		onSelect={onSelect}
		searchable
		virtualized
		size={size}
		value={value}
	/>
);
export const Select = {
	Normal,
	Custom,
};
