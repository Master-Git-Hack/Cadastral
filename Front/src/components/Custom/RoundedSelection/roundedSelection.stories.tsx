/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../../Dropdown";
import { RoundedSelection } from ".";

export default {
	title: "Custom/RoundedSelection",
	component: RoundedSelection,
	subcomponents: { Dropdown },
	argTypes: {
		currentItem: {
			text: "Dropdown ActiveKey",
			control: { type: "number" },
			defaultValue: 0,
		},
		onSelect: {
			text: "Dropdown OnSelect",
			control: { type: "function" },
			defaultValue: (eventKey: string, event: any) => {
				alert(eventKey);
			},
		},
	},
} as ComponentMeta<typeof RoundedSelection>;
const Template: ComponentStory<typeof RoundedSelection> = (args) => <RoundedSelection {...args} />;
export const Default = Template.bind({});

Default.args = {
	currentItem: 0,
};
