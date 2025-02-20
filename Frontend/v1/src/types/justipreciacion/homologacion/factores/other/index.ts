/** @format */

import { FactorsProps } from "../";
import { getURLParams } from "../../../../../utils/url";

const template = (id: number) => ({
	id,
	result: 1.0,
});

const initialState: FactorsProps = {
	name: "Otro",
	tag: "FOtro",
	isUsed: true,
	position: 14,
	data: [template(1), template(2), template(3), template(4)],
};
export const other = {
	template,
	initialState,
};
