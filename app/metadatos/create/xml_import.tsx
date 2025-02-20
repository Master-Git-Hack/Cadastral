/** @format */
"use client";
import {
	useState,
	useRef,
	forwardRef,
	useEffect,
	ChangeEventHandler,
} from "react";
import { UploadIcon } from "@assets/icons";
import { cn } from "@utils/index";
import useMedatados from "@/store/metadatos/index";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
export const ImportXML = forwardRef<HTMLInputElement, {}>(
	({ children }, ref) => {
		const { importXML } = useMedatados((state) => state);

		const [file, setFile] = useState<File | null>(null);
		const router = useRouter();
		const inputRef = useRef<HTMLInputElement>(null);

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0];
			if (selectedFile) {
				setFile(selectedFile);
				importXML(selectedFile);
				window.location.reload(true);
			}
		};

		const uploadFile = () => {
			if (inputRef.current) {
				inputRef.current.click();
			}
		};

		const saveFile = () => {
			if (!file) return;
			const blob = new Blob([file], { type: file.type });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = file.name ?? "file.xml";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(link.href);
		};
		return (
			<>
				<input
					type="file"
					ref={inputRef}
					style={{ display: "none" }}
					accept=".xml"
					onChange={handleFileChange}
				/>
				<Button variant="outline" onClick={uploadFile}>
					<span className="pi pi-file-import me-4"></span>
					<span>{children ?? "Importar XML"}</span>
				</Button>
			</>
			// <DropdownMenu>
			// 	<DropdownMenuTrigger asChild>

			// 	</DropdownMenuTrigger>
			// 	<DropdownMenuContent className="w-56">
			// 		<DropdownMenuLabel>Importar como:</DropdownMenuLabel>
			// 		<DropdownMenuSeparator />
			// 		<DropdownMenuGroup>
			// 			<DropdownMenuItem
			// 				className={cn(
			// 					`transition-colors text-center text-blue-400 hover:text-blue-600 me-auto`,
			// 				)}
			// 				onClick={() => {
			// 					setIsTemporal(true);
			// 					return uploadFile();
			// 				}}
			// 			>
			// 				<UploadIcon className="me-auto" />
			// 				<span>Registro Temporal</span>
			// 			</DropdownMenuItem>
			// 			<DropdownMenuItem
			// 				className={cn(
			// 					`transition-colors text-center text-teal-400 hover:text-teal-600 me-auto`,
			// 				)}
			// 				onClick={() => {
			// 					setIsTemporal(false);
			// 					return uploadFile();
			// 				}}
			// 			>
			// 				<UploadIcon className="me-auto" />
			// 				<span>Registro Directo</span>
			// 			</DropdownMenuItem>
			// 		</DropdownMenuGroup>
			// 	</DropdownMenuContent>
			// </DropdownMenu>
		);
	},
);
ImportXML.displayName = "ImportXMLButton";
export default ImportXML;

// <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
// 			<DropdownMenuTrigger {...props}>
// 				<span className="me-2  text-sm">{children ?? "Archivo:"}</span>
// 				<span
// 					className={`"me-auto  hover:animate-bounce  pi  ${isOpen ? "pi-chevron-up" : "pi-chevron-down"}`}
// 				></span>
// 				{file?.name && <br />}
// 				<span className="ms-1 underline decoration-1 truncate font-bold text-xs w-fit">
// 					{useFilename && (
// 						<span>
// 							{file?.name.slice(0, 24)} {file?.name && <>...{fileType}</>}
// 						</span>
// 					)}
// 				</span>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent>
// 				{options.map(({ label, value, icon, color }) => (
// 					<DropdownMenuItem
// 						onClick={() => {
// 							if (value === 0) {
// 								uploadFile();
// 							}
// 							if (value === 1) {
// 								customSaveFile(file?.name) ?? saveFile();
// 							}
// 							if (value === 2) {
// 								setFile(null);
// 								onChange(null);
// 							}
// 						}}
// 					>
// 						<span className={cn(`transition-colors text-center ${color} me-auto`)}>
// 							{label}
// 						</span>
// 						<span className={cn(`transition-colors text-center ${color}`)}>
// 							{icon}
// 						</span>
// 					</DropdownMenuItem>
// 				))}
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
