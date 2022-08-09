/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Container, Header, Body, Footer } from "./Table";

export default {
	title: "Components/Table/Container",
	component: Container,
	subcomponents: { Header, Body, Footer },
	argTypes: {
		type: {
			text: "Table background type",
			type: { name: "string", required: false },
			defaultValue: "light",
		},
		className: {
			text: "Table className property for custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
	},
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => {
	return (
		<Container {...args}>
			<Header {...args}>
				<tr>
					<th>Header 1</th>
					<th>Header 2</th>
				</tr>
			</Header>
			<Body {...args}>
				<tr>
					<td> Body 1</td>
					<td>Body 2</td>
				</tr>
				<tr>
					<td> Body 1</td>
					<td>Body 2</td>
				</tr>
			</Body>
			<Footer {...args}>
				<tr>
					<td>Footer 1</td>
					<td>Footer 2</td>
				</tr>
			</Footer>
		</Container>
	);
};

export const Default = Template.bind({});

Default.args = {
	type: "success",
};
