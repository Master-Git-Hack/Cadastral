/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  FileText, 
  Calculator, 
  MapPin,
  Calendar,
  Upload,
  Eye,
  Info,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface AreaData {
  id: string;
  address: {
    street: string;
    streetNumber: number;
    colony: string;
    municipality: string;
    hasNoStreetNumber: boolean;
  };
  surface: number;
  value: number;
  date: string;
  observations: string;
  reference: string;
  document: {
    filename: string;
    file: string | null;
  };
  usage: string;
  buildingType: string;
  price: number;
}

interface FactorData {
  surface: number;
  commercial: number;
  percentage: number;
}

interface CalculationData {
  unitaryCost: number;
  surfaceFactor: number;
  enabled: boolean;
  observations: string;
}

export default function RegistrosPage() {
  const [activeTab, setActiveTab] = React.useState('documentation');
  const [selectedComparable, setSelectedComparable] = React.useState<string | null>(null);
  const [subjectValue, setSubjectValue] = React.useState(450);
  const [surfaceRoot, setSurfaceRoot] = React.useState<{ value: number; enabled: boolean; observations: string }>({ value: 8, enabled: false, observations: '' });

  // Datos de ejemplo para registros de área
  const [areaData, setAreaData] = React.useState<AreaData[]>([
    {
      id: "1",
      address: {
        street: "Av. Juárez",
        streetNumber: 123,
        colony: "Centro",
        municipality: "Guadalajara",
        hasNoStreetNumber: false
      },
      surface: 350.00,
      value: 280000,
      date: "2024-01-15",
      observations: "Propiedad en esquina, zona comercial",
      reference: "https://inmuebles.com/propiedad-123",
      document: { filename: "", file: null },
      usage: "Comercial",
      buildingType: "Construcción mixta",
      price: 18500
    },
    {
      id: "2", 
      address: {
        street: "Calle Morelos",
        streetNumber: 456,
        colony: "Americana",
        municipality: "Guadalajara",
        hasNoStreetNumber: false
      },
      surface: 420.00,
      value: 315000,
      date: "2024-01-20",
      observations: "Ubicación privilegiada, cerca de transporte público",
      reference: "https://inmuebles.com/propiedad-456",
      document: { filename: "", file: null },
      usage: "Residencial",
      buildingType: "Casa habitación",
      price: 17800
    },
    {
      id: "3",
      address: {
        street: "Av. López Mateos",
        streetNumber: 789,
        colony: "Providencia",
        municipality: "Guadalajara", 
        hasNoStreetNumber: false
      },
      surface: 380.00,
      value: 342000,
      date: "2024-02-05",
      observations: "Zona residencial consolidada",
      reference: "https://inmuebles.com/propiedad-789",
      document: { filename: "", file: null },
      usage: "Residencial",
      buildingType: "Casa habitación",
      price: 19200
    }
  ]);

  // Datos de factores de cálculo
  const [factorData] = React.useState<FactorData[]>([
    { surface: 0.95, commercial: 1.05, percentage: 30 },
    { surface: 1.02, commercial: 0.98, percentage: 35 },
    { surface: 0.98, commercial: 1.02, percentage: 35 }
  ]);

  const [calculationData] = React.useState<CalculationData[]>([
    { unitaryCost: 800, surfaceFactor: 0.95, enabled: true, observations: "" },
    { unitaryCost: 750, surfaceFactor: 1.02, enabled: true, observations: "" },
    { unitaryCost: 900, surfaceFactor: 0.98, enabled: true, observations: "" }
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const averageLotArea = areaData.reduce((sum: number, item: AreaData) => sum + item.surface, 0) / areaData.length;
  const totalPercentage = factorData.reduce((sum: number, factor: FactorData) => sum + factor.percentage, 0);

  const updateAreaData = (index: number, field: string, value: any) => {
    const newData = [...areaData];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newData[index] = {
        ...newData[index],
        [parent]: {
          ...newData[index][parent as keyof AreaData],
          [child]: value
        }
      };
    } else {
      newData[index] = { ...newData[index], [field]: value };
    }
    setAreaData(newData);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2">
            <Home className="w-4 h-4" />
            Inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Registros de Área
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Documentación y cálculos de comparables de área
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar Registros
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Recalcular
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documentation">
            <FileText className="w-4 h-4 mr-2" />
            Documentación
          </TabsTrigger>
          <TabsTrigger value="calculation">
            <Calculator className="w-4 h-4 mr-2" />
            Cálculos
          </TabsTrigger>
        </TabsList>

        {/* Documentación Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentación de Comparables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Calle</TableHead>
                      <TableHead>Número</TableHead>
                      <TableHead>Colonia</TableHead>
                      <TableHead>Municipio</TableHead>
                      <TableHead>Precio de Renta</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo de Construcción</TableHead>
                      <TableHead>Características</TableHead>
                      <TableHead>Consulta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {areaData.map((item: AreaData, index: number) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">C{item.id}</TableCell>
                        
                        <TableCell>
                          <Input
                            value={item.address.street}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'address.street', e.target.value)}
                            className="w-32"
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={item.address.streetNumber}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'address.streetNumber', parseInt(e.target.value) || 0)}
                              className="w-20"
                              disabled={item.address.hasNoStreetNumber}
                            />
                            <label className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={item.address.hasNoStreetNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'address.hasNoStreetNumber', e.target.checked)}
                              />
                              S/N
                            </label>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Input
                            value={item.address.colony}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'address.colony', e.target.value)}
                            className="w-32"
                          />
                        </TableCell>

                        <TableCell>{item.address.municipality}</TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="date"
                            value={item.date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'date', e.target.value)}
                            className="w-36"
                          />
                        </TableCell>

                        <TableCell>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {item.buildingType}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Textarea
                            value={item.observations}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateAreaData(index, 'observations', e.target.value)}
                            className="w-48 h-16 text-xs"
                            placeholder="Características del inmueble..."
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                              <Upload className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cálculos Tab */}
        <TabsContent value="calculation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Cálculos de Área
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ponderación Total:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    totalPercentage === 100 ? 'bg-green-100 text-green-800' : 
                    totalPercentage > 100 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {totalPercentage}%
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Precio de Renta ($/mes)</TableHead>
                      <TableHead>Superficie (m²)</TableHead>
                      <TableHead>Precio Unitario ($/m²)</TableHead>
                      <TableHead>Factor de Superficie</TableHead>
                      <TableHead>Factor de Comercialización</TableHead>
                      <TableHead>Ponderación (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {areaData.map((item: AreaData, index: number) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">C{item.id}</TableCell>
                        
                        <TableCell>
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-28 text-center"
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            value={item.surface}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAreaData(index, 'surface', parseFloat(e.target.value) || 0)}
                            className="w-24 text-center"
                            step="0.01"
                          />
                        </TableCell>

                        <TableCell className="text-center">
                          {formatCurrency(calculationData[index]?.unitaryCost || 0)}
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">
                              {formatNumber(factorData[index]?.surface || 0, 3)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ⁸√({item.surface}/{formatNumber(averageLotArea, 0)})
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            value={factorData[index]?.commercial || 0}
                            className="w-20 text-center"
                            step="0.01"
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            value={factorData[index]?.percentage || 0}
                            className="w-20 text-center"
                            min="0"
                            max="100"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {/* Fila del sujeto */}
                    <TableRow className="bg-blue-50 font-medium">
                      <TableCell colSpan={2} className="text-center">SUJETO</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={subjectValue}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubjectValue(parseFloat(e.target.value) || 0)}
                          className="w-24 text-center font-medium"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(averageLotArea, 0)} m²
                      </TableCell>
                      <TableCell colSpan={3}>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm">Factor de Superficie:</span>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={surfaceRoot.enabled}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurfaceRoot(prev => ({ 
                                  ...prev, 
                                  enabled: e.target.checked,
                                  observations: e.target.checked ? prev.observations : '',
                                  value: e.target.checked ? prev.value : 8
                                }))}
                              />
                              Editable
                            </label>
                            <select 
                              value={surfaceRoot.value}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSurfaceRoot(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                              disabled={!surfaceRoot.enabled}
                              className="px-2 py-1 border rounded text-xs"
                            >
                              {Array.from({length: 7}, (_, i) => i + 6).map(val => (
                                <option key={val} value={val}>Raíz {val}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de Cálculos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Superficie Promedio</p>
                    <p className="text-xl font-bold">{formatNumber(averageLotArea, 0)} m²</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Precio Promedio</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(areaData.reduce((sum: number, item: AreaData) => sum + item.price, 0) / areaData.length)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Raíz Factor</p>
                    <p className="text-xl font-bold">√{surfaceRoot.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
