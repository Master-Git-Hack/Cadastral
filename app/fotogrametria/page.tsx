/** @format */

"use client";
import { useEffect } from "react";
import useFotogrametria from "@/store/fotogrametria/index.ts";
import useStatusStore from "@/store/api.config";
import { Danger } from "@components/ui/alert";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import Link from "next/link";
export default function Page() {
	const { municipios, getMunicipios, setMunicipio } = useFotogrametria();
	const { isLoading, isError, message } = useStatusStore((state) => state);
	useEffect(() => {
		if (!municipios.length) getMunicipios();
	}, []);
	if (isError) {
		Danger({ title: "Error al cargar municipios", text: message });
	}
	//make a function to replace "-" with " " and return the string and make as title
	const title = (municipio: string) => {
		const data = municipio.split("-");
		return data.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
	};
	return (
		<>
			<h2>Municipios Disponibles</h2>
			<div className="flex flex-row min-h-screen justify-center items-center">
				<ScrollArea className="w-1/6 min-w-48 h-96 overflow-x-auto rounded-md border border-black dark:border-gray-400 text-center">
					<div className="p-4">
						{municipios.map((municipio) => (
							<div className="w-full overflow-hidden  transition-all duration-300 hover:shadow-lg hover:scale-110">
								<Link
									href={`/fotogrametria/${municipio}`}
									key={municipio}
									onClick={() => setMunicipio(municipio)}
								>
									{title(municipio)}
								</Link>
								<Separator className="my-2 bg-black dark:bg-gray-300" />
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
		</>
	);
}
