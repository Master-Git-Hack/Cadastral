/** @format */
import { Button, SelectPicker } from "rsuite";
import { SelectProps, Item } from "./select.types";
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

	return (
		<div className="d-flex flex-fill justify-content-center rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-cleanable">
			<label htmlFor={id} className="invisible disabled visually-hidden">
				{label}
			</label>

			<select
				id={id}
				onChange={onChange}
				defaultValue={defaultValue}
				value={value}
				className={`form-select form-select-sm mx-auto ${className}`}
			>
				{data.map((item: Item, indx: number) => (
					<option
						key={`option for select component ${label} ${index} ${indx}`}
						className="bg-light"
						value={(item.value as any) ?? index}
					>
						{item.label}
					</option>
				))}
			</select>
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
	searchable,
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
		searchable={searchable ?? true}
		virtualized
		size={size}
		value={value}
		cleanable={false}
	/>
);
export const Select = {
	Normal,
	Custom,
};
