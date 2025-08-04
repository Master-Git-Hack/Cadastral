/** @format */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calculator,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Settings,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Eye,
  Download,
  Printer,
} from "lucide-react";
import { useFactoresStore } from "@/store/factores";
import { useRevisionesStore } from "@/store/revisiones";
import { useValoresNaturalesStore } from "@/store/valores-naturales";
import { formatNumb } from "@/utils/number";

interface BigPictureProps {
  justipreciacionId?: string;
  tipo?: "TERRENO" | "RENTA";
  readonly?: boolean;
}

export const BigPicture: React.FC<BigPictureProps> = ({
  justipreciacionId,
  tipo = "TERRENO",
  readonly = false,
}) => {
  // Estados de los stores
  const registrosData: any[] = []; // Placeholder para registros especializados
  const factoresData = useFactoresStore((state: any) => state.factores);
  const revisionesData = useRevisionesStore((state: any) => state.data);
  const valoresData = useValoresNaturalesStore((state: any) => state.analysis);

  // Calcular estadísticas generales
  const getOverallStatus = () => {
    const systems = [
      { name: "Registros", status: registrosData?.length > 0 ? "complete" : "pending" },
      { name: "Factores", status: factoresData?.edad || factoresData?.superficie ? "complete" : "pending" },
      { name: "Revisiones", status: revisionesData?.reviews?.length > 0 ? "complete" : "pending" },
      { name: "Valores", status: valoresData?.records?.length > 0 ? "complete" : "pending" },
    ];

    const completed = systems.filter(s => s.status === "complete").length;
    const total = systems.length;
    const percentage = Math.round((completed / total) * 100);

    return {
      systems,
      completed,
      total,
      percentage,
      status: percentage === 100 ? "complete" : percentage >= 75 ? "good" : percentage >= 50 ? "warning" : "pending"
    };
  };

  const overallStatus = getOverallStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "text-green-700 bg-green-100 border-green-200";
      case "good": return "text-blue-700 bg-blue-100 border-blue-200";
      case "warning": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "pending": return "text-gray-700 bg-gray-100 border-gray-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle className="h-4 w-4" />;
      case "good": return <TrendingUp className="h-4 w-4" />;
      case "warning": return <Clock className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      default: return <Calculator className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del panorama general */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Panorama General - Homologación {tipo}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Vista unificada del proceso de justipreciación
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(overallStatus.status)}`}>
                {getStatusIcon(overallStatus.status)}
                <span className="font-medium text-sm">
                  {overallStatus.completed}/{overallStatus.total} Sistemas
                </span>
                <span className="text-xs">({overallStatus.percentage}%)</span>
              </div>
              
              {!readonly && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Configurar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Barra de progreso general */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso General</span>
                <span className="text-sm text-muted-foreground">{overallStatus.percentage}% completado</span>
              </div>
              <Progress value={overallStatus.percentage} className="h-3" />
            </div>

            {/* Estado de sistemas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {overallStatus.systems.map((system) => (
                <div key={system.name} className={`p-3 rounded-lg border ${getStatusColor(system.status)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{system.name}</span>
                    {getStatusIcon(system.status)}
                  </div>
                  <p className="text-xs mt-1">
                    {system.status === "complete" ? "Completado" : "Pendiente"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de sistemas */}
      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="registros">Registros</TabsTrigger>
          <TabsTrigger value="factores">Factores</TabsTrigger>
          <TabsTrigger value="revisiones">Revisiones</TabsTrigger>
          <TabsTrigger value="valores">Valores</TabsTrigger>
        </TabsList>

        {/* Tab de Resumen */}
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Métricas principales */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Valor Estimado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ${valoresData?.stats?.homologated?.average ? formatNumb(valoresData.stats.homologated.average) : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Valor homologado promedio
                  </p>
                  {valoresData?.qualityScore && (
                    <div className="flex items-center gap-2">
                      <Progress value={valoresData.qualityScore} className="h-2 flex-1" />
                      <span className="text-xs">{valoresData.qualityScore}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comparativos analizados */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Comparativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">
                    {registrosData?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Registros especializados
                  </p>
                  {valoresData?.records && (
                    <p className="text-xs text-green-600">
                      {valoresData.stats?.results?.withinRange || 0} en rango aceptable
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Estado de revisión */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Revisiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-purple-600">
                    {revisionesData?.reviews?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Revisiones realizadas
                  </p>
                  {revisionesData?.status && (
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      revisionesData.status === "approved" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {revisionesData.status === "approved" ? "Aprobado" : "En revisión"}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas y recomendaciones */}
          {valoresData?.recommendations && valoresData.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Alertas y Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {valoresData.recommendations.slice(0, 3).map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab de Registros */}
        <TabsContent value="registros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Registros Especializados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {registrosData && registrosData.length > 0 ? (
                <div className="space-y-3">
                  {registrosData.slice(0, 5).map((registro: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{registro.folio || `Registro ${idx + 1}`}</p>
                        <p className="text-sm text-muted-foreground">
                          {registro.tipo} - {registro.ubicacion}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${formatNumb(registro.valor || 0)}</p>
                        <p className="text-sm text-muted-foreground">
                          {registro.superficie} m²
                        </p>
                      </div>
                    </div>
                  ))}
                  {registrosData.length > 5 && (
                    <p className="text-center text-sm text-muted-foreground">
                      +{registrosData.length - 5} registros más
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No hay registros especializados cargados
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Factores */}
        <TabsContent value="factores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Factores de Homologación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {factoresData?.edad && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Factor de Edad
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumb(factoresData.edad.factor, 4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Edad: {factoresData.edad.anos} años
                    </p>
                  </div>
                )}
                
                {factoresData?.superficie && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Factor de Superficie
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumb(factoresData.superficie.factor, 4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Superficie: {factoresData.superficie.metros} m²
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Revisiones */}
        <TabsContent value="revisiones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Control de Revisiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {revisionesData?.reviews && revisionesData.reviews.length > 0 ? (
                <div className="space-y-3">
                  {revisionesData.reviews.slice(0, 3).map((revision: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{revision.reviewer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(revision.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        revision.status === "approved" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {revision.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No hay revisiones registradas
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Valores */}
        <TabsContent value="valores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Análisis de Valores Naturales
              </CardTitle>
            </CardHeader>
            <CardContent>
              {valoresData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${formatNumb(valoresData.stats?.natural?.average || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Valor Natural</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        ${formatNumb(valoresData.stats?.homologated?.average || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Valor Homologado</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {valoresData.qualityScore || 0}%
                      </p>
                      <p className="text-sm text-muted-foreground">Calidad del Análisis</p>
                    </div>
                  </div>
                  
                  {valoresData.stats?.results && (
                    <div className="flex justify-center">
                      <div className="text-center">
                        <p className="text-lg font-semibold">
                          {valoresData.stats.results.withinRange} de {valoresData.records?.length || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Comparativos en rango</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No hay análisis de valores disponible
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Acciones finales */}
      {!readonly && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg">
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button variant="outline" size="lg">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir Reporte
              </Button>
              <Button size="lg" disabled={overallStatus.percentage < 100}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Homologación
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
