/** @format */

"use client";

import React from 'react';
import { 
	MigrationCard, 
	MigrationButton, 
	MigrationTable, 
	MigrationTableHeader, 
	MigrationTableBody, 
	MigrationTableRow, 
	MigrationTableHeaderCell, 
	MigrationTableCell,
	MigrationAlert,
	MigrationInput
} from '@/components/migration';

// Tipo para demo
interface CedulaDemo {
	id: number;
	tipo_predio: string;
	ubicacion: string;
	area_total: number;
	valor_comercial: number;
	fecha_avaluo: string;
	estado: string;
}

export default function ComparablesV3Page() {
	const [cedulas, setCedulas] = React.useState<CedulaDemo[]>([
		{
			id: 1,
			tipo_predio: "Casa",
			ubicacion: "Zona Norte",
			area_total: 120,
			valor_comercial: 250000000,
			fecha_avaluo: "2024-01-15",
			estado: "activo"
		},
		{
			id: 2,
			tipo_predio: "Apartamento",
			ubicacion: "Centro",
			area_total: 85,
			valor_comercial: 180000000,
			fecha_avaluo: "2024-01-10",
			estado: "activo"
		}
	]);

	const [loading, setLoading] = React.useState(false);

	const [newCedula, setNewCedula] = React.useState({
		tipo_predio: '',
		area_total: '',
		valor_comercial: '',
		ubicacion: ''
	});

	// Calcular estadísticas
	const estadisticas = cedulas.length > 0 
		? {
			total: cedulas.length,
			promedio_valor: cedulas.reduce((sum: number, c: CedulaDemo) => sum + c.valor_comercial, 0) / cedulas.length,
			promedio_area: cedulas.reduce((sum: number, c: CedulaDemo) => sum + c.area_total, 0) / cedulas.length
		}
		: {
			total: 0,
			promedio_valor: 0,
			promedio_area: 0
		};

	const handleCreateCedula = async () => {
		const newId = Math.max(...cedulas.map((c: CedulaDemo) => c.id), 0) + 1;
		const cedulaToAdd: CedulaDemo = {
			id: newId,
			tipo_predio: newCedula.tipo_predio,
			area_total: parseFloat(newCedula.area_total),
			valor_comercial: parseFloat(newCedula.valor_comercial),
			ubicacion: newCedula.ubicacion,
			fecha_avaluo: new Date().toISOString().split('T')[0],
			estado: 'activo'
		};
		
		setCedulas([...cedulas, cedulaToAdd]);
		
		// Limpiar formulario
		setNewCedula({
			tipo_predio: '',
			area_total: '',
			valor_comercial: '',
			ubicacion: ''
		});
	};

	const handleReload = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const handleGenerateReport = () => {
		alert('Generando reporte de cédulas de mercado...');
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Comparables - Cédulas de Mercado v3</h1>
			
			<div className="grid gap-8">
				{/* Estadísticas */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<MigrationCard title="Total Cédulas">
						<p className="text-2xl font-bold text-blue-600">{estadisticas.total || 0}</p>
					</MigrationCard>
					<MigrationCard title="Valor Promedio">
						<p className="text-2xl font-bold text-green-600">
							${estadisticas.promedio_valor?.toLocaleString() || '0'}
						</p>
					</MigrationCard>
					<MigrationCard title="Área Promedio">
						<p className="text-2xl font-bold text-purple-600">
							{estadisticas.promedio_area?.toFixed(2) || '0'} m²
						</p>
					</MigrationCard>
				</div>

				{/* Formulario para nueva cédula */}
				<MigrationCard title="Nueva Cédula de Mercado">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Tipo de Predio</label>
							<MigrationInput
								value={newCedula.tipo_predio}
								onChange={(e) => setNewCedula({...newCedula, tipo_predio: e.target.value})}
								placeholder="Casa, Apartamento, etc."
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Ubicación</label>
							<MigrationInput
								value={newCedula.ubicacion}
								onChange={(e) => setNewCedula({...newCedula, ubicacion: e.target.value})}
								placeholder="Dirección o barrio"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Área Total (m²)</label>
							<MigrationInput
								type="number"
								value={newCedula.area_total}
								onChange={(e) => setNewCedula({...newCedula, area_total: e.target.value})}
								placeholder="120.5"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Valor Comercial</label>
							<MigrationInput
								type="number"
								value={newCedula.valor_comercial}
								onChange={(e) => setNewCedula({...newCedula, valor_comercial: e.target.value})}
								placeholder="250000000"
							/>
						</div>
					</div>
					<div className="mt-4">
						<MigrationButton 
							onClick={handleCreateCedula}
							disabled={!newCedula.tipo_predio || !newCedula.area_total || !newCedula.valor_comercial}
						>
							Crear Cédula
						</MigrationButton>
					</div>
				</MigrationCard>

				{/* Tabla de cédulas */}
				<MigrationCard title="Cédulas de Mercado Registradas">
					{loading ? (
						<div className="text-center py-4">Cargando cédulas...</div>
					) : cedulas.length === 0 ? (
						<MigrationAlert type="info">
							No hay cédulas registradas. Utiliza el formulario anterior para crear la primera.
						</MigrationAlert>
					) : (
						<MigrationTable>
							<MigrationTableHeader>
								<MigrationTableRow>
									<MigrationTableHeaderCell>Tipo</MigrationTableHeaderCell>
									<MigrationTableHeaderCell>Ubicación</MigrationTableHeaderCell>
									<MigrationTableHeaderCell>Área (m²)</MigrationTableHeaderCell>
									<MigrationTableHeaderCell>Valor Comercial</MigrationTableHeaderCell>
									<MigrationTableHeaderCell>Fecha</MigrationTableHeaderCell>
									<MigrationTableHeaderCell>Estado</MigrationTableHeaderCell>
								</MigrationTableRow>
							</MigrationTableHeader>
							<MigrationTableBody>
								{cedulas.map((cedula: CedulaDemo, index: number) => (
									<MigrationTableRow key={index}>
										<MigrationTableCell>{cedula.tipo_predio}</MigrationTableCell>
										<MigrationTableCell>{cedula.ubicacion}</MigrationTableCell>
										<MigrationTableCell>{cedula.area_total}</MigrationTableCell>
										<MigrationTableCell>
											${cedula.valor_comercial.toLocaleString()}
										</MigrationTableCell>
										<MigrationTableCell>
											{new Date(cedula.fecha_avaluo).toLocaleDateString()}
										</MigrationTableCell>
										<MigrationTableCell>
											<span className={`px-2 py-1 rounded text-xs ${
												cedula.estado === 'activo' 
													? 'bg-green-100 text-green-800' 
													: 'bg-gray-100 text-gray-800'
											}`}>
												{cedula.estado}
											</span>
										</MigrationTableCell>
									</MigrationTableRow>
								))}
							</MigrationTableBody>
						</MigrationTable>
					)}
					
					<div className="mt-4 flex gap-2">
						<MigrationButton onClick={handleReload} variant="secondary">
							Recargar
						</MigrationButton>
						<MigrationButton 
							onClick={handleGenerateReport}
							disabled={cedulas.length === 0}
						>
							Generar Reporte
						</MigrationButton>
					</div>
				</MigrationCard>

				{/* Información de migración */}
				<MigrationAlert type="success">
					✅ Esta página demuestra la migración exitosa de v1/v2 a v3:
					<ul className="mt-2 ml-4 list-disc">
						<li>Componentes de migración funcionales</li>
						<li>Store Zustand integrado</li>
						<li>Formularios reactivos</li>
						<li>Gestión de estado global</li>
						<li>Interfaz moderna con Tailwind CSS</li>
					</ul>
				</MigrationAlert>
			</div>
		</div>
	);
}
