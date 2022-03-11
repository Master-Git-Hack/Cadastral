/** @format */

import { Selector } from "../../inputs/selector";
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import { toFancyNumber, searchByType } from "../../../utils/utils";
import { selector, setFactorsData, setFactorsSubject } from "../../../features/homologation/slice";
export const CommonTable: FC<{
	id: number;
	name: string;
	options: Array<any>;
}> = (props: any) => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(selector);
	const handleChange = (transaction: any, itemID: number, isSubject: boolean = false) => {
		transaction = searchByType(props.options, transaction);
		dispatch(
			isSubject
				? setFactorsSubject({
						itemName: props.name,
						value: transaction,
				  })
				: setFactorsData({
						itemID,
						itemName: props.name,
						value: {
							id: itemID + 1,
							...transaction,
							result: Number(subject.value / transaction.value),
						},
				  }),
		);
	};
	const subject = factors[props.name].subject;
	const title = factors[props.name].name;
	const factor = factors[props.name].data;
	return factors[props.name].isUsed ? (
		<table
			key={`table-${title}-${props.name}-${props.id}`}
			className="table table-sm table-responsive table-responsive-sm table-striped table-bordered table-hover"
		>
			<tbody
				id={`table-${title}-${props.name}-${props.id}-body`}
				className="align-self-middle align-middle text-center"
			>
				<tr id={`table-${title}-${props.name}-${props.id}-header-title`}>
					<td id={title} colSpan={6} rowSpan={1}>
						FACTOR POR {title.toUpperCase()}
					</td>
				</tr>
				<tr id={`table-${title}-${props.name}-${props.id}-headers`}>
					<td id={`${props.name}-${props.id}-headers-#`} colSpan={1} rowSpan={1}>
						#
					</td>
					<td id={`${props.name}-${props.id}-headers-Tipo`} colSpan={1} rowSpan={1}>
						{title.toUpperCase()}
					</td>
					<td
						id={`${props.name}-${props.id}-headers-Calificación`}
						colSpan={1}
						rowSpan={1}
					>
						Calificación
					</td>
					<td id={`${props.name}-${props.id}-headers-Factores`} colSpan={1} rowSpan={2}>
						Factores
					</td>
				</tr>
				<tr id={`table-${title}-${props.name}-${props.id}-bodyElementsToUse`}>
					<td
						id={`${props.name}-${props.id}-bodyElementsToUse-SUJETO`}
						colSpan={1}
						rowSpan={1}
					>
						SUJETO
					</td>
					<td
						id={`${props.name}-${props.id}-bodyElementsToUse-subject`}
						colSpan={1}
						rowSpan={1}
					>
						<Selector
							id={props.id}
							name="subject"
							subject={subject}
							selector={props.options}
							onChange={(event) => handleChange(event.target.value, 0, true)}
							style={`bg-warning`}
						/>
					</td>
					<td
						id={`${props.name}-${props.id}-bodyElementsToUse-subjectValue`}
						colSpan={1}
						rowSpan={1}
					>
						{toFancyNumber(factors[props.name].subject.value)}
					</td>
				</tr>
				{factor.map((item: any, index: number) => (
					<tr
						id={`table-${title}-${props.name}-${props.id}-body-row-${index}`}
						key={`table-${title}-${props.name}-${props.id}-bodyElementsToRender-${index}`}
					>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-#`}
							colSpan={1}
							rowSpan={1}
						>
							C{index + 1}
						</td>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-current`}
							colSpan={1}
							rowSpan={1}
						>
							<Selector
								id={props.id + index}
								name={props.name}
								subject={item}
								selector={props.options}
								onChange={(event) => handleChange(event.target.value, index)}
								style={`bg-light`}
							/>
						</td>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-value`}
							colSpan={1}
							rowSpan={1}
						>
							{toFancyNumber(item.value ? item.value : 0, false, false, 2)}
						</td>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-divisor`}
							colSpan={1}
							rowSpan={1}
						>
							{toFancyNumber(
								subject.value / item.value ? subject.value / item.value : 0,
								false,
								false,
								2,
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	) : null;
};
