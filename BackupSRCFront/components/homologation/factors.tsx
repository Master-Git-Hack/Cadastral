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
import { SymbolsTable } from "./factors/symbolsTable";
import { ZoneTable } from "./factors/zoneTable";
export const FactorsCompilation: FC = () => {
	const dispatch = useAppDispatch();
	const { type } = useAppSelector(selector);
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-borderless">
			<thead>
				<Actions dispatch={dispatch} />
			</thead>
			<tbody className="align-self-center align-middle text-center align-items-center">
				<tr className="row px-5">
					<Classification />
				</tr>
				<tr className="row px-5">
					<TypeForm type={type} />
				</tr>
				<tr className="row px-5">
					<Usage />
				</tr>
				<tr className="row px-5">
					<Topography type={type} />
				</tr>
				<tr className="row px-5">
					<Level />
				</tr>
				<tr className="row px-5">
					<Quality />
				</tr>
				<tr className="row px-5">
					<Project />
				</tr>
				<tr className="row px-5">
					<Building />
				</tr>

				{/*<Location />*/}
				{/*<Zone/>*/}
			</tbody>
		</table>
	);
};
const Actions: FC<{
	dispatch: any;
}> = (props) => (
	<tr className="row text-center px-5">
		<td className="col text-start px-5 pe-5" colSpan={12} rowSpan={1}>
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
		<td className="col-12 col-sm-12">
			<AgeTable />
		</td>
	</tr>
);
export const Building: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="buildings" options={buildingOptions} id={1} />
		</td>
	</tr>
);
export const Classification: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="classification" options={classificationOptions} id={2} />
		</td>
	</tr>
);
export const Commercial: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12"></td>
	</tr>
);
export const Level: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="level" options={levelOptions} id={3} />
		</td>
	</tr>
);
export const Location: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<SymbolsTable name="location" />
		</td>
	</tr>
);
export const Project: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="project" options={projectOptions} id={4} />
		</td>
	</tr>
);
export const Quality: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="quality" options={qualityOptions} id={5} />
		</td>
	</tr>
);
export const Topography: FC<{ type: string }> = (props) => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="topography" options={topographyOptions} id={6} />
		</td>
	</tr>
);
export const TypeForm: FC<{ type: string }> = (props) => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="typeForm" options={typeFormOptions} id={7} />
		</td>
	</tr>
);
export const Usage: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			<CommonTable name="usage" options={usageOptions} id={8} />
		</td>
	</tr>
);
export const Zone: FC = () => (
	<tr className="row text-center px-5">
		<td className="col-12 col-sm-12">
			{/**<ZoneTable /> */}
			<SymbolsTable name="zone" />
		</td>
	</tr>
);
