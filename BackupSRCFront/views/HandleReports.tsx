/** @format */
import { useEffect } from "react";
import { DocumentProperties } from "../components/handleReports/documentProperties";
import { selector, getReportsJoined } from "../features/handleReports/slice";
import { useAppSelector, useAppDispatch } from "../hooks/store";
import FileSaver from "file-saver";

export default function HandleReports() {
	const state = useAppSelector(selector);
	const { status, document, filename } = state;
	const dispatch = useAppDispatch();
	console.log(document, status);
	useEffect(() => {
		if (status === "complete") {
			FileSaver.saveAs(document, filename);
			setTimeout(() => window.location.reload(), 5000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);
	return (
		<div className="px-3">
			<DocumentProperties saveButton={SaveButton({ state, dispatch })} />
		</div>
	);
}
const SaveButton = (props: { state: any; dispatch: Function }) => (
	<button
		onClick={() => props.dispatch(getReportsJoined(props.state))}
		className="btn btn-sm btn-success"
	>
		Descargar Documento
	</button>
);
