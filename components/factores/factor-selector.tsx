/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, CheckCircle } from "lucide-react";
import { useFactoresStore, getFactorPositions } from "@/store/factores";

interface FactorSelectorProps {
  className?: string;
}

export const FactorSelector: React.FC<FactorSelectorProps> = ({ className }: { className?: string }) => {
  const factorType = useFactoresStore((state) => state.type);
  const setEnabledFactors = useFactoresStore((state) => state.setEnabledFactors);
  const allFactors = useFactoresStore((state) => state);

  const positions = getFactorPositions(factorType === "TERRENO");
  const inferiorLimit = factorType === "TERRENO" ? 7 : 9;
  const superiorLimit = factorType === "TERRENO" ? 10 : 11;

  const handleToggleFactor = (key: string, isUsed: boolean, position: number) => {
    setEnabledFactors({ key, isUsed, position });
  };

  const getCurrentFactor = (key: string) => {
    return (allFactors as any)[key];
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Selector de Factores
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Favor de seleccionar aquellos factores que sean necesarios para realizar la operación.
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {positions.map((position, index) => {
            const factor = getCurrentFactor(position.key);
            const enabled = index >= inferiorLimit && index <= superiorLimit;
            const isUsed = factor?.isUsed || false;

            return (
              <div
                key={position.key}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  isUsed
                    ? "bg-green-50 border-green-200 text-green-900"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isUsed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  <div>
                    <div className="font-medium">
                      {isUsed && `${index + 1}.- `}
                      {position.name}
                    </div>
                    {isUsed && (
                      <div className="text-sm text-muted-foreground">
                        Posición {index + 1} en la tabla
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {!isUsed ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFactor(position.key, true, index)}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  ) : (
                    enabled && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFactor(position.key, false, -1)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Nota:</strong> El número a la izquierda indica la posición en la que aparecerán en la tabla de factores.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
