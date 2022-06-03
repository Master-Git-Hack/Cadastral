/** @format */

export interface Storage {
	id: number;
	status: "unset" | "success" | "fail" | "loading" | "working";
	message: string;
	registro: string;
	sp1_vu?: number;
	sp1_factor?: number;
	sp1_superficie?: number;
	comparativo_mercado?: number;
	cna_edad?: number;
	cna_superficie?: number;
	valor_total_obras_comp?: number;
}
