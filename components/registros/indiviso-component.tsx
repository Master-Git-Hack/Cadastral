/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Home,
  Calculator,
  TrendingUp,
  Users,
  AreaChart,
} from "lucide-react";
import { useRegistrosStore } from "@/store/registros";
import { formatNumb } from "@/utils/number";

interface IndivisoComponentProps {
  className?: string;
}

export const IndivisoComponent: React.FC<IndivisoComponentProps> = ({ className }: { className?: string }) => {
  const indiviso = useRegistrosStore((state) => state.indiviso);
  const setIndiviso = useRegistrosStore((state) => state.setIndiviso);
  const setAdjustedValue = useRegistrosStore((state) => state.setAdjustedValue);
  const setReFactor = useRegistrosStore((state) => state.setReFactor);

  const handleCalculationChange = (field: string, value: number) => {
    setIndiviso({ key: field as any, value });
  };

  const handleAdjustedValueChange = (field: string, value: number) => {
    setAdjustedValue({ key: field as any, value });
  };

  const handleReFactorChange = (field: string, value: number | string) => {
    setReFactor({ key: field as any, value });
  };

  // Cálculos automáticos
  const totalSurface = indiviso.calculation.surface.terrain + indiviso.calculation.surface.construction;
  const indivisoPercentage = indiviso.calculation.building.totalApartments > 0 
    ? (indiviso.calculation.building.apartments / indiviso.calculation.building.totalApartments) * 100 
    : 0;
  
  const terrainValue = indiviso.adjustedValue.terrain * indiviso.calculation.surface.terrain;
  const constructionValue = indiviso.adjustedValue.construction * indiviso.calculation.surface.construction;
  const totalValue = terrainValue + constructionValue;
  
  const adjustedIndivisoValue = totalValue * (indivisoPercentage / 100);
  const finalResult = adjustedIndivisoValue * indiviso.reFactor.factor;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Cálculo de Indiviso
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Cálculo de valores para propiedades en régimen de copropiedad
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Superficie */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AreaChart className="h-5 w-5" />
            Superficies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="terrain-surface">Superficie de Terreno (m²)</Label>
              <Input
                id="terrain-surface"
                type="number"
                value={indiviso.calculation.surface.terrain}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleCalculationChange('surface.terrain', Number(e.target.value) || 0)
                }
                className="mt-1"
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="construction-surface">Superficie de Construcción (m²)</Label>
              <Input
                id="construction-surface"
                type="number"
                value={indiviso.calculation.surface.construction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleCalculationChange('surface.construction', Number(e.target.value) || 0)
                }
                className="mt-1"
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <Label>Superficie Total (m²)</Label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md text-lg font-semibold text-center">
                {formatNumb(totalSurface)} m²
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Información del Edificio */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Información del Edificio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="levels">Número de Niveles</Label>
              <Input
                id="levels"
                type="number"
                value={indiviso.calculation.building.levels}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleCalculationChange('building.levels', Number(e.target.value) || 1)
                }
                className="mt-1"
                min="1"
              />
            </div>
            
            <div>
              <Label htmlFor="apartments">Departamentos del Sujeto</Label>
              <Input
                id="apartments"
                type="number"
                value={indiviso.calculation.building.apartments}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleCalculationChange('building.apartments', Number(e.target.value) || 1)
                }
                className="mt-1"
                min="1"
              />
            </div>
            
            <div>
              <Label htmlFor="total-apartments">Total de Departamentos</Label>
              <Input
                id="total-apartments"
                type="number"
                value={indiviso.calculation.building.totalApartments}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleCalculationChange('building.totalApartments', Number(e.target.value) || 1)
                }
                className="mt-1"
                min="1"
              />
            </div>
            
            <div>
              <Label>Porcentaje Indiviso</Label>
              <div className="mt-1 p-2 bg-blue-50 rounded-md text-lg font-semibold text-center text-blue-700">
                {formatNumb(indivisoPercentage, 2)}%
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Valores Ajustados */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Valores Ajustados
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="terrain-value">Valor Terreno ($/m²)</Label>
              <Input
                id="terrain-value"
                type="number"
                value={indiviso.adjustedValue.terrain}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleAdjustedValueChange('terrain', Number(e.target.value) || 0)
                }
                className="mt-1"
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="construction-value">Valor Construcción ($/m²)</Label>
              <Input
                id="construction-value"
                type="number"
                value={indiviso.adjustedValue.construction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleAdjustedValueChange('construction', Number(e.target.value) || 0)
                }
                className="mt-1"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Resumen de valores */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Valor Terreno</p>
              <p className="text-xl font-bold text-green-800">
                ${formatNumb(terrainValue)}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Valor Construcción</p>
              <p className="text-xl font-bold text-blue-800">
                ${formatNumb(constructionValue)}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Valor Total</p>
              <p className="text-xl font-bold text-purple-800">
                ${formatNumb(totalValue)}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Re-factoring */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Re-factoring
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="refactor">Factor de Ajuste</Label>
              <Input
                id="refactor"
                type="number"
                value={indiviso.reFactor.factor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleReFactorChange('factor', Number(e.target.value) || 1)
                }
                className="mt-1"
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="refactor-description">Descripción del Ajuste</Label>
              <Input
                id="refactor-description"
                type="text"
                value={indiviso.reFactor.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleReFactorChange('description', e.target.value)
                }
                className="mt-1"
                placeholder="Ej: Ajuste por estado de conservación"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Resultado Final */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Resultado Final del Indiviso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-orange-600 font-medium mb-2">Valor Indiviso (antes del ajuste)</p>
              <p className="text-2xl font-bold text-orange-800">
                ${formatNumb(adjustedIndivisoValue)}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                {formatNumb(indivisoPercentage, 2)}% del valor total
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <p className="text-sm text-green-600 font-medium mb-2">Valor Final (con re-factoring)</p>
              <p className="text-3xl font-bold text-green-800">
                ${formatNumb(finalResult)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Factor aplicado: {formatNumb(indiviso.reFactor.factor, 4)}x
              </p>
            </div>
          </div>
        </div>

        {/* Información de ayuda */}
        <div className="p-4 bg-amber-50 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">Información del Cálculo</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• El porcentaje indiviso se calcula: (Departamentos del Sujeto / Total Departamentos) × 100</li>
            <li>• El valor indiviso es el porcentaje aplicado al valor total de la propiedad</li>
            <li>• El re-factoring permite ajustar el valor final por condiciones específicas</li>
            <li>• El resultado final incluye tanto la proporción indiviso como el factor de ajuste</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
