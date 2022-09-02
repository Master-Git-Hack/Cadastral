/** @format */

import { useState } from "react";
import { asFancyNumber } from "../../../utils/number";
import { Tooltip } from "../../Tooltip";
import { FancyProps } from "./fancy.types";

export const Fancy = ({
	index,
	name,
	label,
	className,
	value,
	isCurrency,
	isPercentage,
	classNameEditing,
	classNameDecorator,
	onChange,
	decimals,
}: FancyProps): JSX.Element => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const toggleEditing = (): void => setIsEditing(!isEditing);
	const id = `fancy input ${isEditing ? "editing" : "with decorator"} ${name} ${index}`;
	const max =
		isCurrency && !isPercentage ? 999_999_999_999.99 : !isCurrency && isPercentage ? 100 : 2;
	const step = isCurrency || isPercentage ? 1 : 0.01;
	const decoratedValue = asFancyNumber(value, {
		style: "decimal",
		isCurrency: isCurrency ?? false,
		isPercentage,
		decimals: decimals ?? !isPercentage ? 2 : 0,
	});
	const Label = () => (
		<label className="disabled invisible" style={{ width: 0 }} htmlFor={id} id={id + " label"}>
			{label}
		</label>
	);
	return (
		<div className={"d-flex justify-content-center flex-fill"}>
			<Label />
			{isEditing ? (
				<>
					<input
						id={id}
						type="number"
						className={`rs-input mx-auto text-start ${classNameEditing ?? ""}`}
						name={name}
						value={value}
						onChange={onChange}
						min={0}
						max={max}
						step={step}
						autoFocus={true}
						onBlur={toggleEditing}
					/>
				</>
			) : (
				<Tooltip id={id} tooltip={decoratedValue}>
					<input
						id={id}
						type="text"
						className={`rs-input text-center mx-auto ${
							classNameDecorator ?? "bg-light"
						}`}
						value={decoratedValue}
						onFocus={toggleEditing}
						readOnly
					/>
				</Tooltip>
			)}
		</div>
	);
};
