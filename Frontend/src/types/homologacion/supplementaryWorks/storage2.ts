/** @format */

import { DataProperties, dataTemplate } from "./Properties/data";
import {
	BigPictureProperties,
	bigPictureTemplate,
	StateOfConservationProperties,
	stateOfConservation as options,
} from "./Properties/bigPicture";
import { getParams } from "../../../utils/utils";

interface RecordProperties {
	id: number;
	register: string;
	type: string;
}
interface StateProperties {
	id: string;
	data: Array<DataProperties>;
	bigPicture: Array<BigPictureProperties>;
	total: number;
	status: string;
	record: RecordProperties;
	dataTemplate: Function;
	bigPictureTemplate: Function;
	getTotal: Function;
	options: Array<StateOfConservationProperties>;
}
const getTotal = (data: Array<BigPictureProperties>): number =>
	data.reduce(
		(previous: number, current: BigPictureProperties) => previous + Number(current.total),
		0,
	);
export const initialState: StateProperties = {
	id: getParams("id"),
	data: [dataTemplate(1)],
	bigPicture: [bigPictureTemplate(1)],
	total: 1,
	status: "working",
	record: {
		id: 0,
		register: "",
		type: "newOne",
	},
	dataTemplate,
	bigPictureTemplate,
	getTotal,
	options,
};
