/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";
import { DataTable } from "@components/Table";
import Layout from "@features/Layout";

import { Button } from "primereact/button";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";
import links from "@context/modules";
import { NavLink } from "react-router-dom";
export default function Home() {
	const query = useQuery();

	return (
		<Layout>
			<div className="flex flex-wrap justify-center gap-4 m-4 ">
				{links.map(({ label, href, avatar }: any, index: number) => (
					<Card className="max-w-sm w-11/12" key={href}>
						<div className="flex flex-col justify-center ">
							<p className="flex flex-row w-full justify-center items-center mx-auto px-4 bg-teal-600 rounded-lg h-20  text-center ">
								<span className="text-2xl  text-white">{avatar}</span>
							</p>

							<h5 className="my-10 text-xl font-medium text-gray-900 dark:text-white">
								{label}
							</h5>

							<p className="text-end">
								<span className="flex-2 mx-2 grow text-teal-500 hover:text-black dark:text-teal-400 dark:hover:text-white hover:underline">
									<NavLink to={href}>Ir a</NavLink>
								</span>
							</p>
						</div>
					</Card>
				))}
			</div>
		</Layout>
	);
}
