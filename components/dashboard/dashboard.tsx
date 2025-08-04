"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calculator,
  FileText,
  Users,
  Settings,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { BigPicture } from "@/components/big-picture";
import { ValoresNaturales } from "@/components/valores-naturales";
import React from "react";

interface DashboardProps {
  tipo?: "TERRENO" | "RENTA";
}

export const Dashboard: React.FC<DashboardProps> = ({ tipo = "TERRENO" }) => {
  const [selectedModule, setSelectedModule] = React.useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Datos de ejemplo para el dashboard
  const dashboardStats = {
    totalJustipreciaciones: 45,
    enProceso: 12,
    completadas: 28,
    enRevision: 5,
    promedioTiempo: "3.2 días",
    eficiencia: 87,
  };

  const recentJustipreciaciones = [
    { id: "JP-001", tipo: "TERRENO", estado: "En Proceso", progreso: 75, fecha: "2025-08-01" },
    { id: "JP-002", tipo: "RENTA", estado: "Completada", progreso: 100, fecha: "2025-07-30" },
    { id: "JP-003", tipo: "TERRENO", estado: "En Revisión", progreso: 90, fecha: "2025-08-02" },
    { id: "JP-004", tipo: "RENTA", estado: "En Proceso", progreso: 45, fecha: "2025-08-03" },
  ];

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Completada": return "text-green-700 bg-green-100";
      case "En Proceso": return "text-blue-700 bg-blue-100";
      case "En Revisión": return "text-yellow-700 bg-yellow-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Completada": return <CheckCircle className="h-4 w-4" />;
      case "En Proceso": return <Clock className="h-4 w-4" />;
      case "En Revisión": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderModuleContent = () => {
    switch (selectedModule) {
      case "big-picture":
        return <BigPicture tipo={tipo as "TERRENO" | "RENTA"} />;
      case "valores-naturales":
        return <ValoresNaturales />;
      case "factores":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Factores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Módulo de factores en desarrollo...</p>
            </CardContent>
          </Card>
        );
      case "revisiones":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Revisiones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Módulo de revisiones en desarrollo...</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Justipreciaciones</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalJustipreciaciones}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">En Proceso</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardStats.enProceso}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completadas</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardStats.completadas}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Eficiencia</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardStats.eficiencia}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de progreso */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Progreso General del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Eficiencia del Proceso</span>
                      <span className="text-sm text-muted-foreground">{dashboardStats.eficiencia}%</span>
                    </div>
                    <Progress value={dashboardStats.eficiencia} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dashboardStats.completadas}</p>
                      <p className="text-sm text-muted-foreground">Completadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dashboardStats.enProceso}</p>
                      <p className="text-sm text-muted-foreground">En Proceso</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{dashboardStats.enRevision}</p>
                      <p className="text-sm text-muted-foreground">En Revisión</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Justipreciaciones recientes */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Justipreciaciones Recientes
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Actualizar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentJustipreciaciones.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{item.id}</p>
                          <p className="text-sm text-muted-foreground">Tipo: {item.tipo} • {item.fecha}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.estado)}`}>
                            {getStatusIcon(item.estado)}
                            {item.estado}
                          </div>
                          <div className="mt-1">
                            <Progress value={item.progreso} className="h-2 w-24" />
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Justipreciación</h1>
              <p className="text-sm text-gray-600">Dashboard de Homologación - {tipo}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar justipreciaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Justipreciación
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { key: "dashboard", label: "Dashboard", icon: BarChart3 },
              { key: "big-picture", label: "Panorama General", icon: Eye },
              { key: "valores-naturales", label: "Valores Naturales", icon: Calculator },
              { key: "factores", label: "Factores", icon: Settings },
              { key: "revisiones", label: "Revisiones", icon: Users },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedModule(key)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  selectedModule === key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {renderModuleContent()}
      </div>
    </div>
  );
};
