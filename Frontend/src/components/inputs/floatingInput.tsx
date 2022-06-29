/** @format */
import { FloatingLabel, Form } from "react-bootstrap";
import { FC, useState, ChangeEventHandler } from "react";
export const FloatingInput: FC<{
	index: number;
	name: string;
	tag: string;
	type: string;
	value: number;
	valueToShow: any;
	onChange: ChangeEventHandler<HTMLInputElement>;
	minWidth?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	step?: number;
	classNames?: string;
}> = (props) => {
	const id = `floating-input-${props.name} ${props.index}`;
	const [isEditing, setIsEditing] = useState(false);
	const toggleEditing = () => setIsEditing(!isEditing);
	return (
		<div
			className={props.classNames}
			style={{ minWidth: props.minWidth !== undefined ? props.minWidth : "100%" }}
		>
			<FloatingLabel
				controlId={id}
				label={
					<>
						{`${props.tag}: `}
						<strong>{props.valueToShow}</strong>
					</>
				}
				className="p-1"
			>
				{isEditing ? (
					<Form.Control
						{...props}
						placeholder={props.tag}
						onBlur={toggleEditing}
						autoFocus
					/>
				) : (
					<Form.Control
						placeholder={props.tag}
						onFocus={toggleEditing}
						readOnly
						className="bg-light"
					/>
				)}
			</FloatingLabel>
		</div>
	);
};
