/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, MessageCircle, Eye, User } from "lucide-react";
import { useRevisionesStore } from "@/store/revisiones";
import { RevisionComment, RevisionEntry } from "@/store/revisiones/types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const RevisionHistory: React.FC = () => {
  const {
    revisionData,
    selectedRevision,
    setSelectedRevision,
    resolveComment,
    dismissComment,
    loading
  } = useRevisionesStore();

  const handleCommentAction = async (revisionVersion: string, commentId: string, action: "resolve" | "dismiss") => {
    if (action === "resolve") {
      await resolveComment(revisionVersion, commentId);
    } else {
      await dismissComment(revisionVersion, commentId);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "PENDING": return "bg-orange-100 text-orange-800";
      case "RESOLVED": return "bg-green-100 text-green-800";
      case "DISMISSED": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getRevisionStatusColor = (status: string): string => {
    switch (status) {
      case "EN_REVISION": return "bg-blue-100 text-blue-800";
      case "COMPLETADA": return "bg-green-100 text-green-800";
      case "PENDIENTE_CORRECCION": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
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

  const CommentItem: React.FC<{ 
    comment: RevisionComment; 
    revisionVersion: string; 
    canResolve: boolean 
  }> = ({ comment, revisionVersion, canResolve }: {
    comment: RevisionComment;
    revisionVersion: string;
    canResolve: boolean;
  }) => (
    <Card className="border-l-4 border-l-blue-500 mb-3">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.fieldLabel}</span>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(comment.status)}`}>
              {comment.status}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Página {comment.page}</span>
        </div>
        <div className="text-xs text-muted-foreground">{comment.fieldPath}</div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-3">
          <div className="text-sm">
            <strong>Valor actual:</strong> {JSON.stringify(comment.originalValue)}
          </div>
          <div className="text-sm">
            <strong>Valor sugerido:</strong> {JSON.stringify(comment.suggestedValue)}
          </div>
        </div>

        <div className="bg-muted p-3 rounded mb-3 text-sm">
          {comment.comment}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Por {comment.reviewer} • {formatDate(comment.created_at)}</span>
          
          {canResolve && comment.status === "PENDING" && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCommentAction(revisionVersion, comment.id, "resolve")}
                className="h-7 px-2 text-green-600 hover:text-green-700"
              >
                <Check className="w-3 h-3 mr-1" />
                Resolver
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCommentAction(revisionVersion, comment.id, "dismiss")}
                className="h-7 px-2 text-red-600 hover:text-red-700"
              >
                <X className="w-3 h-3 mr-1" />
                Descartar
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Cargando historial...</p>
        </div>
      </div>
    );
  }

  if (!revisionData) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-medium mb-2">No hay datos de revisión disponibles</h3>
          <p className="text-sm text-muted-foreground">
            Guarde la homologación para habilitar las revisiones
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Encabezado con estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Historial de Revisiones</span>
            <span className={`px-3 py-1 rounded text-sm ${getRevisionStatusColor(revisionData.status)}`}>
              {revisionData.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{revisionData.stats.total_revisiones}</div>
              <div className="text-sm text-muted-foreground">Total Revisiones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{revisionData.stats.comentarios_pendientes}</div>
              <div className="text-sm text-muted-foreground">Comentarios Pendientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{revisionData.current_version}</div>
              <div className="text-sm text-muted-foreground">Versión Actual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lista de revisiones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revisiones ({revisionData.revisiones.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {revisionData.revisiones.map((revision, index) => (
                <div
                  key={revision.version}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedRevision?.version === revision.version ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedRevision(revision)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Revisión {revision.version}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getRevisionStatusColor(revision.status)}`}>
                          {revision.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Por {revision.created_by} • {formatDate(revision.created_at)}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{revision.summary.total_comments} comentarios</span>
                        {revision.summary.pending_comments > 0 && (
                          <span className="text-orange-600">
                            {revision.summary.pending_comments} pendientes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalle de revisión seleccionada */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              {selectedRevision ? `Detalle - Revisión ${selectedRevision.version}` : "Seleccione una revisión"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRevision ? (
              <div className="space-y-4">
                {/* Información general */}
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Información General</span>
                    <span className={`px-2 py-1 rounded text-xs ${getRevisionStatusColor(selectedRevision.status)}`}>
                      {selectedRevision.status}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div><strong>Creada por:</strong> {selectedRevision.created_by}</div>
                    <div><strong>Fecha:</strong> {formatDate(selectedRevision.created_at)}</div>
                    <div><strong>Comentarios:</strong> {selectedRevision.summary.total_comments}</div>
                  </div>
                  {selectedRevision.general_comments && (
                    <div className="mt-3 p-2 bg-background rounded text-sm">
                      <strong>Comentarios generales:</strong>
                      <div className="mt-1">{selectedRevision.general_comments}</div>
                    </div>
                  )}
                </div>

                {/* Comentarios */}
                <div>
                  <h4 className="font-medium mb-3">
                    Comentarios ({selectedRevision.comments.length})
                  </h4>
                  {selectedRevision.comments.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">
                      No hay comentarios en esta revisión
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto space-y-3">
                      {selectedRevision.comments.map((comment) => (
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          revisionVersion={selectedRevision.version}
                          canResolve={revisionData.can_review}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <p>Seleccione una revisión para ver los detalles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
