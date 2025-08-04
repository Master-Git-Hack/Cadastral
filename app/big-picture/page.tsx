/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calculator, 
  Home, 
  TrendingUp, 
  BarChart3, 
  FileText,
  Settings,
  ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';

interface ComparableData {
  id: string;
  oferta: number;
  supTerreno: number;
  areaLote: number;
  precioUnitario: number;
  factorUbicacion: number;
  factorEdad: number;
  factorSuperficie: number;
  factorComercializacion: number;
  factorHomologacion: number;
  ponderacion: number;
  valorFinal: number;
}

interface BigPictureProps {
  type?: 'TERRENO' | 'RENTA';
  isIndivisoUsed?: boolean;
}

export default function BigPicturePage({ type = 'TERRENO', isIndivisoUsed = false }: BigPictureProps) {
  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [indivisoEnabled, setIndivisoEnabled] = React.useState(isIndivisoUsed);
  const [observations, setObservations] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [roundedTo, setRoundedTo] = React.useState(0);
  const [valueRounded, setValueRounded] = React.useState(2500000);

  // Datos de ejemplo para la tabla
  const [comparables] = React.useState<ComparableData[]>([
    {
      id: "C1",
      oferta: 2800000,
      supTerreno: 150,
      areaLote: 145,
      precioUnitario: 19310.34,
      factorUbicacion: 0.95,
      factorEdad: 1.02,
      factorSuperficie: 0.98,
      factorComercializacion: 0.90,
      factorHomologacion: 0.85,
      ponderacion: 25.5,
      valorFinal: 16413.79
    },
    {
      id: "C2", 
      oferta: 3200000,
      supTerreno: 180,
      areaLote: 175,
      precioUnitario: 18285.71,
      factorUbicacion: 1.05,
      factorEdad: 0.95,
      factorSuperficie: 1.02,
      factorComercializacion: 0.92,
      factorHomologacion: 0.94,
      ponderacion: 30.2,
      valorFinal: 17188.57
    },
    {
      id: "C3",
      oferta: 2600000,
      supTerreno: 140,
      areaLote: 138,
      precioUnitario: 18857.14,
      factorUbicacion: 0.98,
      factorEdad: 1.08,
      factorSuperficie: 0.96,
      factorComercializacion: 0.88,
      factorHomologacion: 0.88,
      ponderacion: 22.8,
      valorFinal: 16594.29
    },
    {
      id: "C4",
      oferta: 3500000,
      supTerreno: 200,
      areaLote: 195,
      precioUnitario: 17948.72,
      factorUbicacion: 1.02,
      factorEdad: 0.98,
      factorSuperficie: 1.05,
      factorComercializacion: 0.91,
      factorHomologacion: 0.92,
      ponderacion: 21.5,
      valorFinal: 16513.21
    }
  ]);

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

  const sortData = (column: string) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const getSortedData = () => {
    if (!sortColumn) return comparables;
    
    return [...comparables].sort((a, b) => {
      const aValue = (a as any)[sortColumn];
      const bValue = (b as any)[sortColumn];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Cálculos de resumen
  const promedioPonderado = comparables.reduce((sum: number, item: ComparableData) => sum + item.valorFinal, 0) / comparables.length;
  const totalPonderacion = comparables.reduce((sum: number, item: ComparableData) => sum + item.ponderacion, 0);
  const superficiePromedio = comparables.reduce((sum: number, item: ComparableData) => sum + item.areaLote, 0) / comparables.length;

  const roundingOptions = [
    { value: 0, label: "Sin Redondeo" },
    { value: 1, label: "A la Unidad" },
    { value: 2, label: "A la Decena" },
    { value: 3, label: "A la Centena" },
    { value: 4, label: "Al Millar" }
  ];

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
            Vista General - {type === 'TERRENO' ? 'Terreno' : 'Renta'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Análisis integral de factores de homologación y resultados finales
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="indiviso-mode"
              checked={indivisoEnabled}
              onCheckedChange={setIndivisoEnabled}
            />
            <Label htmlFor="indiviso-mode">
              {type === 'TERRENO' ? 'Indiviso' : 'Superficie'}
            </Label>
          </div>
        </div>
      </div>

      {/* Resumen de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Promedio Ponderado</p>
                <p className="text-xl font-bold">{formatCurrency(promedioPonderado)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Ponderación</p>
                <p className="text-xl font-bold">{formatPercentage(totalPonderacion)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Superficie Promedio</p>
                <p className="text-xl font-bold">{formatNumber(superficiePromedio, 0)} m²</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total Comparables</p>
                <p className="text-xl font-bold">{comparables.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Tabla de Homologación de {type === 'TERRENO' ? 'Terrenos' : 'Rentas'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('id')}
                      className="h-8 p-0 font-bold"
                    >
                      Oferta
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData(type === 'TERRENO' ? 'oferta' : 'supTerreno')}
                      className="h-8 p-0 font-bold"
                    >
                      {type === 'TERRENO' ? 'Precio Oferta' : 'Sup. Terreno ($/m²)'}
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>

                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('areaLote')}
                      className="h-8 p-0 font-bold"
                    >
                      Área Lote Moda (m²)
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>

                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('precioUnitario')}
                      className="h-8 p-0 font-bold"
                    >
                      Precio Unitario ($/m²)
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>

                  <TableHead className="text-center bg-blue-50">
                    <div className="font-bold">Factores de Homologación</div>
                    <div className="grid grid-cols-4 gap-1 mt-1 text-xs">
                      <div>Ubicación</div>
                      <div>Edad</div>
                      <div>Superficie</div>
                      <div>Comercial.</div>
                    </div>
                  </TableHead>

                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('factorHomologacion')}
                      className="h-8 p-0 font-bold"
                    >
                      F.Ho. Re.
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>

                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('ponderacion')}
                      className="h-8 p-0 font-bold"
                    >
                      Ponderación
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>

                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => sortData('valorFinal')}
                      className="h-8 p-0 font-bold"
                    >
                      Valor Final
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        Cargando datos...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  getSortedData().map((item: ComparableData) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      
                      <TableCell className="text-right">
                        {type === 'TERRENO' 
                          ? formatCurrency(item.oferta)
                          : formatCurrency(item.supTerreno)
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {formatNumber(item.areaLote, 0)} m²
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.precioUnitario)}
                      </TableCell>

                      <TableCell className="bg-blue-50">
                        <div className="grid grid-cols-4 gap-1 text-center text-sm">
                          <div>{formatNumber(item.factorUbicacion, 3)}</div>
                          <div>{formatNumber(item.factorEdad, 3)}</div>
                          <div>{formatNumber(item.factorSuperficie, 3)}</div>
                          <div>{formatNumber(item.factorComercializacion, 3)}</div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        {formatNumber(item.factorHomologacion, 3)}
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md font-medium">
                          {formatPercentage(item.ponderacion)}
                        </span>
                      </TableCell>

                      <TableCell className="text-right font-bold text-green-600">
                        {formatCurrency(item.valorFinal)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Redondeo y Observaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Redondeo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="roundingType">Tipo de Redondeo</Label>
              <select
                id="roundingType"
                value={roundedTo}
                onChange={(e) => setRoundedTo(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roundingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="roundedValue">Valor Redondeado</Label>
              <Input
                id="roundedValue"
                type="number"
                value={valueRounded}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueRounded(Number(e.target.value))}
                placeholder="Valor final redondeado"
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Resultado Final</h4>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(valueRounded)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="observations">Observaciones del Análisis</Label>
                <Textarea
                  id="observations"
                  placeholder="Ingrese observaciones sobre el análisis de homologación..."
                  value={observations}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setObservations(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Resumen del Análisis</h4>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li>• Superficie sujeto: {superficiePromedio.toFixed(0)} m²</li>
                  <li>• Superficie lote moda: {superficiePromedio.toFixed(0)} m²</li>
                  <li>• Ponderación total: {formatPercentage(totalPonderacion)}</li>
                  <li>• {indivisoEnabled ? 'Con' : 'Sin'} proceso de indivisos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
