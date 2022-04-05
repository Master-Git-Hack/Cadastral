/** @format */
import { Header, Body, SingleColumnInARow, Footer, Table } from "../table/Table";
import { ZoneExtraInformationTable } from "./documentation/area";
import { AgeTable, CommonTable, SymbolsTable } from "./factors/tables";
import { SelectFactorsComponent } from "./factors/select";
import { useAppDispatch } from "../../hooks/store";
import { addRow, removeRow } from "../../features/homologation/slice";
export default function Factors() {
	const dispatch = useAppDispatch();
	return (
		<Table>
			<Header>
				<tr>
					<th className="text-start">
						<button
							className="btn btn-sm btn-primary"
							onClick={() => dispatch(addRow())}
						>
							Agregar Fila
						</button>
					</th>
					<th className="text-end">
						<button
							className="btn btn-sm btn-outline-danger"
							onClick={() => dispatch(removeRow())}
						>
							Remover Fila
						</button>
					</th>
				</tr>
			</Header>
			<Body>
				{/*<SingleColumnInARow colSpan={2}>
					<AgeFactor />
				</SingleColumnInARow> */}
				<SingleColumnInARow colSpan={2}>
					<ClassificationFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<TypeFormFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<UsageFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<TopographyFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<LevelFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<QualityFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<ProjectFactor />
				</SingleColumnInARow>

				<SingleColumnInARow colSpan={2}>
					<BuildingFactor />
				</SingleColumnInARow>
			</Body>
		</Table>
	);
}

export const AgeFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<AgeTable />
	</div>
);
export const BuildingFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={1} name="Building" />
	</div>
);
export const ClassificationFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={2} name="Classification" />
	</div>
);

export const LevelFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={3} name="Level" />
	</div>
);

export const ProjectFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={4} name="Project" />
	</div>
);

export const QualityFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={5} name="Quality" />
	</div>
);

export const TopographyFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={6} name="Topography" />
	</div>
);

export const TypeFormFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={7} name="TypeForm" />
	</div>
);

export const UsageFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<CommonTable id={8} name="Usage" />
	</div>
);

export const LocationFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<SymbolsTable id={9} name="Location" />
	</div>
);
export const ZoneFactor = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<SymbolsTable id={10} name="Zone" />
	</div>
);

export const LocationZoneFactor = () => (
	<div className="col justify-content-center px-5 my-3 mx-5">
		<LocationFactor />
		<ZoneExtraInformationTable />
		<ZoneFactor />
	</div>
);
export const SelectFactors = () => (
	<div className="col d-flex justify-content-center px-5 my-3 mx-5">
		<SelectFactorsComponent />
	</div>
);
