/** @format */

import { Calculation } from "./Area.calc";
import { Documentation } from "./Area.doc";
import { Zone } from "./Area.zone";

/** @format */
export const Component = () => (
	<div className="d-flex flex-column flex-fill flex-wrap">
		<Documentation />
		<Calculation />
	</div>
);
export const Area = { Zone, Documentation, Calculation, Component };
