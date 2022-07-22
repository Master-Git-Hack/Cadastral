/** @format */

import { PillProps } from "./PIll.types";

export const Pill = (props: PillProps): JSX.Element => (
	<small className={`badge rounded-pill my-auto bg-${props.type} ${props.className}`}>
		{props.text}
	</small>
);
