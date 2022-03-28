/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	value: number;
}

export interface CommercialProps {
	name: string;
	tag: string;
	data: Array<State>;
	isUsed: boolean;
	handleInsert:Function;
}
export const commercialData = (id: number): State => ({
	id,
	value: 0.95,
});
export const commercialTemplate: CommercialProps = {
	name: "Comercial",
	tag: "FCom.",
	data: [commercialData(1)],
	isUsed: true,
	handleInsert:commercialData
};
