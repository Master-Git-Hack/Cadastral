/** @format */

"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Settings, 
  FileText, 
  BarChart3,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

import { 
  Factores,
  AgeContainer,
  Compilation
} from "@/components/factores";
import { FactorSelector } from "@/components/factores/factor-selector";
import { 
  useFactores, 
  useFactorCalculations, 
  useFactorStatus,
  useFactoresIntegration 
} from "@/hooks/useFactoresV3";

export default function FactoresDemoPage() {
  const { factors, actions, loading, type } = useFactores();
  const calculations = useFactorCalculations();
  const status = useFactorStatus();
  const integration = useFactoresIntegration();
  
  const [selectedType, setSelectedType] = React.useState<"TERRENO" | "RENTA">("TERRENO");

  // Configurar tipo de factor al cargar
  React.useEffect(() => {
    actions.setFactorType(selectedType);
  }, [selectedType, actions]);

  const handleTypeChange = (newType: "TERRENO" | "RENTA") => {
    setSelectedType(newType);
    actions.setFactorType(newType);
    actions.resetFactors();
  };

  const handleLoadFactors = async () => {
    await actions.loadFactors();
  };

  const Statistics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Factores Activos</p>
              <p className="text-2xl font-bold">{calculations.factorCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Factor Total</p>
              <p className="text-2xl font-bold">{calculations.totalFactor.toFixed(4)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p className="text-2xl font-bold">{type}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <p className="text-2xl font-bold">
                {status.isReady ? (
                  <span className="text-green-600">Listo</span>
                ) : (
                  <span className="text-orange-600">Cargando</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Factores Avanzados</h1>
          <p className="text-muted-foreground">
            Demostración completa del sistema de factores migrado de v1 a v3
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Selector de tipo */}
          <div className="flex items-center gap-2">
            <Button
              variant={selectedType === "TERRENO" ? "default" : "outline"}
              onClick={() => handleTypeChange("TERRENO")}
              size="sm"
            >
              Terreno
            </Button>
            <Button
              variant={selectedType === "RENTA" ? "default" : "outline"}
              onClick={() => handleTypeChange("RENTA")}
              size="sm"
            >
              Renta
            </Button>
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 animate-spin" />
              <span className="text-sm">Cargando...</span>
            </div>
          )}
          
          {status.error && (
            <Button
              variant="outline"
              size="sm"
              onClick={status.retry}
              className="text-red-600"
            >
              Reintentar
            </Button>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <Statistics />

      {/* Contenido principal */}
      <Tabs defaultValue="compilation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compilation" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Compilación
          </TabsTrigger>
          <TabsTrigger value="age-container" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Edad y Zona
          </TabsTrigger>
          <TabsTrigger value="selector" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Selector
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Resultados
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Compilación */}
        <TabsContent value="compilation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Compilación de Factores - {type}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Todos los factores organizados por categorías según el tipo seleccionado
              </p>
            </CardHeader>
            <CardContent>
              <Compilation type={type} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Edad y Zona */}
        <TabsContent value="age-container" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Factores de Edad y Zona
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {type === "TERRENO" 
                  ? "Factores de zona para terrenos" 
                  : "Factores de edad para rentas"
                }
              </p>
            </CardHeader>
            <CardContent>
              <AgeContainer type={type} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Selector */}
        <TabsContent value="selector" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Selector de Factores
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure qué factores utilizar en el cálculo
              </p>
            </CardHeader>
            <CardContent>
              <FactorSelector />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Resultados */}
        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resumen de factores habilitados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Factores Habilitados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculations.enabledFactors.map((factor, index) => (
                    <div 
                      key={factor.key}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div>
                        <div className="font-medium">{factor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Posición {index + 1}
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {factor.key}
                      </span>
                    </div>
                  ))}
                  
                  {calculations.enabledFactors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay factores habilitados
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cálculos y resultados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Resultados del Cálculo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Factor Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {calculations.totalFactor.toFixed(6)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Factores Activos:</span>
                    <span className="text-xl font-semibold">
                      {calculations.factorCount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">Tipo de Evaluación:</span>
                    <span className="text-xl font-semibold text-purple-600">
                      {type}
                    </span>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2 pt-4">
                    <Button 
                      onClick={handleLoadFactors}
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Recargar Factores"}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={actions.resetFactors}
                      className="w-full"
                    >
                      Resetear Factores
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const v1Data = integration.exportToV1Format();
                        console.log("Datos exportados a v1:", v1Data);
                        alert("Datos exportados a consola (formato v1)");
                      }}
                      className="w-full"
                    >
                      Exportar a v1
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estado del sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${status.isReady ? 'text-green-600' : 'text-orange-600'}`}>
                    {status.isReady ? '✓' : '⏳'}
                  </div>
                  <div className="text-sm font-medium">Sistema</div>
                  <div className="text-xs text-muted-foreground">
                    {status.isReady ? 'Listo' : 'Cargando'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${integration.isReady ? 'text-green-600' : 'text-gray-400'}`}>
                    {integration.isReady ? '✓' : '○'}
                  </div>
                  <div className="text-sm font-medium">Integración</div>
                  <div className="text-xs text-muted-foreground">
                    {integration.isReady ? 'Lista' : 'Pendiente'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${calculations.factorCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {calculations.factorCount > 0 ? '✓' : '○'}
                  </div>
                  <div className="text-sm font-medium">Cálculos</div>
                  <div className="text-xs text-muted-foreground">
                    {calculations.factorCount > 0 ? 'Activos' : 'Sin datos'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${status.error ? 'text-red-600' : 'text-green-600'}`}>
                    {status.error ? '✗' : '✓'}
                  </div>
                  <div className="text-sm font-medium">Errores</div>
                  <div className="text-xs text-muted-foreground">
                    {status.error ? 'Con errores' : 'Sin errores'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
