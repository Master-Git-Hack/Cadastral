/** @format */
import blankDocument from "../../../assets/documents/blank.pdf";
import { Spinner } from "../../spinner/spinner";

export const Viewer = (props: { document: any; status: string }) => (
	<div className="embed-responsive">
		{props.status.includes("complete") || props.status.includes("working") ? (
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
		) : (
			<Spinner />
		)}
	</div>
);
