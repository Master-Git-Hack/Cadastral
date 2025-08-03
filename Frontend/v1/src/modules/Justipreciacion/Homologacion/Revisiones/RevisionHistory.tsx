/** @format */

import React, { useEffect, useState } from "react";
import { Panel, Grid, Row, Col, List, Badge, Avatar, Whisper, Tooltip, IconButton, Button, Divider } from "rsuite";
import { Visible, Edit, Check, Close, Message as MessageIcon } from "@rsuite/icons";
import { useAppSelector, useAppDispatch } from "../../../../redux";
import { 
	getRevisionData, 
	getIsReviewing, 
	getActiveRevision,
	showRevisionModal,
	resolveComment,
	dismissComment,
	get as getRevisionDataAction
} from "../../../../redux/justipreciacion/homologacion/revisiones";
import { getHomologaciones } from "../../../../redux/justipreciacion/homologacion";
import { RevisionComment, RevisionEntry } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.interface";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const RevisionHistory: React.FC = () => {
	const dispatch = useAppDispatch();
	const revisionData = useAppSelector(getRevisionData);
	const isReviewing = useAppSelector(getIsReviewing);
	const activeRevision = useAppSelector(getActiveRevision);
	const { record } = useAppSelector(getHomologaciones);

	const [selectedRevision, setSelectedRevision] = useState<RevisionEntry | null>(null);

	useEffect(() => {
		// Cargar datos de revisión si existe un registro
		if (record.id && record.status === "exists") {
			dispatch(getRevisionDataAction({ 
				url: `REVISION/${record.id}/${record.type}/${record.appraisalPurpose}` 
			}));
		}
	}, [dispatch, record.id, record.status, record.type, record.appraisalPurpose]);

	const handleCommentAction = (revisionVersion: string, commentId: string, action: "resolve" | "dismiss") => {
		if (action === "resolve") {
			dispatch(resolveComment({ revisionVersion, commentId }));
		} else {
			dispatch(dismissComment({ revisionVersion, commentId }));
		}
	};

	const getStatusColor = (status: string): "blue" | "orange" | "red" | "green" | "yellow" | "cyan" | "violet" => {
		switch (status) {
			case "PENDING": return "orange";
			case "RESOLVED": return "green";
			case "DISMISSED": return "red";
			default: return "blue";
		}
	};

	const getRevisionStatusColor = (status: string): "blue" | "orange" | "red" | "green" | "yellow" | "cyan" | "violet" => {
		switch (status) {
			case "EN_REVISION": return "blue";
			case "COMPLETADA": return "green";
			case "PENDIENTE_CORRECCION": return "orange";
			default: return "cyan";
		}
	};

	const formatDate = (dateString: string) => {
		try {
			return formatDistanceToNow(new Date(dateString), { 
				addSuffix: true, 
				locale: es 
			});
		} catch {
			return "Fecha inválida";
		}
	};

	const CommentItem: React.FC<{ comment: RevisionComment; revisionVersion: string; canResolve: boolean }> = ({ 
		comment, 
		revisionVersion, 
		canResolve 
	}) => (
		<Panel 
			bordered 
			style={{ marginBottom: 8 }}
			header={
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<span style={{ fontWeight: 500 }}>{comment.fieldLabel}</span>
					<Badge color={getStatusColor(comment.status)} content={comment.status} />
				</div>
			}
		>
			<div style={{ marginBottom: 8 }}>
				<strong>Página {comment.page}</strong> • <small>{comment.fieldPath}</small>
			</div>
			
			<div style={{ marginBottom: 12 }}>
				<div style={{ marginBottom: 4 }}>
					<strong>Valor actual:</strong> {JSON.stringify(comment.originalValue)}
				</div>
				<div style={{ marginBottom: 4 }}>
					<strong>Valor sugerido:</strong> {JSON.stringify(comment.suggestedValue)}
				</div>
			</div>

			<div style={{ 
				padding: 10, 
				backgroundColor: "#f8f9fa", 
				borderRadius: 4, 
				marginBottom: 8 
			}}>
				{comment.comment}
			</div>

			<div style={{ 
				display: "flex", 
				justifyContent: "space-between", 
				alignItems: "center",
				fontSize: "12px",
				color: "#666"
			}}>
				<span>Por {comment.reviewer} • {formatDate(comment.created_at)}</span>
				
				{canResolve && comment.status === "PENDING" && (
					<div>
						<Whisper
							trigger="hover"
							speaker={<Tooltip>Marcar como resuelto</Tooltip>}
						>
							<IconButton
								size="xs"
								icon={<Check />}
								color="green"
								appearance="primary"
								onClick={() => handleCommentAction(revisionVersion, comment.id, "resolve")}
								style={{ marginRight: 4 }}
							/>
						</Whisper>
						<Whisper
							trigger="hover"
							speaker={<Tooltip>Descartar comentario</Tooltip>}
						>
							<IconButton
								size="xs"
								icon={<Close />}
								color="red"
								appearance="primary"
								onClick={() => handleCommentAction(revisionVersion, comment.id, "dismiss")}
							/>
						</Whisper>
					</div>
				)}
			</div>
		</Panel>
	);

	if (!revisionData) {
		return (
			<Panel header="Historial de Revisiones" bordered>
				<div style={{ textAlign: "center", padding: 20, color: "#666" }}>
					<MessageIcon style={{ fontSize: "2em", marginBottom: 10 }} />
					<div>No hay datos de revisión disponibles</div>
					<div style={{ fontSize: "12px" }}>
						Guarde la homologación para habilitar las revisiones
					</div>
				</div>
			</Panel>
		);
	}

	return (
		<Panel header="Historial de Revisiones" bordered>
			<Grid fluid>
				<Row gutter={16}>
					{/* Lista de revisiones */}
					<Col xs={8}>
						<div style={{ marginBottom: 16 }}>
							<h6>Revisiones ({revisionData.revisiones.length})</h6>
							<Badge 
								color={getRevisionStatusColor(revisionData.status)} 
								content={revisionData.status} 
							/>
						</div>

						<List>
							{revisionData.revisiones.map((revision, index) => (
								<List.Item
									key={revision.version}
									index={index}
									style={{ 
										cursor: "pointer",
										backgroundColor: selectedRevision?.version === revision.version ? "#f0f8ff" : "transparent"
									}}
									onClick={() => setSelectedRevision(revision)}
								>
									<div style={{ display: "flex", alignItems: "center" }}>
										<Avatar circle style={{ marginRight: 12 }}>
											{revision.created_by.charAt(0).toUpperCase()}
										</Avatar>
										<div style={{ flex: 1 }}>
											<div style={{ fontWeight: 500 }}>
												Revisión {revision.version}
											</div>
											<div style={{ fontSize: "12px", color: "#666" }}>
												Por {revision.created_by} • {formatDate(revision.created_at)}
											</div>
											<div style={{ marginTop: 4 }}>
												<Badge 
													color={getRevisionStatusColor(revision.status)} 
													content={revision.status} 
												/>
												<span style={{ marginLeft: 8, fontSize: "12px" }}>
													{revision.comments.length} comentario(s)
												</span>
											</div>
										</div>
									</div>
								</List.Item>
							))}
						</List>

						{revisionData.revisiones.length === 0 && (
							<div style={{ textAlign: "center", padding: 20, color: "#666" }}>
								<MessageIcon style={{ fontSize: "1.5em", marginBottom: 8 }} />
								<div>No hay revisiones aún</div>
							</div>
						)}
					</Col>

					{/* Detalles de la revisión seleccionada */}
					<Col xs={16}>
						{selectedRevision ? (
							<div>
								<div style={{ 
									display: "flex", 
									justifyContent: "space-between", 
									alignItems: "center",
									marginBottom: 16
								}}>
									<h6>Revisión {selectedRevision.version}</h6>
									<Badge 
										color={getRevisionStatusColor(selectedRevision.status)} 
										content={selectedRevision.status} 
									/>
								</div>

								{selectedRevision.generalComments && (
									<>
										<Panel header="Comentarios Generales" bordered style={{ marginBottom: 16 }}>
											{selectedRevision.generalComments}
										</Panel>
									</>
								)}

								<h6 style={{ marginBottom: 8 }}>
									Comentarios de Campo ({selectedRevision.comments.length})
								</h6>

								{selectedRevision.comments.map((comment) => (
									<CommentItem
										key={comment.id}
										comment={comment}
										revisionVersion={selectedRevision.version}
										canResolve={!isReviewing && revisionData.can_edit}
									/>
								))}

								{selectedRevision.comments.length === 0 && (
									<div style={{ 
										textAlign: "center", 
										padding: 20, 
										color: "#666",
										border: "1px dashed #ccc",
										borderRadius: 4
									}}>
										No hay comentarios de campo en esta revisión
									</div>
								)}
							</div>
						) : (
							<div style={{ 
								textAlign: "center", 
								padding: 40, 
								color: "#666",
								border: "1px dashed #ccc",
								borderRadius: 4
							}}>
								<Visible style={{ fontSize: "2em", marginBottom: 10 }} />
								<div>Selecciona una revisión para ver los detalles</div>
							</div>
						)}
					</Col>
				</Row>
			</Grid>

			{/* Botón para nueva revisión */}
			{!isReviewing && revisionData.can_review && (
				<>
					<Divider />
					<div style={{ textAlign: "center" }}>
						<Button
							appearance="primary"
							startIcon={<Edit />}
							onClick={() => dispatch(showRevisionModal())}
						>
							Iniciar Nueva Revisión
						</Button>
					</div>
				</>
			)}
		</Panel>
	);
};
