/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import { Button as Action } from "./Button.actions";
export default {
	title: "Components/Button",
	component: Button,
	subcomponents: { Action },
	argTypes: {
		text: {
			text: "Button label",
			type: { name: "string", required: true },
			defaultValue: undefined,
		},
		name: {
			text: "Button name",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		outline: {
			text: "Outline button",
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		className: {
			text: "Button className",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		type: {
			text: "Button type",
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
		actions: {
			text: "Button actions",
			type: { name: "array", required: false },
			defaultValue: undefined,
		},
		customActions: {
			text: "Button custom actions",
			type: { name: "ReactNode[]", required: false },
			defaultValue: undefined,
		},
		onClick: {
			text: "Button onClick event",
			type: { name: "function", required: false },
			action: "clicked",
			defaultValue: () => {},
		},
		//parameters: { actions: { handles: ["mouseover", "click .btn"] } },
	},
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button | typeof Action> = (args) => <Button {...args} />;
const TemplateAction: ComponentStory<typeof Action> = (args) => <Action {...args} />;
export const Success = Template.bind({});
export const OutlineSuccess = Template.bind({});
export const Danger = Template.bind({});
export const OutlineDanger = Template.bind({});
export const Warning = Template.bind({});
export const OutlineWarning = Template.bind({});
export const Info = Template.bind({});
export const OutlineInfo = Template.bind({});
export const Primary = Template.bind({});
export const OutlinePrimary = Template.bind({});
export const Secondary = Template.bind({});
export const OutlineSecondary = Template.bind({});
export const Dark = Template.bind({});
export const OutlineDark = Template.bind({});
export const Light = Template.bind({});
export const OutlineLight = Template.bind({});
export const Link = Template.bind({});
export const LinkDanger = Template.bind({});
export const LinkSuccess = Template.bind({});

export const ActionButton = TemplateAction.bind({});

export const ActionLinkButton = TemplateAction.bind({});
export const ActionCustomButton = TemplateAction.bind({});
Success.args = {
	text: "Button",
	type: "success",
};

OutlineSuccess.args = {
	text: "Button",
	type: "success",
	outline: true,
	onClick: () => alert("Success Outline"),
};
Danger.args = {
	text: "Button",
	type: "danger",
	onClick: () => alert("Danger"),
};
OutlineDanger.args = {
	text: "Button",
	type: "danger",
	outline: true,
	onClick: () => alert("Danger Outline"),
};
Warning.args = {
	text: "Button",
	type: "warning",
	onClick: () => alert("Warning"),
};
OutlineWarning.args = {
	text: "Button",
	type: "warning",
	outline: true,
	onClick: () => alert("Warning Outline"),
};
Info.args = {
	text: "Button",
	type: "info",
	onClick: () => alert("Info"),
};
OutlineInfo.args = {
	text: "Button",
	type: "info",
	outline: true,
	onClick: () => alert("Info Outline"),
};
Primary.args = {
	text: "Button",
	type: "primary",
	onClick: () => alert("Primary"),
};
OutlinePrimary.args = {
	text: "Button",
	type: "primary",
	outline: true,
	onClick: () => alert("Primary Outline"),
};
Secondary.args = {
	text: "Button",
	type: "secondary",
	onClick: () => alert("Secondary"),
};
OutlineSecondary.args = {
	text: "Button",
	type: "secondary",
	outline: true,
	onClick: () => alert("Secondary Outline"),
};
Dark.args = {
	text: "Button",
	type: "dark",
	onClick: () => alert("Dark"),
};
OutlineDark.args = {
	text: "Button",
	type: "dark",
	outline: true,
	onClick: () => alert("Dark Outline"),
};
Light.args = {
	text: "Button",
	type: "light",
	onClick: () => alert("Light"),
};
OutlineLight.args = {
	text: "Button",
	type: "light",
	outline: true,
	onClick: () => alert("Light Outline"),
};
Link.args = {
	text: "Button",
	type: "link",
	onClick: () => alert("Link"),
};
LinkDanger.args = {
	text: "Button",
	type: "link",
	className: "text-danger",
	onClick: () => alert("Link Danger"),
};
LinkSuccess.args = {
	text: "Button",
	type: "link",
	className: "text-success",
	onClick: () => alert("Link Success"),
};
ActionButton.args = {
	text: "Button",
	type: "primary",
	actions: ["element1", "element2"],
	onClick: (action: any, index: number) => alert(`Action ${action} pressed with index ${index}`),
};
ActionLinkButton.args = {
	text: "Button",
	type: "link",
	actions: ["Option 1", "Option 2"],
	onClick: (action: string, index: number) =>
		alert(`Action Link ${action} pressed with index ${index}`),
};
ActionCustomButton.args = {
	text: "Button",
	type: "link",
	customActions: (
		<ul className="list-group">
			<li className="list-group-item active">
				<a href="#" className="text-white">
					Option 1
				</a>
			</li>
			<li className="list-group-item">
				<a href="#" className="list-group-item-action">
					Option 2
				</a>
			</li>
			<li className="list-group-item disabled">
				<a href="#">Option 3</a>
			</li>
		</ul>
	),
};
