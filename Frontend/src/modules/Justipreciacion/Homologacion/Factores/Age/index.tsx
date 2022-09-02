/** @format */

import { useEffect } from "react";
import { Fancy } from "../../../../../components/Input/Fancy";
import { Component } from "../../../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../../../redux";
import { getJustipreciacion, setInitialState } from "../../../../../redux/justipreciacion";
import {
	setAgeSubject,
	setAgeData,
	getHomologaciones,
} from "../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber } from "../../../../../utils/number";
import { Title, Header } from "../factores.interface";
import { BodyProps, FooterProps } from "./age.types";

const Body = ({ name, data }: BodyProps): JSX.Element => {
	const dispatch = useAppDispatch();
	return (
		<>
			{data.map(({ id, label, value, result }: any, index: number) => (
				<tr key={`table for age factor ${index}`}>
					<td>C{id}</td>
					<td>
						<Fancy
							name={name}
							label={label}
							value={value}
							onChange={({ currentTarget: { valueAsNumber } }) =>
								dispatch(setAgeData({ index, value: valueAsNumber ?? 1 }))
							}
						/>
					</td>
					<td>{asFancyNumber(result ?? 1)}</td>
				</tr>
			))}
		</>
	);
};
const Footer = ({ name, subject: { label, value }, type }: FooterProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { cna_edad, cna_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		if (value !== cna_edad) {
			dispatch(setInitialState({ type, cna_edad: value, cna_superficie }));
		}
	}, [value]);
	return (
		<tr className="table-warning">
			<td>SUJETO</td>
			<td colSpan={2}>
				<Fancy
					name={name}
					label={label}
					value={value}
					onChange={({ currentTarget: { valueAsNumber } }) =>
						dispatch(setAgeSubject({ value: valueAsNumber ?? 1 }))
					}
					classNameDecorator="bg-warning bg-opacity-25 "
				/>
			</td>
		</tr>
	);
};
export const Age = () => {
	const {
		factors: {
			Age: { data, subject, name },
		},
		record: { type },
	} = useAppSelector(getHomologaciones);

	return (
		<Component
			name={name}
			customHeader={<Title name={name} />}
			customBody={
				<>
					<Header name={name} isAge />
					<Body name={name} data={data} />
				</>
			}
			hasFooter
			customFooter={<Footer name={name} subject={subject} type={type} />}
		/>
	);
};
