/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pagination } from ".";
import { Pagination as Component } from "rsuite";

export default {
	title: "Components/PaginatedView/Pagination",
	component: Pagination,
	subcomponents: { Component },
	argTypes: {
		activePage: {
			text: "Active Page",
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 1,
		},
		limit: {
			text: "Limit",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 10,
		},
		totalPages: {
			text: "Total Pages",
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 100,
		},
		maxButtons: {
			text: "Max Buttons",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 5,
		},
		size: {
			text: "Size",
			control: { type: "select" },

			defaultValue: "md",
		},
		onChangePage: {
			text: "On Change",
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;
export const Default = Template.bind({});
Default.args = {
	activePage: 1,
	limit: 10,
	totalPages: 100,
	maxButtons: 5,
	size: "md",
	onChangePage: (page: number) => console.log(page),
};
