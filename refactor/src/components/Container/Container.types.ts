/** @format */

import { MouseEventHandler } from "react";
/** @format */

export interface ContainerProps {
	header?: JSX.Element;
	title?: string;
	titleStrong?: string;
	errors?: Array<any>;
	startAt?: number;
	showErrors?: boolean;
	dataLimit: number;
	data: Array<any>;
	pageLimit: number;
	saveBtn?: boolean;
	saveBtnText?: string;
	saveOnClick?: MouseEventHandler<HTMLButtonElement>;
	fixedTop?: boolean;
	width?: number;
	height?: number;
	hidePage?: number;
	addBtn?: boolean;
	addOnClick?: MouseEventHandler<HTMLButtonElement> | any;
	rmBtn?: boolean;
	rmOnClick?: MouseEventHandler<HTMLButtonElement>;
}
