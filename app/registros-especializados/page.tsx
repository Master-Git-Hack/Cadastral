/** @format */

"use client";

import { useState } from "next/dist/compiled/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calculator,
  MapPin,
  Building,
  Download,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  AreaDocumentation,
  AreaCalculation,
  AreaZone,
  IndivisoComponent,
} from "@/components/registros";
import { useRegistrosStore } from "@/store/registros";

export default function RegistrosEspecializadosPage() {
  const [activeTab, setActiveTab] = useState("documentation");
  
  const type = useRegistrosStore((state) => state.type);
  const setRegistroType = useRegistrosStore((state) => state.setRegistroType);
  const resetArea = useRegistrosStore((state) => state.resetArea);
  
  const areaData = useRegistrosStore((state) => state.area.data);
  const percentageTotal = useRegistrosStore((state) => state.area.percentageTotal);
  const zone = useRegistrosStore((state) => state.area.zone);

  const isTerreno = type === "TERRENO";

  const handleTypeChange = (newType: "TERRENO" | "RENTA") => {
    if (window.confirm("¿Está seguro de cambiar el tipo? Se perderán los datos actuales.")) {
      setRegistroType(newType);
      resetArea();
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Está seguro de restablecer todos los datos?")) {
      resetArea();
    }
  };

  const getStatusBadge = () => {
    const hasData = areaData.some(record => record.surface > 0 || record.value > 0);
    const percentageOk = Math.abs(percentageTotal - 100) < 0.01;
    
    if (!hasData) return { variant: "secondary" as const, text: "Sin datos" };
    if (!percentageOk) return { variant: "destructive" as const, text: "Pendiente" };
    return { variant: "default" as const, text: "Completo" };
  };

  const status = getStatusBadge();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Registros Especializados
              </h1>
              <p className="text-gray-600 mt-2">
                Sistema avanzado para valuación de área e indiviso
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Estado:</span>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  status.variant === 'default' ? 'bg-green-100 text-green-800' :
                  status.variant === 'destructive' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status.text}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={isTerreno ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTypeChange("TERRENO")}
                >
                  Terreno
                </Button>
                <Button
                  variant={!isTerreno ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTypeChange("RENTA")}
                >
                  Renta
                </Button>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Restablecer
              </Button>
            </div>
          </div>
        </div>

        {/* Información del tipo actual */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {isTerreno ? (
                    <MapPin className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Building className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    Valuación de {isTerreno ? "Terreno" : "Renta"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isTerreno 
                      ? "Avalúo de superficie de terreno con factores de zona"
                      : "Valuación de rentas con análisis de mercado"
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Registros activos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {areaData.filter(r => r.surface > 0 || r.value > 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentación
            </TabsTrigger>
            <TabsTrigger value="calculation" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Cálculo
            </TabsTrigger>
            <TabsTrigger value="zone" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Zona
            </TabsTrigger>
            <TabsTrigger value="indiviso" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Indiviso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documentation" className="space-y-6">
            <AreaDocumentation />
          </TabsContent>

          <TabsContent value="calculation" className="space-y-6">
            <AreaCalculation />
          </TabsContent>

          <TabsContent value="zone" className="space-y-6">
            <AreaZone />
          </TabsContent>

          <TabsContent value="indiviso" className="space-y-6">
            <IndivisoComponent />
          </TabsContent>
        </Tabs>

        {/* Panel de acciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acciones</CardTitle>
            <CardDescription>
              Guarde o exporte los resultados del análisis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Guardar Registro
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
              
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Comparativos</p>
                  <p className="text-2xl font-bold">
                    {areaData.filter(r => r.surface > 0 || r.value > 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Ponderación</p>
                  <p className={`text-2xl font-bold ${
                    Math.abs(percentageTotal - 100) < 0.01 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {percentageTotal.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Zonas</p>
                  <p className="text-2xl font-bold">{zone.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="text-lg font-bold">{type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
