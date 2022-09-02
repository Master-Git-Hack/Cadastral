/** @format */

import { Header, Body, SingleColumnInARow, Table } from "../../../table/Table";
import { ZoneExtraInformationTable } from "../documentacion/Area/area";
import { AgeTable, CommonTable, SymbolsTable } from "./Tables/tables";
import { SelectFactorsComponent } from "./Select/select";
import { useAppDispatch } from "../../../../hooks/store";
import { addRow, removeRow } from "../../../../features/justipreciacion/homologacionSlice";
export default function Factores() {
	const dispatch = useAppDispatch();
	return (
		<>
			<div className="d-flex flex-row justify-content-between my-2">
				<button
					className="btn btn-sm btn-outline-success"
					onClick={() => dispatch(addRow())}
				>
					Insertar un Nuevo Comparable a la Fila
				</button>
				<button
					className="btn btn-sm btn-link text-danger"
					onClick={() => dispatch(removeRow())}
				>
					Remover el Ultimo Comparable Insertado
				</button>
			</div>
			<div className="d-flex flex-row justify-content-xxl-between flex-wrap">
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<ClassificationFactor />
				</div>
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<TypeFormFactor />
				</div>
			</div>
			<div className="d-flex flex-row justify-content-xxl-between flex-wrap">
				<LocationFactor />
			</div>
			<div className="d-flex flex-row justify-content-xxl-between flex-wrap">
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<UsageFactor />
				</div>
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<TopographyFactor />
				</div>
			</div>
			<div className="d-flex flex-row justify-content-xxl-between flex-wrap">
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<LevelFactor />
				</div>
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<QualityFactor />
				</div>
			</div>
			<div className="d-flex flex-row justify-content-xxl-between flex-wrap hover">
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<ProjectFactor />
				</div>
				<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
					<BuildingFactor />
				</div>
			</div>
		</>
	);
}

export const AgeFactor = () => (
	<div className="container d-flex flex-row justify-content-xxl-center text-center ">
		<AgeTable />
	</div>
);
export const BuildingFactor = () => <CommonTable id={1} name="Building" />;
export const ClassificationFactor = () => <CommonTable id={2} name="Classification" />;
export const LevelFactor = () => <CommonTable id={3} name="Level" />;
export const ProjectFactor = () => <CommonTable id={4} name="Project" />;
export const QualityFactor = () => <CommonTable id={5} name="Quality" />;
export const TopographyFactor = () => <CommonTable id={6} name="Topography" />;
export const TypeFormFactor = () => <CommonTable id={7} name="TypeForm" />;
export const UsageFactor = () => <CommonTable id={8} name="Usage" />;
export const LocationFactor = () => <SymbolsTable id={9} name="Location" />;
export const ZoneFactor = () => (
	<>
		<ZoneExtraInformationTable />
		<SymbolsTable id={10} name="Zone" />
	</>
);
export const SelectFactors = () => <SelectFactorsComponent />;
