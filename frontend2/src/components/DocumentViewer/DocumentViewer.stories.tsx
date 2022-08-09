/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DocumentViewer } from "./DocumentViewer";
import { Spinner } from "../Spinner/Spinner";
export default {
	title: "Components/Document Viewer",
	component: DocumentViewer,
	subcomponents: { Spinner },
	argTypes: {
		document: {
			text: "Document",
			defaultValue:
				"blob:http://172.31.103.25/static/media/blank.f611a64e5c23853d48da.pdf#zoom=72",
		},
		status: {
			text: "Status",
			type: { name: "string", required: true },
			defaultValue: "loading",
		},
		width: {
			text: "Width",
			type: { name: "number", required: false },
			defaultValue: "100%",
		},
		height: {
			text: "Height",
			type: { name: "number", required: false },
			defaultValue: "675",
		},
	},
} as ComponentMeta<typeof DocumentViewer>;

const Template: ComponentStory<typeof DocumentViewer> = (args) => (
	<DocumentViewer {...args} document="" />
);
export const Loading = Template.bind({});
export const Success = Template.bind({});
export const Fail = Template.bind({});
export const Working = Template.bind({});
Loading.args = {
	status: "loading",
};
Success.args = {
	status: "success",
};
Fail.args = {
	status: "fail",
};
Working.args = {
	status: "working",
};
