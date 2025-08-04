/** @format */
"use client";

export default function ReportesCatastralesPage() {
	return (
		<div className="container mx-auto p-6">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Reportes Catastrales
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Generación de reportes de avalúos por lotes con personalización avanzada
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
					<h3 className="text-xl font-semibold mb-3">Configurar Reporte</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Configurar parámetros del reporte: colección, año, límites
					</p>
					<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
						Nuevo Reporte
					</button>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
					<h3 className="text-xl font-semibold mb-3">Propiedades PDF</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Configurar DPI, márgenes, tamaño de página y marca de agua
					</p>
					<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
						Configurar
					</button>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
					<h3 className="text-xl font-semibold mb-3">Historial</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Ver reportes generados anteriormente
					</p>
					<button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors">
						Ver Historial
					</button>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-6 mb-6">
				<h3 className="text-lg font-semibold mb-4">Estado de Migración</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded">
						<span>API Backend (FastAPI + SQLModel)</span>
						<span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Completo</span>
					</div>
					<div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900 rounded">
						<span>Interfaz de configuración</span>
						<span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Pendiente</span>
					</div>
					<div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900 rounded">
						<span>Generación de PDF</span>
						<span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Pendiente</span>
					</div>
					<div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900 rounded">
						<span>Vista previa de documentos</span>
						<span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Pendiente</span>
					</div>
				</div>
			</div>

			<div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
				<h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
					Próximas Funcionalidades
				</h3>
				<ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
					<li>• Migración de la interfaz de configuración desde v1</li>
					<li>• Integración con el sistema de vista previa de documentos</li>
					<li>• Mejoras en la generación de reportes en lotes</li>
					<li>• Sistema de plantillas personalizables</li>
				</ul>
			</div>
		</div>
	);
}
