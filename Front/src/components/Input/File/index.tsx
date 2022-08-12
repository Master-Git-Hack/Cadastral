/** @format */

import { Dropdown } from "rsuite";
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
		<Tooltip id={id} tooltip="Solo se puede subir un solo archivo">
			<Dropdown
				id={id}
				title={filename === "" ? `Archivo` : `Archivo: ${filename}`}
				icon={<PageIcon />}
				trigger={["hover", "click"]}
			>
				<Dropdown.Item icon={<AttachmentIcon />} onClick={onClick} active={filename !== ""}>
					{filename === "" ? `Agregar` : filename}
				</Dropdown.Item>
				{filename !== "" && (
					<>
						<Dropdown.Item icon={<FileDownloadIcon color="green" />} onClick={saveFile}>
							Descargar
						</Dropdown.Item>
						<Dropdown.Item icon={<TrashIcon color="red" />} onClick={remove}>
							Eliminar
						</Dropdown.Item>
					</>
				)}
			</Dropdown>
		</Tooltip>
	);
};
