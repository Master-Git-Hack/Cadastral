/** @format */

import { DocumentViewerProps } from "./documentViewer.types";
import { Spinner } from "../Spinner";
import { Alert } from "../Alert";
import blankDocument from "../../assets/docs/blank.pdf";
export const DocumentViewer = ({
	document,
	status,
	width,
	height,
}: DocumentViewerProps): JSX.Element => {
	const currentDoc = status.includes("success") && document !== "" ? document : blankDocument;
	return (
		<div className="d-flex justify-content-center flex-fill embed-responsive">
			{(status.includes("success") || status.includes("working")) && (
				<iframe
					title="PDF Viewer"
					className="embed-responsive-item"
					data-type="application/pdf"
					width={width ?? window.innerWidth}
					height={height ?? window.innerHeight * 0.8}
					seamless={true}
					src={`${currentDoc}#zoom=${window.innerWidth * 0.05}`}
					allow="clipboard-write; encrypted-media;"
					allowFullScreen
					scrolling="no"
				/>
			)}
			{status.includes("loading") && <Spinner backdrop size="lg" />}
			{status.includes("fail") && (
				<Alert type="error">Algo fallo, favor de intentar más tarde.</Alert>
			)}
		</div>
	);
};
