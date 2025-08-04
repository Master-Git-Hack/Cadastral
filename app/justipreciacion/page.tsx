/** @format */
"use client";

export default function JustipreciacionPage() {
	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
					Módulo de Justipreciación
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Sistema integral para la valuación y justipreciación de bienes
					inmuebles.
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-semibold mb-2">Homologación</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Módulo para la homologación de valores y análisis comparativo.
					</p>
					<a 
						href="/homologacion"
						className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
					>
						Abrir Módulo
					</a>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-semibold mb-2">Costos de Construcción</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Calculadora de costos con factores de ajuste.
					</p>
					<button 
						disabled
						className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
					>
						Próximamente
					</button>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-semibold mb-2">Obras Complementarias</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Gestión de obras complementarias y partidas.
					</p>
					<button 
						disabled
						className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
					>
						Próximamente
					</button>
				</div>
			</div>

			<div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
				<h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
					Información del Sistema
				</h3>
				<p className="text-sm text-blue-700 dark:text-blue-300">
					Este módulo integra las funcionalidades previamente distribuidas en v1 y v2, 
					proporcionando una experiencia unificada para el proceso de justipreciación.
				</p>
			</div>
		</div>
	);
}
