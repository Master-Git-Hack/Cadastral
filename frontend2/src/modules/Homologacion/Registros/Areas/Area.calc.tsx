/** @format */

import { useEffect } from "react";
import { Tooltip } from "../../../../components/Tooltip/Tooltip";
import { Input } from "../../../../components/Input/Input";
import { Pill } from "../../../../components/Pill/Pill";
import { Table } from "../../../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { getHomologaciones } from "../../../../slices/homologacion/homologacion.slice";
import { asFancyNumber } from "../../../../utils/utils.number";
import { M2 } from "../../../../components/Decorators/Decorators";

const Header = (props: any) => {
	const { type, tag, name, percentage } = props;
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
					<Pill
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
const Body = (props: any) => {
	const { data, type, salesCost, root, surface, commercial, percentage, averageLotArea } = props;
	return data.map((item: any, index: number) => (
		<tr key={`row of columns to handle area operations ${index}`}>
			<td>C{item.id}</td>
			<td>
				<Input.Fancy
					name=""
					label=""
					value={type ? salesCost[index].value : item.surface}
					onChange={(event) => {
						console.log(event.currentTarget.valueAsNumber);
					}}
					isCurrency
					classNameDecorator="text-center bg-light"
				/>
			</td>
			<td>
				<Input.Fancy
					name=""
					label=""
					value={item.value}
					onChange={(event) => {
						console.log(event.currentTarget.valueAsNumber);
					}}
					isCurrency
					classNameDecorator="text-center bg-light"
				/>
			</td>
			<td>{asFancyNumber(salesCost[index].unitaryCost, { isCurrency: true })}</td>
			<td>
				<Tooltip
					id={`surface factor ${index}`}
					customTooltip={
						<>
							<sup>{root}</sup>&radic;
							<small style={{ textDecoration: "overline" }}>
								{`(${item.value}`}&divide;
								{`${averageLotArea})`}
							</small>
						</>
					}
					placement="bottom"
				>
					<div id={`surface factor ${index}`}>{asFancyNumber(surface[index].value)}</div>
				</Tooltip>
			</td>
			<td>
				<Input.Fancy
					name=""
					label=""
					value={commercial[index].value}
					onChange={(event) => {
						console.log(event.currentTarget.valueAsNumber);
					}}
					classNameDecorator="text-center bg-light"
				/>
			</td>
			<td>
				<Input.Fancy
					name=""
					label=""
					value={percentage[index].value}
					onChange={(event) => {
						console.log(event.currentTarget.valueAsNumber);
					}}
					isPercentage
					classNameDecorator="text-center bg-light"
				/>
			</td>
		</tr>
	));
};
export const Footer = (props: {
	type: boolean;
	subject: number;
	surface: any;
	averageLotArea: number;
}) => {
	const { type, subject, surface, averageLotArea } = props;
	const { name, root } = surface;
	return (
		<tr>
			<td colSpan={type ? 2 : 1}>SUJETO</td>
			{!type && (
				<Input.Fancy
					name=""
					label=""
					value={subject}
					onChange={(event) => {
						console.log(event.currentTarget.valueAsNumber);
					}}
					classNameDecorator="text-center bg-light"
				/>
			)}
			<td>
				<M2 text={asFancyNumber(averageLotArea)} />
			</td>
			<td colSpan={4}></td>
		</tr>
	);
};
export const Calculation = () => {
	const dispatch = useAppDispatch();
	const { documentation, factors, record } = useAppSelector(getHomologaciones);
	const { Area, SalesCost, WeightingPercentage } = documentation;
	const { data, subject } = Area;
	const { Surface, Commercial } = factors;
	const { root } = Surface;
	const type = record.type.includes("TERRENO");
	const averageLotArea = Area.averageLotArea.value;

	/*
    const { cna_edad, cna_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		if (subject.value !== cna_superficie) {
			dispatch(setInitialState({ type, cna_superficie: subject.value, cna_edad }));
		}
	}, [subject.value]);
    */
	return (
		<Table.Component
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
				/>
			}
			hasFooter
			customFooter={
				<Footer
					type={type}
					subject={subject.value}
					averageLotArea={averageLotArea}
					surface={Surface}
				/>
			}
		/>
	);
};
