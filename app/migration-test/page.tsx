/** @format */

"use client";

import { 
	MigrationCard, 
	MigrationButton, 
	MigrationTable, 
	MigrationTableHeader, 
	MigrationTableBody, 
	MigrationTableRow, 
	MigrationTableHeaderCell, 
	MigrationTableCell,
	MigrationAlert
} from '@/components/migration';

export default function MigrationTestPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Prueba de Componentes de Migración</h1>
			
			<div className="grid gap-8">
				{/* Card de prueba */}
				<MigrationCard title="Componente Card Funcional">
					<p>Este es un ejemplo de una tarjeta usando los componentes de migración.</p>
					<div className="mt-4">
						<MigrationButton variant="primary">Botón Principal</MigrationButton>
						<MigrationButton variant="secondary" className="ml-2">Botón Secundario</MigrationButton>
					</div>
				</MigrationCard>

				{/* Alert de prueba */}
				<MigrationAlert type="success">
					¡Los componentes de migración están funcionando correctamente!
				</MigrationAlert>

				{/* Tabla de prueba */}
				<MigrationCard title="Tabla de Prueba">
					<MigrationTable>
						<MigrationTableHeader>
							<MigrationTableRow>
								<MigrationTableHeaderCell>Módulo</MigrationTableHeaderCell>
								<MigrationTableHeaderCell>Estado v1</MigrationTableHeaderCell>
								<MigrationTableHeaderCell>Estado v2</MigrationTableHeaderCell>
								<MigrationTableHeaderCell>Estado v3</MigrationTableHeaderCell>
							</MigrationTableRow>
						</MigrationTableHeader>
						<MigrationTableBody>
							<MigrationTableRow>
								<MigrationTableCell>Justipreciación</MigrationTableCell>
								<MigrationTableCell>✅ Completo</MigrationTableCell>
								<MigrationTableCell>✅ Completo</MigrationTableCell>
								<MigrationTableCell>🔄 En migración</MigrationTableCell>
							</MigrationTableRow>
							<MigrationTableRow>
								<MigrationTableCell>Comparables</MigrationTableCell>
								<MigrationTableCell>✅ Completo</MigrationTableCell>
								<MigrationTableCell>⚠️ Parcial</MigrationTableCell>
								<MigrationTableCell>🔄 En migración</MigrationTableCell>
							</MigrationTableRow>
							<MigrationTableRow>
								<MigrationTableCell>Reportes</MigrationTableCell>
								<MigrationTableCell>✅ Completo</MigrationTableCell>
								<MigrationTableCell>✅ Completo</MigrationTableCell>
								<MigrationTableCell>🔄 En migración</MigrationTableCell>
							</MigrationTableRow>
						</MigrationTableBody>
					</MigrationTable>
				</MigrationCard>

				<MigrationAlert type="info">
					Esta página demuestra que los componentes de migración están listos para ser utilizados 
					en la migración de v1/v2 a v3.
				</MigrationAlert>
			</div>
		</div>
	);
}
