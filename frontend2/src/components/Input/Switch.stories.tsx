/** @format */
import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Switch } from "./Input";

export default {
	title: "Components/Input/Switch",
	component: Switch,

	argTypes: {
		index: {
			text: "Input index",
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		name: {
			text: "Input name",
			type: { name: "string", required: true },
			defaultValue: "input",
		},
		label: {
			text: "Input label",
			type: { name: "string", required: true },
			defaultValue: "Input",
		},
		onChange: {
			text: "Input onChange event",
			type: { name: "function", required: true },
			action: "changed",
		},
		className: {
			text: "Input className custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},

		checked: {
			text: "Input checked",
			type: { name: "boolean", required: true },
			defaultValue: false,
		},
		type: {
			text: "Input type",
			type: { name: "string", required: true },
			defaultValue: "switch",
		},
	},
} as ComponentMeta<typeof Switch>;
const Template: ComponentStory<typeof Switch> = (args) => {
	const [checked, setChecked] = useState(args.checked ?? false);
	return <Switch {...args} checked={checked} onChange={(event: any) => setChecked(!checked)} />;
};

export const SwitchInput = Template.bind({});
SwitchInput.args = {
	name: "Switch",
	type: "switch",
	label: "Switch",
};
