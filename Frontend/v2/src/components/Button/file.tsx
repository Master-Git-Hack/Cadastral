/** @format */
import { useState, forwardRef, useEffect, ChangeEventHandler } from "react";
import { Dropdown } from "./dropdown";
import { FileButtonProps } from "./types";
import { UploadIcon, DownloadIcon, DeleteIcon } from "@assets/icons";
import FileSaver from "file-saver";
const emptyFile = [
	{
		label: "Importar",
		value: 0,
		iconPosition: "right",
		icon: <UploadIcon />,
		color: "blue",
	},
];
const witFile = [
	{
		label: "Importar",
		value: 0,
		iconPosition: "right",
		icon: <UploadIcon />,
		color: "blue",
	},
	{
		label: "Descargar",
		value: 1,
		iconPosition: "right",
		icon: <DownloadIcon />,
		color: "green",
	},
	{
		label: "Eliminar",
		value: 2,
		iconPosition: "right",
		icon: <DeleteIcon />,
		color: "red",
	},
];
export const File = forwardRef<HTMLButtonElement, FileButtonProps>(
	(
		{
			children,
			useFilename = false,
			fileType,
			onChange,
			currentFile = null,
			customSaveFile = undefined,
			...props
		}: FileButtonProps,
		ref,
	) => {
		const [file, setFile] = useState<File | null>(currentFile);
		const [options, setOptions] = useState(emptyFile);
		useEffect(() => {
			if (file !== null) {
				setOptions(witFile);
			} else {
				setOptions(emptyFile);
			}
		}, [file]);
		const uploadFile = () => {
			const input = document.createElement("input");
			input.type = "file";
			input.style.display = "none";
			input.accept = `.${fileType ?? "*"}`;
			input.click();
			input.onchange = ({ target: { files } }: ChangeEventHandler<HTMLInputElement>) => {
				setFile(files[0]);
				onChange(files[0]);
			};
		};
		const saveFile = () => FileSaver.saveAs(file, file?.name);
		return (
			<span>
				<Dropdown
					ref={ref}
					{...props}
					options={options}
					onClick={(value: number) => {
						if (value === 0) {
							uploadFile();
						}
						if (value === 1) {
							customSaveFile(file?.name) ?? saveFile();
						}
						if (value === 2) {
							setFile(null);
							onChange(null);
						}
					}}
				>
					<p className="flex flex-row flex-wrap justify-center items-center text-inherit gap-2 ">
						<span className="justify-start">{children ?? "Archivo:"}</span>
						<span className="justify-end underline decoration-1">
							{useFilename && file?.name}
						</span>
					</p>
				</Dropdown>
			</span>
		);
	},
);
File.displayName = "FileButton";
export default File;
//{`grid grid-rows-1  grid-flow-col justify-items-stretch gap-2 text-inherit`}
