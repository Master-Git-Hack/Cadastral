/** @format */
import moment from "moment";
/* A way to define a dynamic interface. */
interface StateProps {
	[key: string | number]: any;
}
/* Defining an interface that extends another interface. */
export interface State extends StateProps {
	id: number;
	filename: string;
	document: any;
	status: string;
	limits: StateProps;
	collection: number;
	year: number;
	zoom: number;
	watermark: boolean;
	moreProperties: StateProps;
}

export const initialProperties: StateProps = {
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

/* Defining the initial state of the reports. */
export const initialState: State = {
	id: 1,
	filename: `report_${new Date().toISOString()}_temp.pdf`,
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
	zoom: initialProperties.zoom,
	moreProperties: initialProperties.moreProperties,
};
