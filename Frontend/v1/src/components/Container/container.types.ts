/** @format */



export interface ContainerProps {
	children: JSX.Element | JSX.Element[];
	header?: JSX.Element | JSX.Element[];
	footer?: JSX.Element | JSX.Element[];
	sidebar?: {
		children: JSX.Element | JSX.Element[];
		position?: "left" | "right";
		outside?: boolean;
	};
}
