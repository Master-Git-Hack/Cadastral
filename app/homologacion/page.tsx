
'use client';
import Link from "next/link";
import { Suspense,use } from "react";
import Layout from "@/components/navbar/index";
import Spinner from "@/components/ui/spinner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Success, Danger } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@utils/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tipo,TipoReverseMap,parseTipo } from "@/store/homologación/base";
import useJustipreciacion from "@/store/justipreciacion";
interface SearchProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	type: Tipo;
}
const Search = ({ open, setOpen, type }: SearchProps) => {
	const [exists, setExists] = useState(false);
	
	const router = useRouter();
	const  {id,registro,getJustipreciacionById} = useJustipreciacion((state) => state);
	const handleRequest = async (action:string) => {
		try {
			const includes =type===Tipo.TERRENO? []:[]
			await getJustipreciacionById(undefined,includes,undefined,false).then(()=>{}).catch(({ status, message, ...response }) => {
					Danger({
						title: status ?? "Error",
						text: response?.data?.detail ?? response?.data?.message ?? message,
					});
				})
			
			router.push(`/homologacion/${registro}/${exists ? "edit" : "create"}?tipo=${TipoReverseMap[type]}`);
		} catch (error: any) {
			// Manejo de errores generales
			// Danger({ title: "Error", text: error?.message ?? "Error desconocido" });
		}
	};
	return (
		<Drawer
			open={open}
			onClose={() => setOpen(false)}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-center">Ingrese el numero de registro</DrawerTitle>
					
				</DrawerHeader>
				<DrawerFooter className="mb-5 flex flex-row items-center justify-between p-4">
					<div className="flex gap-2">
						<Button
							className={cn(`bg-red-300 hover:bg-red-600 `)}
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
					</div>
					
				<div className="flex gap-2">
					<Input autoFocus value={registro} onChange={(e)=>setRegistro(e.target.value)}/>
					<Button
						className={cn("ms-5 bg-teal-600 hover:bg-teal-900")}
						onClick={() => handleRequest("")}
					>
						Buscar
					</Button>
				</div>
					

					
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
const routes =()=>[{ label:"Terreno", href:"#", avatar:"Te",type:Tipo.TERRENO },{
	label:"Renta", href:"#", avatar:"Re",type:Tipo.RENTA }];
export default function Homologacion() {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState(Tipo.TERRENO);
return <Layout>
    <div className="flex flex-wrap justify-center gap-4 m-4 ">
				{routes()?.map(({ label, href, avatar,type}) => (
					<Card
						key={label}
						className="border border-gray-400 rounded-lg w-48 h-64 bg-gray-300 dark:bg-gray-800"
					>
						<CardHeader>
							<CardTitle className="flex flex-row w-full justify-center items-center mx-auto px-4 bg-teal-600 rounded-lg h-20 text-center">
								<span className="text-2xl text-white">{avatar}</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-1/3">
							<h5 className=" text-xl font-medium text-gray-900 dark:text-white text-center ">
								{label}
							</h5>
						</CardContent>
						<CardFooter className="text-end">
							<Link
								href="#"
								className="flex-2 mx-2 grow text-teal-500 hover:text-black dark:text-teal-400 dark:hover:text-white hover:underline"
								onClick={() => {
									setType(type);
									setOpen(true);
								}
								}
							>
								Ir a
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
			<Search
				open={open}
				setOpen={setOpen}
				type={type}
			/>
</Layout>
}
