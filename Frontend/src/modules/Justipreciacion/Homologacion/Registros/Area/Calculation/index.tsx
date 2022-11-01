/** @format */

import { useEffect } from "react";
import { Badge } from "../../../../../../components/Badge";
import { JustifyChanges } from "../../../../../../components/Custom/JustifyChanges";
import { M2 } from "../../../../../../components/Decorators";
import { Dropdown } from "../../../../../../components/Dropdown";
import { Fancy } from "../../../../../../components/Input/Fancy";
import { Component } from "../../../../../../components/Table";
import { Tooltip } from "../../../../../../components/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../../../../redux";
import { getJustipreciacion, setInitialState } from "../../../../../../redux/justipreciacion";
import {
	getHomologaciones,
	setAreaData,
	setAreaSubject,
	setSurfaceRoot,
	setSalesCostData,
	setCommercialData,
	setPercentageData,
} from "../../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber } from "../../../../../../utils/number";
import { BodyProps, HeaderProps, FooterProps } from "./calculation.types";

const Header = ({ type, tag, name, percentage }: HeaderProps) => {
	const className = " align-middle text-brake";
	return (
		<tr>
			<th>#</th>
			<th className={className}>{type ? tag : <M2 text={<>Sup. Terreno ($ / </>} />})</th>
			<th className={className}>
				{name}(<M2 />)
			</th>
			<th className=" align-middle text-brake">
				<M2 text="Precio Unitario ($ /" />)
			</th>
			<th className={className}>Factor de Superficie</th>
			<th className={className}>Factor de Comercialización</th>
			<th className={className}>
				<div className="d-flex flex-row justify-content-between">
					Ponderación
					<Badge
						type={
							percentage === 100 ? "success" : percentage > 100 ? "danger" : "warning"
						}
						text={asFancyNumber(percentage, { isPercentage: true })}
					/>
				</div>
			</th>
		</tr>
	);
};
const Body = ({
	data,
	type,
	salesCost,
	root,
	surface,
	commercial,
	percentage,
	averageLotArea,
	viewAs
}: BodyProps) => {
	const dispatch = useAppDispatch();
	return data.map(({ id, value, ...item }: any, index: number) => (
		<tr key={`row of columns to handle area operations ${index}`}>
			<td>C{id}</td>
			<td>
				{viewAs==="usage"?<Fancy
					name=""
					label=""
					value={type ? salesCost[index].value : item.surface}
					onChange={({ currentTarget: { valueAsNumber } }) => {
						dispatch(
							type
								? setSalesCostData({
										index,
										key: "value",
										value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
								  })
								: setAreaData({
										index,
										key: "surface",
										value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
								  }),
						);
					}}
					isCurrency={type}
					classNameDecorator="text-center bg-light"
				/>:asFancyNumber(type ? salesCost[index].value : item.surface,{isCurrency:type})}
			</td>
			<td>
				<Fancy
					name=""
					label=""
					value={value}
					onChange={({ currentTarget: { valueAsNumber } }) => {
						dispatch(
							setAreaData({
								index,
								key: "value",
								value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
							}),
						);
					}}
					classNameDecorator="text-center bg-light"
				/>
			</td>
			<td>{asFancyNumber(salesCost[index].unitaryCost, { isCurrency: true })}</td>
			<td>
				<Tooltip
					id={`surface factor ${index}`}
					tooltip={
						<>
							<sup>{root}</sup>&radic;
							<small style={{ textDecoration: "overline" }}>
								{`(${value}`}&divide;
								{`${averageLotArea})`}
							</small>
						</>
					}
				>
					<div id={`surface factor ${index}`}>{asFancyNumber(surface[index].value)}</div>
				</Tooltip>
			</td>
			<td>
				<Fancy
					name=""
					label=""
					value={commercial[index].value}
					onChange={({ currentTarget: { valueAsNumber } }) => {
						dispatch(
							setCommercialData({
								index,
								key: "value",
								value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
							}),
						);
					}}
					classNameDecorator="text-center bg-light"
				/>
			</td>
			<td>
				<Fancy
					name=""
					label=""
					value={percentage[index].value}
					onChange={({ currentTarget: { valueAsNumber } }) => {
						dispatch(
							setPercentageData({
								index,
								key: "value",
								value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
							}),
						);
					}}
					isPercentage
					classNameDecorator="text-center bg-light"
				/>
			</td>
		</tr>
	));
};
export const Footer = ({ type, subject, surface, averageLotArea,viewAs }: FooterProps) => {
	const dispatch = useAppDispatch();
	const { cna_edad, cna_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		if (subject !== cna_superficie) {
			dispatch(
				setInitialState({
					type: type ? "TERRENO" : "RENTA",
					cna_superficie: subject,
					cna_edad,
				}),
			);
		}
	}, []);
	const options = new Array(7).fill(0).map((_, i) => `${i + 6}`);
	return (
		<tr>
			<td colSpan={type ? 2 : 1}>SUJETO</td>
			{!type && (
				<Fancy
					name=""
					label=""
					value={subject}
					onChange={({ currentTarget: { valueAsNumber } }) => {
						dispatch(
							setAreaSubject({
								key: "value",
								value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
							}),
						);
					}}
					classNameDecorator="text-center bg-light"
				/>
			)}
			<td>
				<M2 text={asFancyNumber(averageLotArea)} />
			</td>
			<td colSpan={4}>
				<div className="d-flex justify-content-end text-end me-auto">
					<JustifyChanges
						action={`Cambiar Raíz`}
						name={"Factor de Superficie"}
						editable={surface.enabled}
						setEditable={(checked: boolean): void => {
							dispatch(setSurfaceRoot({ key: "enabled", value: checked }));
							if (!checked) {
								dispatch(setSurfaceRoot({ key: "observations", value: "" }));
								dispatch(
									setSurfaceRoot({
										key: "value",
										value: 8,
									}),
								);
							}
						}}
						comment={surface.observations}
						setComment={(value: string): void => {
							dispatch(setSurfaceRoot({ key: "observations", value }));
						}}
					>
						<Dropdown
							disabled={!surface.enabled}
							trigger="click"
							placement="rightStart"
							items={options}
							activeKey={surface.value}
							size="xs"
							title={`Valor actual de la raíz: Raíz(${surface.value})`}
							onSelect={(eventKey: string): void => {
								dispatch(
									setSurfaceRoot({
										key: "value",
										value: Number(eventKey),
									}),
								);
							}}
						/>
					</JustifyChanges>
				</div>
			</td>
		</tr>
	);
};
export const Calculation = ({ viewAs }: { viewAs: "usage" | "export" }) => {
	const dispatch = useAppDispatch();
	const {
		documentation: {
			Area: { data, subject, ...Area },
			SalesCost,
			WeightingPercentage,
		},
		factors: {
			Surface: { root, ...Surface },
			Commercial,
		},
		record,
	} = useAppSelector(getHomologaciones);

	const type = record.type.includes("TERRENO");
	const averageLotArea = Area.averageLotArea.value;

	const { cna_edad, cna_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		if (subject.value !== cna_superficie) {
			dispatch(
				setInitialState({ type: record.type, cna_superficie: subject.value, cna_edad }),
			);
		}
	}, [subject.value]);

	return (
		<Component
			name=""
			customHeader={
				<Header
					type={type}
					tag={SalesCost.tag}
					name={Area.name}
					percentage={WeightingPercentage.total}
				/>
			}
			customBody={
				<Body
					data={data}
					type={type}
					salesCost={SalesCost.data}
					root={root.value}
					surface={Surface.data}
					commercial={Commercial.data}
					percentage={WeightingPercentage.data}
					averageLotArea={averageLotArea}
					viewAs={viewAs}
				/>
			}
			hasFooter
			customFooter={
				<Footer
					type={type}
					subject={subject.value}
					averageLotArea={averageLotArea}
					surface={root}
					viewAs={viewAs}
				/>
			}
		/>
	);
};
