/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Check, AlertCircle, Clock } from "lucide-react";
import { useRevisionesStore } from "@/store/revisiones";

export const RevisionPanel: React.FC = () => {
  const {
    revisionData,
    isReviewing,
    currentSuggestions,
    toggleRevisionModal,
    submitRevision
  } = useRevisionesStore();

  const handleStartReview = () => {
    toggleRevisionModal();
  };

  const handleSubmitCurrentRevision = async () => {
    if (currentSuggestions.length === 0) {
      if (!confirm("No hay sugerencias agregadas. ¿Desea enviar la revisión vacía?")) {
        return;
      }
    }
    
    if (confirm("¿Está seguro que desea enviar la revisión actual?")) {
      await submitRevision();
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "PENDIENTE": return "bg-blue-100 text-blue-800";
      case "EN_REVISION": return "bg-orange-100 text-orange-800";
      case "REVISADO_CON_ERRORES": return "bg-red-100 text-red-800";
      case "REVISADO_APROBADO": return "bg-green-100 text-green-800";
      case "RECHAZADO": return "bg-red-100 text-red-800";
      case "OBSOLETO": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPendingCommentsCount = (): number => {
    if (!revisionData) return 0;
    
    return revisionData.revisiones.reduce((total, revision) => {
      return total + revision.comments.filter(c => c.status === "PENDING").length;
    }, 0);
  };

  const pendingComments = getPendingCommentsCount();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Estado de Revisión
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Estado actual */}
        {revisionData ? (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Estado actual:</span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(revisionData.status)}`}>
                  {revisionData.status}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <div><strong>Versión:</strong> {revisionData.current_version}</div>
                <div><strong>Revisiones realizadas:</strong> {revisionData.revisiones.length}</div>
                {pendingComments > 0 && (
                  <div className="flex items-center text-orange-600">
                    <Clock className="w-3 h-3 mr-1" />
                    <strong>Comentarios pendientes:</strong> {pendingComments}
                  </div>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-2">
              {revisionData.can_review && !isReviewing && (
                <Button
                  onClick={handleStartReview}
                  className="w-full"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Nueva Revisión
                </Button>
              )}

              {isReviewing && (
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="flex items-center text-blue-800 mb-2">
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="font-medium">Revisión en curso</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      Sugerencias agregadas: {currentSuggestions.length}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSubmitCurrentRevision}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Enviar Revisión
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm">No hay datos de revisión disponibles</div>
            <div className="text-xs mt-1">
              Guarde la homologación para habilitar las revisiones
            </div>
          </div>
        )}

        {/* Resumen de estado */}
        {revisionData && (
          <div className="border-t pt-3">
            <div className="text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Total revisiones:</span>
                <span>{revisionData.stats.total_revisiones}</span>
              </div>
              <div className="flex justify-between">
                <span>Comentarios pendientes:</span>
                <span className={pendingComments > 0 ? "text-orange-600" : ""}>
                  {revisionData.stats.comentarios_pendientes}
                </span>
              </div>
              {revisionData.stats.ultima_revision && (
                <div className="flex justify-between">
                  <span>Última revisión:</span>
                  <span>{revisionData.stats.ultima_revision}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
