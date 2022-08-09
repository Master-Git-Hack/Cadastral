/** @format */

import React, { useState, useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from "./Modal";
import { Modal as Component } from "../../Modal/Modal";
import { Input } from "../../Input/Input";
export default {
	title: "Components/Justify Changes",
	component: Modal,
	subcomponents: { Component, Input },
	argTypes: {
		type: {
			text: "Modal types",
			type: { name: "string", required: true },
			defaultValue: "primary",
		},
		action: {
			text: "Modal action",
			type: { name: "string", required: true },
			defaultValue: "some action",
		},
		name: {
			text: "Modal name",
			type: { name: "string", required: true },
			defaultValue: "some name",
		},
		editable: {
			text: "Modal editable",
			type: { name: "boolean", required: true },
			defaultValue: true,
		},
		setEditable: {
			text: "Modal setEditable",
			type: { name: "function", required: true },
			defaultValue: () => {},
		},
		comment: {
			text: "Modal comment",
			type: { name: "string", required: true },
			defaultValue: "some comment",
		},
		setComment: {
			text: "Modal setComment",
			type: { name: "function", required: true },
			defaultValue: () => {},
		},
		children: {
			text: "Modal children",
			type: { name: "array", required: true },
			defaultValue: [],
		},
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
	const [editable, setEditable] = useState(false);
	const [comment, setComment] = useState("");
	useEffect(() => {
		args.editable !== editable && setEditable(args.editable!);
		args.comment !== comment && setComment(args.comment!);
	}, []);
	return (
		<Modal
			{...args}
			editable={editable}
			comment={comment}
			setEditable={() => setEditable(!editable)}
			setComment={(event: any) => setComment(event.currentTarget.value)}
		/>
	);
};
export const Example = Template.bind({});
Example.args = {
	children: <input className="form-control" />,
	action: "press me",
	name: "justify changes of values",
	editable: false,
	comment: "some comment",
};
