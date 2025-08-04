/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Eye, 
  Edit, 
  CheckCircle, 
  AlertCircle, 
  Clock 
} from "lucide-react";

import { 
  RevisionModal, 
  RevisionHistory, 
  RevisionPanel 
} from "@/components/revisiones";
import { useRevisiones } from "@/hooks/useRevisiones";

export default function RevisionesDemo() {
  const {
    revisionData,
    isReviewing,
    currentSuggestions,
    loading,
    error,
    stats,
    ui,
    startNewRevision,
    setAvailableFieldsByType,
    loadRevisionData
  } = useRevisiones({
    homologacionId: 123,
    tipo: "TERRENO",
    tipoServicio: "ADQUISICION",
    autoLoad: false // Para el demo, cargamos manualmente
  });

  React.useEffect(() => {
    // Simular carga de campos disponibles
    setAvailableFieldsByType("TERRENO");
  }, [setAvailableFieldsByType]);

  const handleLoadDemoData = () => {
    // Simular carga de datos de revisión
    loadRevisionData();
  };

  const handleStartRevision = () => {
    startNewRevision("Demo User");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Revisiones</h1>
          <p className="text-muted-foreground">
            Demo del sistema de revisiones migrado de v1 a v3
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleLoadDemoData} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Cargar Datos Demo
          </Button>
          <Button onClick={ui.openHistory} variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Ver Historial
          </Button>
          {stats.puedeRevisar && !isReviewing && (
            <Button onClick={handleStartRevision}>
              <Edit className="w-4 h-4 mr-2" />
              Nueva Revisión
            </Button>
          )}
        </div>
      </div>

      {/* Estados */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revisiones</p>
                <p className="text-2xl font-bold">{stats.totalRevisiones}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comentarios Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.comentariosPendientes}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sugerencias Actuales</p>
                <p className="text-2xl font-bold text-blue-600">{stats.sugerenciasActuales}</p>
              </div>
              <Edit className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <div className="flex items-center mt-1">
                  {revisionData ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {revisionData.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Sin datos
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estado de carga */}
      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando datos de revisión...</p>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Error:</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Panel de revisión activa */}
      {isReviewing && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-blue-800">
              <Edit className="w-5 h-5 mr-2" />
              Revisión en Curso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700">
                  Tienes una revisión activa con <strong>{currentSuggestions.length}</strong> sugerencias.
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Usa el botón "Nueva Revisión" para agregar más sugerencias.
                </p>
              </div>
              <Button onClick={ui.openModal} size="sm">
                Continuar Revisión
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información de la homologación */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Información de la Homologación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID</label>
                <p className="font-mono">123</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                <p>TERRENO</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Servicio</label>
                <p>ADQUISICION</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Última Revisión</label>
                <p>{stats.ultimaRevision || "N/A"}</p>
              </div>
            </div>

            <Separator />

            {/* Funcionalidades disponibles */}
            <div>
              <h4 className="font-medium mb-3">Funcionalidades del Sistema de Revisiones</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Crear revisiones con sugerencias de cambios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Historial completo de revisiones</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Resolver y descartar comentarios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Panel de estado en tiempo real</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Integración con stores de Zustand</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel de control */}
        <div className="space-y-4">
          <RevisionPanel />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={ui.openModal} 
                className="w-full" 
                variant="outline"
                disabled={!stats.puedeRevisar}
              >
                <Edit className="w-4 h-4 mr-2" />
                Abrir Modal
              </Button>
              <Button 
                onClick={ui.openHistory} 
                className="w-full" 
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Historial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Componentes modales */}
      <RevisionModal />
      
      {ui.showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Historial de Revisiones</h3>
              <Button onClick={ui.closeHistory} variant="ghost" size="sm">
                ×
              </Button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <RevisionHistory />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
