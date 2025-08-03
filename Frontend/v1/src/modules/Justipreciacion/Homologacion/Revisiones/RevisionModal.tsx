/** @format */

import React, { useState, useEffect } from "react";
import { 
	Modal, 
	Form, 
	Button, 
	Input, 
	SelectPicker, 
	Grid, 
	Row, 
	Col, 
	Panel,
	Message,
	toaster,
	Divider,
	Tag,
	List,
	IconButton,
	Whisper,
	Tooltip
} from "rsuite";
import { Plus, Trash, Send, Close } from "@rsuite/icons";
import { useAppSelector, useAppDispatch } from "../../../../redux";
import {
	getShowRevisionModal,
	getCurrentSuggestions,
	getAvailableFields,
	getRevisionErrors,
	hideRevisionModal,
	addSuggestion,
	removeSuggestion,
	updateSuggestion,
	clearSuggestions,
	submitRevision,
	cancelRevision,
	setAvailableFields
} from "../../../../redux/justipreciacion/homologacion/revisiones";
import { getHomologaciones } from "../../../../redux/justipreciacion/homologacion";
import { getAvailableFields as getFieldsConfig } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.initialState";
import { getFieldValue } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.actions";
import { RevisionSuggestion } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.interface";

interface FormData {
	fieldPath: string;
	suggestedValue: string;
	comment: string;
}

