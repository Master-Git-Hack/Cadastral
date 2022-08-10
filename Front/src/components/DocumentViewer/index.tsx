/** @format */

import { DocumentViewerProps } from "./index.types";
import { Spinner } from "../Spinner";
import { Alert } from "../Alert";
import blankDocument from "../../assets/docs/blank.pdf";
export const DocumentViewer = ({
	document,
	status,
	width,
	height,
}: DocumentViewerProps): JSX.Element => {
	const currentDoc = (document !== "" && document) ?? blankDocument;
	return (
		<div className="embed-responsive">
			{(status.includes("success") || status.includes("working")) && (
				<iframe
					title="PDF Viewer"
					className="embed-responsive-item"
					data-type="application/pdf"
					width={width && "100%"}
					height={height && "675"}
					seamless={true}
					src={`${currentDoc}#zoom=${window.innerWidth * 0.03}`}
					allow="clipboard-write; encrypted-media;"
					allowFullScreen
					scrolling="no"
				/>
			)}
			{status.includes("loading") && <Spinner />}
			{status.includes("fail") && (
				<Alert type="error">Algo fallo, favor de intentar más tarde.</Alert>
			)}
		</div>
	);
};
