/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, Save, Plus, Minus, Building2, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';

interface CostoItem {
  id: number;
  costoDirecto: number;
  indirectos: number;
  valorNeto: number;
  m2: number;
  total: number;
  status?: string;
}

export default function CostosConstruccionPage() {
  const [titulo, setTitulo] = React.useState("Análisis de Costos de Construcción");
  const [enabledGTO, setEnabledGTO] = React.useState(false);
  const [factorGTO, setFactorGTO] = React.useState(1.15);
  const [redondeo, setRedondeo] = React.useState(0);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const handleAgregarCosto = () => {
    const nuevoCosto: CostoItem = {
      id: Math.max(...costos.map((c: CostoItem) => c.id), 0) + 1,
      costoDirecto: 0,
      indirectos: 25,
      valorNeto: 0,
      m2: 0,
      total: 0
    };
    setCostos([...costos, nuevoCosto]);
  };

  const handleEliminarCosto = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este registro?')) {
      setCostos(costos.filter((c: CostoItem) => c.id !== id));
    }
  };

  const handleEditarCosto = (id: number, campo: string, valor: any) => {
    const nuevosCostos = costos.map((c: CostoItem) => {
      if (c.id === id) {
        const actualizado = { ...c, [campo]: valor };
        // Recalcular valores dependientes
        if (campo === 'costoDirecto' || campo === 'indirectos') {
          actualizado.valorNeto = actualizado.costoDirecto * (1 + actualizado.indirectos / 100);
        }
        if (campo === 'valorNeto' || campo === 'm2') {
          actualizado.total = actualizado.m2 > 0 ? actualizado.valorNeto / actualizado.m2 : 0;
        }
        return actualizado;
      }
      return c;
    });
    setCostos(nuevosCostos);
  };

  const calcularPromedios = () => {
    if (costos.length === 0) return { promedioCosto: 0, promedioM2: 0 };
    
    const totalCosto = costos.reduce((sum: number, c: CostoItem) => sum + c.total, 0);
    const totalM2 = costos.reduce((sum: number, c: CostoItem) => sum + c.m2, 0);
    
    return {
      promedioCosto: totalCosto / costos.length,
      promedioM2: totalM2 / costos.length
    };
  };

  const aplicarFactorGTO = (valor: number) => {
    return enabledGTO ? valor * factorGTO : valor;
  };

  const aplicarRedondeo = (valor: number) => {
    if (redondeo === 0) return valor;
    return Math.round(valor / redondeo) * redondeo;
  };

  const [costos, setCostos] = React.useState<CostoItem[]>([
    {
      id: 1,
      costoDirecto: 2500000,
      indirectos: 25,
      valorNeto: 3125000,
      m2: 150,
      total: 20833.33
    },
    {
      id: 2,
      costoDirecto: 1800000,
      indirectos: 30,
      valorNeto: 2340000,
      m2: 120,
      total: 19500.00
    },
    {
      id: 3,
      costoDirecto: 3200000,
      indirectos: 22,
      valorNeto: 3904000,
      m2: 200,
      total: 19520.00
    }
  ]);

  const calcularValorNeto = (costoDirecto: number, indirectos: number) => {
    return costoDirecto * (1 + indirectos / 100);
  };

  const calcularTotal = (valorNeto: number, m2: number) => {
    return m2 > 0 ? valorNeto / m2 : 0;
  };

  const handleInputChange = (id: number, field: keyof CostoItem, value: number) => {
    setCostos((prev: CostoItem[]) => prev.map((item: CostoItem) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        // Recalcular valores dependientes
        if (field === 'costoDirecto' || field === 'indirectos') {
          updated.valorNeto = calcularValorNeto(
            field === 'costoDirecto' ? value : updated.costoDirecto,
            field === 'indirectos' ? value : updated.indirectos
          );
        }
        
        if (field === 'valorNeto' || field === 'm2' || field === 'costoDirecto' || field === 'indirectos') {
          updated.total = calcularTotal(updated.valorNeto, updated.m2);
        }
        
        return updated;
      }
      return item;
    }));
  };

  const agregarFila = () => {
    const newId = Math.max(...costos.map((c: CostoItem) => c.id)) + 1;
    setCostos((prev: CostoItem[]) => [...prev, {
      id: newId,
      costoDirecto: 0,
      indirectos: 25,
      valorNeto: 0,
      m2: 0,
      total: 0
    }]);
  };

  const eliminarFila = () => {
    if (costos.length > 1) {
      setCostos((prev: CostoItem[]) => prev.slice(0, -1));
    }
  };

  const subTotal = costos.reduce((sum: number, item: CostoItem) => sum + item.total, 0) / costos.length;
  const totalConGTO = enabledGTO ? subTotal * factorGTO : subTotal;
  const totalFinal = Math.round(totalConGTO / Math.pow(10, redondeo)) * Math.pow(10, redondeo);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Costos de Construcción</h1>
              <p className="text-gray-600">Análisis detallado de costos directos e indirectos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard">
              <Button variant="outline">
                Volver al Dashboard
              </Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Análisis
            </Button>
          </div>
        </div>

        {/* Configuración del Título */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Configuración del Proyecto</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="titulo" className="font-medium">Título:</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
                className="flex-1"
                placeholder="Ingrese el título del análisis"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Costos */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Análisis de Costos</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button onClick={agregarFila} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
                <Button onClick={eliminarFila} size="sm" variant="outline" disabled={costos.length <= 1}>
                  <Minus className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center bg-green-50">Valor Costo Directo</TableHead>
                    <TableHead className="text-center bg-green-50">% Indirectos</TableHead>
                    <TableHead className="text-center bg-green-50">Valor Real Neto</TableHead>
                    <TableHead className="text-center bg-green-50">M²</TableHead>
                    <TableHead className="text-center bg-green-50">$ / M²</TableHead>
                    <TableHead className="text-center bg-green-50">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costos.map((item: CostoItem) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={item.costoDirecto}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(item.id, 'costoDirecto', parseFloat(e.target.value) || 0)}
                            className="w-full"
                          />
                        ) : (
                          <span className="font-medium">{formatCurrency(item.costoDirecto)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={item.indirectos}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(item.id, 'indirectos', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                            max="100"
                          />
                        ) : (
                          <span>{item.indirectos}%</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">
                          {formatCurrency(item.valorNeto)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={item.m2}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(item.id, 'm2', parseFloat(e.target.value) || 0)}
                            className="w-full"
                          />
                        ) : (
                          <span>{item.m2.toLocaleString()} m²</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(item.total)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                        >
                          {editingId === item.id ? 'Guardar' : 'Editar'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Resultados y Configuración */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Factor GTO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Factor GTO</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={enabledGTO}
                  onCheckedChange={setEnabledGTO}
                />
                <Label>Aplicar Factor GTO</Label>
              </div>
              
              {enabledGTO && (
                <div className="space-y-2">
                  <Label htmlFor="factorGTO">Factor GTO:</Label>
                  <Input
                    id="factorGTO"
                    type="number"
                    step="0.01"
                    value={factorGTO}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFactorGTO(parseFloat(e.target.value) || 1)}
                    className="w-full"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="redondeo">Redondeo:</Label>
                <select 
                  id="redondeo"
                  value={redondeo}
                  onChange={(e) => setRedondeo(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={0}>Sin redondeo</option>
                  <option value={1}>Decenas</option>
                  <option value={2}>Centenas</option>
                  <option value={3}>Miles</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Resultados */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados del Análisis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">{formatCurrency(subTotal)}</span>
              </div>
              
              {enabledGTO && (
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Con Factor GTO ({factorGTO}):</span>
                  <span className="font-bold text-blue-600">{formatCurrency(totalConGTO)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <span className="font-bold text-lg">Total Final:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalFinal)}
                  </div>
                  <div className="text-sm text-gray-600">por m²</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Promedio</div>
                  <div className="font-bold">{formatCurrency(subTotal)}</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-sm text-gray-600">Factor</div>
                  <div className="font-bold">{factorGTO}x</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-sm text-gray-600">Items</div>
                  <div className="font-bold">{costos.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estadísticas del Análisis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {costos.length}
                </div>
                <div className="text-sm text-gray-600">Comparables</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(Math.min(...costos.map((c: CostoItem) => c.total)))}
                </div>
                <div className="text-sm text-gray-600">Valor Mínimo</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(Math.max(...costos.map((c: CostoItem) => c.total)))}
                </div>
                <div className="text-sm text-gray-600">Valor Máximo</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {((Math.max(...costos.map((c: CostoItem) => c.total)) - Math.min(...costos.map((c: CostoItem) => c.total))) / subTotal * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Variación</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
