/** @format */

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selector, addDataRow, removeDataRow } from "../../features/homologation/slice";
import { CommonTable } from "./factors/commonTable";
import { AgeTable } from "./factors/ageTable";
import { buildingOptions } from "../../types/homologation/factors/building";
import { classificationOptions } from "../../types/homologation/factors/classification";
import { levelOptions } from "../../types/homologation/factors/level";
import { projectOptions } from "../../types/homologation/factors/project";
import { qualityOptions } from "../../types/homologation/factors/quality";
import { topographyOptions } from "../../types/homologation/factors/topography";
import { typeFormOptions } from "../../types/homologation/factors/typeForm";
import { usageOptions } from "../../types/homologation/factors/usage";

export const FactorsCompilation: FC = () => {
	const dispatch = useAppDispatch();
	const { type } = useAppSelector(selector);
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-striped table-borderless">
			<thead>
				<Actions dispatch={dispatch} />
			</thead>
			<tbody className="align-self-center align-middle text-center">
				<Age />
				<Building />
				<Classification />
				<Comparison />
				<Level />
				{/*<Location/>*/}
				<Project />
				<Quality />
				<Topography type={type} />
				<TypeForm type={type} />
				<Usage />
				{/*<Zone/>*/}
			</tbody>
		</table>
	);
};
const Actions: FC<{
	dispatch: any;
}> = (props) => (
	<tr className="row text-center">
		<td className="col text-start" colSpan={12} rowSpan={1}>
			<button className="btn btn-sm btn-success" onClick={() => props.dispatch(addDataRow())}>
				Agregar nueva fila
			</button>
		</td>
		<td className="col text-end" colSpan={12} rowSpan={1}>
			<button
				className="btn btn-sm btn-outline-danger"
				onClick={() => props.dispatch(removeDataRow())}
			>
				Remover ultima fila
			</button>
		</td>
	</tr>
);
export const Age: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<AgeTable />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Building: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="buildings" options={buildingOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Classification: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="classification" options={classificationOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Comparison: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6"></td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Level: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="level" options={levelOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Location: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6"></td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Project: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="project" options={projectOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Quality: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="quality" options={qualityOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Topography: FC<{ type: string }> = (props) => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="topography" options={topographyOptions(props.type)} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const TypeForm: FC<{ type: string }> = (props) => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="typeForm" options={typeFormOptions(props.type)} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Usage: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6">
			<CommonTable name="usage" options={usageOptions} />
		</td>
		<td className="col-3 col-sm-3" />
	</tr>
);
export const Zone: FC = () => (
	<tr className="row text-center">
		<td className="col-3 col-sm-3" />
		<td className="col-6 col-sm-6"></td>
		<td className="col-3 col-sm-3" />
	</tr>
);
