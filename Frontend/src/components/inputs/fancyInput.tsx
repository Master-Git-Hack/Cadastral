/** @format */

import { FC, Fragment, useState, ChangeEventHandler } from "react";
import { toFancyNumber } from "../../utils/utils";
import ReactTooltip from "react-tooltip";

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
				<Fragment>
					<input
						id={`fancyInput-displayed-${props.name}-${props.index}`}
						type="string"
						className={`form-control form-control-sm mx-auto ${
							props.style !== undefined ? props.style : "text-start"
						}`}
						name={`displayed-${props.name}-${props.index}`}
						value={toFancyNumber(props.value, props.isCurrency, props.isPercentage, 2)}
						onFocus={toggleEditing}
						readOnly
						data-tip
						data-for={`fancyInput-displayed-${props.name}-${props.index}`}
					/>
					<ReactTooltip
						id={`fancyInput-displayed-${props.name}-${props.index}`}
						place="bottom"
						type="light"
						effect="solid"
					>
						<span>
							{toFancyNumber(props.value, props.isCurrency, props.isPercentage, 2)}
						</span>
					</ReactTooltip>
				</Fragment>
			)}
		</Fragment>
	);
};
