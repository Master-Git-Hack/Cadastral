/** @format */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  BarChart3,
  Target,
} from "lucide-react";
import { useValoresNaturalesStore } from "@/store/valores-naturales";
import { formatNumb } from "@/utils/number";

interface ValoresNaturalesProps {
  salesCostData?: Array<{
    unitaryCost: number;
    homologatedValue: number;
  }>;
  autoCalculate?: boolean;
}

export const ValoresNaturales: React.FC<ValoresNaturalesProps> = ({ 
  salesCostData = [], 
  autoCalculate = true 
}) => {
  const analysis = useValoresNaturalesStore((state: any) => state.analysis);
  const loading = useValoresNaturalesStore((state: any) => state.loading);
  const error = useValoresNaturalesStore((state: any) => state.error);
  const config = useValoresNaturalesStore((state: any) => state.config);
  const showDetails = useValoresNaturalesStore((state: any) => state.showDetails);
  const selectedRecord = useValoresNaturalesStore((state: any) => state.selectedRecord);
  
  const calculateNaturalValues = useValoresNaturalesStore((state: any) => state.calculateNaturalValues);
  const setShowDetails = useValoresNaturalesStore((state: any) => state.setShowDetails);
  const setSelectedRecord = useValoresNaturalesStore((state: any) => state.setSelectedRecord);

  // Calcular al montar si hay datos
  if (autoCalculate && salesCostData.length > 0 && !analysis) {
    calculateNaturalValues({ salesCostData });
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent": return "text-green-700 bg-green-100";
      case "good": return "text-blue-700 bg-blue-100";
      case "acceptable": return "text-yellow-700 bg-yellow-100";
      case "poor": return "text-red-700 bg-red-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case "excellent": return <CheckCircle className="h-4 w-4" />;
      case "good": return <TrendingUp className="h-4 w-4" />;
      case "acceptable": return <Info className="h-4 w-4" />;
      case "poor": return <AlertTriangle className="h-4 w-4" />;
      default: return <Calculator className="h-4 w-4" />;
    }
  };

  const getResultBadge = (deviation: number, isOutlier: boolean) => {
    if (isOutlier) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">Fuera de rango</span>;
    }
    if (deviation < 10) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Excelente</span>;
    }
    if (deviation < 20) {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Bueno</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">Aceptable</span>;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Calculando valores naturales...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Error: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Valores Naturales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calculator className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No hay datos para analizar</p>
            <p className="text-sm text-gray-400">
              Los valores naturales se calcularán automáticamente cuando haya datos de costos de venta
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con resumen de calidad */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Análisis de Valores Naturales
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comparación entre valores naturales y homologados
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getQualityColor(analysis.quality)}`}>
                {getQualityIcon(analysis.quality)}
                <span className="font-medium text-sm capitalize">{analysis.quality}</span>
                <span className="text-xs">({analysis.qualityScore}%)</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Settings className="h-4 w-4 mr-1" />
                {showDetails ? "Ocultar" : "Mostrar"} Detalles
              </Button>
            </div>
          </div>
        </CardHeader>

        {showDetails && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Precisión</span>
                </div>
                <Progress value={analysis.qualityScore} className="mb-2" />
                <p className="text-sm text-blue-700">
                  Calidad: {analysis.qualityScore}%
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">En Rango</span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {analysis.stats.results.withinRange}
                </p>
                <p className="text-sm text-green-600">
                  de {analysis.records.length} comparativos
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900">Atípicos</span>
                </div>
                <p className="text-2xl font-bold text-orange-700">
                  {analysis.stats.results.outliers}
                </p>
                <p className="text-sm text-orange-600">
                  fuera del ±{config.outlierThreshold}%
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tabla de comparativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tabla de Comparativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Comparable</TableHead>
                  <TableHead className="text-right">Valor Natural</TableHead>
                  <TableHead className="text-right">Valor Homologado</TableHead>
                  <TableHead className="text-right">Factor</TableHead>
                  <TableHead className="text-right">Desviación</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysis.records.map((record: any) => (
                  <TableRow 
                    key={record.id}
                    className={`cursor-pointer transition-colors ${
                      selectedRecord === record.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRecord(
                      selectedRecord === record.id ? null : record.id
                    )}
                  >
                    <TableCell className="font-medium">
                      {record.comparable}
                    </TableCell>
                    <TableCell className="text-right">
                      ${formatNumb(record.naturalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${formatNumb(record.homologatedValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={record.isOutlier ? 'text-red-600 font-medium' : ''}>
                        {formatNumb(record.result, 4)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={record.isOutlier ? 'text-red-600 font-medium' : ''}>
                        {formatNumb(record.deviation, 1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getResultBadge(record.deviation, record.isOutlier)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estadísticas de Valores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Valores Naturales</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Mínimo: ${formatNumb(analysis.stats.natural.min)}</div>
                  <div>Máximo: ${formatNumb(analysis.stats.natural.max)}</div>
                  <div>Promedio: ${formatNumb(analysis.stats.natural.average)}</div>
                  <div>Relación: {formatNumb(analysis.stats.natural.ratio, 2)}x</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Valores Homologados</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Mínimo: ${formatNumb(analysis.stats.homologated.min)}</div>
                  <div>Máximo: ${formatNumb(analysis.stats.homologated.max)}</div>
                  <div>Promedio: ${formatNumb(analysis.stats.homologated.average)}</div>
                  <div>Relación: {formatNumb(analysis.stats.homologated.ratio, 2)}x</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Análisis Estadístico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Desviación Estándar</span>
                  <span className="text-sm">${formatNumb(analysis.stats.homologated.standardDeviation)}</span>
                </div>
                <Progress 
                  value={Math.min(analysis.stats.homologated.standardDeviation / 1000 * 100, 100)} 
                  className="h-2" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Coeficiente de Variación</span>
                  <span className={`text-sm font-medium ${
                    analysis.stats.homologated.coefficientOfVariation > config.maxCoefficientOfVariation 
                      ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatNumb(analysis.stats.homologated.coefficientOfVariation, 1)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(analysis.stats.homologated.coefficientOfVariation / 30 * 100, 100)} 
                  className="h-2"
                />
              </div>

              <div className="pt-2 border-t">
                <div className="text-sm text-gray-600">
                  <p>Factor promedio: {formatNumb(analysis.stats.results.average, 4)}</p>
                  <p>Rango aceptable: ±{config.outlierThreshold}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValoresNaturales;
