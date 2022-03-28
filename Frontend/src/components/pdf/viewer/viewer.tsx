/** @format */
import blankDocument from "../../../assets/documents/blank.pdf";
export const Viewer = (props: { document: any; status: string }) => (
	<div className="embed-responsive">
		<iframe
			title="PDF Viewer"
			className="embed-responsive-item"
			data-type="application/pdf"
			width="100%"
			height="630"
			src={props.status === "complete" ? props.document : blankDocument}
			allow="clipboard-write; encrypted-media;"
			allowFullScreen
		/>
	</div>
);
