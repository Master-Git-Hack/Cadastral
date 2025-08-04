"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import useHomologacion from '@/store/homologacion';
import useJustipreciacionStore from '@/store/justipreciacion';
import { MigrationCard, MigrationSpinner, MigrationAlert, MigrationButton } from '@/components/migration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { AlertCircle, Save, Plus, Minus, History, Eye } from 'lucide-react';

// Componentes para las páginas de homologación
const CompilationPage = ({ type }: { type: 'TERRENO' | 'RENTA' }) => (
  <MigrationCard title="Compilación de Factores" description={`Configuración inicial para ${type}`}>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Factores Activos</h4>
          <div className="space-y-2">
            <Badge variant="outline">Ubicación</Badge>
            <Badge variant="outline">Superficie</Badge>
            <Badge variant="outline">Comercial</Badge>
            {type === 'TERRENO' && (
              <>
                <Badge variant="outline">Clasificación</Badge>
                <Badge variant="outline">Proyecto</Badge>
              </>
            )}
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Configuración</h4>
          <p className="text-sm text-gray-600">
            Configuración automática basada en el tipo de avalúo: {type}
          </p>
        </div>
      </div>
    </div>
  </MigrationCard>
);

const AgeContainerPage = ({ type }: { type: 'TERRENO' | 'RENTA' }) => (
  <MigrationCard title="Factor de Edad" description="Configuración del factor de antigüedad">
    <div className="space-y-4">
      <MigrationAlert type="info">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <div>
            {type === 'TERRENO' 
              ? 'Para terrenos, el factor de edad considera la antigüedad del desarrollo'
              : 'Para rentas, se evalúa la antigüedad de la construcción'
            }
          </div>
        </div>
      </MigrationAlert>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border rounded text-center">
          <div className="text-2xl font-bold text-blue-600">0-5</div>
          <div className="text-sm">Años - Nuevo</div>
        </div>
        <div className="p-3 border rounded text-center">
          <div className="text-2xl font-bold text-green-600">6-15</div>
          <div className="text-sm">Años - Bueno</div>
        </div>
        <div className="p-3 border rounded text-center">
          <div className="text-2xl font-bold text-orange-600">16+</div>
          <div className="text-sm">Años - Regular</div>
        </div>
      </div>
    </div>
  </MigrationCard>
);

const AreaPage = () => (
  <MigrationCard title="Registro de Área" description="Gestión de comparables y superficies">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Comparables Registrados</h4>
        <div className="space-x-2">
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
          <Button size="sm" variant="outline">
            <Minus className="h-4 w-4 mr-1" />
            Remover
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Comparable</th>
              <th className="px-4 py-2 text-left">Superficie</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">C1</td>
              <td className="px-4 py-2">120 m²</td>
              <td className="px-4 py-2">$2,500/m²</td>
              <td className="px-4 py-2">
                <Badge variant="default">Activo</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MigrationCard>
);

const BigPicturePage = () => (
  <MigrationCard title="Vista General" description="Resumen del proceso de homologación">
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="font-medium">Factores Aplicados</h4>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Factor de Ubicación</span>
            <span className="font-mono">1.05</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Factor de Superficie</span>
            <span className="font-mono">0.98</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Factor Comercial</span>
            <span className="font-mono">1.02</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Resultado</h4>
        <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">$2,625</div>
          <div className="text-sm text-green-600">Valor unitario homologado</div>
        </div>
      </div>
    </div>
  </MigrationCard>
);

const NaturalValuesPage = () => (
  <MigrationCard title="Valores Naturales" description="Análisis de valores base y ajustes">
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Valor Base</h4>
          <div className="text-2xl font-bold">$2,500</div>
          <div className="text-sm text-gray-600">Por metro cuadrado</div>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Valor Ajustado</h4>
          <div className="text-2xl font-bold text-green-600">$2,625</div>
          <div className="text-sm text-gray-600">Con factores aplicados</div>
        </div>
      </div>
      
      <MigrationAlert type="info">
        Los valores naturales representan el mercado sin ajustes artificiales
      </MigrationAlert>
    </div>
  </MigrationCard>
);

const IndivisoPage = () => (
  <MigrationCard title="Cálculo de Indivisos" description="Distribución proporcional de valores">
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border rounded text-center">
          <div className="text-lg font-bold">40%</div>
          <div className="text-sm">Terreno</div>
        </div>
        <div className="p-3 border rounded text-center">
          <div className="text-lg font-bold">60%</div>
          <div className="text-sm">Construcción</div>
        </div>
        <div className="p-3 border rounded text-center">
          <div className="text-lg font-bold">100%</div>
          <div className="text-sm">Total</div>
        </div>
      </div>
    </div>
  </MigrationCard>
);

