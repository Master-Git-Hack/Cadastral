/** @format */

import { Table } from "../../../components/Table/Table";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";

import { Title } from "./Factores.Common";
import { useState, useEffect, Fragment } from "react";
import { Input } from "../../../components/Input/Input";
import { asFancyNumber } from "../../../utils/utils.number";
import { getHomologaciones } from "../../../slices/homologacion/homologacion.slice";
export const Age = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(getHomologaciones);
	const { data, subject, name } = factors.Age;
	const Header = () => (
		<tr>
			<td>#</td>
			<td style={{ minWidth: 75 }}>
				<div className="bg-warning bg-opacity-75 text-white">
					<strong>{name.toUpperCase()} </strong>
				</div>
			</td>
			<td>Factores</td>
		</tr>
	);
	const Body = () =>
		data.map((item: any, index: number) => (
			<tr key={`table for age factor ${index}`}>
				<td>C{item.id}</td>
				<td>
					<Input.Fancy
						name={name}
						label={item.name}
						value={item.value}
						onChange={() => {}}
					/>
				</td>
				<td>{asFancyNumber(item.result)}</td>
			</tr>
		));
	const Footer = () => (
		<tr>
			<td>SUJETO</td>
			<td colSpan={2}>
				<Input.Fancy
					name={name}
					label={subject.name}
					value={subject.value}
					onChange={() => {}}
					classNameDecorator="bg-warning bg-opacity-50 text-center "
				/>
			</td>
		</tr>
	);
	return (
		<Table.Component
			name={name}
			customHeader={<Title name={name} />}
			customBody={
				<Fragment>
					<Header />
					<Body />
				</Fragment>
			}
			hasFooter
			customFooter={<Footer />}
		/>
	);
};
