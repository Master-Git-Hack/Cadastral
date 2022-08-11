/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PaginatedView } from ".";
import { Pagination } from "./Pagination";

export default {
	title: "Components/PaginatedView",
	component: PaginatedView,
	subcomponents: { Pagination },
	argTypes: {
		children: {},
		title: {
			text: "Title",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		footer: {
			text: "Footer",
			control: { type: "text" },
			type: { name: "string", required: false },
		},
		sidebar: {
			children: {
				control: { type: "text" },
				type: { name: "string", required: true },
				defaultValue: "",
			},
			position: {
				text: "Position",
				control: { type: "text" },
				type: { name: "string", required: false },
				defaultValue: "left",
			},
			outside: {
				text: "Outside",
				control: { type: "boolean" },
				type: { name: "boolean", required: false },
				defaultValue: false,
			},
		},
		startAt: {
			text: "Start At",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 1,
		},
		totalPages: {
			text: "Total Pages",
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 100,
		},
		limit: {
			text: "Limit",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 10,
		},
	},
} as ComponentMeta<typeof PaginatedView>;

const Template: ComponentStory<typeof PaginatedView> = (args) => <PaginatedView {...args} />;
export const Default = Template.bind({});
Default.args = {
	children: [
		"Page 0",
		"Page 1",
		"Page 2",
		"Page 3",
		"Page 4",
		"Page 5",
		"Page 6",
		"Page 7",
		"Page 8",
		"Page 9",
		"Page 10",
	],
	title: "Paginated View",
	footer: "Footer",
	startAt: 5,
	totalPages: 100,
};
