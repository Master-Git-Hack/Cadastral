/** @format */

import { CommonProps, BodyProps } from "./common.types";
import { Normal as Select } from "../../../../../components/Input/Select";
import { useAppDispatch, useAppSelector } from "../../../../../redux";
import {
	getHomologaciones,
	updateCommonData,
	updateCommonSubject,
	updateFactors,
} from "../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber, formatNumb } from "../../../../../utils/number";

import { Title, Header } from "../factores.interface";
import { Component } from "../../../../../components/Table";
import { searchByValue } from "../../../../../utils/search";
import { useEffect } from "react";

const Body = ({ options, data, subject, name, tag }: BodyProps): JSX.Element => {
	const dispatch = useAppDispatch();
	return (
		<>
			<Header name={tag} />
			<tr className="table-warning">
				<td>SUJETO</td>
				<td style={{ minWidth: 150 }}>
					<div className="p-1">
						<Select
							label={subject.label}
							value={subject.value}
							defaultValue={subject}
							onChange={({ currentTarget: { value } }) =>
								dispatch(
									updateCommonSubject({
										key: name,
										value: searchByValue(options, Number(value)),
									}),
								) && dispatch(updateFactors())
							}
							data={options}
							className="bg-warning bg-opacity-25 text-center"
						/>
					</div>
				</td>
				<td>{asFancyNumber(subject.value)}</td>
			</tr>
			{data.map(({ id, label, value, result }: any, index: number) => (
				<tr key={`table for age factor ${index}`}>
					<td>C{id}</td>
					<td>
						<Select
							index={index}
							label={label}
							value={value}
							defaultValue={value}
							onChange={({ currentTarget: { value } }) => {
								const target = searchByValue(options, Number(value));

								dispatch(
									updateCommonData({
										index,
										key: name,
										value: {
											...target,
											result: formatNumb(subject.value / target.value),
										},
									}),
								);
								dispatch(updateFactors());
							}}
							data={options}
						/>
					</td>
					<td>{asFancyNumber(value)}</td>
					<td>{asFancyNumber(result)}</td>
				</tr>
			))}
		</>
	);
};
export const Common = (props: CommonProps) => {
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const { data, subject, name } = factors[props.name];
	const { options } = handlers[props.name];

	return (
		<Component
			name={props.name}
			customHeader={<Title name={name} />}
			customBody={
				<Body
					tag={name}
					name={props.name}
					data={data}
					subject={subject}
					options={options}
				/>
			}
		/>
	);
};
