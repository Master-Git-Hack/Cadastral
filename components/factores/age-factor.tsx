/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useFactoresStore } from "@/store/factores";
import { formatNumb } from "@/utils/number";

interface AgeFactorProps {
  className?: string;
}

export const AgeFactor: React.FC<AgeFactorProps> = ({ className }: { className?: string }) => {
  const ageFactor = useFactoresStore((state) => state.Age);
  const setAgeSubject = useFactoresStore((state) => state.setAgeSubject);
  const setAgeData = useFactoresStore((state) => state.setAgeData);

  const handleSubjectChange = (value: number) => {
    setAgeSubject({ value });
  };

  const handleDataChange = (index: number, value: number) => {
    setAgeData({ index, value });
  };

  if (!ageFactor.isUsed) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Factor por {ageFactor.name}
          {ageFactor.isUsed && (
            <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
              Pos. {ageFactor.position + 1}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium text-center">
                  {ageFactor.name.toUpperCase()}
                </div>
              </TableHead>
              <TableHead className="w-32 text-center">Factor</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {ageFactor.data.map((item, index) => (
              <TableRow key={`age-${index}`}>
                <TableCell className="font-medium">C{item.id}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataChange(index, Number(e.target.value) || 1)}
                    className="w-full"
                    min="1"
                    step="1"
                  />
                </TableCell>
                <TableCell className="text-center font-medium">
                  {formatNumb(item.result)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
          <TableFooter>
            <TableRow className="bg-orange-50 hover:bg-orange-100">
              <TableCell className="font-medium">SUJETO</TableCell>
              <TableCell colSpan={2}>
                <Input
                  type="number"
                  value={ageFactor.subject.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubjectChange(Number(e.target.value) || 1)}
                  className="bg-orange-100 border-orange-300 font-medium"
                  min="1"
                  step="1"
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};
