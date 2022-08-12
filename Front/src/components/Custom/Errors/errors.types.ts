
/** @format */

export interface ErrorsProps {
	title: string;
	message: string;
	reference: string;
}
export interface AlertProps {
	name: string;
	errors?: ErrorsProps[];
	show?: boolean;
}
