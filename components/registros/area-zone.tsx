/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  Trash2,
  Building2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useRegistrosStore } from "@/store/registros";
import { formatNumb } from "@/utils/number";

interface AreaZoneProps {
  className?: string;
}

export const AreaZone: React.FC<AreaZoneProps> = ({ className }: { className?: string }) => {
  const zone = useRegistrosStore((state) => state.area.zone);
  const setZoneData = useRegistrosStore((state) => state.setZoneData);
  const addZoneRecord = useRegistrosStore((state) => state.addZoneRecord);
  const removeZoneRecord = useRegistrosStore((state) => state.removeZoneRecord);

  const handleZoneChange = (index: number, field: string, value: number | string) => {
    setZoneData({ index, key: field as keyof import("@/store/registros/types").ZoneData, value });
  };

  const addNewZone = () => {
    addZoneRecord();
  };

  const removeZone = (index: number) => {
    removeZoneRecord(index);
  };

  // Calcular totales
  const totalLotValue = zone.reduce((sum: number, z: any) => sum + (z.lotValue || 0), 0);
  const totalCorrectionFactor = zone.reduce((sum: number, z: any) => sum + (z.correctionFactor || 0), 0);
  const averageCorrectionFactor = zone.length > 0 ? totalCorrectionFactor / zone.length : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Análisis de Zona
          </div>
          <Button
            onClick={addNewZone}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar Zona
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Gestión de factores de zona para comparativos de mercado
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {zone.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No hay zonas registradas</p>
              <p className="text-sm text-gray-400">
                Agregue una zona para empezar el análisis
              </p>
            </div>
          ) : (
            zone.map((zoneItem: any, index: number) => (
              <Card key={zoneItem.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 border">
                        Zona {zoneItem.id}
                      </div>
                      <Building2 className="h-4 w-4 text-gray-500" />
                    </div>
                    
                    {zone.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeZone(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nombre de la Zona */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Nombre de la Zona
                      </label>
                      <Input
                        type="text"
                        value={zoneItem.name || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleZoneChange(index, "name", e.target.value)}
                        placeholder="Ej: Centro Histórico"
                        className="bg-white"
                      />
                    </div>

                    {/* Valor del Lote */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        <DollarSign className="h-4 w-4 inline mr-1" />
                        Valor del Lote ($/m²)
                      </label>
                      <Input
                        type="number"
                        value={zoneItem.lotValue || 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleZoneChange(index, "lotValue", Number(e.target.value) || 0)}
                        className="bg-white"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    {/* Factor de Corrección */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        <TrendingUp className="h-4 w-4 inline mr-1" />
                        Factor de Corrección
                      </label>
                      <Input
                        type="number"
                        value={zoneItem.correctionFactor || 1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleZoneChange(index, "correctionFactor", Number(e.target.value) || 1)}
                        className="bg-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Descripción de la Zona
                    </label>
                    <Input
                      type="text"
                      value={zoneItem.description || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleZoneChange(index, "description", e.target.value)}
                      placeholder="Descripción detallada de la zona..."
                      className="bg-white"
                    />
                  </div>

                  {/* Información calculada */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Valor Ajustado</p>
                      <p className="text-lg font-bold text-blue-800">
                        ${formatNumb((zoneItem.lotValue || 0) * (zoneItem.correctionFactor || 1))}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Factor Aplicado</p>
                      <p className="text-lg font-bold text-green-800">
                        {formatNumb(zoneItem.correctionFactor || 1, 4)}x
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Resumen de totales */}
        {zone.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Resumen de Zonas</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Zonas</p>
                <p className="text-2xl font-bold text-blue-600">{zone.length}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Valor Total de Lotes</p>
                <p className="text-2xl font-bold text-green-600">
                  ${formatNumb(totalLotValue)}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Factor Promedio</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatNumb(averageCorrectionFactor, 4)}x
                </p>
              </div>
            </div>

            {/* Valor promedio ponderado */}
            <div className="mt-4 p-3 bg-white rounded-lg border-2 border-blue-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Valor Promedio Ponderado</p>
                <p className="text-3xl font-bold text-blue-700">
                  ${formatNumb(totalLotValue * averageCorrectionFactor / zone.length || 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">por metro cuadrado</p>
              </div>
            </div>
          </div>
        )}

        {/* Información de ayuda */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">Guía de Factores de Zona</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• <strong>Factor &gt; 1.0:</strong> Zona con valorización positiva</li>
            <li>• <strong>Factor = 1.0:</strong> Zona neutral (sin ajuste)</li>
            <li>• <strong>Factor &lt; 1.0:</strong> Zona con descuento por ubicación</li>
            <li>• El valor ajustado se calcula: Valor del Lote × Factor de Corrección</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
