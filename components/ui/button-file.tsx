/** @format */
"use client";
import { useState, forwardRef, useEffect, ChangeEventHandler } from "react";
import { UploadIcon, DownloadIcon, DeleteIcon } from "@assets/icons";
import { cn } from "@utils/index";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const emptyFile = [
	{
		label: "Importar",
		value: 0,
		icon: <UploadIcon />,
		color: "blue",
	},
];
const withFile = [
	{
		label: "Importar",
		value: 0,
		icon: <UploadIcon />,
		color: "text-blue-400 hover:text-blue-600",
	},
	{
		label: "Descargar",
		value: 1,
		icon: <DownloadIcon />,
		color: "text-green-400 hover:text-green-600",
	},
	{
		label: "Eliminar",
		value: 2,
		icon: <DeleteIcon />,
		color: "text-red-400 hover:text-red-600",
	},
];
export const FileButton = forwardRef<HTMLInputElement, {}>(
	(
		{
			children,
			useFilename = false,
			fileType,
			onChange,
			currentFile = null,
			customSaveFile = undefined,
			...props
		},
		ref,
	) => {
		const [file, setFile] = useState<File | null>(currentFile);
		const [options, setOptions] = useState(emptyFile);
		const [isOpen, setIsOpen] = useState(false);
		useEffect(() => {
			setOptions(file !== null ? withFile : emptyFile);
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
		// const saveFile = () => saveAs(file, file?.name);
		const saveFile = () => {
			const blob = new Blob(file, { type: file?.type });
			const link = document.createElement("a");
			link.download = file?.name ?? "file";
			link.href = URL.createObjectURL(blob);
			link.click();
			URL.revokeObjectURL(link.href);
		};
		return (
			<DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
				<DropdownMenuTrigger {...props}>
					<span className="me-2  text-sm">{children ?? "Archivo:"}</span>
					<span
						className={`"me-auto  hover:animate-bounce  pi  ${isOpen ? "pi-chevron-up" : "pi-chevron-down"}`}
					></span>
					{file?.name && <br />}
					<span className="ms-1 underline decoration-1 truncate font-bold text-xs w-fit">
						{useFilename && (
							<span>
								{file?.name.slice(0, 24)} {file?.name && <>...{fileType}</>}
							</span>
						)}
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{options.map(({ label, value, icon, color }) => (
						<DropdownMenuItem
							onClick={() => {
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
							<span className={cn(`transition-colors text-center ${color} me-auto`)}>
								{label}
							</span>
							<span className={cn(`transition-colors text-center ${color}`)}>
								{icon}
							</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
);
FileButton.displayName = "FileButton";
export default FileButton;