export const RevisionModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(getShowRevisionModal);
	const currentSuggestions = useAppSelector(getCurrentSuggestions);
	const availableFields = useAppSelector(getAvailableFields);
	const errors = useAppSelector(getRevisionErrors);
	const { record, factors, documentation } = useAppSelector(getHomologaciones);

	const [formData, setFormData] = useState<FormData>({
		fieldPath: "",
		suggestedValue: "",
		comment: ""
	});
	const [generalComments, setGeneralComments] = useState("");
	const [selectedField, setSelectedField] = useState<any>(null);

	// Cargar campos disponibles cuando se abre el modal
	useEffect(() => {
		if (showModal && record.type) {
			const fields = getFieldsConfig(record.type as "TERRENO" | "RENTA");
			dispatch(setAvailableFields(fields));
		}
	}, [showModal, record.type, dispatch]);

	// Preparar opciones para el selector de campos
	const fieldOptions = availableFields.map(field => ({
		label: `${field.label} (Página ${field.page})`,
		value: field.path,
		field
	}));

	const handleFieldSelect = (fieldPath: string | null) => {
		if (!fieldPath) return;
		
		const field = availableFields.find(f => f.path === fieldPath);
		if (field) {
			setSelectedField(field);
			const currentValue = getFieldValue({ factors, documentation }, fieldPath);
			setFormData({
				fieldPath,
				suggestedValue: typeof currentValue === "object" ? JSON.stringify(currentValue) : String(currentValue || ""),
				comment: ""
			});
		}
	};

	const handleAddSuggestion = () => {
		if (!selectedField || !formData.comment.trim()) {
			toaster.push(
				<Message type="error">
					Debe seleccionar un campo y escribir un comentario
				</Message>
			);
			return;
		}

		let parsedValue: any;
		try {
			// Intentar parsear como JSON primero, si falla usar como string
			parsedValue = formData.suggestedValue.startsWith('{') || formData.suggestedValue.startsWith('[')
				? JSON.parse(formData.suggestedValue)
				: formData.suggestedValue;
		} catch {
			parsedValue = formData.suggestedValue;
		}

		const currentValue = getFieldValue({ factors, documentation }, formData.fieldPath);

		const suggestion: RevisionSuggestion = {
			fieldPath: formData.fieldPath,
			currentValue,
			suggestedValue: parsedValue,
			comment: formData.comment,
			fieldLabel: selectedField.label,
			page: selectedField.page
		};

		dispatch(addSuggestion(suggestion));

		// Limpiar formulario
		setFormData({
			fieldPath: "",
			suggestedValue: "",
			comment: ""
		});
		setSelectedField(null);

		toaster.push(
			<Message type="success">
				Sugerencia agregada correctamente
			</Message>
		);
	};

	const handleRemoveSuggestion = (fieldPath: string) => {
		dispatch(removeSuggestion(fieldPath));
		toaster.push(
			<Message type="info">
				Sugerencia eliminada
			</Message>
		);
	};

	const handleSubmitRevision = () => {
		if (currentSuggestions.length === 0 && !generalComments.trim()) {
			toaster.push(
				<Message type="warning">
					Debe agregar al menos una sugerencia o comentario general
				</Message>
			);
			return;
		}

		dispatch(submitRevision({ generalComments }));
		
		toaster.push(
			<Message type="success">
				Revisión enviada correctamente
			</Message>
		);
	};

	const handleCancel = () => {
		if (currentSuggestions.length > 0) {
			if (window.confirm("¿Está seguro que desea cancelar? Se perderán todas las sugerencias.")) {
				dispatch(cancelRevision());
			}
		} else {
			dispatch(hideRevisionModal());
		}
	};

	return (
		<Modal 
			open={showModal} 
			onClose={handleCancel}
			size="lg"
			backdrop="static"
		>
			<Modal.Header>
				<Modal.Title>Nueva Revisión - {record.type}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{errors.length > 0 && (
					<Message type="error" style={{ marginBottom: 16 }}>
						{errors.join(", ")}
					</Message>
				)}

				<Grid fluid>
					<Row gutter={16}>
						{/* Formulario para agregar sugerencias */}
						<Col xs={14}>
							<Panel header="Agregar Sugerencia de Campo" bordered>
								<Form layout="vertical">
									<Form.Group>
										<Form.ControlLabel>Campo a Revisar</Form.ControlLabel>
										<SelectPicker
											data={fieldOptions}
											value={formData.fieldPath}
											onChange={handleFieldSelect}
											placeholder="Seleccione un campo..."
											searchable
											cleanable={false}
											style={{ width: "100%" }}
											renderMenuItem={(label, item) => (
												<div>
													<div style={{ fontWeight: 500 }}>{item.field.label}</div>
													<div style={{ fontSize: "12px", color: "#666" }}>
														Página {item.field.page} • {item.field.path}
													</div>
												</div>
											)}
										/>
									</Form.Group>

									{selectedField && (
										<>
											<Form.Group>
												<Form.ControlLabel>Valor Actual</Form.ControlLabel>
												<Input
													value={JSON.stringify(getFieldValue({ factors, documentation }, formData.fieldPath))}
													readOnly
													style={{ backgroundColor: "#f8f9fa" }}
												/>
											</Form.Group>

											<Form.Group>
												<Form.ControlLabel>Valor Sugerido</Form.ControlLabel>
												<Input
													as="textarea"
													rows={3}
													value={formData.suggestedValue}
													onChange={(value) => setFormData({ ...formData, suggestedValue: value })}
													placeholder="Ingrese el valor sugerido..."
												/>
											</Form.Group>

											<Form.Group>
												<Form.ControlLabel>Comentario / Justificación</Form.ControlLabel>
												<Input
													as="textarea"
													rows={3}
													value={formData.comment}
													onChange={(value) => setFormData({ ...formData, comment: value })}
													placeholder="Explique el motivo del cambio sugerido..."
												/>
											</Form.Group>

											<Button
												appearance="primary"
												startIcon={<Plus />}
												onClick={handleAddSuggestion}
												disabled={!formData.comment.trim()}
											>
												Agregar Sugerencia
											</Button>
										</>
									)}
								</Form>
							</Panel>
						</Col>

						{/* Lista de sugerencias actuales */}
						<Col xs={10}>
							<Panel header={`Sugerencias Agregadas (${currentSuggestions.length})`} bordered>
								{currentSuggestions.length > 0 ? (
									<List>
										{currentSuggestions.map((suggestion, index) => (
											<List.Item key={suggestion.fieldPath} index={index}>
												<div style={{ width: "100%" }}>
													<div style={{ 
														display: "flex", 
														justifyContent: "space-between", 
														alignItems: "flex-start",
														marginBottom: 8
													}}>
														<div style={{ flex: 1 }}>
															<div style={{ fontWeight: 500, marginBottom: 4 }}>
																{suggestion.fieldLabel}
															</div>
															<Tag size="sm" color="blue">
																Página {suggestion.page}
															</Tag>
														</div>
														<Whisper
															trigger="hover"
															speaker={<Tooltip>Eliminar sugerencia</Tooltip>}
														>
															<IconButton
																size="xs"
																icon={<Trash />}
																color="red"
																appearance="subtle"
																onClick={() => handleRemoveSuggestion(suggestion.fieldPath)}
															/>
														</Whisper>
													</div>
													
													<div style={{ 
														fontSize: "12px", 
														color: "#666",
														marginBottom: 4
													}}>
														<strong>Actual:</strong> {JSON.stringify(suggestion.currentValue)}
													</div>
													<div style={{ 
														fontSize: "12px", 
														color: "#666",
														marginBottom: 8
													}}>
														<strong>Sugerido:</strong> {JSON.stringify(suggestion.suggestedValue)}
													</div>
													
													<div style={{ 
														padding: 8,
														backgroundColor: "#f8f9fa",
														borderRadius: 4,
														fontSize: "12px"
													}}>
														{suggestion.comment}
													</div>
												</div>
											</List.Item>
										))}
									</List>
								) : (
									<div style={{ 
										textAlign: "center", 
										padding: 20, 
										color: "#666",
										border: "1px dashed #ccc",
										borderRadius: 4
									}}>
										No hay sugerencias agregadas
									</div>
								)}
							</Panel>
						</Col>
					</Row>
				</Grid>

				<Divider />

				{/* Comentarios generales */}
				<Panel header="Comentarios Generales (Opcional)" bordered>
					<Input
						as="textarea"
						rows={4}
						value={generalComments}
						onChange={setGeneralComments}
						placeholder="Agregue comentarios generales sobre la homologación..."
					/>
				</Panel>
			</Modal.Body>

			<Modal.Footer>
				<Button 
					onClick={handleCancel} 
					appearance="subtle"
					startIcon={<Close />}
				>
					Cancelar
				</Button>
				<Button 
					onClick={handleSubmitRevision} 
					appearance="primary"
					startIcon={<Send />}
					disabled={currentSuggestions.length === 0 && !generalComments.trim()}
				>
					Enviar Revisión
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
