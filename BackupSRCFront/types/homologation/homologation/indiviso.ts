/** @format */

export interface IndivisoProps {
	[key: string]: number;
}
export const indivisoTemplate = (type: string = "TERRENO" || "RENTA"): IndivisoProps =>
	type === "TERRENO"
		? {
				surface: 1,
				private: 1,
				indiviso: 1,
				result: 1,
		  }
		: {};
