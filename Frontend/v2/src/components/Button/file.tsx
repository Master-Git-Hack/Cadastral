/** @format */
import {
	useState,
	forwardRef,
	useEffect,
	type ChangeEventHandler,
} from "react";
import { Dropdown } from "./dropdown";
import type { FileButtonProps } from "./types";
import type { SVGProps } from "react";
import FileSaver from "file-saver";

interface IconProps extends SVGProps<SVGSVGElement> {}
const DeleteIcon = ({
	width = "20px",
	height = "20px",
	viewBox = "0 0 24 24",
	fill = "none",
	...props
}: IconProps) => (
	<svg width={width} height={height} viewBox={viewBox} fill={fill} {...props}>
		<path
			d="M10 12V17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M14 12V17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M4 7H20"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
const DownloadIcon = ({
	width = "20px",
	height = "20px",
	viewBox = "0 0 24 24",
	fill = "none",
	...props
}: IconProps) => (
	<svg width={width} height={height} viewBox={viewBox} fill={fill} {...props}>
		<path
			d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
			fill="currentColor"
		/>
		<path
			d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
			fill="currentColor"
		/>
	</svg>
);
const UploadIcon = ({
	width = "20px",
	height = "20px",
	viewBox = "0 0 24 24",
	fill = "none",
	...props
}: IconProps) => (
	<svg width={width} height={height} viewBox={viewBox} fill={fill} {...props}>
		<path
			d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z"
			fill="currentColor"
		/>
		<path
			d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
			fill="currentColor"
		/>
	</svg>
);
exp
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
			input.onchange = ({
				target: { files },
			}: ChangeEventHandler<HTMLInputElement>) => {
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
