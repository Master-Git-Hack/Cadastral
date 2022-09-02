/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PopPanel } from ".";
export default {
	title: "Components/PopPanel",
	component: PopPanel,
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},

		placement: {
			control: { type: "select" },
			type: { name: "string", required: false },
			defaultValue: "right",
		},
		size: {
			control: { type: "select" },
			type: { name: "string", required: false },
			defaultValue: "xs",
		},
		header: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		customPanelActions: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		action: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		btnType: {
			control: { type: "select" },
			type: { name: "string", required: false },
			defaultValue: "button",
		},
		btnAppearance: {
			control: { type: "select" },
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
		block: {
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		loading: {
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		btnSize: {
			control: { type: "select" },
			type: { name: "string", required: false },
			defaultValue: "xs",
		},
	},
} as ComponentMeta<typeof PopPanel>;

const Template: ComponentStory<typeof PopPanel> = (args) => <PopPanel {...args} />;
export const Default = Template.bind({});
