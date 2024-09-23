/** @format */

import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image, Link } from "@react-pdf/renderer";
const FirstPage = ({ data }) => <Page></Page>;
const groupBy = (data, size = 9) => {
	const group = [];
	for (let i = 0; i < data.length; i += size) {
		const grupo = data.slice(i, i + size);
		group.push(grupo);
	}
	return group;
};
const Cards = ({ data }) => (
	<>
		{data?.map(({ page }, index) => <Page></Page>)}
		<Station />
	</>
);
const Station = ({ data }) => <></>;
export const Reports = ({ data }) => {
	return (
		<Document>
			<FirstPage data={data} />
			<Cards data={groupBy(data)} />
		</Document>
	);
};
