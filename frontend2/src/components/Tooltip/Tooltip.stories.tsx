/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tooltip } from "./Tooltip";
import { Tooltip as Tip, OverlayTrigger } from "react-bootstrap";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	subcomponents: { Tip, OverlayTrigger },
	argTypes: {
		id: {
			text: "Tooltip id",
			type: { name: "string", required: true },
			defaultValue: "tooltip",
		},
		placement: {
			text: "Tooltip placement",
			type: { name: "string", required: false },
			defaultValue: "top",
		},
		tooltip: {
			text: "Tooltip text",
			type: { name: "string", required: false },
			defaultValue: "Tooltip",
		},
		customTooltip: {
			text: "Custom tooltip",
			type: { name: "node", required: false },
		},
	},
} as ComponentMeta<typeof Tooltip>;
const Template: ComponentStory<typeof Tooltip> = (args) => (
	<Tooltip {...args}>
		<input className="form-control" />
	</Tooltip>
);
export const Example = Template.bind({});
Example.args = {
	id: "tooltip",
	placement: "top",
	tooltip: "Tooltip",
};
