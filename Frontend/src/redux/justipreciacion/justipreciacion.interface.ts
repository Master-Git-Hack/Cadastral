/** @format */

import { getURLParams } from "../../utils/url";

/** @format */
export interface StateProps {
	id: number;
	status: "unset" | "success" | "fail" | "loading" | "working";
	message: string;
	registro: string;

	sp1_vu?: number;
	sp1_factor?: number;
	sp1_superficie?: number;

	sp2_vu?: number;
	sp2_factor?: number;
	sp2_superficie?: number;

	sp3_vu?: number;
	sp3_factor?: number;
	sp3_superficie?: number;

	sp4_vu?: number;
	sp4_factor?: number;
	sp4_superficie?: number;

	comparativo_mercado?: number;

	cna_edad?: number;
	cna_superficie?: number;
	justipreciacioncna_vu?: number;

	cnb_edad?: number;
	cnb_superficie?: number;
	justipreciacioncnb_vu?: number;

	cnc_edad?: number;
	cnc_superficie?: number;
	justipreciacioncnc_vu?: number;

	cnd_edad?: number;
	cnd_superficie?: number;
	justipreciacioncnd_vu?: number;

	valor_total_obras_comp?: number;
	tipo: string | number;
} /*
const tipo = (): number | string => {
	const dato = getURLParams("tipo");
	const terreno = [1, 2, 3, 4]
		.map((item: number) => getURLParams(`sp${item}_superficie`))
		.filter((item: string) => item !== "");
	return 1;
};
*/
export const initialState: StateProps = {
	id: 0,
	status: "unset",
	message: "",
	registro: "",
	tipo: "",
};
