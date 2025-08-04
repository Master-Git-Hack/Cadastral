/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Settings, 
  MapPin, 
  Calendar, 
  Home as Building,
  TrendingUp,
  BarChart3,
  Map,
  Layers,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface FactorData {
  id: number;
  nombre: string;
  tipo: string;
  valor: number;
  categoria: string;
  activo: boolean;
  descripcion: string;
}

interface FactoresProps {
  type?: 'TERRENO' | 'RENTA';
}

export default function FactoresPage({ type = 'TERRENO' }: FactoresProps) {
  const [activeTab, setActiveTab] = React.useState("classification");
  const [editingId, setEditingId] = React.useState<number | null>(null);

  // Datos de factores por categoría
  const [factoresClasificacion] = React.useState<FactorData[]>([
    { id: 1, nombre: "Residencial Bajo", tipo: "clasificacion", valor: 0.85, categoria: "Uso de Suelo", activo: true, descripcion: "Zona residencial de nivel bajo" },
    { id: 2, nombre: "Residencial Medio", tipo: "clasificacion", valor: 1.00, categoria: "Uso de Suelo", activo: true, descripcion: "Zona residencial de nivel medio" },
    { id: 3, nombre: "Residencial Alto", tipo: "clasificacion", valor: 1.15, categoria: "Uso de Suelo", activo: true, descripcion: "Zona residencial de nivel alto" },
    { id: 4, nombre: "Comercial", tipo: "clasificacion", valor: 1.25, categoria: "Uso de Suelo", activo: true, descripcion: "Zona comercial" },
    { id: 5, nombre: "Industrial", tipo: "clasificacion", valor: 0.75, categoria: "Uso de Suelo", activo: true, descripcion: "Zona industrial" }
  ]);

  const [factoresUbicacion] = React.useState<FactorData[]>([
    { id: 1, nombre: "Centro", tipo: "ubicacion", valor: 1.20, categoria: "Ubicación", activo: true, descripcion: "Centro de la ciudad" },
    { id: 2, nombre: "Norte", tipo: "ubicacion", valor: 1.05, categoria: "Ubicación", activo: true, descripcion: "Zona norte" },
    { id: 3, nombre: "Sur", tipo: "ubicacion", valor: 0.95, categoria: "Ubicación", activo: true, descripcion: "Zona sur" },
    { id: 4, nombre: "Este", tipo: "ubicacion", valor: 1.00, categoria: "Ubicación", activo: true, descripcion: "Zona este" },
    { id: 5, nombre: "Oeste", tipo: "ubicacion", valor: 0.90, categoria: "Ubicación", activo: true, descripcion: "Zona oeste" }
  ]);

  const [factoresEdad] = React.useState<FactorData[]>([
    { id: 1, nombre: "0-5 años", tipo: "edad", valor: 1.00, categoria: "Edad", activo: true, descripcion: "Construcción nueva" },
    { id: 2, nombre: "6-10 años", tipo: "edad", valor: 0.95, categoria: "Edad", activo: true, descripcion: "Construcción reciente" },
    { id: 3, nombre: "11-20 años", tipo: "edad", valor: 0.85, categoria: "Edad", activo: true, descripcion: "Construcción intermedia" },
    { id: 4, nombre: "21-30 años", tipo: "edad", valor: 0.75, categoria: "Edad", activo: true, descripcion: "Construcción madura" },
    { id: 5, nombre: "Más de 30 años", tipo: "edad", valor: 0.65, categoria: "Edad", activo: true, descripcion: "Construcción antigua" }
  ]);

  const [factoresSuperficie] = React.useState<FactorData[]>([
    { id: 1, nombre: "Muy pequeño (< 100 m²)", tipo: "superficie", valor: 0.85, categoria: "Superficie", activo: true, descripcion: "Superficie muy pequeña" },
    { id: 2, nombre: "Pequeño (100-200 m²)", tipo: "superficie", valor: 0.95, categoria: "Superficie", activo: true, descripcion: "Superficie pequeña" },
    { id: 3, nombre: "Promedio (200-400 m²)", tipo: "superficie", valor: 1.00, categoria: "Superficie", activo: true, descripcion: "Superficie promedio" },
    { id: 4, nombre: "Grande (400-600 m²)", tipo: "superficie", valor: 1.05, categoria: "Superficie", activo: true, descripcion: "Superficie grande" },
    { id: 5, nombre: "Muy grande (> 600 m²)", tipo: "superficie", valor: 1.10, categoria: "Superficie", activo: true, descripcion: "Superficie muy grande" }
  ]);

  const [factoresTopografia] = React.useState<FactorData[]>([
    { id: 1, nombre: "Plano", tipo: "topografia", valor: 1.00, categoria: "Topografía", activo: true, descripcion: "Terreno plano" },
    { id: 2, nombre: "Ligeramente inclinado", tipo: "topografia", valor: 0.95, categoria: "Topografía", activo: true, descripcion: "Inclinación ligera" },
    { id: 3, nombre: "Inclinado", tipo: "topografia", valor: 0.85, categoria: "Topografía", activo: true, descripcion: "Terreno inclinado" },
    { id: 4, nombre: "Muy inclinado", tipo: "topografia", valor: 0.75, categoria: "Topografía", activo: true, descripcion: "Inclinación pronunciada" },
    { id: 5, nombre: "Irregular", tipo: "topografia", valor: 0.70, categoria: "Topografía", activo: true, descripcion: "Topografía irregular" }
  ]);

  const [factoresCalidad] = React.useState<FactorData[]>([
    { id: 1, nombre: "Económica", tipo: "calidad", valor: 0.80, categoria: "Calidad", activo: true, descripcion: "Construcción económica" },
    { id: 2, nombre: "Regular", tipo: "calidad", valor: 0.90, categoria: "Calidad", activo: true, descripcion: "Construcción regular" },
    { id: 3, nombre: "Buena", tipo: "calidad", valor: 1.00, categoria: "Calidad", activo: true, descripcion: "Construcción buena" },
    { id: 4, nombre: "Muy buena", tipo: "calidad", valor: 1.10, categoria: "Calidad", activo: true, descripcion: "Construcción muy buena" },
    { id: 5, nombre: "Excelente", tipo: "calidad", valor: 1.20, categoria: "Calidad", activo: true, descripcion: "Construcción excelente" }
  ]);

  const formatNumber = (value: number, decimals: number = 3) => {
    return value.toFixed(decimals);
  };

  const getFactorColor = (valor: number) => {
    if (valor >= 1.1) return 'bg-green-100 text-green-800';
    if (valor >= 0.95) return 'bg-blue-100 text-blue-800';
    if (valor >= 0.85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const renderFactorTable = (factores: FactorData[], titulo: string, icono: React.ReactNode) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icono}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-center">Factor</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factores.map((factor) => (
                <TableRow key={factor.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{factor.nombre}</TableCell>
                  <TableCell className="text-gray-600">{factor.descripcion}</TableCell>
                  <TableCell className="text-center">
                    {editingId === factor.id ? (
                      <Input
                        type="number"
                        step="0.001"
                        defaultValue={factor.valor}
                        className="w-20 text-center"
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === 'Enter') {
                            setEditingId(null);
                          }
                        }}
                      />
                    ) : (
                      <span 
                        className={`px-2 py-1 rounded cursor-pointer ${getFactorColor(factor.valor)}`}
                        onClick={() => setEditingId(factor.id)}
                      >
                        {formatNumber(factor.valor)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${factor.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {factor.activo ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingId(factor.id)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const totalFactoresActivos = [
    ...factoresClasificacion,
    ...factoresUbicacion,
    ...factoresEdad,
    ...factoresSuperficie,
    ...factoresTopografia,
    ...factoresCalidad
  ].filter(f => f.activo).length;

  const promedioFactores = [
    ...factoresClasificacion,
    ...factoresUbicacion,
    ...factoresEdad,
    ...factoresSuperficie,
    ...factoresTopografia,
    ...factoresCalidad
  ].reduce((sum, f) => sum + f.valor, 0) / (factoresClasificacion.length + factoresUbicacion.length + factoresEdad.length + factoresSuperficie.length + factoresTopografia.length + factoresCalidad.length);

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
            Gestión de Factores - {type === 'TERRENO' ? 'Terreno' : 'Renta'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Configuración y administración de factores de homologación
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Aplicar Factores
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Factores</p>
                <p className="text-2xl font-bold">{totalFactoresActivos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold">{formatNumber(promedioFactores)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Tipo Análisis</p>
                <p className="text-xl font-bold">{type}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Factores */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="classification">Clasificación</TabsTrigger>
          <TabsTrigger value="location">Ubicación</TabsTrigger>
          <TabsTrigger value="age">Edad</TabsTrigger>
          <TabsTrigger value="surface">Superficie</TabsTrigger>
          <TabsTrigger value="topography">Topografía</TabsTrigger>
          <TabsTrigger value="quality">Calidad</TabsTrigger>
        </TabsList>

        <TabsContent value="classification" className="mt-6">
          {renderFactorTable(
            factoresClasificacion, 
            "Factores de Clasificación de Uso de Suelo",
            <Layers className="w-5 h-5" />
          )}
        </TabsContent>

        <TabsContent value="location" className="mt-6">
          {renderFactorTable(
            factoresUbicacion, 
            "Factores de Ubicación",
            <MapPin className="w-5 h-5" />
          )}
        </TabsContent>

        <TabsContent value="age" className="mt-6">
          {renderFactorTable(
            factoresEdad, 
            "Factores de Edad de Construcción",
            <Calendar className="w-5 h-5" />
          )}
        </TabsContent>

        <TabsContent value="surface" className="mt-6">
          {renderFactorTable(
            factoresSuperficie, 
            "Factores de Superficie",
            <Map className="w-5 h-5" />
          )}
        </TabsContent>

        <TabsContent value="topography" className="mt-6">
          {renderFactorTable(
            factoresTopografia, 
            "Factores de Topografía",
            <BarChart3 className="w-5 h-5" />
          )}
        </TabsContent>

        <TabsContent value="quality" className="mt-6">
          {renderFactorTable(
            factoresCalidad, 
            "Factores de Calidad de Construcción",
            <Building className="w-5 h-5" />
          )}
        </TabsContent>
      </Tabs>

      {/* Resumen de Aplicación */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Aplicación de Factores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Factores Activos por Categoría</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Clasificación:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresClasificacion.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ubicación:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresUbicacion.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Edad:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresEdad.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Superficie:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresSuperficie.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Topografía:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresTopografia.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Calidad:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {factoresCalidad.filter((f: FactorData) => f.activo).length}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Información de Aplicación</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Los factores se aplican multiplicativamente</li>
                  <li>• Valores &gt; 1.0 incrementan el valor base</li>
                  <li>• Valores &lt; 1.0 reducen el valor base</li>
                  <li>• Haga clic en un factor para editarlo</li>
                  <li>• Los cambios se guardan automáticamente</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
