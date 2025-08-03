/** @format */

import React from "react";
import { Button, Panel, Grid, Row, Col, Badge, Divider } from "rsuite";
import { Edit, Visible, Check } from "@rsuite/icons";
import { useAppSelector, useAppDispatch } from "../../../../redux";
import {
	getRevisionData,
	getIsReviewing,
	showRevisionModal,
	applyAllSuggestions
} from "../../../../redux/justipreciacion/homologacion/revisiones";
import { RevisionHistory } from "./RevisionHistory";
import { RevisionModal } from "./RevisionModal";

export const RevisionPanel: React.FC = () => {
	const dispatch = useAppDispatch();
	const revisionData = useAppSelector(getRevisionData);
	const isReviewing = useAppSelector(getIsReviewing);

	const handleStartReview = () => {
		dispatch(showRevisionModal());
	};

	const handleApplyChanges = () => {
		if (window.confirm("¿Está seguro que desea aplicar todos los cambios sugeridos?")) {
			dispatch(applyAllSuggestions());
		}
	};

	const getStatusColor = (status: string): "blue" | "orange" | "red" | "green" | "yellow" | "cyan" | "violet" => {
		switch (status) {
			case "PENDIENTE": return "blue";
			case "EN_REVISION": return "orange";
			case "REVISADO_CON_ERRORES": return "red";
			case "REVISADO_APROBADO": return "green";
			case "RECHAZADO": return "red";
			case "OBSOLETO": return "yellow";
			default: return "cyan";
		}
	};

	const getPendingCommentsCount = () => {
		if (!revisionData) return 0;
		
		return revisionData.revisiones.reduce((total, revision) => {
			return total + revision.comments.filter(c => c.status === "PENDING").length;
		}, 0);
	};

	const pendingComments = getPendingCommentsCount();

	return (
		<div>
			{/* Panel de estado y acciones */}
			<Panel header="Estado de Revisión" bordered style={{ marginBottom: 16 }}>
				<Grid fluid>
					<Row gutter={16}>
						<Col xs={12}>
							{revisionData ? (
								<div>
									<div style={{ marginBottom: 8 }}>
										<strong>Estado actual:</strong>{" "}
										<Badge 
											color={getStatusColor(revisionData.status)} 
											content={revisionData.status} 
										/>
									</div>
									<div style={{ marginBottom: 8 }}>
										<strong>Versión:</strong> {revisionData.current_version}
									</div>
									<div style={{ marginBottom: 8 }}>
										<strong>Revisiones realizadas:</strong> {revisionData.revisiones.length}
									</div>
									{pendingComments > 0 && (
										<div style={{ marginBottom: 8 }}>
											<strong>Comentarios pendientes:</strong>{" "}
											<Badge color="orange" content={pendingComments} />
										</div>
									)}
								</div>
							) : (
								<div style={{ color: "#666" }}>
									No hay datos de revisión disponibles
								</div>
							)}
						</Col>
						
						<Col xs={12}>
							<div style={{ textAlign: "right" }}>
								{revisionData?.can_review && !isReviewing && (
									<Button
										appearance="primary"
										startIcon={<Edit />}
										onClick={handleStartReview}
										style={{ marginRight: 8 }}
									>
										Nueva Revisión
									</Button>
								)}
								
								{revisionData?.can_edit && pendingComments > 0 && (
									<Button
										appearance="ghost"
										startIcon={<Check />}
										onClick={handleApplyChanges}
										color="green"
									>
										Aplicar Cambios
									</Button>
								)}
								
								{!revisionData?.can_review && !revisionData?.can_edit && (
									<Button
										appearance="subtle"
										startIcon={<Visible />}
										disabled
									>
										Solo Lectura
									</Button>
								)}
							</div>
						</Col>
					</Row>
				</Grid>
			</Panel>

			<Divider />

			{/* Historial de revisiones */}
			<RevisionHistory />

			{/* Modal de revisión */}
			<RevisionModal />
		</div>
	);
};
