/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Save, Plus, Download, MapPin, Calendar, DollarSign, Home } from 'lucide-react';
import Link from 'next/link';

interface ComparableData {
  id: number;
  direccion: string;
  colonia: string;
  municipio: string;
  superficie: number;
  precio: number;
  precioM2: number;
  fecha: string;
  fuente: string;
  estado: 'activo' | 'pendiente' | 'archivado';
  caracteristicas: {
    habitaciones: number;
    baños: number;
    estacionamientos: number;
    antiguedad: number;
  };
}

export default function ComparablesPage() {
  const [busqueda, setBusqueda] = React.useState("");
  const [filtroEstado, setFiltroEstado] = React.useState<string>("todos");
  const [comparablesSeleccionados, setComparablesSeleccionados] = React.useState<number[]>([]);

  const handleAgregarComparable = () => {
    const nuevoComparable: ComparableData = {
      id: Math.max(...comparables.map((c: ComparableData) => c.id)) + 1,
      direccion: "",
      colonia: "",
      municipio: "",
      superficie: 0,
      precio: 0,
      precioM2: 0,
      fecha: new Date().toISOString().split('T')[0],
      fuente: "",
      estado: 'pendiente',
      caracteristicas: {
        habitaciones: 0,
        baños: 0,
        estacionamientos: 0,
        antiguedad: 0
      }
    };
    setComparables([...comparables, nuevoComparable]);
  };

  const handleEliminarComparable = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este comparable?')) {
      setComparables(comparables.filter((c: ComparableData) => c.id !== id));
    }
  };

  const handleEditarComparable = (id: number, campo: string, valor: any) => {
    const nuevosComparables = comparables.map((c: ComparableData) => {
      if (c.id === id) {
        const actualizado = { ...c, [campo]: valor };
        // Recalcular precio por m² cuando cambie precio o superficie
        if (campo === 'precio' || campo === 'superficie') {
          actualizado.precioM2 = actualizado.superficie > 0 ? actualizado.precio / actualizado.superficie : 0;
        }
        return actualizado;
      }
      return c;
    });
    setComparables(nuevosComparables);
  };

  const handleSeleccionarComparable = (id: number) => {
    setComparablesSeleccionados((prev: number[]) => 
      prev.includes(id) ? 
      prev.filter((cId: number) => cId !== id) : 
      [...prev, id]
    );
  };

  const handleExportarSeleccionados = () => {
    const seleccionados = comparables.filter((c: ComparableData) => comparablesSeleccionados.includes(c.id));
    console.log('Exportando:', seleccionados);
    // Aquí iría la lógica de exportación
  };

  const handleAnalisisEstadistico = () => {
    const seleccionados = comparables.filter((c: ComparableData) => comparablesSeleccionados.includes(c.id));
    if (seleccionados.length < 2) {
      alert('Seleccione al menos 2 comparables para análisis estadístico');
      return;
    }
    // Aquí iría la lógica de análisis estadístico
    console.log('Iniciando análisis estadístico de:', seleccionados);
  };

  const [comparables, setComparables] = React.useState<ComparableData[]>([
    {
      id: 1,
      direccion: "Av. Reforma 1234",
      colonia: "Centro",
      municipio: "Guadalajara",
      superficie: 150,
      precio: 2500000,
      precioM2: 16666.67,
      fecha: "2024-01-15",
      fuente: "Inmobiliaria XYZ",
      estado: 'activo',
      caracteristicas: {
        habitaciones: 3,
        baños: 2,
        estacionamientos: 2,
        antiguedad: 5
      }
    },
    {
      id: 2,
      direccion: "Calle Libertad 567",
      colonia: "Americana",
      municipio: "Guadalajara", 
      superficie: 180,
      precio: 3200000,
      precioM2: 17777.78,
      fecha: "2024-02-08",
      fuente: "Portal Inmobiliario",
      estado: 'activo',
      caracteristicas: {
        habitaciones: 4,
        baños: 3,
        estacionamientos: 2,
        antiguedad: 3
      }
    },
    {
      id: 3,
      direccion: "Blvd. Puerta de Hierro 890",
      colonia: "Puerta de Hierro",
      municipio: "Zapopan",
      superficie: 220,
      precio: 4500000,
      precioM2: 20454.55,
      fecha: "2024-01-28",
      fuente: "Evaluación directa",
      estado: 'pendiente',
      caracteristicas: {
        habitaciones: 4,
        baños: 4,
        estacionamientos: 3,
        antiguedad: 2
      }
    },
    {
      id: 4,
      direccion: "Av. Patria 345",
      colonia: "Jardines del Bosque",
      municipio: "Guadalajara",
      superficie: 165,
      precio: 2800000,
      precioM2: 16969.70,
      fecha: "2024-02-12",
      fuente: "MLS Sistema",
      estado: 'activo',
      caracteristicas: {
        habitaciones: 3,
        baños: 2,
        estacionamientos: 2,
        antiguedad: 8
      }
    },
    {
      id: 5,
      direccion: "Calle Real 678",
      colonia: "Real del Valle",
      municipio: "Zapopan",
      superficie: 200,
      precio: 3800000,
      precioM2: 19000.00,
      fecha: "2024-01-20",
      fuente: "Avalúo comercial",
      estado: 'archivado',
      caracteristicas: {
        habitaciones: 4,
        baños: 3,
        estacionamientos: 2,
        antiguedad: 1
      }
    }
  ]);

  const comparablesFiltrados = comparables.filter((comparable: ComparableData) => {
    const matchBusqueda = comparable.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         comparable.colonia.toLowerCase().includes(busqueda.toLowerCase()) ||
                         comparable.municipio.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = filtroEstado === "todos" || comparable.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const toggleSeleccion = (id: number) => {
    setComparablesSeleccionados((prev: number[]) => 
      prev.includes(id) 
        ? prev.filter((item: number) => item !== id)
        : [...prev, id]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'archivado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const promedioPrecioM2 = comparablesFiltrados.length > 0 
    ? comparablesFiltrados.reduce((sum: number, item: ComparableData) => sum + item.precioM2, 0) / comparablesFiltrados.length
    : 0;

  const precioMinimo = comparablesFiltrados.length > 0 
    ? Math.min(...comparablesFiltrados.map((c: ComparableData) => c.precioM2))
    : 0;

  const precioMaximo = comparablesFiltrados.length > 0 
    ? Math.max(...comparablesFiltrados.map((c: ComparableData) => c.precioM2))
    : 0;

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
            Gestión de Comparables
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Sistema para análisis y gestión de propiedades comparables
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleAgregarComparable}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Comparable
          </Button>
          <Button variant="outline" onClick={handleExportarSeleccionados} disabled={comparablesSeleccionados.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Exportar ({comparablesSeleccionados.length})
          </Button>
          <Button variant="outline" onClick={handleAnalisisEstadistico} disabled={comparablesSeleccionados.length < 2}>
            <DollarSign className="w-4 h-4 mr-2" />
            Análisis
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{comparablesFiltrados.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Promedio/m²</p>
                <p className="text-xl font-bold">{formatCurrency(promedioPrecioM2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Mínimo/m²</p>
                <p className="text-xl font-bold">{formatCurrency(precioMinimo)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Máximo/m²</p>
                <p className="text-xl font-bold">{formatCurrency(precioMaximo)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="busqueda"
                  placeholder="Dirección, colonia o municipio..."
                  value={busqueda}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="min-w-[150px]">
              <Label htmlFor="estado">Estado</Label>
              <select
                id="estado"
                value={filtroEstado}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltroEstado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activo</option>
                <option value="pendiente">Pendiente</option>
                <option value="archivado">Archivado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Comparables */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Comparables Disponibles</CardTitle>
            {comparablesSeleccionados.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md font-medium">
                  {comparablesSeleccionados.length} seleccionados
                </span>
                <Button size="sm" variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Generar Análisis
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Sel.</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-right">Superficie</TableHead>
                  <TableHead className="text-right">Precio Total</TableHead>
                  <TableHead className="text-right">Precio/m²</TableHead>
                  <TableHead>Características</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fuente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparablesFiltrados.map((comparable: ComparableData) => (
                  <TableRow key={comparable.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={comparablesSeleccionados.includes(comparable.id)}
                        onChange={() => toggleSeleccion(comparable.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {comparable.direccion}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{comparable.colonia}</div>
                        <div className="text-sm text-gray-500">{comparable.municipio}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {comparable.superficie.toLocaleString()} m²
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(comparable.precio)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-600">
                      {formatCurrency(comparable.precioM2)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{comparable.caracteristicas.habitaciones} hab., {comparable.caracteristicas.baños} baños</div>
                        <div className="text-gray-500">{comparable.caracteristicas.estacionamientos} est., {comparable.caracteristicas.antiguedad} años</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {formatDate(comparable.fecha)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded text-xs font-medium ${getEstadoColor(comparable.estado)}`}
                      >
                        {comparable.estado}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {comparable.fuente}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {comparablesFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron comparables que coincidan con los filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Análisis Rápido */}
      {comparablesSeleccionados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Selección</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Precio Promedio/m²</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    comparables
                      .filter((c: ComparableData) => comparablesSeleccionados.includes(c.id))
                      .reduce((sum: number, c: ComparableData) => sum + c.precioM2, 0) / comparablesSeleccionados.length
                  )}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Superficie Promedio</h4>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(
                    comparables
                      .filter((c: ComparableData) => comparablesSeleccionados.includes(c.id))
                      .reduce((sum: number, c: ComparableData) => sum + c.superficie, 0) / comparablesSeleccionados.length
                  )} m²
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">Rango de Precios</h4>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(
                    Math.min(...comparables
                      .filter((c: ComparableData) => comparablesSeleccionados.includes(c.id))
                      .map((c: ComparableData) => c.precioM2)
                    )
                  )} - {formatCurrency(
                    Math.max(...comparables
                      .filter((c: ComparableData) => comparablesSeleccionados.includes(c.id))
                      .map((c: ComparableData) => c.precioM2)
                    )
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
