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
export default function Home() {
	const query = useQuery();

	return (
		<Layout>
			<div className="flex flex-row gap-4 m-4">
				{links.map(({ label, href, avatar }: any, index: number) => (
					<Card className="max-w-sm w-11/12">
						<div className="flex flex-col items-center pb-10">
							<p class="container mx-auto px-4 bg-teal-600 rounded-lg h-20  text-center ">
								<span className="text-2xl text-center  text-white">{avatar}</span>
							</p>

							<h5 className="my-2 text-xl font-medium text-gray-900 dark:text-white">
								{label}
							</h5>

							<p className=" text-end">
								<Button label="Ir a" link />
							</p>
						</div>
					</Card>
				))}
			</div>
		</Layout>
	);
}
