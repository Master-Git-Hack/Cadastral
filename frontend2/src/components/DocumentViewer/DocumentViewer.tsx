/** @format */
import { Spinner } from "../Spinner/Spinner";
import { DocumentViewerProps } from "./DocumentViewer.types";
//import blankDocument from "../../../public/assets/documents/blank.pdf";
export const DocumentViewer = (props: DocumentViewerProps): JSX.Element => {
	const { status, width, height } = props;
	const document =
		props.document !== "" && props.document !== undefined
			? props.document
			: "blob:http://172.31.103.25/static/media/blank.f611a64e5c23853d48da.pdf";
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
					src={`${document}#zoom=${window.innerWidth * 0.03}`}
					allow="clipboard-write; encrypted-media;"
					allowFullScreen
					scrolling="no"
				/>
			)}
			{status.includes("loading") && <Spinner />}
			{status.includes("fail") && <>Something went wrong at loading, try later.</>}
		</div>
	);
};
