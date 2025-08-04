'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, Building, DollarSign, FileText, Wrench, Home } from 'lucide-react';
import Link from 'next/link';
import CostosConstructionPanel from '@/components/costos-construccion/CostosConstructionPanel';

const CostosConstructionDemoPage = () => {
  // IDs de ejemplo para demostrar la funcionalidad
  const demoJustipreciaciones = [
    {
      id: 1,
      folio: 'DEMO-001',
      descripcion: 'Casa Habitación Tipo Medio',
      superficie: 120,
      estado: 'En Proceso'
    },
    {
      id: 2,
      folio: 'DEMO-002', 
      descripcion: 'Edificio Comercial',
      superficie: 850,
      estado: 'Completo'
    }
  ];

  const [selectedDemo, setSelectedDemo] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/homologacion-demo">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Demo Principal
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Calculator className="h-8 w-8 text-blue-600" />
                Costos de Construcción
              </h1>
              <p className="text-gray-600 mt-2">
                Sistema integrado para el cálculo y análisis de costos de construcción
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Módulo v3 - Demo
          </Badge>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Partidas por Categoría</h3>
              <p className="text-sm text-gray-600">
                Organización sistemática: Preliminares, Cimentación, Estructura, Albañilería, Acabados, Instalaciones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Cálculo Automático</h3>
              <p className="text-sm text-gray-600">
                Cálculo dinámico de importes, aplicación de factores indirectos y utilidad
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Wrench className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Gestión de Conceptos</h3>
              <p className="text-sm text-gray-600">
                Catálogo de conceptos, unidades de medida y precios unitarios actualizables
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Reportes</h3>
              <p className="text-sm text-gray-600">
                Generación de reportes detallados en JSON y PDF con resúmenes ejecutivos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Seleccionar Justipreciación de Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoJustipreciaciones.map((demo) => (
                <Card 
                  key={demo.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDemo === demo.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedDemo(demo.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{demo.folio}</h3>
                        <p className="text-sm text-gray-600">{demo.descripcion}</p>
                      </div>
                      <Badge variant={demo.estado === 'Completo' ? 'default' : 'secondary'}>
                        {demo.estado}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      Superficie: {demo.superficie} m²
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {!selectedDemo && (
              <div className="text-center py-8 text-gray-500">
                Selecciona una justipreciación para ver el panel de costos de construcción
              </div>
            )}
          </CardContent>
        </Card>

        {/* Costos Construction Panel */}
        {selectedDemo && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">
                Panel de Costos - {demoJustipreciaciones.find(d => d.id === selectedDemo)?.folio}
              </h2>
            </div>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Home className="h-4 w-4" />
                  <span className="text-sm">
                    <strong>Modo Demo:</strong> Los datos mostrados son ejemplos. 
                    En producción, este panel se conectaría a la API real de costos de construcción.
                  </span>
                </div>
              </CardContent>
            </Card>

            <CostosConstructionPanel justipreciacionId={selectedDemo} />
          </div>
        )}

        {/* Technical Implementation */}
        <Card>
          <CardHeader>
            <CardTitle>Implementación Técnica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ Backend API</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• GET /costos-construccion/:id</li>
                  <li>• POST /costos-construccion/:id</li>
                  <li>• PATCH /costos-construccion/:id</li>
                  <li>• GET /costos-construccion/:id/conceptos</li>
                  <li>• GET /costos-construccion/:id/reporte</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ Frontend Store</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Zustand state management</li>
                  <li>• Gestión de partidas por categoría</li>
                  <li>• Cálculos automáticos de totales</li>
                  <li>• Configuración de factores</li>
                  <li>• Persistencia de datos</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ UI Components</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Panel principal con tabs</li>
                  <li>• Formularios de partidas</li>
                  <li>• Resumen de costos</li>
                  <li>• Configuración de factores</li>
                  <li>• Generación de reportes</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Arquitectura v3 Implementada:</h4>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                api/src/routes/costos_construccion.py → store/costos-construccion/ → components/costos-construccion/ → app/costos-construccion-demo/
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Migración</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✅ Completado</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Módulo Homologación (TERRENO/RENTA)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Módulo Costos de Construcción
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Infraestructura de Migración
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-yellow-600 mb-3">⏳ Siguiente: Obras Complementarias</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• API backend para obras complementarias</li>
                  <li>• Store Zustand para gestión de estado</li>
                  <li>• Componentes UI especializados</li>
                  <li>• Demo funcional integrado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostosConstructionDemoPage;
