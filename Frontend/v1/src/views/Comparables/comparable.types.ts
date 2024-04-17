export interface ComparableProps { 	id: number;
	filename: string;
	status: string;
	message: string;
	document: any;
	folio: string;
	type: "terreno" | "ventas" | "rentas";
	zoom: number;
	moreProperties: any;}