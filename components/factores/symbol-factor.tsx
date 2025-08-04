/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFactoresStore } from "@/store/factores";
import type { FactorComponentProps, FactorOption } from "@/store/factores/types";

interface SymbolFactorProps extends FactorComponentProps {
  className?: string;
}

export const SymbolFactor: React.FC<SymbolFactorProps> = ({ 
  name, 
  className 
}: {
  name: keyof Omit<any, 'loading' | 'error' | 'type'>;
  className?: string;
}) => {
  const factor = useFactoresStore((state) => (state as any)[name]);
  const updateSymbolsData = useFactoresStore((state) => state.updateSymbolsData);
  const addRowLocZone = useFactoresStore((state) => state.addRowLocZone);
  const removeRowLocZone = useFactoresStore((state) => state.removeRowLocZone);

  if (!factor || !('columns' in factor) || !factor.isUsed) {
    return null;
  }

  const handleDataChange = (index: number, column: string, value: string) => {
    const selectedOption = factor.options.find((opt: FactorOption) => opt.id.toString() === value);
    if (selectedOption) {
      updateSymbolsData({
        index,
        key: String(name),
        column,
        value: selectedOption
      });
    }
  };

  const handleAddRow = () => {
    addRowLocZone({ key: String(name) });
  };

  const handleRemoveRow = () => {
    removeRowLocZone({ key: String(name) });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            Factor por {factor.name}
            {factor.isUsed && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                Pos. {factor.position + 1}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddRow}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar Fila
            </Button>
            
            {factor.data.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveRow}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Minus className="h-4 w-4 mr-1" />
                Remover Fila
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              {factor.columns.map((column: string) => (
                <TableHead key={column} className="text-center">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {factor.data.map((item: any, index: number) => (
              <TableRow key={`${String(name)}-${index}`}>
                <TableCell className="font-medium">C{index + 1}</TableCell>
                {factor.columns.map((column: string) => (
                  <TableCell key={`${String(name)}-${index}-${column}`}>
                    <Select
                      value={item[column]?.id?.toString() || ""}
                      onValueChange={(value: string) => handleDataChange(index, column, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {factor.options.map((option: FactorOption) => (
                          <SelectItem 
                            key={option.id} 
                            value={option.id.toString()}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Componentes específicos para ubicación y zona
export const LocationFactor = () => <SymbolFactor name="Location" />;
export const ZoneFactor = () => <SymbolFactor name="Zone" />;
