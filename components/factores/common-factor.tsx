/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import type { FactorComponentProps, FactorOption, FactorData } from "@/store/factores/types";
import { formatNumb } from "@/utils/number";

interface CommonFactorProps extends FactorComponentProps {
  className?: string;
}

export const CommonFactor: React.FC<CommonFactorProps> = ({ 
  name, 
  className 
}: {
  name: keyof Omit<any, 'loading' | 'error' | 'type'>;
  className?: string;
}) => {
  const factor = useFactoresStore((state) => (state as any)[name]);
  const updateCommonSubject = useFactoresStore((state) => state.updateCommonSubject);
  const updateCommonData = useFactoresStore((state) => state.updateCommonData);
  const updateFactors = useFactoresStore((state) => state.updateFactors);

  if (!factor || !('subject' in factor)) {
    return null;
  }

  const handleSubjectChange = (value: string) => {
    const selectedOption = factor.options.find((opt: FactorOption) => opt.id.toString() === value);
    if (selectedOption) {
      updateCommonSubject({
        key: String(name),
        value: selectedOption
      });
      updateFactors();
    }
  };

  const handleDataChange = (index: number, value: string) => {
    const selectedOption = factor.options.find((opt: FactorOption) => opt.id.toString() === value);
    if (selectedOption) {
      const newData: FactorData = {
        ...factor.data[index],
        label: selectedOption.label,
        value: selectedOption.value,
        result: factor.subject.value / selectedOption.value
      };
      
      updateCommonData({
        index,
        key: String(name),
        value: newData
      });
      updateFactors();
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Factor por {factor.name}
          {factor.isUsed && (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Pos. {factor.position + 1}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-32 text-center">Calificación</TableHead>
              <TableHead className="w-32 text-center">Factor</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {/* Fila del sujeto */}
            <TableRow className="bg-yellow-50 hover:bg-yellow-100">
              <TableCell className="font-medium">SUJETO</TableCell>
              <TableCell>
                <Select
                  value={factor.subject.value.toString()}
                  onValueChange={handleSubjectChange}
                >
                  <SelectTrigger className="bg-yellow-100 border-yellow-300">
                    <SelectValue />
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
              <TableCell className="text-center font-medium">
                {formatNumb(factor.subject.value)}
              </TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>

            {/* Filas de comparativos */}
            {factor.data.map((item: FactorData, index: number) => (
              <TableRow key={`${String(name)}-${index}`}>
                <TableCell className="font-medium">C{item.id}</TableCell>
                <TableCell>
                  <Select
                    value={item.value.toString()}
                    onValueChange={(value: string) => handleDataChange(index, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                <TableCell className="text-center">
                  {formatNumb(item.value)}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {formatNumb(item.result)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Componente reutilizable para diferentes tipos de factores comunes
export const ClassificationFactor = () => <CommonFactor name="Classification" />;
export const TypeFormFactor = () => <CommonFactor name="TypeForm" />;
export const UsageFactor = () => <CommonFactor name="Usage" />;
export const TopographyFactor = () => <CommonFactor name="Topography" />;
export const BuildingFactor = () => <CommonFactor name="Building" />;
export const QualityFactor = () => <CommonFactor name="Quality" />;
export const LevelFactor = () => <CommonFactor name="Level" />;
export const ProjectFactor = () => <CommonFactor name="Project" />;
