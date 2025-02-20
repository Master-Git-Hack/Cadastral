/** @format */

import { DecoratorM2Props } from "./decorators.types";

export const M2 = (props: DecoratorM2Props) => (
	<p className={props?.className} style={props?.style}>
		<span>
			{props?.text}
			{"m"[`to${props?.mayus ? "Upper" : "Lower"}Case`]()}
			<sup>{props?.type ?? 2}</sup>
		</span>
	</p>
);
