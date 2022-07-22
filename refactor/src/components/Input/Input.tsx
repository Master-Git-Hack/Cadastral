/** @format */

import { MouseEventHandler, useRef, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { asFancyNumber } from "../../utils/utils.number";
import { Tooltip } from "../Tooltip/Tooltip";
import { Button } from "../Button/Button";
import {
	AreaProps,
	FancyProps,
	FileProps,
	FloatingProps,
	RangeProps,
	SelectProps,
	SwitchProps,
} from "./Input.types";
import FileSaver from "file-saver";

export const Fancy = (props: FancyProps): JSX.Element => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const toggleEditing = (): void => setIsEditing(!isEditing);
	const id = `fancy input ${isEditing ? "editing" : "with decorator"} ${props.name} ${
		props.index
	}`;
	const max =
		props.isCurrency && !props.isPercentage
			? 999_999_999_999.99
			: !props.isCurrency && props.isPercentage
			? 100
			: 2;
	const step = props.isCurrency || props.isPercentage ? 1 : 0.01;

	const className = "form-control form-control-sm mx-auto";
	const isPercentage = props.isPercentage ?? false;
	const decoratedValue = asFancyNumber(props.value, {
		style: "decimal",
		isCurrency: props.isCurrency ?? false,
		isPercentage,
		decimals: props.decimals ?? !isPercentage ? 2 : 0,
	});
	const Label = () => (
		<label
			className="disabled invisible"
			style={{ width: 0 }}
			htmlFor={id}
			id={id + " label"}
		></label>
	);
	return (
		<div className={"d-flex d-flex-row"}>
			<Label />
			{isEditing ? (
				<>
					<input
						type="number"
						className={`${className} text-start ${props.classNameEditing ?? ""}`}
						name={props.name}
						value={props.value}
						onChange={props.onChange}
						min={0}
						max={max}
						step={step}
						autoFocus={true}
						onBlur={toggleEditing}
					/>
				</>
			) : (
				<Tooltip id={id} placement="bottom" tooltip={decoratedValue}>
					<input
						type="text"
						className={`${className}  ${props.classNameDecorator ?? "bg-light"}`}
						value={decoratedValue}
						onFocus={toggleEditing}
						readOnly
					/>
				</Tooltip>
			)}
		</div>
	);
};

export const Floating = (props: FloatingProps): JSX.Element => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const toggleEditing = (): void => setIsEditing(!isEditing);
	const id = `floating input ${props.name} ${props.index}`;
	const inputProperties = () => {
		const { type, value, onChange, maxLength, min, max, step } = props;
		return { type, value, onChange, maxLength, min, max, step };
	};
	const Label = () => <>{`${props.tag}: ${(<strong>{props.valueToShow}</strong>)}`}</>;
	return (
		<div className={props.className ?? ""} style={{ minWidth: props.minWidth ?? "100%" }}>
			<FloatingLabel controlId={id} label={<Label />} className="p-1">
				{isEditing ? (
					<Form.Control
						{...inputProperties}
						placeholder={props.tag}
						onBlur={toggleEditing}
						autoFocus
					/>
				) : (
					<Form.Control
						value={props.value}
						placeholder={props.tag}
						onFocus={toggleEditing}
						className="bg-light"
						autoFocus
					/>
				)}
			</FloatingLabel>
		</div>
	);
};
export const Select = (props: SelectProps): JSX.Element => {
	const { index, name, onChange, current, options, className } = props;
	const id = `select component for ${name} ${index}`;
	return (
		<div className="d-flex d-flex-row">
			<label htmlFor={id} className="invisible disabled" />
			<Tooltip id={id} placement="bottom" tooltip={current.name ?? current.type}>
				<select
					id={id}
					name={name}
					onChange={onChange}
					defaultValue={current.type}
					className={`form-select form-select-sm mx-auto ${className}`}
				>
					{options.map((option: any, indx: number) => (
						<option
							key={`option for select component ${name} ${index} ${indx}`}
							className="bg-light"
							value={option.type}
						>
							{option.type}
						</option>
					))}
				</select>
			</Tooltip>
		</div>
	);
};
export const Switch = (props: SwitchProps): JSX.Element => {
	const { index, type, name, label, inline, onChange, checked, className } = props;
	const id = `switch/checkbox for component ${name} ${index}`;
	const checkProps = {
		id,
		type: type ?? "switch",
		name,
		label,
		checked,
		inline,
		onChange,
	};

	return (
		<div className={className}>
			<Form.Check {...checkProps} />
		</div>
	);
};
export const Range = (props: RangeProps): JSX.Element => {
	const { index, name, label, value, onChange, className, disabled } = props;
	const id = `range for component ${name} ${index}`;
	return (
		<div className={className ?? "text-center"}>
			<Tooltip id={id} placement="bottom" tooltip={value}>
				<Form.Label htmlFor={id}>
					{label ?? `Valor Actual: ${(<strong>{value}</strong>)}`}
				</Form.Label>
				<Form.Range id={id} onChange={onChange} value={value} disabled={disabled} />
			</Tooltip>
		</div>
	);
};
export const Area = (props: AreaProps): JSX.Element => {
	const { index, name, label, rows, value, onChange, className } = props;
	const id = `area for component ${name} ${index}`;
	return (
		<div className={`${className} form-group d-flex d-flex-row`}>
			<label htmlFor={id} className="form-label my-auto me-1">
				{label}
			</label>
			<textarea
				id={id}
				name={name}
				rows={rows ?? 2}
				value={value}
				onChange={onChange}
				className="form-control"
			/>
		</div>
	);
};
export const File = (props: FileProps): JSX.Element => {
	const ref = useRef<HTMLInputElement>(null);
	const { index, name, label, filename, value, onChange, className, remove } = props;
	const id = `file for component ${name} ${index}`;
	const handleRemove = (): MouseEventHandler<HTMLButtonElement> => {
		if (ref.current) {
			ref.current.value = "";
		}
		return remove;
	};
	return (
		<div className={`input-group input-group-sm ${className}`}>
			<label htmlFor={id} className="invisible disabled">
				{label}
			</label>
			<input
				ref={ref}
				id={id}
				type="file"
				className="form-control form-control-sm"
				value={value}
				onChange={onChange}
				disabled={value !== null}
			/>
			{value && (
				<>
					<Button
						text={"Descargar"}
						type={"success"}
						onClick={() => FileSaver.saveAs(value, filename)}
					/>
					<Button text={"Eliminar"} type={"danger"} outline onClick={handleRemove} />
				</>
			)}
		</div>
	);
};

export const Input = { Fancy, Floating, Select, Switch, Range, Area, File };
