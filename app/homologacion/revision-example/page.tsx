"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
	RevisionStatusDisplay,
	RevisionStatusBadge,
} from "@/components/revision/RevisionStatusDisplay";
import useHomologacion from "@/hooks/useHomologación";

/**
 * Ejemplo de cómo integrar el sistema de revisiones en una página de homologación
 * Esta página demuestra el flujo completo de revisiones integrado con homologaciones existentes
 */
export default function HomologacionWithRevisions() {
	const searchParams = useSearchParams();
	const [recordType, setRecordType] = useState<"terreno" | "renta">("terreno");
	const [recordId, setRecordId] = useState<number>(0);

	// Obtener parámetros de la URL
	useEffect(() => {
		const tipo = searchParams.get("tipo") as "terreno" | "renta";
		const id = parseInt(searchParams.get("id") ?? "0");

		if (tipo && ["terreno", "renta"].includes(tipo)) {
			setRecordType(tipo);
		}

		if (id > 0) {
			setRecordId(id);
		}
	}, [searchParams]);

	// Hook de homologación existente
	const { justipreciacion } = useHomologacion({
		tipo_servicio: "justipreciacion",
		isLegacy: true,
		id: recordId,
		tipo: recordType,
	});

	const handleRevisionCreated = () => {
		console.log("Nueva revisión creada, actualizando vista...");
		// Aquí podrías actualizar otros estados o mostrar notificaciones
	};

	if (recordId === 0) {
		return (
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">
					Homologación con Sistema de Revisiones
				</h1>
				<p className="text-gray-600">
					No hay registro seleccionado. Use parámetros: ?tipo=terreno&id=123
				</p>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-2">
					<h1 className="text-2xl font-bold">
						Homologación {recordType} #{recordId}
					</h1>
					{/* Badge compacto de estado de revisión */}
					<RevisionStatusBadge recordType={recordType} recordId={recordId} />
				</div>
				<p className="text-gray-600">
					Sistema integrado de homologaciones y revisiones
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Información principal de homologación */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-lg font-semibold mb-4">
							Datos de Homologación
						</h2>

						{/* Información del registro */}
						<div className="space-y-3">
							<div>
								<span className="font-medium text-gray-700">Tipo:</span>
								<span className="ml-2 capitalize">{recordType}</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">ID:</span>
								<span className="ml-2">{recordId}</span>
							</div>

							{/* Datos del registro de justipreciación */}
							{justipreciacion.registro && (
								<div className="pt-4 border-t">
									<h3 className="font-medium text-gray-700 mb-2">
										Datos de Justipreciación
									</h3>
									<pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
										{JSON.stringify(justipreciacion.registro, null, 2)}
									</pre>
								</div>
							)}
						</div>
					</div>

					{/* Formulario de homologación */}
					<div className="bg-white rounded-lg shadow p-6 mt-6">
						<h2 className="text-lg font-semibold mb-4">
							Formulario de {recordType === "terreno" ? "Terreno" : "Renta"}
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Superficie (m²)
								</label>
								<input
									type="number"
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
									placeholder="316.71"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Factor
								</label>
								<input
									type="number"
									step="0.01"
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
									placeholder="1.0"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Observaciones
								</label>
								<textarea
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
									rows={3}
									placeholder="Ingrese observaciones sobre la homologación..."
								/>
							</div>
						</div>

						<div className="mt-6 flex gap-3">
							<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
								Guardar Homologación
							</button>
							<button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
								Cancelar
							</button>
						</div>
					</div>
				</div>

				{/* Panel lateral de revisiones */}
				<div className="lg:col-span-1">
					<RevisionStatusDisplay
						recordType={recordType}
						recordId={recordId}
						showCreateButton={true}
						onRevisionCreated={handleRevisionCreated}
						className="sticky top-4"
					/>
				</div>
			</div>

			{/* Información del flujo */}
			<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
				<h2 className="text-lg font-semibold text-blue-800 mb-3">
					📋 Flujo del Sistema de Revisiones
				</h2>

				<div className="space-y-2 text-sm text-blue-700">
					<div className="flex items-start gap-2">
						<span className="font-medium">1.</span>
						<span>
							<strong>Verificación Automática:</strong> Cuando accedes a un
							registro guardado, el sistema verifica automáticamente si tiene
							revisiones asociadas.
						</span>
					</div>

					<div className="flex items-start gap-2">
						<span className="font-medium">2.</span>
						<span>
							<strong>Estados Posibles:</strong> Sin Revisión, En Revisión,
							Revisado, Rechazado. Cada estado se muestra con badge y colores
							distintivos.
						</span>
					</div>

					<div className="flex items-start gap-2">
						<span className="font-medium">3.</span>
						<span>
							<strong>Acciones Disponibles:</strong> Crear nueva revisión (si
							tienes permisos), ver detalles de revisiones existentes, refrescar
							estado.
						</span>
					</div>

					<div className="flex items-start gap-2">
						<span className="font-medium">4.</span>
						<span>
							<strong>Integración Completa:</strong> El sistema se integra
							automáticamente con los módulos existentes de homologación sin
							modificar su funcionamiento.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
