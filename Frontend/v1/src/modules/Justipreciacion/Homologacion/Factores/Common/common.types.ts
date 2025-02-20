/** @format */

export interface CommonProps {
	name: string;
}

export interface HeaderProps extends CommonProps {}
export interface BodyProps extends CommonProps {
	tag: string;
	subject: any;
	options: any[];
	data: any[];
}
