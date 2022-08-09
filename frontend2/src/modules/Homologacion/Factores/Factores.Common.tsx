/** @format */

import { Table } from "../../../components/Table/Table";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/hooks";
import {
	getHomologaciones,
	updateCommonData,
	updateCommonSubject,
} from "../../../slices/homologacion/homologacion.slice";
import { TitleProps, CommonProps } from "./Factores.types";
import { Fragment } from "react";
import { Input } from "../../../components/Input/Input";
import { asFancyNumber, formatNumb } from "../../../utils/utils.number";
import { searchByType } from "../../../utils/utils.search";

export const Title = (props: TitleProps) => (
	<tr>
		<th colSpan={props?.colSpan ?? 4}>
			{props?.title ?? `FACTOR POR ${props?.name?.toUpperCase()}`}
		</th>
	</tr>
);
export const Common = (props: CommonProps) => {
	const dispatch = useDispatch();
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const current = factors[props.name];
	const { subject, data, name } = current;
	const { options } = handlers[props.name];

	const Header = () => (
		<tr>
			<td>#</td>
			<td>
				<div className="d-inline p-2 text-bg-dark">
					<strong>{name.toUpperCase()} </strong>
				</div>
			</td>
			<td>Calificación</td>
			<td rowSpan={2}>Factores</td>
		</tr>
	);
	const Subject = () => (
		<tr>
			<td>SUJETO</td>
			<td style={{ minWidth: 150 }}>
				<Input.Select
					name={name}
					label={name}
					current={subject}
					options={options}
					className="bg-warning text-center"
					onChange={(event) => {
						const value = searchByType(options, event.currentTarget.value);
						const key = props.name;

						dispatch(updateCommonSubject({ key, value }));
					}}
				/>
			</td>
			<td>{asFancyNumber(subject.value)}</td>
		</tr>
	);
	const Body = () =>
		data.map((item: any, index: number) => (
			<tr key={`factors table for component ${name} ${index}`}>
				<td>C{item.id}</td>
				<td>
					<Input.Select
						index={index}
						name={name}
						label={name}
						current={item}
						options={options}
						onChange={(event) => {
							const target = searchByType(options, event.currentTarget.value);
							const result = formatNumb(subject.value / target.value);
							const key = props.name;
							const value = { ...target, result };
							dispatch(updateCommonData({ index, key, value }));
						}}
					/>
				</td>
				<td>{asFancyNumber(item.value)}</td>
				<td>{asFancyNumber(item.result)}</td>
			</tr>
		));
	return (
		<Table.Component
			name={name}
			customHeader={
				<Fragment>
					<Title name={name} />
					<Header />
					<Subject />
				</Fragment>
			}
			customBody={<Body />}
		/>
	);
};
