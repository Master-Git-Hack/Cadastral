/** @format */

import { useEffect, useState } from "react";
import { Table } from "rsuite";
import { Container } from "../../../../components/Container";
import { M2 } from "../../../../components/Decorators";
import { Switch } from "../../../../components/Input/Switch";
import { Component } from "../../../../components/Table";
import { Text } from "../../../../components/Input";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
	getHomologaciones,
	setIndivisoVisibility,
	setObservations,
	setRoundedTo,
} from "../../../../redux/justipreciacion/homologacion";
import { positions } from "../../../../redux/justipreciacion/homologacion/homologacion.actions";
import { asFancyNumber } from "../../../../utils/number";
import { JustifyChanges } from "../../../../components/Custom/JustifyChanges";
import { RoundedSelection } from "../../../../components/Custom/RoundedSelection";
import { Tooltip } from "../../../../components/Tooltip";
import { terreno, renta } from "../../../../redux/justipreciacion";
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

export const BigPicture = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const {
		factors: { Results, ...factors },
		documentation: {
			SalesCost: {
				averageUnitCost: { roundedValue, value, adjustedValue, roundedTo },
				...SalesCost
			},
			Area,
			WeightingPercentage,
			observations,
			ReFactor: { isUsed },
		},
		record,
	} = useAppSelector(getHomologaciones);

	const type = record.type.includes("TERRENO");
	const [factores] = useState(positions(type));
	const [factorsHeader, setFactorsHeader] = useState<Array<Object>>([]);
	const [keys, setKeys] = useState<Array<string>>([]);
	const [data, setData] = useState<Array<Object>>([]);
	useEffect(() => {
		if (factorsHeader.length < 1) {
			const used: Array<string> = [];
			const header: Array<Object> = [];
			factores.map(({ key }: any) => {
				const { isUsed, name, tag } = factors[key];
				isUsed && header.push({ tag, name }) && used.push(key);
			});
			setFactorsHeader(header);
			setKeys(used);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		keys.length > 0 &&
			setTimeout(() => {
				setData(
					new Array(Results.data.length).fill(0).map((_, index) => {
						const { value, unitaryCost } = SalesCost.data[index];

						const { surface, ...area } = Area.data[index];
						const results = Results.data[index];
						const percentage = WeightingPercentage.data[index];
						const response: { [key: string | number]: number | string } = {
							id: `C${index + 1}`,
							salesCost: value,
							surfaceArea: surface,
							areaValue: area.value,
							unitaryCost,
							results: results.value,
							percentage: percentage.value,
							salesCostFinal: SalesCost.results[index].value,
						};
						keys.map((key: string) => {
							const { data, results, tag } = factors[key];
							let value = 1;
							if (Object(data[index]).hasOwnProperty("value"))
								value = data[index].value;
							if (Object(data[index]).hasOwnProperty("result"))
								value = data[index].result;

							if (
								Object(factors[key]).hasOwnProperty("results") &&
								Object(results[index]).hasOwnProperty("factor1")
							)
								value = results[index].factor1;

							response[tag] = !isNaN(value) ? value : 1;
							return key;
						});

						return response;
					}),
				);
				setLoading(false);
			}, 1000);
	}, [keys]);
	const factorWidth: { [key: number]: number } = { 13: 53, 12: 57, 11: 62, 10: 69, 9: 77, 8: 86 };
	const [sortColumn, setSortColumn] = useState<string>();
	const [sortType, setSortType] = useState<"asc" | "desc" | undefined>();
	const handleSortColumn = (sortColumn: string, sortType?: "asc" | "desc") => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSortColumn(sortColumn);
			setSortType(sortType ?? "desc");
		}, 500);
	};
	const getData = () => {
		if (sortColumn && sortType) {
			return data.sort((a: any, b: any) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if (typeof x === "string") {
					x = x.charCodeAt(1);
				}
				if (typeof y === "string") {
					y = y.charCodeAt(1);
				}
				if (sortType === "asc") {
					return x - y;
				} else {
					return y - x;
				}
			});
		}
		return data;
	};
	useEffect(() => {
		if (type) {
			dispatch(terreno(isUsed ? adjustedValue : roundedValue));
		} else {
			dispatch(renta(roundedValue));
		}
	}, [roundedValue, adjustedValue, isUsed]);
	return (
		<Container
			header={
				<div className="d-flex justify-content-end my-1">
					<Switch
						checked={isUsed}
						withText
						label="Indiviso"
						reverse
						onChange={(checked: boolean): void => {
							dispatch(setIndivisoVisibility(checked));
						}}
					/>
				</div>
			}
			footer={
				<Footer
					colSpan={keys.length}
					observations={observations}
					type={type}
					subjectArea={Area.subject.value}
					averageLotArea={Area.averageLotArea.value}
					roundedTo={roundedTo}
					value={value}
					roundedValue={roundedValue}
				/>
			}
		>
			<Table
				wordWrap="break-word"
				bordered
				cellBordered
				data={getData()}
				hover
				loading={loading}
				headerHeight={80}
				autoHeight
				affixHorizontalScrollbar
				showHeader
				sortColumn={sortColumn}
				sortType={sortType}
				onSortColumn={handleSortColumn}
				virtualized
			>
				<Column align="center" verticalAlign="middle" width={55} fixed sortable>
					<HeaderCell style={{ padding: 4 }}>
						<strong>Oferta</strong>
					</HeaderCell>
					<Cell dataKey="id" style={{ padding: 4 }} />
				</Column>
				<Column align="center" flexGrow={1} verticalAlign="middle" width={100} fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>
							{type ? (
								SalesCost.tag
							) : (
								<>
									<M2 text="Sup. Terreno ( $ /" />)
								</>
							)}
						</strong>
					</HeaderCell>
					<CurrentCell
						dataKey={type ? "salesCost" : "surfaceArea"}
						isCurrency={type}
						isArea={!type}
					/>
				</Column>
				<Column align="center" flexGrow={1} verticalAlign="middle" fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>
							<M2 text={`${Area.tag} `} />
						</strong>
					</HeaderCell>
					<CurrentCell dataKey="areaValue" isArea />
				</Column>
				<Column align="center" flexGrow={1} verticalAlign="middle" width={106} fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>
							<M2 text="Precio Unitario ( $ / " />)
						</strong>
					</HeaderCell>
					<CurrentCell dataKey="unitaryCost" isCurrency />
				</Column>

				<ColumnGroup
					header={<strong>Factores de Homologación</strong>}
					verticalAlign="middle"
				>
					{keys.map((key: string) => {
						const { tag, isUsed } = factors[key];
						return (
							isUsed && (
								<Column
									width={factorWidth[keys.length]}
									resizable
									align="center"
									verticalAlign="middle"
								>
									<HeaderCell style={{ padding: 4 }} fixed>
										<strong>{tag}</strong>
									</HeaderCell>
									<CurrentCell dataKey={tag} />
								</Column>
							)
						);
					})}
				</ColumnGroup>

				<Column align="center" flexGrow={1} verticalAlign="middle" width={60} fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>F.Ho. Re.</strong>
					</HeaderCell>
					<CurrentCell dataKey="results" />
				</Column>
				<Column align="center" flexGrow={1} verticalAlign="middle" width={90} fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>Ponderación</strong>
					</HeaderCell>
					<CurrentCell dataKey="percentage" isPercentage />
				</Column>
				<Column align="center" flexGrow={1} verticalAlign="middle" width={130} fixed>
					<HeaderCell style={{ padding: 4 }}>
						<strong>
							<M2 text="Valor Unitario Resultante ( $ / " />)
						</strong>
					</HeaderCell>
					<CurrentCell dataKey="salesCostFinal" isCurrency />
				</Column>
			</Table>
		</Container>
	);
};
const CurrentCell = ({
	rowData,
	dataKey,
	isArea,
	isCurrency,
	isPercentage,
	dataIndex,
	...props
}: any) => {
	const value = asFancyNumber(rowData[dataKey], { isCurrency, isPercentage });
	const Area = isArea ? <M2 text={`${value} `} /> : undefined;
	return (
		<Cell {...props} style={{ padding: 4 }}>
			{Area ?? value}
		</Cell>
	);
};
const Footer = ({
	type,
	subjectArea,
	averageLotArea,
	colSpan,
	value,
	roundedValue,
	observations,
	roundedTo: { enabled, ...roundedTo },
}: any) => {
	const dispatch = useAppDispatch();
	const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];

	return (
		<div className="d-flex justify-content-center mb-1">
			<Component
				name="Footer BigPicture"
				hasFooter
				className="table-borderless"
				customFooter={
					<>
						<tr>
							<td rowSpan={2} colSpan={type ? 2 : 1}>
								SUJETO
							</td>
							{!type && <td rowSpan={2}>{asFancyNumber(subjectArea)}</td>}
							<td rowSpan={2}>
								<M2 text={`${asFancyNumber(averageLotArea)}`} />
							</td>
							<td colSpan={colSpan}>
								<div className="d-flex flex-row justify-content-between ">
									<JustifyChanges
										size="sm"
										action={`Tipo de redondeo: ${options[roundedTo.value + 1]}`}
										name="Valor Unitario Final"
										editable={enabled}
										setEditable={(checked: boolean) => {
											dispatch(
												setRoundedTo({
													key: "enabled",
													value: checked,
												}),
											);
											!checked &&
												dispatch(
													setRoundedTo({
														key: "value",
														value: 1,
													}),
												) &&
												dispatch(
													setRoundedTo({
														key: "observations",
														value: "",
													}),
												);
										}}
										comment={observations}
										setComment={(value: string) =>
											dispatch(
												setRoundedTo({
													key: "observations",
													value,
												}),
											)
										}
									>
										<RoundedSelection
											disabled={!enabled}
											currentItem={roundedTo.value}
											onSelect={(currentItem: number) =>
												dispatch(
													setRoundedTo({
														key: "value",
														value: currentItem,
													}),
												)
											}
										/>
									</JustifyChanges>
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
							<td colSpan={colSpan + 4} className="text-start">
								Justificación de Factores
								<Text
									isArea
									rows={4}
									value={observations}
									onChange={(value) => {
										dispatch(setObservations(value));
									}}
								/>
							</td>
						</tr>
					</>
				}
			/>{" "}
		</div>
	);
};
/**<Table
			wordWrap="break-word"
			bordered
			cellBordered
			data={[{ id: 1, area: asFancyNumber(averageLotArea), sujeto: "SUJETO" }]}
			hover
			loading={loading}
			autoHeight
			affixHorizontalScrollbar
			showHeader={false}
		>
			<Column
				rowSpan={(rowData: any): number => {
					return 2;
				}}
				colSpan={2}
				align="center"
				verticalAlign="middle"
				flexGrow={1}
				fixed
			>
				<HeaderCell>SUJETO</HeaderCell>
				<Cell dataKey="sujeto" />
			</Column>
			<Column
				rowSpan={(rowData: any): number => {
					return 2;
				}}
				colSpan={2}
				align="center"
				verticalAlign="middle"
				flexGrow={2}
				fixed
			>
				<HeaderCell>SUJETO</HeaderCell>
				<Cell dataKey="area" />
			</Column>
			<Column colSpan={colSpan} align="center" verticalAlign="middle" flexGrow={2} fixed>
				<HeaderCell>SUJETO</HeaderCell>
				<Cell dataKey="area" />
			</Column>
			<Column colSpan={colSpan} align="center" verticalAlign="middle" flexGrow={2} fixed>
				<HeaderCell>SUJETO</HeaderCell>
				<Cell dataKey="area" />
			</Column>
		</Table>
		*/
