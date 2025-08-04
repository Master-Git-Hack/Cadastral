'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Wrench, Zap, FileText, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ObrasComplementariasPanel from '@/components/obras-complementarias/ObrasComplementariasPanel';

const ObrasComplementariasDemoPage = () => {
  // IDs de ejemplo para demostrar la funcionalidad
  const demoJustipreciaciones = [
    {
      id: 3,
      folio: 'OBRAS-001',
      descripcion: 'Fraccionamiento Residencial Los Pinos',
      superficie: 2500,
      estado: 'En Proceso'
    },
    {
      id: 4,
      folio: 'OBRAS-002', 
      descripcion: 'Desarrollo Comercial Plaza Central',
      superficie: 5000,
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
                <Building className="h-8 w-8 text-orange-600" />
                Obras Complementarias
              </h1>
              <p className="text-gray-600 mt-2">
                Sistema integrado para el cálculo y gestión de obras de infraestructura urbana
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium bg-green-100 text-green-800">
            Módulo v3 - Demo
          </span>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Pavimentación</h3>
              <p className="text-sm text-gray-600">
                Banquetas, guarniciones, pavimento asfáltico y obras de vialidad
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Servicios</h3>
              <p className="text-sm text-gray-600">
                Agua potable, drenaje, energía eléctrica y servicios básicos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Infraestructura</h3>
              <p className="text-sm text-gray-600">
                Alumbrado público, mobiliario urbano y áreas verdes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Cálculo Automático</h3>
              <p className="text-sm text-gray-600">
                Aplicación de factores, contingencias e indirectos automáticos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Seleccionar Justipreciación de Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoJustipreciaciones.map((demo) => (
                <Card 
                  key={demo.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDemo === demo.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedDemo(demo.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{demo.folio}</h3>
                        <p className="text-sm text-gray-600">{demo.descripcion}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        demo.estado === 'Completo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {demo.estado}
                      </span>
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
                Selecciona una justipreciación para ver el panel de obras complementarias
              </div>
            )}
          </CardContent>
        </Card>

        {/* Obras Complementarias Panel */}
        {selectedDemo && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold">
                Panel de Obras - {demoJustipreciaciones.find(d => d.id === selectedDemo)?.folio}
              </h2>
            </div>
            
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-800">
                  <Building className="h-4 w-4" />
                  <span className="text-sm">
                    <strong>Modo Demo:</strong> Los datos mostrados son ejemplos. 
                    En producción, este panel se conectaría a la API real de obras complementarias.
                  </span>
                </div>
              </CardContent>
            </Card>

            <ObrasComplementariasPanel justipreciacionId={selectedDemo} />
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
                  <li>• GET /obras-complementarias/:id</li>
                  <li>• POST /obras-complementarias/:id</li>
                  <li>• PATCH /obras-complementarias/:id</li>
                  <li>• GET /obras-complementarias/:id/catalogo</li>
                  <li>• GET /obras-complementarias/:id/reporte</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ Frontend Store</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Zustand state management</li>
                  <li>• Gestión por categorías de obra</li>
                  <li>• Configuración de inclusión/exclusión</li>
                  <li>• Factores de contingencias e indirectos</li>
                  <li>• Cálculos automáticos</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ UI Components</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Panel con tabs por categoría</li>
                  <li>• Switches de configuración</li>
                  <li>• Formularios dinámicos</li>
                  <li>• Resumen de costos</li>
                  <li>• Indicadores de estado</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Arquitectura v3 Implementada:</h4>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                api/src/routes/obras_complementarias.py → store/obras-complementarias/ → components/obras-complementarias/ → app/obras-complementarias-demo/
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Details */}
        <Card>
          <CardHeader>
            <CardTitle>Categorías de Obras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Pavimentación
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Banquetas de concreto</li>
                  <li>• Guarniciones precoladas</li>
                  <li>• Pavimento asfáltico</li>
                  <li>• Señalización vial</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Servicios
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Tomas de agua potable</li>
                  <li>• Descargas de drenaje</li>
                  <li>• Acometidas eléctricas</li>
                  <li>• Gas natural</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Infraestructura
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Alumbrado público LED</li>
                  <li>• Mobiliario urbano</li>
                  <li>• Áreas verdes y jardinería</li>
                  <li>• Juegos infantiles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Migración v1/v2 → v3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✅ Completado</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Módulo Homologación (TERRENO/RENTA)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Módulo Costos de Construcción
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Módulo Obras Complementarias
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Infraestructura de Migración Completa
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">🎯 Siguiente Fase</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Integración completa con BD productiva</li>
                  <li>• Optimización de rendimiento</li>
                  <li>• Pruebas de integración</li>
                  <li>• Documentación técnica completa</li>
                  <li>• Capacitación de usuarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ObrasComplementariasDemoPage;
