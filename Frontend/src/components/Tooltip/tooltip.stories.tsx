/** @format */

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tooltip } from ".";
export default {
	title: "Components/Tooltip",
	component: Tooltip,
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Tooltip",
		},

		placement: {
			control: { type: "select" },
			options: [
				"top",
				"right",
				"bottom",
				"left",
				"top-start",
				"top-end",
				"bottom-start",
				"bottom-end",
				"right-start",
				"right-end",
				"left-start",
				"left-end",
			],
			defaultValue: "bottomStart",
		},
		helpText: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Help Text",
		},
	},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args}></Tooltip>;
export const Default = Template.bind({});
