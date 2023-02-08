/** @format */
import { Color, Appearance } from "./color.interfaces";
export const colorPicker: Color = {
	danger: "red",
	success: "green",
	warning: "yellow",
	info: "cyan",
	primary: "blue",
	secondary: "violet",
	orange: "orange",
};
export const appearancePicker: Appearance = {
	default: "default",
	primary: "primary",
	link: "link",
	light: "subtle",
	outline: "ghost",
};
export const colorAlertPicker: { [key: string]: string } = {
	success: "#188754",
	danger: "#dc3546",
	warning: "#f39c12",
	info: "#00c0ef",
	primary: "#3c8dbc",
	secondary: "#6c757e",
	light: "#f8f9fb",
	dark: "#212429",
};
