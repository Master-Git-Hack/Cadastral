/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tooltip } from ".";
import { Tooltip as Component, Whisper } from "rsuite";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	subcomponents: { Component, Whisper },
	argTypes: {
		id: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Tooltip",
		},
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Tooltip",
		},
		tooltip: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Tooltip Message",
		},
		trigger: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "click",
		},
		delay: {
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		placement: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "bottomStart",
		},
		followCursor: {
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;
export const Default = Template.bind({});
Default.args = {
	id: "Tooltip",
	children: "Tooltip",
	tooltip: "Tooltip Message",
};
