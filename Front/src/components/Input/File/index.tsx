/** @format */

import { Dropdown } from "rsuite";
import PageIcon from "@rsuite/icons/Page";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import { Tooltip } from "../../Tooltip";
import { FileProps } from "./index.types";
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
				noCaret={filename ? true : false}
				title={`Archivo: ${filename}` ?? "Agregar Archivo"}
				icon={<PageIcon />}
				onClick={onClick}
			>
				{filename && (
					<>
						<Dropdown.Item icon={<FileDownloadIcon />} onClick={saveFile}>
							Descargar Archivo
						</Dropdown.Item>
						<Dropdown.Item onClick={remove}>Eliminar</Dropdown.Item>
					</>
				)}
			</Dropdown>
		</Tooltip>
	);
};
