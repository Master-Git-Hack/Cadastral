/** @format */

"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Send, X } from "lucide-react";
import { useRevisionesStore } from "@/store/revisiones";
import { FieldMeta, RevisionSuggestion } from "@/store/revisiones/types";

interface FormData {
  fieldPath: string;
  suggestedValue: string;
  comment: string;
}

export const RevisionModal: React.FC = () => {
  const {
    showRevisionModal,
    currentSuggestions,
    availableFields,
    saving,
    error,
    hideRevisionModal,
    addSuggestion,
    removeSuggestion,
    submitRevision,
    clearSuggestions,
    setAvailableFields
  } = useRevisionesStore();

  const [formData, setFormData] = React.useState<FormData>({
    fieldPath: "",
    suggestedValue: "",
    comment: ""
  });
  const [generalComments, setGeneralComments] = React.useState("");
  const [selectedField, setSelectedField] = React.useState<FieldMeta | null>(null);

  // Cargar campos disponibles cuando se abre el modal
  React.useEffect(() => {
    if (showRevisionModal) {
      // En v3 estos campos vendrían del contexto de homologación
      const mockFields: FieldMeta[] = [
        { path: "factors.zone", label: "Factor de Zona", page: 1, type: "number" },
        { path: "factors.age", label: "Factor de Edad", page: 2, type: "number" },
        { path: "documentation.Area.subject.value", label: "Área del Sujeto", page: 3, type: "number" },
        { path: "documentation.SalesCost.averageUnitCost.value", label: "Costo Unitario Promedio", page: 4, type: "number" },
        { path: "documentation.Indiviso.surface", label: "Superficie Indiviso", page: 5, type: "number" },
      ];
      setAvailableFields(mockFields);
    }
  }, [showRevisionModal, setAvailableFields]);

  const handleFieldSelect = (fieldPath: string) => {
    const field = availableFields.find(f => f.path === fieldPath);
    if (field) {
      setSelectedField(field);
      // En v3 obtendríamos el valor actual del store de homologación
      const currentValue = ""; // TODO: Obtener valor actual
      setFormData({
        fieldPath,
        suggestedValue: currentValue,
        comment: ""
      });
    }
  };

  const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
    // Simple console log para ahora, se puede reemplazar con toast library
    console.log(`${variant === "destructive" ? "ERROR" : "INFO"}: ${title} - ${description}`);
  };

  const handleAddSuggestion = () => {
    if (!selectedField || !formData.comment.trim()) {
      showToast("Error", "Debe seleccionar un campo y escribir un comentario", "destructive");
      return;
    }

    const suggestion: RevisionSuggestion = {
      fieldPath: formData.fieldPath,
      fieldLabel: selectedField.label,
      page: selectedField.page,
      currentValue: "", // TODO: Obtener valor actual
      suggestedValue: formData.suggestedValue,
      comment: formData.comment,
      reviewer: "Usuario Actual" // TODO: Obtener del contexto de auth
    };

    addSuggestion(suggestion);
    
    // Reset form
    setFormData({
      fieldPath: "",
      suggestedValue: "",
      comment: ""
    });
    setSelectedField(null);

    showToast("Sugerencia agregada", `Sugerencia agregada para ${selectedField.label}`);
  };

  const handleRemoveSuggestion = (fieldPath: string) => {
    removeSuggestion(fieldPath);
    showToast("Sugerencia eliminada", "La sugerencia ha sido eliminada");
  };

  const handleSubmit = async () => {
    if (currentSuggestions.length === 0 && !generalComments.trim()) {
      showToast("Error", "Debe agregar al menos una sugerencia o comentario general", "destructive");
      return;
    }

    try {
      await submitRevision(generalComments);
      showToast("Revisión enviada", "La revisión ha sido enviada correctamente");
      handleClose();
    } catch (err) {
      showToast("Error", error || "Error al enviar la revisión", "destructive");
    }
  };

  const handleClose = () => {
    if (currentSuggestions.length > 0 || generalComments.trim()) {
      if (confirm("¿Está seguro que desea cerrar? Se perderán los cambios no guardados.")) {
        clearSuggestions();
        setGeneralComments("");
        hideRevisionModal();
      }
    } else {
      hideRevisionModal();
    }
  };

  if (!showRevisionModal) return null;

  return (
    <Dialog open={showRevisionModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Revisión</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario de nueva sugerencia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agregar Sugerencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="field-select">Campo a revisar</Label>
                <Select value={formData.fieldPath} onValueChange={handleFieldSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un campo" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field.path} value={field.path}>
                        {field.label} (Página {field.page})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedField && (
                <div>
                  <Label htmlFor="suggested-value">Valor sugerido</Label>
                  <Input
                    id="suggested-value"
                    value={formData.suggestedValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev: FormData) => ({ ...prev, suggestedValue: e.target.value }))}
                    placeholder="Ingrese el valor sugerido"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="comment">Comentario *</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev: FormData) => ({ ...prev, comment: e.target.value }))}
                  placeholder="Describa la sugerencia de cambio"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleAddSuggestion}
                disabled={!selectedField || !formData.comment.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Sugerencia
              </Button>
            </CardContent>
          </Card>

          {/* Lista de sugerencias actuales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Sugerencias ({currentSuggestions.length})
                {currentSuggestions.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearSuggestions()}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpiar Todo
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentSuggestions.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No hay sugerencias agregadas
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {currentSuggestions.map((suggestion, index) => (
                    <Card key={suggestion.fieldPath} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">Página {suggestion.page}</span>
                              <span className="font-medium text-sm">{suggestion.fieldLabel}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {suggestion.fieldPath}
                            </div>
                            <div className="text-sm mb-2">
                              <strong>Valor sugerido:</strong> {suggestion.suggestedValue}
                            </div>
                            <div className="text-sm bg-muted p-2 rounded">
                              {suggestion.comment}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSuggestion(suggestion.fieldPath)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comentarios generales */}
        <div>
          <Label htmlFor="general-comments">Comentarios Generales</Label>
          <Textarea
            id="general-comments"
            value={generalComments}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGeneralComments(e.target.value)}
            placeholder="Comentarios generales sobre la homologación (opcional)"
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={saving || (currentSuggestions.length === 0 && !generalComments.trim())}
          >
            {saving ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Revisión
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
