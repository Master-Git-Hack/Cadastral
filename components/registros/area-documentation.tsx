/** @format */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Eye, FileText } from "lucide-react";
import { useRegistrosStore } from "@/store/registros";
import type { AreaRecord, DocumentationBodyProps } from "@/store/registros/types";

interface AreaDocumentationProps {
  className?: string;
}

export const AreaDocumentation: React.FC<AreaDocumentationProps> = ({ className }: { className?: string }) => {
  const areaData = useRegistrosStore((state) => state.area.data);
  const type = useRegistrosStore((state) => state.type);
  const setAreaAddress = useRegistrosStore((state) => state.setAreaAddress);
  const setAreaAddressExtra = useRegistrosStore((state) => state.setAreaAddressExtra);
  const setAreaAddressExtraFile = useRegistrosStore((state) => state.setAreaAddressExtraFile);
  const setAreaData = useRegistrosStore((state) => state.setAreaData);

  const isTerreno = type === "TERRENO";

  const handleAddressChange = (index: number, field: keyof AreaRecord['address'], value: string) => {
    setAreaAddress({ index, key: field, value });
  };

  const handleAddressExtraChange = (index: number, field: keyof AreaRecord['address']['extras'], value: string) => {
    setAreaAddressExtra({ index, key: field, value });
  };

  const handleFileChange = (index: number, file: File | null) => {
    setAreaAddressExtraFile(index, file);
  };

  const handleDataChange = (index: number, field: keyof AreaRecord, value: any) => {
    setAreaData({ index, key: field, value });
  };

  const handleInputChange = (
    index: number, 
    field: keyof AreaRecord['address'], 
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleAddressChange(index, field, e.target.value);
  };

  const handleDataInputChange = (
    index: number, 
    field: keyof AreaRecord, 
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) || 0 : e.target.value;
    handleDataChange(index, field, value);
  };

  const handleExtraInputChange = (
    index: number, 
    field: keyof AreaRecord['address']['extras'], 
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleAddressExtraChange(index, field, e.target.value);
  };

  const handleTextareaChange = (
    index: number, 
    field: keyof AreaRecord, 
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleDataChange(index, field, e.target.value);
  };

  const handleFileInputChange = (
    index: number, 
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange(index, e.target.files?.[0] || null);
  };

  const tableHeaders = [
    "#",
    "Calle",
    "Número",
    "Colonia",
    "Municipio",
    ...(isTerreno ? ["Uso de Suelo"] : ["Precio de Renta"]),
    "Fecha",
    ...(!isTerreno ? ["Tipo de Construcción"] : []),
    "Características",
    "Consulta"
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentación de Área - {type}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Información detallada de propiedades y características de cada comparativo
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead key={index} className="min-w-[120px]">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {areaData.map((record, index) => (
                <TableRow key={record.id}>
                  {/* ID */}
                  <TableCell className="font-medium">C{record.id}</TableCell>
                  
                  {/* Calle */}
                  <TableCell>
                    <Input
                      value={record.address.street}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(index, 'street', e.target.value)}
                      placeholder="Calle"
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  
                  {/* Número */}
                  <TableCell>
                    <Input
                      value={record.address.number}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(index, 'number', e.target.value)}
                      placeholder="Número"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  
                  {/* Colonia */}
                  <TableCell>
                    <Input
                      value={record.address.neighborhood}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(index, 'neighborhood', e.target.value)}
                      placeholder="Colonia"
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  
                  {/* Municipio */}
                  <TableCell>
                    <Input
                      value={record.address.municipality}
                      onChange={(e) => handleInputChange(index, 'municipality', e)}
                      placeholder="Municipio"
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  
                  {/* Uso de Suelo o Precio de Renta */}
                  <TableCell>
                    {isTerreno ? (
                      <Input
                        value={record.landUse || ''}
                        onChange={(e) => handleDataInputChange(index, 'landUse', e)}
                        placeholder="Uso de suelo"
                        className="min-w-[120px]"
                      />
                    ) : (
                      <Input
                        type="number"
                        value={record.rentPrice || ''}
                        onChange={(e) => handleDataInputChange(index, 'rentPrice', e)}
                        placeholder="Precio de renta"
                        className="min-w-[120px]"
                      />
                    )}
                  </TableCell>
                  
                  {/* Fecha */}
                  <TableCell>
                    <Input
                      type="date"
                      value={record.date}
                      onChange={(e) => handleDataInputChange(index, 'date', e)}
                      className="min-w-[140px]"
                    />
                  </TableCell>
                  
                  {/* Tipo de Construcción (solo para RENTA) */}
                  {!isTerreno && (
                    <TableCell>
                      <Input
                        value={record.constructionType || ''}
                        onChange={(e) => handleDataInputChange(index, 'constructionType', e)}
                        placeholder="Tipo de construcción"
                        className="min-w-[150px]"
                      />
                    </TableCell>
                  )}
                  
                  {/* Características */}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver/Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Características - C{record.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`characteristics-${index}`}>Características</Label>
                            <textarea
                              id={`characteristics-${index}`}
                              value={record.characteristics}
                              onChange={(e) => handleTextareaChange(index, 'characteristics', e)}
                              placeholder="Describe las características principales..."
                              className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`consultation-${index}`}>Consulta</Label>
                            <Input
                              id={`consultation-${index}`}
                              value={record.consultation}
                              onChange={(e) => handleDataInputChange(index, 'consultation', e)}
                              placeholder="Fuente de consulta"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`document-${index}`}>Documento</Label>
                            <Input
                              id={`document-${index}`}
                              value={record.address.extras.document}
                              onChange={(e) => handleExtraInputChange(index, 'document', e)}
                              placeholder="Nombre del documento"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`reference-${index}`}>Referencia</Label>
                            <Input
                              id={`reference-${index}`}
                              value={record.address.extras.reference}
                              onChange={(e) => handleExtraInputChange(index, 'reference', e)}
                              placeholder="Referencia del documento"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`file-${index}`}>Archivo Adjunto</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`file-${index}`}
                                type="file"
                                onChange={(e) => handleFileInputChange(index, e)}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                              {record.address.extras.file && (
                                <span className="text-sm text-green-600">
                                  ✓ {record.address.extras.file.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  
                  {/* Consulta */}
                  <TableCell>
                    <Input
                      value={record.consultation}
                      onChange={(e) => handleDataInputChange(index, 'consultation', e)}
                      placeholder="Consulta"
                      className="min-w-[120px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Información</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Complete la información de dirección para cada comparativo</li>
            <li>• {isTerreno ? 'Especifique el uso de suelo' : 'Indique el precio de renta'} para cada propiedad</li>
            <li>• Adjunte documentos de soporte cuando sea necesario</li>
            <li>• Las características detalladas ayudan en la evaluación</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
