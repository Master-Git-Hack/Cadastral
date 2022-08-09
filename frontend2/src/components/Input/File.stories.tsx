/** @format */
import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { File } from "./Input";
import { utils } from "../../utils/utils";

export default {
	title: "Components/Input/File",
	component: File,
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
		},
		className: {
			text: "Input className custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		filename: {
			text: "Input filename",
			type: { name: "string", required: false },
			defaultValue: "file",
		},
		remove: {
			text: "Input remove",
			type: { name: "function", required: false },
			defaultValue: undefined,
		},
	},
} as ComponentMeta<typeof File>;
const Template: ComponentStory<typeof File> = (args) => {
	const [file, setFile] = useState<any>(null);
	const [filename, setFilename] = useState<string>("");
	return (
		<div className="input-group mx-2 d-inline">
			<File
				name="File"
				label="File"
				filename={filename}
				value={file}
				onChange={async (event: any) => {
					const { files } = event.currentTarget;
					if (files !== null && files.length > 0) {
						setFilename(files[0].name);
						const data = await utils.convert2Base64(files[0]);
						setFile(data);
					}
				}}
				remove={() => setFile(null)}
			/>
		</div>
	);
};

export const FileInput = Template.bind({});
FileInput.args = {
	name: "File",
	label: "File",
	filename: "file",
};
