/** @format */

import { Loader } from "rsuite";
import { SpinnerProps } from "./spinner.types";

export const Spinner = ({
	backdrop,
	center,
	children,
	inverse,
	size,
	speed,
	vertical,
}: SpinnerProps): JSX.Element => (
	<Loader
		backdrop={backdrop}
		center={center ?? true}
		content={children ?? "Cargando..."}
		inverse={inverse}
		size={size}
		speed={speed ?? "slow"}
		vertical={vertical ?? true}
	/>
);
