/** @format */

import { ButtonGroup, Dropdown } from "rsuite";
import PageIcon from "@rsuite/icons/Page";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import AttachmentIcon from "@rsuite/icons/Attachment";
import TrashIcon from "@rsuite/icons/Trash";
import { Tooltip } from "../../Tooltip";
import { FileProps } from "./file.types";
import FileSaver from "file-saver";
export const File = ({ onChange, file, filename, remove }: FileProps): JSX.Element => {
	const onClick = () => {
		let input = document.createElement("input");
		input.type = "file";
		input.style.display = "none";
		input.click();
		input.onchange = (event: any) => onChange(event);
	};
	const saveFile = () => FileSaver.saveAs(file, filename);
	const id = `MyFile Input ${filename}`;
	return (
		<ButtonGroup style={{ marginTop: 12 }} block>
			<Dropdown
				title={filename === "" ? `Archivo` : `Archivo: "${filename}"`}
				icon={<PageIcon />}
				trigger={["hover", "click"]}
				toggleAs={undefined}
			>
				<Tooltip
					id={id}
					tooltip="Solo se puede subir un solo archivo, precione el boton para seleccionar un archivo o cambiar el existente."
					trigger="hover"
					followCursor
				>
					<Dropdown.Item
						id={id}
						icon={<AttachmentIcon />}
						onClick={onClick}
						active={filename !== ""}
					>
						{filename === "" ? `Agregar` : filename}
					</Dropdown.Item>
				</Tooltip>

				<Dropdown.Item
					icon={<FileDownloadIcon color={filename !== "" ? "green" : undefined} />}
					onClick={saveFile}
					disabled={filename === ""}
				>
					<span className={filename !== "" ? "text-success" : "text-muted disabled"}>
						Descargar
					</span>
				</Dropdown.Item>
				<Dropdown.Item
					icon={<TrashIcon color={filename !== "" ? "red" : undefined} />}
					onClick={remove}
					disabled={filename === ""}
				>
					<span className={filename !== "" ? "text-danger" : "text-muted disabled"}>
						Eliminar
					</span>
				</Dropdown.Item>
			</Dropdown>
		</ButtonGroup>
	);
};
