/** @format */

// export const section5 = {
// 	latres: "",
// 	longres: "",
// 	geogunit: "",
// 	lambertc_stdparll: "",
// 	lambertc_longcm: "",
// 	mercatort_latprjo: "",
// 	mercator_feast: "",
// 	mercator_fnorth: "",
// 	mercator_sfec: "",
// 	utm_zone: "",
// 	local_desc: "",
// 	local_geo_inf: "",
// 	coord_repres: "",
// 	ordres: "",
// 	absres: "",
// 	distance_res: "",
// 	bearing_res: "",
// 	bearing_uni: "",
// 	ref_bearing_dir: "",
// 	ref_bearing_mer: "",
// 	plandu: "",
// 	horizdn: "",
// 	ellips: "",
// 	semiaxis: "",
// 	altenc: "",
// 	altres: "",
// 	altunits: "",
// 	altdatum: "",
// 	depthdn: "",
// 	depthres: "",
// 	depthdu: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";

export const Section5 = ({ data, setData }: any) => {
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });
	const handleSelectChange = ({
		target: {
			name,
			value: { code, label, description },
		},
	}) => setData({ ...data, [name]: `${code}. ${label}. ${description}` });
	const findSelectValue = (name: string) => {
		const [code] = data[name].split(".");
		return catalogo?.[name]?.find((item) => item.code === code);
	};
	const findLanguageValue = catalogo.md_dataidentification_language.find(
		(item) => item.code === data.md_dataidentification_language,
	);
	return (
		<>
			<Table.Head>
				<Table.HeadCell
					className="flex-row text-2xl text-black dark:text-white"
					colSpan={1}
				>
					5
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Sistema de Referencia
				</Table.HeadCell>
			</Table.Head>
			<Table.Body></Table.Body>
		</>
	);
};
