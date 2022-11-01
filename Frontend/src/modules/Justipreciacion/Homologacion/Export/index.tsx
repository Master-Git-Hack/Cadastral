/** @format */

import { PopPanel } from "../../../../components/PopPanel";
import { BigPicture } from "../BigPicture";
import { Area } from "../Registros/Area";
import { Indiviso } from "../Registros/Inviso";
import dom2img from "dom-to-image";
import { useEffect, useState, useRef, MutableRefObject, forwardRef } from "react";
import FileSaver from "file-saver";
const Frame = forwardRef((props, ref: any) => (
	<div ref={ref} style={{ pointerEvents: "none", opacity: 0.7 }}>
		<Area.Component viewAs="export" />
		<BigPicture viewAs={"export"} />
		<Indiviso />
	</div>
));
export const ExportComponents = () => {
	const [properties, setProperties] = useState({ x: 0, y: 0, width: 0, height: 0 });
	const frame = useRef<any>(null) as any;
	useEffect(() => {
		if (frame.current) {
			const { x, y, width, height } = frame.current?.getBoundingClientRect() || {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			};

			setProperties({ x, y, width, height });
		}
	}, [properties]);
	return (
		<PopPanel
			btnAppearance="link"
			btnSize="md"
			btnType="info"
			customPanelActions=""
			header=""
			onEnter={() => {
				/*dom2img
					.toBlob(frame.current)
					.then((blob) => blob && FileSaver.saveAs(blob, "my-node.png"));*/
			}}
			placement="right"
			size="full"
		>
			<Frame ref={frame} />
		</PopPanel>
	);
};
