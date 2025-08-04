'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Plus, Trash2, Calculator, FileText, Save } from 'lucide-react';
import useCostosConstruccionStore from '@/store/costos-construccion';

interface CostosConstructionPanelProps {
  justipreciacionId: number;
}

const CostosConstructionPanel: React.FC<CostosConstructionPanelProps> = ({ justipreciacionId }) => {
  const {
    costos,
    totales,
    configuracion,
    conceptos,
    categorias,
    loading,
    saving,
    error,
    getCostosConstruccion,
    saveCostosConstruccion,
    updatePartida,
    addPartida,
    removePartida,
    updateConfiguracion,
    getConceptos,
    calculateTotales,
    generateReporte,
    downloadReporte,
    reporte_data,
    generating_report
  } = useCostosConstruccionStore();

  const [activeCategory, setActiveCategory] = React.useState('preliminares');
  const [newPartida, setNewPartida] = React.useState({
    concepto: '',
    cantidad: 0,
    unidad: '',
    precio_unitario: 0
  });

  React.useEffect(() => {
    if (justipreciacionId) {
      getCostosConstruccion(justipreciacionId);
      getConceptos();
    }
  }, [justipreciacionId]);

  const handleAddPartida = () => {
    if (newPartida.concepto.trim()) {
      addPartida(activeCategory, newPartida.concepto, {
        cantidad: newPartida.cantidad,
        unidad: newPartida.unidad,
        precio_unitario: newPartida.precio_unitario,
        importe: newPartida.cantidad * newPartida.precio_unitario
      });
      
      setNewPartida({
        concepto: '',
        cantidad: 0,
        unidad: '',
        precio_unitario: 0
      });
    }
  };

  const handleSave = async () => {
    if (justipreciacionId) {
      await saveCostosConstruccion(justipreciacionId);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  const categoryNames = {
    preliminares: 'Preliminares',
    cimentacion: 'Cimentación',
    estructura: 'Estructura',
    albanileria: 'Albañilería',
    acabados: 'Acabados',
    instalaciones: 'Instalaciones'
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando costos de construcción...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-800 px-4 py-3 rounded-md flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Resumen y Configuración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de Costos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Resumen de Costos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Costo Total</Label>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(totales.costo_total)}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Costo por m²</Label>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(totales.costo_m2)}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label htmlFor="superficie">Superficie de Construcción (m²)</Label>
              <Input
                id="superficie"
                type="number"
                value={totales.superficie_construccion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const superficie = parseFloat(e.target.value) || 0;
                  updateConfiguracion({ 
                    superficie_construccion: superficie 
                  } as any);
                  calculateTotales();
                }}
                placeholder="0.00"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="factor_indirectos">Factor Indirectos (%)</Label>
                <Input
                  id="factor_indirectos"
                  type="number"
                  value={configuracion.factor_indirectos * 100}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const factor = (parseFloat(e.target.value) || 0) / 100;
                    updateConfiguracion({ factor_indirectos: factor });
                  }}
                  placeholder="15"
                />
              </div>
              
              <div>
                <Label htmlFor="factor_utilidad">Factor Utilidad (%)</Label>
                <Input
                  id="factor_utilidad"
                  type="number"
                  value={configuracion.factor_utilidad * 100}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const factor = (parseFloat(e.target.value) || 0) / 100;
                    updateConfiguracion({ factor_utilidad: factor });
                  }}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Guardando...' : 'Guardar'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => generateReporte(justipreciacionId)}
                disabled={generating_report}
              >
                <FileText className="h-4 w-4 mr-2" />
                Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partidas por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle>Partidas de Construcción</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categorias.map((categoria) => (
                <TabsTrigger key={categoria} value={categoria}>
                  {categoryNames[categoria as keyof typeof categoryNames]}
                </TabsTrigger>
              ))}
            </TabsList>

            {categorias.map((categoria) => (
              <TabsContent key={categoria} value={categoria} className="space-y-4">
                {/* Formulario para agregar partida */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Agregar Partida - {categoryNames[categoria as keyof typeof categoryNames]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="concepto">Concepto</Label>
                        <Input
                          id="concepto"
                          value={newPartida.concepto}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPartida(prev => ({ 
                            ...prev, 
                            concepto: e.target.value 
                          }))}
                          placeholder="Descripción del concepto"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cantidad">Cantidad</Label>
                        <Input
                          id="cantidad"
                          type="number"
                          value={newPartida.cantidad}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPartida(prev => ({ 
                            ...prev, 
                            cantidad: parseFloat(e.target.value) || 0 
                          }))}
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="unidad">Unidad</Label>
                        <Input
                          id="unidad"
                          value={newPartida.unidad}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPartida(prev => ({ 
                            ...prev, 
                            unidad: e.target.value 
                          }))}
                          placeholder="m², pza, etc."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="precio_unitario">Precio Unitario</Label>
                        <Input
                          id="precio_unitario"
                          type="number"
                          value={newPartida.precio_unitario}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPartida(prev => ({ 
                            ...prev, 
                            precio_unitario: parseFloat(e.target.value) || 0 
                          }))}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button onClick={handleAddPartida} className="w-full md:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Partida
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de partidas existentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Partidas Existentes
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {Object.keys(costos[categoria as keyof typeof costos] || {}).length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(costos[categoria as keyof typeof costos] || {}).length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No hay partidas registradas para esta categoría
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(costos[categoria as keyof typeof costos] || {}).map(([concepto, partida]) => (
                          <div key={concepto} className="border rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                              <div className="md:col-span-2">
                                <Label className="text-sm text-muted-foreground">Concepto</Label>
                                <div className="font-medium">{concepto}</div>
                              </div>
                              
                              <div>
                                <Label className="text-sm text-muted-foreground">Cantidad</Label>
                                <Input
                                  type="number"
                                  value={partida.cantidad}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePartida(categoria, concepto, {
                                    cantidad: parseFloat(e.target.value) || 0
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div>
                                <Label className="text-sm text-muted-foreground">Unidad</Label>
                                <Input
                                  value={partida.unidad}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePartida(categoria, concepto, {
                                    unidad: e.target.value
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div>
                                <Label className="text-sm text-muted-foreground">P. Unitario</Label>
                                <Input
                                  type="number"
                                  value={partida.precio_unitario}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePartida(categoria, concepto, {
                                    precio_unitario: parseFloat(e.target.value) || 0
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Importe</Label>
                                  <div className="font-bold text-primary">
                                    {formatCurrency(partida.importe)}
                                  </div>
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePartida(categoria, concepto)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostosConstructionPanel;
