/** @format */

import { FC, Fragment, useState, ChangeEventHandler } from "react";
import { toFancyNumber } from "../../utils/utils";
import { TooltipComponent } from "../tooltip/tooltip";
export const FancyInput: FC<{
	index: number;
	name: string;
	value: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	isCurrency?: boolean;
	isPercentage?: boolean;
	style?: string;
}> = (props) => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEditing = () => setIsEditing(!isEditing);
	return (
		<Fragment>
			{isEditing ? (
				<input
					id={`fancyInput-editing-${props.name}-${props.index}`}
					type="number"
					className="form-control form-control-sm text-start mx-auto"
					name={props.name}
					value={props.value}
					onChange={props.onChange}
					min={0}
					max={
						props.isCurrency && !props.isPercentage
							? 999_999_999_999.99
							: !props.isCurrency && props.isPercentage
							? 100
							: 2
					}
					step={props.isCurrency || props.isPercentage ? 1 : 0.01}
					autoFocus
					onBlur={toggleEditing}
				/>
			) : (
				<TooltipComponent
					id={`fancyInput-displayed-${props.name}-${props.index}`}
					placement="bottom"
					tooltip={toFancyNumber(props.value, props.isCurrency, props.isPercentage, 2)}
					component={
						<input
							id={`fancyInput-displayed-${props.name}-${props.index}`}
							type="string"
							className={`form-control form-control-sm mx-auto bg-light ${
								props.style !== undefined ? props.style : "text-start"
							}`}
							name={`displayed-${props.name}-${props.index}`}
							value={toFancyNumber(
								props.value,
								props.isCurrency,
								props.isPercentage,
								2,
							)}
							onFocus={toggleEditing}
							readOnly
						/>
					}
				/>
			)}
		</Fragment>
	);
};
