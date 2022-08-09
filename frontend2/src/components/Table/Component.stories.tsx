/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Component, Container, Header, Body, Footer } from "./Table";
export default {
	title: "Components/Table/Component",
	component: Component,
	subcomponents: { Container, Header, Body, Footer },
	argTypes: {
		name: {
			text: "Table name",
			type: { name: "string", required: true },
			defaultValue: "Table Name",
		},
	},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;
const TemplateCustom: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
export const Custom = Template.bind({});
Default.args = {
	name: "Table",
	header: ["Normal Header 1", "Normal Header 2"],
	body: [
		["Normal Body 1", "Normal Body 2"],
		["Normal Body 1", "Normal Body 2"],
	],
	hasFooter: true,
	footer: ["Normal Footer 1", "Normal Footer 2"],
};
Custom.args = {
	name: "Custom Table",
	hasFooter: true,
	customHeader: (
		<div className="row">
			<div className="col">
				<a href="#" className="btn btn-sm btn-link">
					custom Header 1
				</a>
			</div>
			<div className="col">
				<button className="btn btn-sm btn-danger">custom Header 2</button>
			</div>
		</div>
	),
	customBody: (
		<div className="row">
			<div className="row">
				<div className="col">
					<input type="date" className="form-control" />
				</div>
				<div className="col">
					<input type="text" className="form-control" />
				</div>
				<div className="col">
					<input type="password" className="form-control" />
				</div>
				<div className="col">
					<input type="range" className="form-range" />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<input type="date" className="form-control" />
				</div>
				<div className="col">
					<input type="text" className="form-control" />
				</div>
				<div className="col">
					<input type="password" className="form-control" />
				</div>
				<div className="col">
					<input type="range" className="form-range" />
				</div>
			</div>
		</div>
	),
	customFooter: (
		<div className="row">
			<div className="col ">
				<ul className="list-group text-start">
					<li className="list-group-item active">element 1</li>
					<li className="list-group-item">element 2</li>
					<li className="list-group-item">element 3</li>
				</ul>
			</div>
			<div className="col text-center">
				<ul className="list-group ">
					<li className="list-group-item ">element 1</li>
					<li className="list-group-item active">element 2</li>
					<li className="list-group-item ">element 3</li>
				</ul>
			</div>
			<div className="col text-end">
				<ul className="list-group">
					<li className="list-group-item ">element 1</li>
					<li className="list-group-item">element 2</li>
					<li className="list-group-item active">element 3</li>
				</ul>
			</div>
		</div>
	),
};
