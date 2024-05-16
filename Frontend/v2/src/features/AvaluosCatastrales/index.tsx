/** @format */
import { Avaluo } from "./avaluo";
import Spinner from "@components/Spinner";
import { Table, Button, Checkbox } from "flowbite-react";
import { useGetReporteMutation } from "@api/Catastral";
import { PDFViewer } from "@react-pdf/renderer";
import moment from "moment";
import { useState } from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { Report } from "./report";
export const AvaluosCatastrales = () => {
	const [registro, setRegistro] = useState({
		collection: 70,
		from: 1,
		to: 67,
		year: moment().year() % 100,
	});
	const handleRegistro = (e) => setRegistro({ ...registro, [e.target.name]: e.target.value });
	const [requestRegistro, { data, isLoading, isSuccess, isError }] = useGetReporteMutation();
	const [properties, setProperties] = useState({
		page: {
			fontFamily: "Helvetica",
			fontWeight: "normal",
			fontStyle: "normal",
			fontSize: 7,
		},
		table: {
			width: "auto",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			border: "1px solid #EEE",
			marginHorizontal: "0.35cm",
			marginVertical: "0.45cm",
		},
		row: {
			display: "flex",
			flexDirection: "row",
			margin: "auto",
		},
		header: {
			fontSize: 14,
			fontWeight: "heavy",
			textTransform: "uppercase",
			padding: "0.1cm",
		},
		cell: {
			width: "1.4cm",
			padding: "0.1cm",
		},
		doubleCell: {
			width: "2.8cm",
			padding: "0.1cm",
		},
		tripleCell: {
			width: "4.2cm",
			padding: "0.1cm",
		},
		quadrupleCell: {
			width: "5.6cm",
			padding: "0.1cm",
		},
		quintupleCell: {
			width: "7cm",
			padding: "0.1cm",
		},
		sextupleCell: {
			width: "8.4cm",
			padding: "0.1cm",
		},
		septupleCell: {
			width: "9.8cm",
			padding: "0.1cm",
		},
		octupleCell: {
			width: "11.2cm",
			padding: "0.1cm",
		},
		nonupleCell: {
			width: "12.6cm",
			padding: "0.1cm",
		},
		decupleCell: {
			width: "14cm",
			padding: "0.1cm",
		},
		undecupleCell: {
			width: "15.4cm",
			padding: "0.1cm",
		},
		duodetupleCell: {
			width: "16.8cm",
			padding: "0.1cm",
		},
		gap: {
			width: "0.7cm",
		},
		ID: {
			fontSize: 18,
			padding: "0.1cm",
			color: "#FFF",
		},
		title: {
			fontFamily: "Helvetica-Bold",
			fontWeight: "bold",
			fontStyle: "italic",
			fontSize: 9,
		},
		textLeft: {
			textAlign: "left",
		},
		textRight: {
			textAlign: "right",
		},
		textCenter: {
			textAlign: "center",
		},
		image: {
			width: "9.8cm",
			padding: "0.1cm",
			height: "6.3cm",
			border: "1px solid #000",
		},
		border: {
			border: "1px solid #000",
		},
		borderLeft: {
			borderLeft: "1px solid #000",
		},
		borderRight: {
			borderRight: "1px solid #000",
		},
		borderBottom: {
			borderBottom: "1px solid #000",
		},
		borderTop: {
			borderTop: "1px solid #000",
		},
		borderHorizontal: {
			borderLeft: "1px solid #000",
			borderRight: "1px solid #000",
		},
		borderVertical: {
			borderTop: "1px solid #000",
			borderBottom: "1px solid #000",
		},
	});
	const styles = StyleSheet.create(properties);
	return (
		<div className="overflow-auto">
			<Avaluo setRegistro={handleRegistro} {...registro} />
			<div className="flex flex-row-reverse py-2">
				<Button pill color="light" onClick={() => requestRegistro(registro)}>
					Generar
				</Button>
			</div>
			{isLoading && <Spinner size={20} />}
			{isSuccess && (
				<PDFViewer width="100%" height="100%" className="w-full  min-h-screen">
					<Report data={data?.data} styles={styles} />
				</PDFViewer>
			)}
		</div>
	);
};
export default AvaluosCatastrales;
