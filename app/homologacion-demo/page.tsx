/** @format */
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  BarChart3, 
  FileText, 
  Settings,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HomologacionDemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Sistema de Homologación v3
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Migración exitosa del módulo de homologación desde v1/v2 a la arquitectura v3 
            con Next.js, FastAPI y componentes modernos.
          </p>
          <Badge variant="outline" className="mt-4 bg-green-50 text-green-700 border-green-200">
            ✅ Migración Completada
          </Badge>
        </div>

        {/* Cards de funcionalidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* API v3 */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">API v3 Completa</CardTitle>
              </div>
              <CardDescription>
                Backend FastAPI + SQLModel implementado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code>GET /homologacion/{`{tipo}/{id}`}</code>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code>POST /homologacion/{`{tipo}/{id}`}</code>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code>PATCH /homologacion/{`{tipo}/{id}`}</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Zustand */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Store Zustand</CardTitle>
              </div>
              <CardDescription>
                Gestión de estado moderna con persistencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Estado de homologación
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Factores y documentación
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Persistencia automática
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Componentes UI */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Componentes v3</CardTitle>
              </div>
              <CardDescription>
                shadcn/ui + componentes de migración
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  MigrationCard, Alert, Spinner
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Tabs, Drawer, Button
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Responsive design
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Nueva sección de módulos migrados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Módulos Migrados a v3</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sistema completo de justipreciaciones con arquitectura moderna
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Homologación */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Homologación
                </CardTitle>
                <CardDescription>
                  Avalúos TERRENO y RENTA completamente migrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="text-green-600 font-medium">✅ Completo</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    API + Store + Components + Demo
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link href="/homologacion/12345/edit?tipo=TERRENO">
                    <Button variant="outline" className="w-full" size="sm">
                      Demo TERRENO
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/homologacion/12346/edit?tipo=RENTA">
                    <Button variant="outline" className="w-full" size="sm">
                      Demo RENTA
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Costos de Construcción */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Costos de Construcción
                </CardTitle>
                <CardDescription>
                  Cálculo automático de partidas y costos por m²
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="text-green-600 font-medium">✅ Completo</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    6 categorías, cálculos automáticos, reportes
                  </div>
                </div>
                
                <Link href="/costos-construccion-demo">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ver Demo Completo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Obras Complementarias */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  Obras Complementarias
                </CardTitle>
                <CardDescription>
                  Pavimentación, servicios e infraestructura urbana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="text-green-600 font-medium">✅ Completo</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    3 categorías, factores automáticos, configuración flexible
                  </div>
                </div>
                
                <Link href="/obras-complementarias-demo">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Ver Demo Completo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Próximo Módulo - Placeholder */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-gray-400 opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  Análisis de Mercado
                </CardTitle>
                <CardDescription>
                  Próximo módulo en migración a v3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="text-gray-500 font-medium">⏸️ Pendiente</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Migración programada para próxima iteración
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" disabled>
                  En Desarrollo
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Sección de demostración original */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Homologación en Funcionamiento</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Prueba el sistema migrado con datos de ejemplo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Terreno */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Homologación TERRENO
                </CardTitle>
                <CardDescription>
                  Avalúo para terrenos urbanos y rurales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Justipreciación ID:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">12345</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tipo:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">TERRENO</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Listo</span>
                  </div>
                </div>
                
                <Link href="/homologacion/12345/edit?tipo=TERRENO">
                  <Button className="w-full">
                    Abrir Homologación
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Renta */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Homologación RENTA
                </CardTitle>
                <CardDescription>
                  Avalúo para propiedades en renta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Justipreciación ID:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">12346</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tipo:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">RENTA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Listo</span>
                  </div>
                </div>
                
                <Link href="/homologacion/12346/edit?tipo=RENTA">
                  <Button className="w-full" variant="outline">
                    Abrir Homologación
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Resumen de migración */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Resumen de Migración v1/v2 → v3</h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">v1 Legacy</div>
              <div className="space-y-1 text-gray-600">
                <div>React + Redux</div>
                <div>Flask + SQLAlchemy</div>
                <div>RSuite Components</div>
                <div>Monolítico</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">→</div>
              <div className="text-lg font-semibold text-blue-600">Migración</div>
              <div className="text-sm text-gray-600">Componentes + API + Store</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">v3 Moderno</div>
              <div className="space-y-1 text-gray-600">
                <div>Next.js + Zustand</div>
                <div>FastAPI + SQLModel</div>
                <div>shadcn/ui Components</div>
                <div>Microservicios</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomologacionDemoPage;
