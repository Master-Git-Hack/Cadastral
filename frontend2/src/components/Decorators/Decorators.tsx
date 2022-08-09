/** @format */

import { DecoratorM2Props } from "./Decorators.types";

export const M2 = (props: DecoratorM2Props) => (
	<>
		{props?.text}
		{"m"[`to${props?.mayus ? "Upper" : "Lower"}Case`]()}
		<sup>{props?.type ?? 2}</sup>
	</>
);
