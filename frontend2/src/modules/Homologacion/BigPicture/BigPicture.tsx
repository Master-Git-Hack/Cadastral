/** @format */

import { useState, useEffect, ChangeEvent } from "react";
import { Modal } from "../../../components/Custom/JustifyChanges/Modal";
import { Dropdown } from "../../../components/Custom/RoundSelection/Dropdown";
import { M2 } from "../../../components/Decorators/Decorators";
import { Input } from "../../../components/Input/Input";
import { Table } from "../../../components/Table/Table";
import { Tooltip } from "../../../components/Tooltip/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { positions } from "../../../slices/homologacion/homologacion.helpers";
import { getHomologaciones } from "../../../slices/homologacion/homologacion.slice";
import { asFancyNumber } from "../../../utils/utils.number";
import { BodyProps, ColumnProps, FooterProps, HeaderProps } from "./BigPicture.types";

const Header = (props: HeaderProps) => {
	const { type, factorsUsed, area, salesCost, children } = props;
	return (
		<>
			<tr>
				<th rowSpan={2}>Oferta</th>
				<th rowSpan={2}>
					{type ? (
						salesCost
					) : (
						<>
							<M2 text="Sup. Terreno ( $ /" />)
						</>
					)}
				</th>
				<th rowSpan={2}>
					<M2 text={area} />
				</th>
				<th rowSpan={2}>
					<M2 text="Precio Unitario ( $ / " />)
				</th>
				<th colSpan={factorsUsed}>Factores de Homologación</th>
				<th rowSpan={2}>F.Ho. Re.</th>
				<th rowSpan={2}>Ponderación</th>
				<th rowSpan={2}>
					<M2 text="Valor Unitario Resultante( $ / " />)
				</th>
			</tr>
			<tr>{children}</tr>
		</>
	);
};
const Column = (props: ColumnProps) => {
	const { id, value, isCurrency, isPercentage, isArea, rowSpan } = props;
	const tooltip = props?.tooltip ?? false;
	const Component = () => (
		<>
			{asFancyNumber(value, { isPercentage, isCurrency })} {isArea && <M2 />}
		</>
	);
	return (
		<td rowSpan={rowSpan ?? 1} className="text-center my-auto">
			{tooltip ?? false ? (
				<Tooltip id={id} tooltip={value}>
					<div id={props.id}>
						<Component />
					</div>
				</Tooltip>
			) : (
				<Component />
			)}
		</td>
	);
};
const Body = (props: BodyProps) => {
	const { rows, keys, factors, salesCost, area, type, percentage, results } = props;
	const { data } = salesCost;
	const Component = (props: { index: number }) => {
		const { index } = props;
		return (
			<>
				{keys.map((key: string, indx: number) => {
					const id = `factor column for ${key} ${indx} ${index}`;
					const { data, results } = factors[key];
					const current =
						!key.includes("Zone") && !key.includes("Location")
							? data[index].result
							: key.includes("Location")
							? data[index].value
							: results[index].factor1;
					const value = !isNaN(current) ? current : 1;
					return <Column key={id} id={id} value={value} tooltip />;
				})}
			</>
		);
	};
	return (
		<>
			{rows.map((index: number) => {
				const { value, unitaryCost } = data[index];
				const { surface } = area[index];
				return (
					<tr key={index}>
						<td>C{index + 1}</td>
						<Column
							id={`${type ? "SalesCost" : "Surface Area"} ${index}`}
							value={type ? value : surface}
							isCurrency
						/>
						<Column id={`Area Value ${index}`} value={area[index].value} isArea />
						<Column id={`Unitary Cost ${index}`} value={unitaryCost} isCurrency />
						<Component index={index} />
						<Column id={`results ${index}`} value={results[index].value} />
						<Column
							id={`Porcentage ${index}`}
							value={percentage[index].value}
							isPercentage
						/>
						<Column
							id={`SalesCost final unitary cost ${index}`}
							value={salesCost.results[index].value}
							isCurrency
						/>
					</tr>
				);
			})}
		</>
	);
};
const Footer = (props: FooterProps) => {
	const { value, type, subjectArea, averageLotArea, roundedTo, roundedValue } = props;
	const colSpan = props.colSpan + 3;
	const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];
	const currentRound = roundedTo.value + 1;
	return (
		<>
			<tr>
				<td rowSpan={2} colSpan={type ? 2 : 1}>
					SUJETO
				</td>
				{!type && <td rowSpan={2}>{asFancyNumber(subjectArea)}</td>}
				<td rowSpan={2}>
					<M2 text={asFancyNumber(averageLotArea)} />
				</td>
				<td colSpan={colSpan}>
					<div className="d-flex flex-row justify-content-between">
						<div>
							<Modal
								type={"link"}
								action={`Tipo de redondeo: ${options[currentRound]}`}
								name={"Valor Unitario Final"}
								editable={roundedTo.enabled}
								setEditable={(event) => {
									console.log(event.currentTarget.checked);
								}}
								comment={roundedTo.observations}
								setComment={(event) => {
									console.log(event.currentTarget.value);
								}}
							>
								<Dropdown
									name="Valor Unitario Final"
									currentItem={currentRound}
									onClick={(option: string, index: number) => {
										console.log(option, index);
									}}
								/>
							</Modal>
						</div>
						<span className="ms-auto my-auto">Valor Unitario Promedio</span>
					</div>
				</td>
				<td>{asFancyNumber(value ?? 1, { isCurrency: true })}</td>
			</tr>
			<tr>
				<td colSpan={colSpan} className="text-end my-auto">
					Valor Unitario Aplicable en Números Redondos
				</td>
				<td>{asFancyNumber(roundedValue ?? 1, { isCurrency: true })}</td>
			</tr>
			<tr>
				<td colSpan={colSpan + 4}>
					<Input.Area
						name="Justificación de Factores"
						label="Justificación de Factores:"
						value=""
						onChange={(event) => {
							console.log(event.currentTarget.value);
						}}
					/>
				</td>
			</tr>
		</>
	);
};
export const BigPicture = () => {
	const dispatch = useAppDispatch();
	const { factors, documentation, record } = useAppSelector(getHomologaciones);
	const { Results } = factors;
	const { SalesCost, Area, WeightingPercentage } = documentation;
	const { roundedValue, value, adjustedValue, roundedTo } = SalesCost.averageUnitCost;
	const type = record.type.includes("TERRENO");
	const [factores] = useState(positions(type));
	const [factorsHeader, setFactorsHeader] = useState<Array<Object>>([]);
	const [keys, setKeys] = useState<Array<string>>([]);
	const rows = new Array(factors.Results.data.length).fill(0).map((_, index) => index);
	useEffect(() => {
		if (factorsHeader.length < 1) {
			const used: Array<string> = [];
			const header: Array<Object> = [];
			factores.map((item: any) => {
				const { key } = item;
				const { isUsed, name, tag } = factors[key];
				isUsed && header.push({ tag, name }) && used.push(key);
			});
			setFactorsHeader(header);
			setKeys(used);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Table.Component
				name="BigPicture"
				customHeader={
					<Header
						factorsUsed={factorsHeader.length}
						type={type}
						salesCost={SalesCost.tag}
						area={Area.name}
					>
						{factorsHeader.map((item: any, index: any) => {
							const id = `factors used ${index}`;
							const { name, tag } = item;
							return (
								<Tooltip id={id} tooltip={name} key={id}>
									<th id={id}>{tag}</th>
								</Tooltip>
							);
						})}
					</Header>
				}
				customBody={
					<Body
						rows={rows}
						keys={keys}
						factors={factors}
						results={Results.data}
						salesCost={SalesCost}
						area={Area.data}
						type={type}
						percentage={WeightingPercentage.data}
					/>
				}
				hasFooter
				customFooter={
					<Footer
						colSpan={keys.length}
						type={type}
						subjectArea={Area.subject.value}
						averageLotArea={Area.averageLotArea.value}
						roundedTo={roundedTo}
						value={value}
						roundedValue={roundedValue}
					/>
				}
			/>
		</>
	);
};
