/** @format */
"use client";
interface MunicipioProps {
	params: { municipio: string };
}
import DropZone from "@components/ui/drag_and_drop_images/index";
export default function Municipio({ params }: MunicipioProps) {
	return (
		<>
			{params.municipio}
			<DropZone />
		</>
	);
}
