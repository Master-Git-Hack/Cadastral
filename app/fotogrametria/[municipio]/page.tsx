/** @format */
interface MunicipioProps {
	params: { municipio: string };
}
export default function Municipio({ params }: MunicipioProps) {
	return <>{params.municipio}</>;
}
