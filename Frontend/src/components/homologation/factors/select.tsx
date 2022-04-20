/** @format */

import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { getState, setVisibilityOrderFactors } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";

export const SelectFactorsComponent = () => {
	const { factors, record } = useAppSelector(getState);
	const dispatch = useAppDispatch();
	const { type } = record.homologacion;
	const [positions, setPositions] = useState(
		Array.from({ length: 10 }, (v, i) => i + (!type.includes("TERRENO") ? 3 : 2)),
	);
	const [selected, setSelected] = useState<Array<number>>([]);

	const addFactor = () => {
		const position = selected[0];
		setSelected(selected.slice(1));
		const newPosition = [...positions, position].sort((a, b) => a - b);
		setPositions(newPosition);
	};
	const removeFactor = () => {
		const position = positions[0];
		const newSelected = [...selected, position].sort((a, b) => a - b);
		setSelected(newSelected);
		setPositions(positions.slice(1));
	};
	const ListOfFactors = () => {
		const list: any = [];
		for (const key in factors) {
			if (
				!key.includes("Commercial") &&
				!key.includes("Results") &&
				!key.includes("Surface") &&
				!key.includes("Age")
			) {
				list.push(key);
			}
		}
		return list;
	};
	return (
		<div className="container container-fluid">
			<h2>
				Favor de seleccionar aquellos factores que sean necesarios para realizar la
				operación.
			</h2>
			<ul className="list-group">
				{!type.includes("TERRENO") ? (
					<Li
						tag="default age"
						status={true}
						default={true}
						position={Number(!type.includes("TERRENO") ? 1 : 0)}
						item={factors.Age.name}
						onClickAdd={() => {}}
						onClickDelete={() => {}}
					/>
				) : null}
				<Li
					tag="default surface"
					status={true}
					default={true}
					position={!type.includes("TERRENO") ? 2 : 1}
					item={factors.Surface.name}
					onClickAdd={() => {}}
					onClickDelete={() => {}}
				/>
				{ListOfFactors().map((key: string, index: number) => (
					<Li
						key={`${key} - ${index}`}
						tag={`KEY:${key}`}
						status={factors[key].isUsed}
						default={false}
						position={factors[key].position}
						item={factors[key].name}
						onClickAdd={() => {
							setPositions(positions.sort((a, b) => a - b));
							const position = positions[0];
							removeFactor();
							dispatch(
								setVisibilityOrderFactors({
									key,
									value: {
										position,
										isUsed: true,
									},
								}),
							);
						}}
						onClickDelete={() => {
							setPositions(positions.sort((a, b) => a - b));
							const position =
								factors[key].position === 0
									? positions[0] + 1
									: factors[key].position;
							addFactor();
							dispatch(
								setVisibilityOrderFactors({
									key,
									value: {
										position,
										isUsed: false,
									},
								}),
							);
						}}
					/>
				))}
				<Li
					tag="default commercial"
					status={true}
					default={true}
					item={factors.Commercial.name}
					position={selected.length + 3}
					onClickAdd={() => {}}
					onClickDelete={() => {}}
				/>
			</ul>
			<span className="text-muted">
				El numero a la izquierda indica la posicion en la que apareceran en la tabla
			</span>
		</div>
	);
};
const Li = (props: {
	tag: any;
	status: boolean;
	default: boolean;
	position: number;
	item: string;
	onClickAdd: any;
	onClickDelete: any;
}) => (
	<li
		className={`list-group-item d-flex justify-content-between align-items-center ${
			props.default ? "disabled" : ""
		}`}
		key={props.tag}
	>
		<div className="ms-2 me-auto">
			{props.status ? (
				!props.default ? (
					<>
						<span className="">
							{props.position < 10 ? `0${props.position}` : props.position}.-
						</span>
						<button
							className="ms-5 btn btn-sm btn-link link-danger"
							onClick={props.onClickDelete}
						>
							Eliminar
						</button>
					</>
				) : (
					<>{props.position}.- </>
				)
			) : (
				<div className="fw-bold">{props.item}</div>
			)}
		</div>
		{!props.status ? (
			!props.default ? (
				<button className="btn btn-sm btn-outline-success" onClick={props.onClickAdd}>
					Agregar
				</button>
			) : null
		) : (
			<div className="fw-bold">{props.item}</div>
		)}
	</li>
);
