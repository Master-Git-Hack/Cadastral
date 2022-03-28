/** @format */
import moment from "moment";
interface StateProps {
	[key: string | number]: number | string | boolean | Object;
}
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
export const initialStateReports: State = {
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
