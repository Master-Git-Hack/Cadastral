/** @format */

"use client";
import { useEffect } from "react";
import useFotogrametria from "@/store/fotogrametria/index.ts";
import useStatusStore from "@/store/api.config";
import { Danger } from "@components/ui/alert";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import Link from "next/link";
import Layout from "@/components/navbar/index";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@components/ui/command";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@components/ui/card";
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
	const avatar = (municipio: string) => {
		const data = municipio.split("-");
		return data.map((word) => word[0].toUpperCase()).join("");
	};
	return (
		<Layout>
			<div className="flex flex-wrap justify-center gap-4 m-4">
				{municipios.map((municipio) => (
					<Card
						key={municipio}
						className="border border-gray-400 rounded-lg w-48 h-64 bg-gray-300 dark:bg-gray-800"
					>
						<CardHeader>
							<CardTitle className="flex flex-row w-full justify-center items-center mx-auto px-4 bg-teal-600 rounded-lg h-20 text-center">
								<span className="text-2xl text-white">{avatar(municipio)}</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-1/3">
							<h5 className=" text-xl font-medium text-gray-900 dark:text-white text-center ">
								{title(municipio)}
							</h5>
						</CardContent>
						<CardFooter className="text-end">
							<Link
								href={`/fotogrametria/${municipio}`}
								className="flex-2 mx-2 grow text-teal-500 hover:text-black dark:text-teal-400 dark:hover:text-white hover:underline"
							>
								Ir a
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</Layout>
	);
}
