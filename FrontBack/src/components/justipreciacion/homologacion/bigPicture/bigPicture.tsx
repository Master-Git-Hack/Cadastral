/** @format */

import { useState, useEffect } from "react";
import {
	getHomologacion as getState,
	UpdateOperationValues,
	setObservations,
	updateDocumentationStateRoundedTo,
} from "../../../../features/justipreciacion/homologacionSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import {
	getJustipreciacion,
	terreno,
	renta,
} from "../../../../features/justipreciacion/justipreciacionSlice";
import { asFancyNumber } from "../../../../utils/utils";
import { Body, Footer, Header, Table } from "../../../table/Table";

import { TooltipComponent } from "../../../tooltip/tooltip";
import { RoundSelection } from "../../../roundSelection/RoundSelection";
import { TableComponent } from "../../../table/TableComponent";
const decimals = 3;
export default function BigPicture() {
	const dispatch = useAppDispatch();
	const { factors, documentation, record } = useAppSelector(getState);
	const { type } = record;
	const { isUsed } = documentation.ReFactor;
	const { observations, SalesCost } = documentation;
	const { roundedValue, value, adjustedValue, roundedTo } = SalesCost.averageUnitCost;
	const averageLotArea = documentation.Area.averageLotArea.value;
	const subjectArea = documentation.Area.subject.value;
	const [order, setOrder] = useState([
		"Building",
		"Classification",
		"Level",
		"Location",
		"Project",
		"Quality",
		"Topography",
		"TypeForm",
		"Usage",
		"Zone",
	]);
	const [factorsUsed, setFactorsUsed] = useState(13);
	const rowsLength = factors.Surface.data.length;
	const countFactorsUsed = () => {
		const length = !type.includes("TERRENO") ? 3 : 2;
		let count = length;
		const newOrder: Array<string> = [];
		for (let i = 0; i < 11; i++) {
			const element = i + length;
			for (const key in factors) {
				const { isUsed, position } = factors[key];
				if (isUsed && position === element && !key.includes("Commercial")) {
					newOrder.push(key);
					count++;
				}
			}
		}
		setFactorsUsed(count);
		setOrder(newOrder);
	};
	useEffect(() => {
		dispatch(UpdateOperationValues());
		countFactorsUsed();
		window.resizeTo(1250, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (type.includes("TERRENO")) {
			dispatch(terreno(isUsed ? adjustedValue : roundedValue));
		} else {
			dispatch(renta(roundedValue));
		}
	}, [roundedValue]);
	const footerLength = factorsUsed - (!type.includes("TERRENO") ? 4 : 3);
	return (
		<TableComponent
			name="bigPicture"
			header={[]}
			customHeader={
				<>
					<tr>
						<th rowSpan={2}>Oferta</th>

						<th rowSpan={2}>
							{type === "TERRENO" ? (
								documentation.SalesCost.tag
							) : (
								<>
									Sup. Terreno ( $ / m<sup>2</sup> )
								</>
							)}
						</th>
						<th rowSpan={2}>
							{documentation.Area.name}
							(m<sup>2</sup>)
						</th>
						<th rowSpan={2}>
							Precio Unitario ($/m<sup>2</sup>){" "}
						</th>
						<th colSpan={factorsUsed}>Factores de Homologación</th>
						<th rowSpan={2}>F.Ho. Re.</th>
						<th rowSpan={2}>Ponderación</th>
						<th rowSpan={2}>
							Valor Unitario Resultante ($/m<sup>2</sup>)
						</th>
					</tr>
					<ResponsiveHeaders order={order} factors={factors} type={type} />
				</>
			}
			body={[]}
			customBody={
				<BodyBigPicture
					documentation={documentation}
					rowsLength={rowsLength}
					order={order}
					factors={factors}
					type={type}
				/>
			}
			hasFooter={true}
			customFooter={
				<>
					<tr>
						<td rowSpan={2} colSpan={type.includes("TERRENO") ? 2 : 1}>
							SUJETO
						</td>
						{!type.includes("TERRENO") && (
							<td rowSpan={2}>{asFancyNumber(subjectArea)}</td>
						)}
						<td rowSpan={2}>
							{`${asFancyNumber(averageLotArea)} `} m<sup>2</sup>
						</td>

						<td colSpan={footerLength + (type.includes("TERRENO") ? 6 : 7)}>
							<div className="d-flex">
								<RoundSelection
									type="modal"
									modalBtnType="link"
									name="Valor Unitario Final"
									current={roundedTo.value + 1}
									onClick={(option: any, index: number) =>
										roundedTo.enabled &&
										dispatch(
											updateDocumentationStateRoundedTo({
												key: "roundedTo",
												value: {
													...roundedTo,
													value: index - 1,
												},
											}),
										)
									}
									enabled={roundedTo.enabled}
									setEnabled={(event: any) => {
										const enabled = event.currentTarget.checked;
										dispatch(
											updateDocumentationStateRoundedTo({
												key: "roundedTo",
												value: {
													value: enabled ? roundedTo.value : 1,
													enabled,
													observations: "",
												},
											}),
										);
									}}
									comment={roundedTo.observations}
									setComment={(event: any) =>
										dispatch(
											updateDocumentationStateRoundedTo({
												key: "roundedTo",
												value: {
													...roundedTo,
													observations: event.currentTarget.value,
												},
											}),
										)
									}
								/>

								<div className="ms-auto my-auto">Valor Unitario Promedio</div>
							</div>
						</td>
						<td>{asFancyNumber(value, { isCurrency: true })}</td>
					</tr>
					<tr>
						<td
							colSpan={footerLength + (type.includes("TERRENO") ? 6 : 7)}
							className="text-end"
						>
							Valor Unitario Aplicable en Números Redondos
						</td>
						<td>{asFancyNumber(roundedValue, { isCurrency: true })}</td>
					</tr>
					<tr className="border border-white">
						<td colSpan={2}>Justificación de factores</td>
						<td colSpan={footerLength + factorsUsed - 1}>
							<textarea
								className="form-control"
								rows={1}
								value={observations}
								onChange={(event) =>
									dispatch(setObservations(event.currentTarget.value))
								}
							/>
						</td>
					</tr>
				</>
			}
		/>
	);
}
const ResponsiveHeaders = (props: { order: Array<string>; factors: any; type: string }) => (
	<tr>
		{!props.type.includes("TERRENO") ? (
			<th key={`header for factor Age`}>{props.factors.Age.tag}</th>
		) : null}
		<th key={`header for factor Surface`}>{props.factors.Surface.tag}</th>
		{props.order.map((key) => (
			<th key={`header for factor ${key}`}>{props.factors[key].tag}</th>
		))}
		<th key={`header for factor Commercial`}>{props.factors.Commercial.tag}</th>
	</tr>
);
const Show = (props: {
	id: string;
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	decimals?: number;
	isArea?: boolean;
	rowSpan?: number;
	isFixed?: boolean;
	name?: string;
}) => {
	const show = (
		value: number,
		isCurrency: boolean = false,
		isPercentage: boolean = false,
		decimals: number = 2,
		isArea: boolean = false,
	) => {
		const Component = () => (
			<>
				{`${asFancyNumber(value, { isCurrency, isPercentage, decimals })} `}
				{isArea && (
					<>
						m<sup>2</sup>
					</>
				)}
			</>
		);

		return (
			<td id={props.id} className="text-center" rowSpan={props.rowSpan}>
				{props.name === undefined ? (
					<Component />
				) : (
					<TooltipComponent
						id={`${props.id} ${props.name} Factor real value`}
						placement="bottom"
						tooltip={value}
						component={
							<div id={`${props.id} ${props.name} Factor real value`}>
								<Component />
							</div>
						}
					/>
				)}
			</td>
		);
	};
	return (
		<>
			{show(
				props.value,
				props?.isCurrency ?? false,
				props?.isPercentage ?? false,
				props?.decimals ?? 2,
				props?.isArea ?? false,
			)}
		</>
	);
};
const BodyBigPicture = (props: {
	documentation: any;
	rowsLength: number;
	order: Array<string>;
	factors: any;
	type: string;
}) => {
	const { documentation, rowsLength, order, factors, type } = props;
	const { Area, SalesCost, WeightingPercentage } = documentation;
	const itemsToRender = Array.from({ length: rowsLength }, (_, index) => `C${index + 1}`);
	const { Age, Commercial, Surface, Results } = factors;
	return (
		<>
			{itemsToRender.map((row: string, index: number) => (
				<tr key={`row ${row} for big picture `}>
					<td>{row}</td>
					<Show
						id={`${row}-${
							props.type.includes("TERRENO") ? "SalesCost" : "Surface Area"
						}`}
						value={
							props.type.includes("TERRENO")
								? SalesCost.data[index].value
								: Area.data[index].surface
						}
						isCurrency={props.type.includes("TERRENO")}
						isArea={!props.type.includes("TERRENO")}
					/>

					<Show id={`${row}-Value Area`} value={Area.data[index].value} isArea={true} />
					<Show
						id={`${row}-Unitary Cost SalesCost`}
						value={SalesCost.data[index].unitaryCost}
						isCurrency={true}
					/>
					{!type.includes("TERRENO") ? (
						<Show
							id={`${row}-Age Factor`}
							value={Age.data[index].result}
							decimals={decimals}
							name={`Age`}
						/>
					) : null}
					<Show
						id={`${row}-Surface Factor`}
						value={Surface.data[index].value}
						decimals={decimals}
						name={`Surface`}
					/>
					{order.map((key: string) => (
						<Show
							key={`column ${key} for row ${row}`}
							id={`${row}-${key} Factor`}
							value={
								!key.includes("Zone") && !key.includes("Location")
									? factors[key].data[index].result
									: key.includes("Location")
									? factors[key].data[index].value
									: factors[key].results[index].factor1
							}
							decimals={decimals}
							name={`${key}`}
						/>
					))}
					<Show
						id={`${row}-Commercial Factor`}
						value={Commercial.data[index].value}
						decimals={decimals}
						name={`Commercial`}
					/>
					<Show
						id={`${row}-Resultant Factor`}
						value={Results.data[index].value}
						decimals={decimals}
						name={`Resultant`}
					/>
					<Show
						id={`${row}-WeightingPercentage`}
						value={WeightingPercentage.data[index].value}
						decimals={0}
						isPercentage={true}
					/>
					<Show
						id={`${row}-Unitary Cost SalesCost`}
						value={SalesCost.results[index].value}
						isCurrency={true}
					/>
				</tr>
			))}
		</>
	);
};
