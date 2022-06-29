/** @format */
import blankDocument from "../../../assets/documents/blank.pdf";
import { Spinner } from "../../spinner/spinner";

export const Viewer = (props: { document: any; status: string }) => (
	<div className="embed-responsive">
		{(props.status.includes("complete") || props.status.includes("working")) && (
			<iframe
				title="PDF Viewer"
				className="embed-responsive-item"
				data-type="application/pdf"
				width="100%"
				height="675"
				seamless={true}
				src={`${props.status === "complete" ? props.document : blankDocument}#zoom=${
					window.innerWidth * 0.03
				}`}
				allow="clipboard-write; encrypted-media;"
				allowFullScreen
				scrolling="no"
			/>
		)}
		{props.status.includes("loading") && <Spinner />}
		{props.status.includes("fail") && <>Something went wrong at loading, try later.</>}
	</div>
);
