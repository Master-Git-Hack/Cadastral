/** @format */
import { Area } from "../Registros/Areas/Area";
import { Age } from "./Factores.Age";
import { Common } from "./Factores.Common";
import { Container, LocationZoneProps } from "./Factores.types";
import { Symbols } from "./Factors.Symbols";
import { Selection } from "./Factors.Selection";

const CommonContainer = (props: Container) => (
	<div className="d-flex flex-row justify-content-xxl-between flex-wrap">
		<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
			<Common name={props.component1} />
		</div>
		<div style={{ width: 600 }} className="d-flex flex-column flex-fill mx-1">
			<Common name={props.component2} />
		</div>
	</div>
);
const SymbolContainer = (props: LocationZoneProps) => (
	<div className="d-flex flex-row justify-content-center flex-fill">
		<Symbols name={props.name} />
	</div>
);
export const Compilation = () => (
	<>
		<CommonContainer component1="Classification" component2="TypeForm" />
		<SymbolContainer name="Location" />
		<CommonContainer component1="Usage" component2="Topography" />
		<CommonContainer component1="Level" component2="Quality" />
		<CommonContainer component1="Project" component2="Building" />
	</>
);
export const AgeContainer = (props: { type: string }) => (
	<div className="d-flex flex-column justify-content-center flex-fill">
		{!props.type.includes("TERRENO") && <Age />}
		<Area.Zone />
		<Symbols name="Zone" />
	</div>
);
export const Factors = { Age, Common, Symbols, Compilation, AgeContainer, Selection };
