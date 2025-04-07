import { parseTipo } from "@/store/homologacion/base";
import useHomologacion from "@/hooks/useHomologación";
interface IHomologacionProps {
	page: string;
	isLegacy: boolean;
	user: string;
	id: number;
	tipo: string;
	sp1_factor: number;
	sp1_superficie: number;
	cna_superficie: number;
	cna_edad: number;
	onEdit: boolean;
}
export const CreateHomologacion = ({
	page,
	isLegacy,
	user,
	id,
	tipo,
	sp1_factor,
	sp1_superficie,
	cna_superficie,
	cna_edad,
	onEdit,
}: IHomologacionProps) => {
	const { justipreciacion } = useHomologacion({
		tipo_servicio: "justipreciacion",
		isLegacy,
		id,
		sp1: { factor: sp1_factor, superficie: sp1_superficie },
		cna: { superficie: cna_superficie, edad: cna_edad },
		tipo: parseTipo(tipo.toUpperCase()),
	});
	return <>{id}</>;
};

export default CreateHomologacion;
