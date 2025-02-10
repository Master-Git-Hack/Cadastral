/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from ".";
import { Container as Component, Header, Content, Footer, Sidebar } from "rsuite";
export default {
	title: "Components/Container",
	component: Container,
	subcomponents: { Component, Header, Content, Footer, Sidebar },
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		header: {
			text: "Header",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		footer: {
			text: "Footer",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
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
	},
} as ComponentMeta<typeof Container>;
const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

export const Default = Template.bind({});
export const HeaderFooter = Template.bind({});
export const SidebarLeft = Template.bind({});
export const SidebarRight = Template.bind({});
export const SidebarLeftOutside = Template.bind({});
export const SidebarRightOutside = Template.bind({});

Default.args = {
	children: <div>Default</div>,
};
HeaderFooter.args = {
	children: <div>HeaderFooter</div>,
	header: <div>Header</div>,
	footer: <div>Footer</div>,
};
SidebarLeft.args = {
	children: <div>SidebarLeft</div>,
	sidebar: {
		children: <div>SidebarLeft</div>,
		position: "left",
	},
};
SidebarRight.args = {
	children: <div>SidebarRight</div>,
	sidebar: {
		children: <div>SidebarRight</div>,
		position: "right",
	},
};
SidebarLeftOutside.args = {
	children: <div>SidebarLeftOutside</div>,
	sidebar: {
		children: <div>SidebarLeftOutside</div>,
		position: "left",
		outside: true,
	},
};
SidebarRightOutside.args = {
	children: <div>SidebarRightOutside</div>,
	sidebar: {
		children: <div>SidebarRightOutside</div>,
		position: "right",
		outside: true,
	},
};
