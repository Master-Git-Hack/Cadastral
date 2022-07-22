/** @format */

export interface Storage {
	titulo: string;
	data: Array<any>;
	status: "unset" | "success" | "fail" | "loading" | "working";
	message: string;
	factorGTO: any;
	total: number;
	redondeo: number;
	record: {
		id: number;
		register: string;
		status: "newOne" | "update" | "delete";
	};
	handlers: any;
}
