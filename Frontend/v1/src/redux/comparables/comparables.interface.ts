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
	zoom: number;
    moreProperties: Properties;
    
    folio: string;
    type: "terreno" | "ventas"|"rentas"

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
	zoom: 0.7,
	moreProperties: {
		pageSize: "A4",
		dpi: 1200,
		margins: {
			top: 10,
			bottom: 10,
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
	
    zoom,
    moreProperties,
    folio: "",
    type: "terreno"
});
export const name = "Comparables";
export const consume = api(name);
export const initialState: StateProps = {
	status: "working",
	filename: "",
	reports: [reportsTemplate(1)],
	documents: [],
	message: "",
};
