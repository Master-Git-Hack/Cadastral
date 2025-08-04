/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Construction, Save, Plus, Minus, Calculator, FileText, Wrench } from 'lucide-react';
import Link from 'next/link';

interface PartidaItem {
  id: number;
  descripcion: string;
  unidad: string;
  cantidad: number;
  costoUnitario: number;
  total: number;
  factor: number;
  totalConFactor: number;
}

interface DocumentacionItem {
  id: number;
  titulo: string;
  descripcion: string;
  valorTotal: number;
  unidad: string;
}

export default function ObrasComplementariasPage() {
  const [isCalculoCompleto, setIsCalculoCompleto] = React.useState(true);
  const [redondeo, setRedondeo] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("partidas");

  const handleAgregarPartida = () => {
    const nuevaPartida: PartidaItem = {
      id: Math.max(...partidas.map((p: PartidaItem) => p.id), 0) + 1,
      descripcion: "",
      unidad: "m²",
      cantidad: 0,
      costoUnitario: 0,
      total: 0,
      factor: 1.0,
      totalConFactor: 0
    };
    setPartidas([...partidas, nuevaPartida]);
  };

  const handleEliminarPartida = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta partida?')) {
      setPartidas(partidas.filter((p: PartidaItem) => p.id !== id));
    }
  };

  const handleEditarPartida = (id: number, campo: string, valor: any) => {
    const nuevasPartidas = partidas.map((p: PartidaItem) => {
      if (p.id === id) {
        const actualizada = { ...p, [campo]: valor };
        // Recalcular totales
        actualizada.total = actualizada.cantidad * actualizada.costoUnitario;
        actualizada.totalConFactor = actualizada.total * actualizada.factor;
        return actualizada;
      }
      return p;
    });
    setPartidas(nuevasPartidas);
  };

  const calcularTotalGeneral = () => {
    return partidas.reduce((sum: number, p: PartidaItem) => sum + p.totalConFactor, 0);
  };

  const aplicarRedondeo = (valor: number) => {
    if (redondeo === 0) return valor;
    return Math.round(valor / redondeo) * redondeo;
  };

  const [partidas, setPartidas] = React.useState<PartidaItem[]>([
    {
      id: 1,
      descripcion: "Instalación eléctrica especializada",
      unidad: "m²",
      cantidad: 150,
      costoUnitario: 450,
      total: 67500,
      factor: 1.15,
      totalConFactor: 77625
    },
    {
      id: 2,
      descripcion: "Sistema de climatización",
      unidad: "ton",
      cantidad: 5,
      costoUnitario: 25000,
      total: 125000,
      factor: 1.20,
      totalConFactor: 150000
    },
    {
      id: 3,
      descripcion: "Acabados especiales",
      unidad: "m²",
      cantidad: 200,
      costoUnitario: 800,
      total: 160000,
      factor: 1.10,
      totalConFactor: 176000
    }
  ]);

  const [documentacion, setDocumentacion] = React.useState<DocumentacionItem[]>([
    {
      id: 1,
      titulo: "Obra complementaria - Instalaciones",
      descripcion: "Instalaciones especializadas para el inmueble",
      valorTotal: 77625,
      unidad: "m²"
    },
    {
      id: 2,
      titulo: "Obra complementaria - HVAC",
      descripcion: "Sistema de climatización y ventilación",
      valorTotal: 150000,
      unidad: "ton"
    }
  ]);

  const calcularTotal = (cantidad: number, costoUnitario: number) => {
    return cantidad * costoUnitario;
  };

  const calcularTotalConFactor = (total: number, factor: number) => {
    return total * factor;
  };

  const handlePartidaChange = (id: number, field: keyof PartidaItem, value: number | string) => {
    setPartidas((prev: PartidaItem[]) => prev.map((item: PartidaItem) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        if (field === 'cantidad' || field === 'costoUnitario') {
          updated.total = calcularTotal(
            field === 'cantidad' ? value as number : updated.cantidad,
            field === 'costoUnitario' ? value as number : updated.costoUnitario
          );
          updated.totalConFactor = calcularTotalConFactor(updated.total, updated.factor);
        }
        
        if (field === 'factor') {
          updated.totalConFactor = calcularTotalConFactor(updated.total, value as number);
        }
        
        return updated;
      }
      return item;
    }));
  };

  const agregarPartida = () => {
    const newId = Math.max(...partidas.map((p: PartidaItem) => p.id)) + 1;
    setPartidas((prev: PartidaItem[]) => [...prev, {
      id: newId,
      descripcion: "",
      unidad: "m²",
      cantidad: 0,
      costoUnitario: 0,
      total: 0,
      factor: 1.15,
      totalConFactor: 0
    }]);
  };

  const eliminarPartida = () => {
    if (partidas.length > 1) {
      setPartidas((prev: PartidaItem[]) => prev.slice(0, -1));
    }
  };

  const totalGeneral = partidas.reduce((sum: number, item: PartidaItem) => sum + item.totalConFactor, 0);
  const totalFinal = Math.round(totalGeneral / Math.pow(10, redondeo)) * Math.pow(10, redondeo);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-600 rounded-lg">
              <Construction className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Obras Complementarias</h1>
              <p className="text-gray-600">Análisis de obras especiales y complementarias</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard">
              <Button variant="outline">
                Volver al Dashboard
              </Button>
            </Link>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Análisis
            </Button>
          </div>
        </div>

        {/* Configuración General */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Configuración del Análisis</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isCalculoCompleto}
                    onCheckedChange={setIsCalculoCompleto}
                  />
                  <Label>Cálculo Completo</Label>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {partidas.length}
                </div>
                <div className="text-sm text-gray-600">Partidas</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalGeneral)}
                </div>
                <div className="text-sm text-gray-600">Total Bruto</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(totalFinal)}
                </div>
                <div className="text-sm text-gray-600">Total Final</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Navegación */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="partidas">Partidas</TabsTrigger>
            <TabsTrigger value="documentacion">Documentación</TabsTrigger>
            <TabsTrigger value="calculo">Cálculo</TabsTrigger>
          </TabsList>

          {/* Tab de Partidas */}
          <TabsContent value="partidas">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Partidas de Obra</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button onClick={agregarPartida} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                    <Button onClick={eliminarPartida} size="sm" variant="outline" disabled={partidas.length <= 1}>
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
                        <TableHead>Descripción</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Costo Unitario</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Factor</TableHead>
                        <TableHead>Total con Factor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partidas.map((partida: PartidaItem) => (
                        <TableRow key={partida.id}>
                          <TableCell>
                            <Input
                              value={partida.descripcion}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handlePartidaChange(partida.id, 'descripcion', e.target.value)
                              }
                              placeholder="Descripción de la obra"
                            />
                          </TableCell>
                          <TableCell>
                            <select 
                              value={partida.unidad}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                                handlePartidaChange(partida.id, 'unidad', e.target.value)
                              }
                              className="w-full p-2 border rounded"
                            >
                              <option value="m²">m²</option>
                              <option value="m³">m³</option>
                              <option value="ml">ml</option>
                              <option value="pza">pza</option>
                              <option value="ton">ton</option>
                              <option value="kg">kg</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={partida.cantidad}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handlePartidaChange(partida.id, 'cantidad', parseFloat(e.target.value) || 0)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={partida.costoUnitario}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handlePartidaChange(partida.id, 'costoUnitario', parseFloat(e.target.value) || 0)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-blue-600">
                              {formatCurrency(partida.total)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.01"
                              value={partida.factor}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handlePartidaChange(partida.id, 'factor', parseFloat(e.target.value) || 1)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-green-600">
                              {formatCurrency(partida.totalConFactor)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Documentación */}
          <TabsContent value="documentacion">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documentación de Obras</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentacion.map((doc: DocumentacionItem) => (
                    <Card key={doc.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Título del Documento:</Label>
                            <Input 
                              value={doc.titulo}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                setDocumentacion((prev: DocumentacionItem[]) => 
                                  prev.map((item: DocumentacionItem) => 
                                    item.id === doc.id ? { ...item, titulo: e.target.value } : item
                                  )
                                )
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Valor Total:</Label>
                            <div className="mt-1 p-2 bg-gray-50 rounded border">
                              {formatCurrency(doc.valorTotal)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Descripción:</Label>
                          <textarea 
                            value={doc.descripcion}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                              setDocumentacion((prev: DocumentacionItem[]) => 
                                prev.map((item: DocumentacionItem) => 
                                  item.id === doc.id ? { ...item, descripcion: e.target.value } : item
                                )
                              )
                            }
                            className="mt-1 w-full p-2 border rounded"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Cálculo */}
          <TabsContent value="calculo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resumen de Cálculos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Resumen de Cálculos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {partidas.map((partida: PartidaItem) => (
                      <div key={partida.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium truncate max-w-[200px]">{partida.descripcion}</span>
                        <span className="font-bold text-green-600">{formatCurrency(partida.totalConFactor)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                      <span className="font-bold text-lg">Total General:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatCurrency(totalFinal)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configuración de Redondeo */}
              <Card>
                <CardHeader>
                  <CardTitle>Configuración Final</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="redondeo">Redondeo:</Label>
                    <select 
                      id="redondeo"
                      value={redondeo}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRedondeo(parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value={0}>Sin redondeo</option>
                      <option value={1}>Decenas</option>
                      <option value={2}>Centenas</option>
                      <option value={3}>Miles</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(totalGeneral)}
                      </div>
                      <div className="text-sm text-gray-600">Bruto</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">
                        {formatCurrency(totalFinal)}
                      </div>
                      <div className="text-sm text-gray-600">Final</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Estadísticas del Análisis:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Partidas: <span className="font-bold">{partidas.length}</span></div>
                      <div>Promedio: <span className="font-bold">{formatCurrency(totalGeneral / partidas.length)}</span></div>
                      <div>Factor Prom: <span className="font-bold">{(partidas.reduce((sum: number, p: PartidaItem) => sum + p.factor, 0) / partidas.length).toFixed(2)}</span></div>
                      <div>Diferencia: <span className="font-bold">{formatCurrency(totalFinal - totalGeneral)}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
