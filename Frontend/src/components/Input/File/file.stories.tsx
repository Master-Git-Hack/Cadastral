/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { convert2Base64 } from "../../../utils/file";
import { File } from ".";
export default {
	title: "Components/Input/File",
	component: File,
	argTypes: {
		filename: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		file: {
			control: { type: "file" },
		},
		onChange: {
			control: { type: "function" },
		},
		remove: {
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = (args) => {
	const [file, setFile] = useState<any>(null);
	const [filename, setFilename] = useState("");
	return (
		<File
			{...args}
			filename={filename}
			file={file}
			onChange={async (event) => {
				const { files } = event.target;
				if (files !== null && files.length > 0) {
					setFile(await convert2Base64(files[0]));
					setFilename(files[0].name);
				}
			}}
			remove={() => {
				setFile(null);
				setFilename("");
			}}
		/>
	);
};
export const Default = Template.bind({});
