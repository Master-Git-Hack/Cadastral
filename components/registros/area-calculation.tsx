/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Calculator, TrendingUp, Percent } from "lucide-react";
import { useRegistrosStore } from "@/store/registros";
import { formatNumb } from "@/utils/number";

interface AreaCalculationProps {
  className?: string;
}

export const AreaCalculation: React.FC<AreaCalculationProps> = ({ className }: { className?: string }) => {
  const areaData = useRegistrosStore((state) => state.area.data);
  const areaSubject = useRegistrosStore((state) => state.area.subject);
  const salesCost = useRegistrosStore((state) => state.area.salesCost);
  const commercial = useRegistrosStore((state) => state.area.commercial);
  const percentage = useRegistrosStore((state) => state.area.percentage);
  const percentageTotal = useRegistrosStore((state) => state.area.percentageTotal);
  const averageLotArea = useRegistrosStore((state) => state.area.averageLotArea);
  const surfaceRoot = useRegistrosStore((state) => state.area.surfaceRoot);
  const type = useRegistrosStore((state) => state.type);

  const setAreaData = useRegistrosStore((state) => state.setAreaData);
  const setAreaSubject = useRegistrosStore((state) => state.setAreaSubject);
  const setSalesCostData = useRegistrosStore((state) => state.setSalesCostData);
  const setCommercialData = useRegistrosStore((state) => state.setCommercialData);
  const setPercentageData = useRegistrosStore((state) => state.setPercentageData);
  const setSurfaceRoot = useRegistrosStore((state) => state.setSurfaceRoot);

  const isTerreno = type === "TERRENO";

  const handleAreaChange = (index: number, field: 'surface' | 'value', value: number) => {
    setAreaData({ index, key: field, value });
  };

  const handleSalesCostChange = (index: number, value: number) => {
    setSalesCostData({ index, key: 'value', value });
  };

  const handleCommercialChange = (index: number, value: number) => {
    setCommercialData({ index, key: 'value', value });
  };

  const handlePercentageChange = (index: number, value: number) => {
    setPercentageData({ index, key: 'value', value });
  };

  const handleSubjectChange = (value: number) => {
    setAreaSubject({ value });
  };

  const handleSurfaceRootChange = (value: number) => {
    setSurfaceRoot(value);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Cálculo de {isTerreno ? 'Superficie' : 'Renta'} - {type}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Cálculo detallado con factores de superficie, comercialización y ponderación
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="min-w-[140px]">
                  {isTerreno ? 'Sup. Terreno ($ / m²)' : 'Precio de Renta'}
                </TableHead>
                <TableHead className="min-w-[120px]">
                  Superficie (m²)
                </TableHead>
                <TableHead className="min-w-[140px]">
                  Precio Unitario ($ / m²)
                </TableHead>
                <TableHead className="min-w-[140px]">
                  Factor de Superficie
                </TableHead>
                <TableHead className="min-w-[140px]">
                  Factor de Comercialización
                </TableHead>
                <TableHead className="min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span>Ponderación</span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      percentageTotal === 100 ? 'bg-green-100 text-green-800' : 
                      percentageTotal > 100 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {formatNumb(percentageTotal)}%
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {areaData.map((record, index) => (
                <TableRow key={record.id}>
                  {/* ID */}
                  <TableCell className="font-medium">C{record.id}</TableCell>
                  
                  {/* Precio/Superficie del terreno */}
                  <TableCell>
                    <Input
                      type="number"
                      value={isTerreno ? salesCost[index]?.value || 0 : record.surface}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = Number(e.target.value) || 0;
                        if (isTerreno) {
                          handleSalesCostChange(index, value);
                        } else {
                          handleAreaChange(index, 'surface', value);
                        }
                      }}
                      className="text-center bg-gray-50"
                      step="0.01"
                      min="0"
                    />
                  </TableCell>
                  
                  {/* Superficie */}
                  <TableCell>
                    <Input
                      type="number"
                      value={record.surface}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handleAreaChange(index, 'surface', Number(e.target.value) || 0)
                      }
                      className="text-center"
                      step="0.01"
                      min="0"
                    />
                  </TableCell>
                  
                  {/* Precio Unitario */}
                  <TableCell>
                    <Input
                      type="number"
                      value={record.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handleAreaChange(index, 'value', Number(e.target.value) || 0)
                      }
                      className="text-center"
                      step="0.01"
                      min="0"
                    />
                  </TableCell>
                  
                  {/* Factor de Superficie */}
                  <TableCell>
                    <div className="text-center font-medium">
                      {record.surface > 0 && surfaceRoot > 0 
                        ? formatNumb(Math.sqrt(record.surface / surfaceRoot))
                        : '1.0000'
                      }
                    </div>
                  </TableCell>
                  
                  {/* Factor de Comercialización */}
                  <TableCell>
                    <Input
                      type="number"
                      value={commercial[index]?.value || 1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handleCommercialChange(index, Number(e.target.value) || 1)
                      }
                      className="text-center"
                      step="0.01"
                      min="0"
                    />
                  </TableCell>
                  
                  {/* Ponderación */}
                  <TableCell>
                    <Input
                      type="number"
                      value={percentage[index]?.value || 0}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handlePercentageChange(index, Number(e.target.value) || 0)
                      }
                      className="text-center"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            
            <TableFooter>
              <TableRow className="bg-blue-50 hover:bg-blue-100">
                <TableCell className="font-medium">SUJETO</TableCell>
                <TableCell colSpan={2}>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={areaSubject.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handleSubjectChange(Number(e.target.value) || 0)
                      }
                      className="bg-blue-100 border-blue-300 text-center font-medium"
                      step="0.01"
                      min="0"
                    />
                    <span className="text-sm text-muted-foreground">m²</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Promedio:</span>
                    <div className="font-medium">
                      {formatNumb(averageLotArea)} m²
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <Input
                      type="number"
                      value={surfaceRoot}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handleSurfaceRootChange(Number(e.target.value) || 0)
                      }
                      className="text-center"
                      placeholder="Raíz superficie"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </TableCell>
                <TableCell colSpan={2}>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Valor Sujeto:</div>
                    <div className="text-lg font-bold text-blue-600">
                      ${formatNumb(areaSubject.value * averageLotArea)}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Resumen de cálculos */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Superficie Promedio</p>
                  <p className="text-lg font-semibold">{formatNumb(averageLotArea)} m²</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Valor por m²</p>
                  <p className="text-lg font-semibold">${formatNumb(areaSubject.value)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Ponderación</p>
                  <p className={`text-lg font-semibold ${
                    percentageTotal === 100 ? 'text-green-600' : 
                    percentageTotal > 100 ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {formatNumb(percentageTotal)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información de ayuda */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">Información de Cálculo</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• El factor de superficie se calcula como √(superficie del comparativo / raíz de superficie)</li>
            <li>• El factor de comercialización ajusta por condiciones del mercado</li>
            <li>• La ponderación debe sumar exactamente 100% para un cálculo correcto</li>
            <li>• El valor final se obtiene multiplicando el valor por m² por la superficie promedio</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