// Componente principal de homologación v3
export default function HomologacionEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const justipreciacionId = parseInt(params.justipreciacion as string);
  const tipo = (searchParams.get('tipo') || 'TERRENO') as 'TERRENO' | 'RENTA';
  
  // Stores
  const homologacion = useHomologacion();
  const justipreciacion = useJustipreciacionStore();
  
  // Estado local
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(true);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  
  // Determinar número total de páginas
  const totalPages = homologacion.documentation?.ReFactor?.isUsed ? 7 : 5;
  
  // Configuración de páginas
  const pages = {
    1: <CompilationPage type={tipo} />,
    2: <AgeContainerPage type={tipo} />,
    3: <AreaPage />,
    4: <BigPicturePage />,
    5: <NaturalValuesPage />,
    ...(homologacion.documentation?.ReFactor?.isUsed && {
      6: <IndivisoPage />,
      7: <IndivisoPage />
    })
  };

  // Efectos
  useEffect(() => {
    const loadData = async () => {
      setLoadingPage(true);
      try {
        // Por ahora, simular carga de datos
        // TODO: Implementar cuando las funciones estén disponibles en el store
        console.log('Loading data for:', { justipreciacionId, tipo });
        
        // Simular carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoadingPage(false);
      }
    };

    loadData();
  }, [justipreciacionId, tipo]);

  // Función para guardar
  const handleSave = async () => {
    try {
      // TODO: Implementar cuando la función esté disponible
      console.log('Saving homologacion:', { justipreciacionId, tipo });
      
      // Mostrar mensaje de éxito y cerrar ventana si es popup
      if (window.opener) {
        window.close();
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  // Funciones temporales para los botones
  const handleAddRow = () => {
    console.log('Add row clicked');
  };

  const handleRemoveRow = () => {
    console.log('Remove row clicked');
  };

  if (loadingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MigrationSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Homologación de tipo: <span className="text-blue-600">{tipo}</span>
              </h1>
              <p className="text-gray-600">
                Justipreciación ID: {justipreciacionId}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Botón de revisiones */}
              {homologacion.id !== 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowRevisionHistory(!showRevisionHistory)}
                >
                  <History className="h-4 w-4 mr-2" />
                  {showRevisionHistory ? 'Ocultar Revisiones' : 'Ver Revisiones'}
                </Button>
              )}
              
              {/* Botón de documentación */}
              {currentPage > 2 && (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Mostrar Información
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Documentación del Área</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-6">
                      <AreaPage />
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
              
              {/* Botón de guardar */}
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                {homologacion.id === 0 ? 'Guardar' : 'Actualizar'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de páginas */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Tabs value={currentPage.toString()} onValueChange={(value) => setCurrentPage(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-7">
              <TabsTrigger value="1">1. Compilación</TabsTrigger>
              <TabsTrigger value="2">2. Edad</TabsTrigger>
              <TabsTrigger value="3">3. Área</TabsTrigger>
              <TabsTrigger value="4">4. Vista General</TabsTrigger>
              <TabsTrigger value="5">5. Valores</TabsTrigger>
              {homologacion.documentation?.ReFactor?.isUsed && (
                <>
                  <TabsTrigger value="6">6. Indiviso I</TabsTrigger>
                  <TabsTrigger value="7">7. Indiviso II</TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-6">
        {/* Acciones de la primera página */}
        {currentPage === 1 && (
          <div className="mb-6 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddRow}
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar Fila
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRemoveRow}
            >
              <Minus className="h-4 w-4 mr-1" />
              Remover Fila
            </Button>
          </div>
        )}

        {/* Página actual */}
        <div className="mb-6">
          {pages[currentPage as keyof typeof pages]}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Si el ejercicio cuenta con proceso de cálculo de indivisos, favor de posicionarse 
            en la página 6 o posterior para actualizar el registro de justipreciación, 
            sino se utilizará el valor resultante mostrado en la página 5.
          </p>
        </div>
      </div>

      {/* Drawer de historial de revisiones */}
      <Drawer open={showRevisionHistory} onOpenChange={setShowRevisionHistory}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Historial de Revisiones</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <MigrationCard title="Revisiones" description="Sistema de revisiones no implementado">
              <MigrationAlert type="warning">
                El sistema de revisiones será implementado en la siguiente iteración
              </MigrationAlert>
            </MigrationCard>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
