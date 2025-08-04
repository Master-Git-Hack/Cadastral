'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  FileText, 
  Save, 
  AlertCircle,
  Building,
  Wrench,
  Zap
} from 'lucide-react';
import useObrasComplementariasStore from '@/store/obras-complementarias';

interface ObrasComplementariasProps {
  justipreciacionId: number;
}

const ObrasComplementariasPanel: React.FC<ObrasComplementariasProps> = ({ justipreciacionId }) => {
  const {
    obras,
    totales,
    configuracion,
    catalogo,
    categorias,
    loading,
    saving,
    error,
    getObrasComplementarias,
    saveObrasComplementarias,
    updateObra,
    addObra,
    removeObra,
    updateConfiguracion,
    getCatalogo,
    calculateTotales,
    generateReporte,
    downloadReporte,
    reporte_data,
    generating_report
  } = useObrasComplementariasStore();

  const [activeCategory, setActiveCategory] = React.useState('pavimentacion');
  const [newObra, setNewObra] = React.useState({
    concepto: '',
    cantidad: 0,
    unidad: '',
    precio_unitario: 0
  });

  React.useEffect(() => {
    if (justipreciacionId) {
      getObrasComplementarias(justipreciacionId);
      getCatalogo();
    }
  }, [justipreciacionId]);

  const handleAddObra = () => {
    if (newObra.concepto.trim()) {
      addObra(activeCategory, newObra.concepto, {
        cantidad: newObra.cantidad,
        unidad: newObra.unidad,
        precio_unitario: newObra.precio_unitario,
        importe: newObra.cantidad * newObra.precio_unitario
      });
      
      setNewObra({
        concepto: '',
        cantidad: 0,
        unidad: '',
        precio_unitario: 0
      });
    }
  };

  const handleSave = async () => {
    if (justipreciacionId) {
      await saveObrasComplementarias(justipreciacionId);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  const categoryNames = {
    pavimentacion: 'Pavimentación',
    servicios: 'Servicios',
    infraestructura: 'Infraestructura'
  };

  const categoryIcons = {
    pavimentacion: Building,
    servicios: Wrench,
    infraestructura: Zap
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando obras complementarias...</span>
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
              Resumen de Obras
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
              <Label htmlFor="superficie">Superficie Beneficiada (m²)</Label>
              <Input
                id="superficie"
                type="number"
                value={totales.superficie_beneficiada}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const superficie = parseFloat(e.target.value) || 0;
                  updateConfiguracion({ 
                    superficie_beneficiada: superficie 
                  } as any);
                  calculateTotales();
                }}
                placeholder="100.00"
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
            {/* Switches para incluir categorías */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="incluir_pavimentacion">Incluir Pavimentación</Label>
                <Switch
                  id="incluir_pavimentacion"
                  checked={configuracion.incluir_pavimentacion}
                  onCheckedChange={(checked) => 
                    updateConfiguracion({ incluir_pavimentacion: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="incluir_servicios">Incluir Servicios</Label>
                <Switch
                  id="incluir_servicios"
                  checked={configuracion.incluir_servicios}
                  onCheckedChange={(checked) => 
                    updateConfiguracion({ incluir_servicios: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="incluir_infraestructura">Incluir Infraestructura</Label>
                <Switch
                  id="incluir_infraestructura"
                  checked={configuracion.incluir_infraestructura}
                  onCheckedChange={(checked) => 
                    updateConfiguracion({ incluir_infraestructura: checked })
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Factores */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="factor_contingencias">Contingencias (%)</Label>
                <Input
                  id="factor_contingencias"
                  type="number"
                  value={configuracion.factor_contingencias * 100}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const factor = (parseFloat(e.target.value) || 0) / 100;
                    updateConfiguracion({ factor_contingencias: factor });
                  }}
                  placeholder="10"
                />
              </div>
              
              <div>
                <Label htmlFor="factor_indirectos">Indirectos (%)</Label>
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

      {/* Obras por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle>Obras Complementarias</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3">
              {categorias.map((categoria) => {
                const Icon = categoryIcons[categoria as keyof typeof categoryIcons];
                const isEnabled = configuracion[`incluir_${categoria}` as keyof typeof configuracion];
                
                return (
                  <TabsTrigger 
                    key={categoria} 
                    value={categoria}
                    className={`flex items-center gap-2 ${!isEnabled ? 'opacity-50' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                    {categoryNames[categoria as keyof typeof categoryNames]}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categorias.map((categoria) => (
              <TabsContent key={categoria} value={categoria} className="space-y-4">
                {/* Formulario para agregar obra */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {React.createElement(categoryIcons[categoria as keyof typeof categoryIcons], { className: "h-5 w-5" })}
                      Agregar - {categoryNames[categoria as keyof typeof categoryNames]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="concepto">Concepto</Label>
                        <Input
                          id="concepto"
                          value={newObra.concepto}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewObra(prev => ({ 
                            ...prev, 
                            concepto: e.target.value 
                          }))}
                          placeholder="Descripción de la obra"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cantidad">Cantidad</Label>
                        <Input
                          id="cantidad"
                          type="number"
                          value={newObra.cantidad}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewObra(prev => ({ 
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
                          value={newObra.unidad}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewObra(prev => ({ 
                            ...prev, 
                            unidad: e.target.value 
                          }))}
                          placeholder="m², ml, pza, etc."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="precio_unitario">Precio Unitario</Label>
                        <Input
                          id="precio_unitario"
                          type="number"
                          value={newObra.precio_unitario}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewObra(prev => ({ 
                            ...prev, 
                            precio_unitario: parseFloat(e.target.value) || 0 
                          }))}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button onClick={handleAddObra} className="w-full md:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Obra
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de obras existentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Obras Registradas
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {Object.keys(obras[categoria as keyof typeof obras] || {}).length}
                      </span>
                      {!configuracion[`incluir_${categoria}` as keyof typeof configuracion] && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Excluida del cálculo
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(obras[categoria as keyof typeof obras] || {}).length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No hay obras registradas para esta categoría
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(obras[categoria as keyof typeof obras] || {}).map(([concepto, obra]) => (
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
                                  value={obra.cantidad}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateObra(categoria, concepto, {
                                    cantidad: parseFloat(e.target.value) || 0
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div>
                                <Label className="text-sm text-muted-foreground">Unidad</Label>
                                <Input
                                  value={obra.unidad}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateObra(categoria, concepto, {
                                    unidad: e.target.value
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div>
                                <Label className="text-sm text-muted-foreground">P. Unitario</Label>
                                <Input
                                  type="number"
                                  value={obra.precio_unitario}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateObra(categoria, concepto, {
                                    precio_unitario: parseFloat(e.target.value) || 0
                                  })}
                                  className="h-8"
                                />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Importe</Label>
                                  <div className="font-bold text-primary">
                                    {formatCurrency(obra.importe)}
                                  </div>
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeObra(categoria, concepto)}
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

export default ObrasComplementariasPanel;
