/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Home, 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface ValorNatural {
  id: string;
  valorNatural: number;
  valorHomologado: number;
  resultado: number;
  desviacion: number;
  enRango: boolean;
}

interface EstadisticasNaturales {
  media: number;
  desviacionEstandar: number;
  coeficienteVariacion: number;
  minimo: number;
  maximo: number;
  rango: number;
  totalComparables: number;
}

export default function ValoresNaturalesPage() {
  const [selectedComparable, setSelectedComparable] = React.useState<string | null>(null);

  // Datos de ejemplo para valores naturales
  const [valoresNaturales] = React.useState<ValorNatural[]>([
    {
      id: "C1",
      valorNatural: 19310.34,
      valorHomologado: 16413.79,
      resultado: 0.85,
      desviacion: -15.0,
      enRango: true
    },
    {
      id: "C2", 
      valorNatural: 18285.71,
      valorHomologado: 17188.57,
      resultado: 0.94,
      desviacion: -6.0,
      enRango: true
    },
    {
      id: "C3",
      valorNatural: 18857.14,
      valorHomologado: 16594.29,
      resultado: 0.88,
      desviacion: -12.0,
      enRango: true
    },
    {
      id: "C4",
      valorNatural: 17948.72,
      valorHomologado: 16513.21,
      resultado: 0.92,
      desviacion: -8.0,
      enRango: true
    },
    {
      id: "C5",
      valorNatural: 20145.50,
      valorHomologado: 15876.33,
      resultado: 0.79,
      desviacion: -21.2,
      enRango: true
    }
  ]);

  // Cálculo de estadísticas
  const calcularEstadisticas = (): EstadisticasNaturales => {
    const valoresHomologados = valoresNaturales.map((v: ValorNatural) => v.valorHomologado);
    const valoresNaturalesData = valoresNaturales.map((v: ValorNatural) => v.valorNatural);
    
    const media = valoresHomologados.reduce((sum: number, val: number) => sum + val, 0) / valoresHomologados.length;
    const varianza = valoresHomologados.reduce((sum: number, val: number) => sum + Math.pow(val - media, 2), 0) / valoresHomologados.length;
    const desviacionEstandar = Math.sqrt(varianza);
    const coeficienteVariacion = (desviacionEstandar / media) * 100;
    
    const minimo = Math.min(...valoresHomologados);
    const maximo = Math.max(...valoresHomologados);
    const rango = maximo / minimo;

    return {
      media,
      desviacionEstandar,
      coeficienteVariacion,
      minimo,
      maximo,
      rango,
      totalComparables: valoresNaturales.length
    };
  };

  const estadisticas = calcularEstadisticas();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getResultadoColor = (resultado: number) => {
    if (resultado >= 0.7 && resultado <= 1.3) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const getDesviacionColor = (desviacion: number) => {
    if (Math.abs(desviacion) <= 20) {
      return 'bg-green-100 text-green-800';
    } else if (Math.abs(desviacion) <= 30) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const getDispercionAlert = () => {
    if (estadisticas.coeficienteVariacion <= 15) {
      return { type: 'success', message: 'Dispersión aceptable (≤ 15%)' };
    } else if (estadisticas.coeficienteVariacion <= 25) {
      return { type: 'warning', message: 'Dispersión moderada (15-25%)' };
    } else {
      return { type: 'error', message: 'Dispersión alta (> 25%)' };
    }
  };

  const getRangoAlert = () => {
    if (estadisticas.rango <= 1.5) {
      return { type: 'success', message: 'Rango aceptable (≤ 1.5)' };
    } else if (estadisticas.rango <= 2.0) {
      return { type: 'warning', message: 'Rango moderado (1.5-2.0)' };
    } else {
      return { type: 'error', message: 'Rango alto (> 2.0)' };
    }
  };

  const dispersiónAlert = getDispercionAlert();
  const rangoAlert = getRangoAlert();

  const comparablesEnRango = valoresNaturales.filter((v: ValorNatural) => v.enRango).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2">
            <Home className="w-4 h-4" />
            Inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Análisis de Valores Naturales
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Comparación entre valores naturales y homologados con análisis estadístico
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Exportar Análisis
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Recalcular
          </Button>
        </div>
      </div>

      {/* Alertas de Calidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`border-l-4 p-4 rounded ${
          dispersiónAlert.type === 'success' ? 'border-green-500 bg-green-50' :
          dispersiónAlert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
          'border-red-500 bg-red-50'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <strong>Coeficiente de Variación:</strong> {dispersiónAlert.message}
            </div>
          </div>
        </div>

        <div className={`border-l-4 p-4 rounded ${
          rangoAlert.type === 'success' ? 'border-green-500 bg-green-50' :
          rangoAlert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
          'border-red-500 bg-red-50'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <strong>Rango Máx./Mín.:</strong> {rangoAlert.message}
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Media Homologada</p>
                <p className="text-xl font-bold">{formatCurrency(estadisticas.media)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Desv. Estándar</p>
                <p className="text-xl font-bold">{formatCurrency(estadisticas.desviacionEstandar)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Coef. Variación</p>
                <p className="text-xl font-bold">{formatPercentage(estadisticas.coeficienteVariacion)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">En Rango</p>
                <p className="text-xl font-bold">{comparablesEnRango}/{estadisticas.totalComparables}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análisis Detallado de Valores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comparable</TableHead>
                  <TableHead className="text-right">Valor Natural</TableHead>
                  <TableHead className="text-right">Valor Homologado</TableHead>
                  <TableHead className="text-center">Resultado</TableHead>
                  <TableHead className="text-center">Desviación %</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valoresNaturales.map((valor: ValorNatural) => (
                  <TableRow 
                    key={valor.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedComparable === valor.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedComparable(valor.id)}
                  >
                    <TableCell className="font-medium">{valor.id}</TableCell>
                    
                    <TableCell className="text-right">
                      {formatCurrency(valor.valorNatural)}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {formatCurrency(valor.valorHomologado)}
                    </TableCell>

                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getResultadoColor(valor.resultado)}`}>
                        {formatNumber(valor.resultado, 3)}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getDesviacionColor(valor.desviacion)}`}>
                        {formatPercentage(valor.desviacion)}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      {valor.enRango ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Resumen Estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Dispersión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Mínimo:</span>
                <span className="font-bold">{formatCurrency(estadisticas.minimo)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Máximo:</span>
                <span className="font-bold">{formatCurrency(estadisticas.maximo)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rango (Máx/Mín):</span>
                <span className={`px-2 py-1 rounded font-bold ${
                  estadisticas.rango <= 1.5 ? 'bg-green-100 text-green-800' :
                  estadisticas.rango <= 2.0 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {formatNumber(estadisticas.rango, 2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Media:</span>
                <span className="font-bold">{formatCurrency(estadisticas.media)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Desviación Estándar:</span>
                <span className="font-bold">{formatCurrency(estadisticas.desviacionEstandar)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Coeficiente de Variación:</span>
                <span className={`px-2 py-1 rounded font-bold ${
                  estadisticas.coeficienteVariacion <= 15 ? 'bg-green-100 text-green-800' :
                  estadisticas.coeficienteVariacion <= 25 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {formatPercentage(estadisticas.coeficienteVariacion)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Criterios de Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Factor Resultante</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Rango aceptable: 0.70 - 1.30</li>
                  <li>• Alerta cuando está fuera del ±30%</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Coeficiente de Variación</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Excelente: ≤ 15%</li>
                  <li>• Aceptable: 15% - 25%</li>
                  <li>• Alto: &gt; 25%</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Rango Máx./Mín.</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Ideal: ≤ 1.5</li>
                  <li>• Aceptable: 1.5 - 2.0</li>
                  <li>• Alto: &gt; 2.0</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
