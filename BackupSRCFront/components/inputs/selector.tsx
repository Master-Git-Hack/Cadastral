/** @format */

import { FC, ChangeEventHandler } from "react";
export const Selector: FC<{
	id: number;
	name: string;
	subject: any;
	selector: any;
	onChange: ChangeEventHandler<HTMLSelectElement>;
	style?: string;
}> = (props) => (
	<select
		key={props.id}
		id={`selector-${props.name}-${props.id}`}
		name={props.name}
		className={`form-select form-select-sm mx-auto ${props.style}`}
		value={props.subject.type}
		onChange={props.onChange}
	>
		{props.selector.map((option: any, index: number) => (
			<option
				id={`selector-${props.name}-${props.id}-option-${option.value}-${index}`}
				key={`selector-${props.name}-${props.id}-option-${option.value}-${index}`}
				value={option.type}
				className="bg-light"
			>
				{option.type}
			</option>
		))}
	</select>
);
