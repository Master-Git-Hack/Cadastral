/** @format */
"use client";
import useUser from "@/store/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calculator,
  FileText,
  Users,
  Settings,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function Home() {
	const { token } = useUser((state) => state);
	if (token === null) redirect("/sign-in");
	if (token !== null) redirect("/home");

	const modules = [
		{
			title: "Dashboard Principal",
			description: "Vista unificada del sistema de justipreciación",
			icon: BarChart3,
			href: "/dashboard",
			color: "bg-blue-500",
		},
		{
			title: "Panorama General",
			description: "BigPicture - Integración de todos los módulos",
			icon: Eye,
			href: "/big-picture",
			color: "bg-green-500",
		},
		{
			title: "Valores Naturales",
			description: "Análisis estadístico de valores homologados",
			icon: Calculator,
			href: "/valores-naturales",
			color: "bg-purple-500",
		},
		{
			title: "Sistema de Factores",
			description: "Gestión de factores de homologación",
			icon: Settings,
			href: "/factores",
			color: "bg-orange-500",
		},
		{
			title: "Sistema de Revisiones",
			description: "Control y seguimiento de revisiones",
			icon: Users,
			href: "/revisiones",
			color: "bg-red-500",
		},
		{
			title: "Metadatos",
			description: "Gestión de metadatos del sistema",
			icon: FileText,
			href: "/metadatos",
			color: "bg-teal-500",
		},
	];

	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Sistema de Justipreciación Catastral
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Plataforma integral para la homologación y análisis de valores catastrales
					</p>
				</div>

				{/* Módulos Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{modules.map((module) => (
						<Card key={module.href} className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-4">
								<div className="flex items-center space-x-3">
									<div className={`p-2 rounded-lg ${module.color}`}>
										<module.icon className="h-6 w-6 text-white" />
									</div>
									<CardTitle className="text-lg">{module.title}</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4 text-sm">
									{module.description}
								</p>
								<Link href={module.href}>
									<Button className="w-full group">
										Acceder
										<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>

				{/* API Links */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">FastAPI Backend</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4 text-sm">
								Interfaz de programación de aplicaciones basada en Python
							</p>
							<Link href="/api/py/helloFastApi">
								<Button variant="outline" className="w-full">
									<code className="font-mono">api/index.py</code>
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Next.js API</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4 text-sm">
								Interfaz de programación de aplicaciones basada en Node.js
							</p>
							<Link href="/api/helloNextJs">
								<Button variant="outline" className="w-full">
									<code className="font-mono">app/api/helloNextJs</code>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
