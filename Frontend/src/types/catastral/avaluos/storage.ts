/** @format */
import moment from "moment";
/* A way to define a dynamic interface. */
interface StateProps {
	[key: string | number]: number | string | boolean | Object;
}
/* Defining an interface that extends another interface. */
export interface State extends StateProps {
	id: number;
	filename: string;
	document: any;
	showHide: boolean;
	status: string;
	limits: {
		min: number;
		max: number;
	};
	collection: string;
	year: number;
	zoom: number;
	watermark: boolean;
	recommendedProperties: boolean;
	showProperties: boolean;
	moreProperties: {
		pageSize: string;
		dpi: number;
		margins: {
			top: number;
			bottom: number;
			left: number;
			right: number;
		};
	};
}
/* Defining the initial state of the reports. */
export const initialState: State = {
	id: 1,
	filename: `report_${new Date().toISOString()}_temp.pdf`,
	document: "",
	showHide: true,
	status: "working",
	limits: {
		min: 1,
		max: 1,
	},
	collection: "0000",
	year: moment().year(),
	zoom: 1,
	watermark: false,
	recommendedProperties: false,
	showProperties: false,
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
/* Defining the recommended properties for the reports. */
export const recommendedProperties: StateProps = {
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
