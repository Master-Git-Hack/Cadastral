/** @format */
"use client";
import { useEffect, useState } from "react";
import Error from "@/components/error";
import Layout from "@/components/navbar/index";
import Spinner from "@/components/ui/spinner";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Create from "./create";
import { Suspense } from "react";

const Pages = ({ page, isTemporal }: any) => {
	//make an array of 9 pages
	const pages = Array.from({ length: 9 }, (_, i) => i + 1);
	const sections = [
		"Identificación",
		"Fechas Relacionadas",
		"Unidad Responsable",
		"Localización Geográfica",
		"Referencia",
		"Calidad",
		"Entidades/Atributos",
		"Distribución",
		"Información Metadatos",
	];
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`?page=${page - 1 > 0 ? page - 1 : 9}${isTemporal ? "&temporal=true" : ""}`}
						customText="Previo"
					/>
				</PaginationItem>
				{pages.map((p) => (
					<PaginationItem key={`page-${p}`}>
						<Link
							href={`?page=${p}${isTemporal ? "&temporal=true" : ""}`}
							className={`page-link ${page === p ? "text-blue-600 underline underline-offset-auto " : ""} transition-colors hover:text-blue-400`}
						>
							<HoverCard>
								<HoverCardTrigger>
									{page === p ? sections[p - 1] : <p className="mx-3">{p}</p>}
								</HoverCardTrigger>
								<HoverCardContent>
									<p className="text-center">
										{page === p ? (
											<>
												Page: <strong>{p}</strong>
											</>
										) : (
											<>
												Sección: <strong>{sections[p - 1]}</strong>
											</>
										)}
									</p>
								</HoverCardContent>
							</HoverCard>
						</Link>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href={`?page=${page + 1 < 10 ? page + 1 : 1}${isTemporal ? "&temporal=true" : ""}`}
						customText="Siguiente"
					></PaginationNext>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
function MetadataContent() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const isTemporal = searchParams.get("temporal") ?? false;

	return (
		<Layout>
			<Create isTemporal={isTemporal} page={page.toString()} onEdit={true} data={0} />
			<Pages page={parseInt(page)} isTemporal={isTemporal} />
		</Layout>
	);
}
export default function CreateMetadata() {
	return (
		<Suspense fallback={<Spinner />}>
			<MetadataContent />
		</Suspense>
	);
}
