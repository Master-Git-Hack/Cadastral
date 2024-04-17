/** @format */

import moment from "moment";
import { api } from "../../api";
interface Properties {
	[key: string | number]: any;
}

interface Reports extends Properties {
	id: number;
	filename: string;
	document: any;
	status: string;
	limits: Properties;
	collection: number;
	year: number;
	zoom: number;
	watermark: boolean;
	moreProperties: Properties;
}
export interface StateProps extends Properties {
	status: "success" | "loading" | "working" | "fail" | string;
	filename: string;
	reports: Array<Reports>;
	documents: any;
	message: string;
}
export const initialProperties = {
	zoom: 1,
	moreProperties: {
		pageSize: "A4",
		dpi: 300,
		margins: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
	},
};
export const recommendedProperties = {
	zoom: 1.05,
	moreProperties: {
		pageSize: "A4",
		dpi: 1200,
		margins: {
			top: 19,
			bottom: 0,
			left: 10,
			right: 10,
		},
	},
};
const { zoom, moreProperties } = initialProperties;
export const reportsTemplate = (id: number, date: string = moment().toISOString()): Reports => ({
	id,
	filename: `report_${date}_temp.pdf`,
	document: "",
	status: "working",
	message: "",
	limits: {
		min: 1,
		max: 1,
	},
	collection: 0,
	year: moment().year(),
	watermark: false,
	zoom,
	moreProperties,
});
export const name = "Cadastral";
export const consume = api(name);
export const initialState: StateProps = {
	status: "working",
	filename: "",
	reports: [reportsTemplate(1)],
	documents: [],
	message: "",
};
