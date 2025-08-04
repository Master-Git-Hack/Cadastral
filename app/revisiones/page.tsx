/** @format */
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  FileText, 
  Eye, 
  Edit, 
  Check, 
  X,
  Clock,
  User,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  History,
  Settings,
  Download
} from 'lucide-react';
import Link from 'next/link';

interface RevisionComment {
  id: string;
  field: string;
  message: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  author: string;
  createdAt: string;
  resolvedAt?: string;
  suggestion?: string;
}

interface RevisionEntry {
  id: string;
  version: string;
  status: 'PENDIENTE' | 'EN_REVISION' | 'REVISADO_CON_ERRORES' | 'REVISADO_APROBADO' | 'RECHAZADO';
  reviewer: string;
  createdAt: string;
  completedAt?: string;
  comments: RevisionComment[];
  summary: string;
}

interface RevisionData {
  id: string;
  status: 'PENDIENTE' | 'EN_REVISION' | 'REVISADO_CON_ERRORES' | 'REVISADO_APROBADO' | 'RECHAZADO';
  currentVersion: string;
  canReview: boolean;
  canEdit: boolean;
  revisiones: RevisionEntry[];
}

export default function RevisionesPage() {
  const [activeTab, setActiveTab] = React.useState('status');
  const [isReviewing, setIsReviewing] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');
  const [selectedField, setSelectedField] = React.useState('');
  const [suggestion, setSuggestion] = React.useState('');

  // Datos de ejemplo para revisiones
  const [revisionData] = React.useState<RevisionData>({
    id: "REV-001",
    status: "EN_REVISION",
    currentVersion: "1.3",
    canReview: true,
    canEdit: true,
    revisiones: [
      {
        id: "1",
        version: "1.3",
        status: "EN_REVISION",
        reviewer: "Ana García",
        createdAt: "2024-01-15T10:30:00Z",
        summary: "Revisión de factores de homologación y cálculos de superficie",
        comments: [
          {
            id: "c1",
            field: "Factor Comercialización",
            message: "El factor aplicado parece alto para la zona. Revisar comparables similares.",
            status: "PENDING",
            author: "Ana García",
            createdAt: "2024-01-15T10:35:00Z",
            suggestion: "Ajustar factor a 0.95"
          },
          {
            id: "c2", 
            field: "Superficie Comparable C2",
            message: "Verificar medidas del terreno. Posible error en captura.",
            status: "PENDING",
            author: "Ana García",
            createdAt: "2024-01-15T11:15:00Z",
            suggestion: "Corregir a 420.50 m²"
          }
        ]
      },
      {
        id: "2",
        version: "1.2",
        status: "REVISADO_CON_ERRORES",
        reviewer: "Carlos Mendoza",
        createdAt: "2024-01-10T14:20:00Z",
        completedAt: "2024-01-12T16:45:00Z",
        summary: "Primera revisión - Errores en documentación de comparables",
        comments: [
          {
            id: "c3",
            field: "Documentación C1",
            message: "Falta referencia de fuente para el comparable.",
            status: "RESOLVED",
            author: "Carlos Mendoza",
            createdAt: "2024-01-10T14:25:00Z",
            resolvedAt: "2024-01-13T09:30:00Z"
          }
        ]
      },
      {
        id: "3",
        version: "1.1",
        status: "REVISADO_APROBADO",
        reviewer: "María López",
        createdAt: "2024-01-05T09:15:00Z",
        completedAt: "2024-01-08T11:30:00Z",
        summary: "Revisión inicial aprobada",
        comments: []
      }
    ]
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return 'bg-blue-100 text-blue-800';
      case 'EN_REVISION': return 'bg-orange-100 text-orange-800';
      case 'REVISADO_CON_ERRORES': return 'bg-red-100 text-red-800';
      case 'REVISADO_APROBADO': return 'bg-green-100 text-green-800';
      case 'RECHAZADO': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return <Clock className="w-4 h-4" />;
      case 'EN_REVISION': return <Eye className="w-4 h-4" />;
      case 'REVISADO_CON_ERRORES': return <AlertCircle className="w-4 h-4" />;
      case 'REVISADO_APROBADO': return <CheckCircle className="w-4 h-4" />;
      case 'RECHAZADO': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCommentStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'DISMISSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingComments = revisionData.revisiones.reduce((total: number, revision: RevisionEntry) => {
    return total + revision.comments.filter((c: RevisionComment) => c.status === 'PENDING').length;
  }, 0);

  const handleStartReview = () => {
    setIsReviewing(true);
  };

  const handleApplyChanges = () => {
    if (window.confirm('¿Está seguro que desea aplicar todos los cambios sugeridos?')) {
      // Lógica para aplicar cambios
      console.log('Aplicando cambios sugeridos...');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedField.trim()) {
      // Lógica para agregar comentario
      console.log('Agregando comentario:', { field: selectedField, comment: newComment, suggestion });
      setNewComment('');
      setSelectedField('');
      setSuggestion('');
    }
  };

  const handleResolveComment = (commentId: string) => {
    console.log('Resolviendo comentario:', commentId);
  };

  const handleDismissComment = (commentId: string) => {
    console.log('Descartando comentario:', commentId);
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
            Sistema de Revisiones
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Control de calidad y revisión de homologaciones
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
          {revisionData.canReview && !isReviewing && (
            <Button onClick={handleStartReview}>
              <Edit className="w-4 h-4 mr-2" />
              Nueva Revisión
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="status">
            <FileText className="w-4 h-4 mr-2" />
            Estado
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageCircle className="w-4 h-4 mr-2" />
            Comentarios {pendingComments > 0 && `(${pendingComments})`}
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Estado Tab */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estado Actual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Estado Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Estado:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium flex items-center gap-1 ${getStatusColor(revisionData.status)}`}>
                    {getStatusIcon(revisionData.status)}
                    {revisionData.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Versión:</span>
                  <span className="font-bold">{revisionData.currentVersion}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Revisiones realizadas:</span>
                  <span className="font-bold">{revisionData.revisiones.length}</span>
                </div>
                
                {pendingComments > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Comentarios pendientes:</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm font-medium">
                      {pendingComments}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Disponibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revisionData.canReview && (
                  <Button 
                    className="w-full" 
                    onClick={handleStartReview}
                    disabled={isReviewing}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isReviewing ? 'Revisión en curso...' : 'Iniciar Nueva Revisión'}
                  </Button>
                )}
                
                {revisionData.canEdit && pendingComments > 0 && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleApplyChanges}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Aplicar Cambios Sugeridos
                  </Button>
                )}
                
                {!revisionData.canReview && !revisionData.canEdit && (
                  <div className="text-center text-gray-500 py-4">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Solo lectura</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panel de Revisión Activa */}
          {isReviewing && (
            <Card>
              <CardHeader>
                <CardTitle>Nueva Revisión</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campo a revisar</label>
                    <Input
                      value={selectedField}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedField(e.target.value)}
                      placeholder="Ej: Factor Comercialización, Superficie C1..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sugerencia (opcional)</label>
                    <Input
                      value={suggestion}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuggestion(e.target.value)}
                      placeholder="Valor sugerido o corrección..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Comentario</label>
                  <Textarea
                    value={newComment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                    placeholder="Descripción del problema o observación..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddComment}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Agregar Comentario
                  </Button>
                  <Button variant="outline" onClick={() => setIsReviewing(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Comentarios Tab */}
        <TabsContent value="comments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comentarios de Revisión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revisionData.revisiones.map((revision: RevisionEntry) =>
                  revision.comments.map((comment: RevisionComment) => (
                    <div key={comment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.field}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCommentStatusColor(comment.status)}`}>
                            {comment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          {comment.author}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">{comment.message}</p>
                      
                      {comment.suggestion && (
                        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                          <strong>Sugerencia:</strong> {comment.suggestion}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Creado: {formatDate(comment.createdAt)}</span>
                        {comment.resolvedAt && (
                          <span>Resuelto: {formatDate(comment.resolvedAt)}</span>
                        )}
                      </div>
                      
                      {comment.status === 'PENDING' && revisionData.canEdit && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolveComment(comment.id)}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Resolver
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDismissComment(comment.id)}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Descartar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {revisionData.revisiones.every((r: RevisionEntry) => r.comments.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay comentarios de revisión</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historial Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Revisiones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revisionData.revisiones.map((revision: RevisionEntry) => (
                  <div key={revision.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">v{revision.version}</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium flex items-center gap-1 ${getStatusColor(revision.status)}`}>
                          {getStatusIcon(revision.status)}
                          {revision.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        {revision.reviewer}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{revision.summary}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Iniciado: {formatDate(revision.createdAt)}</span>
                      {revision.completedAt && (
                        <span>Completado: {formatDate(revision.completedAt)}</span>
                      )}
                    </div>
                    
                    {revision.comments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <span className="text-sm font-medium">
                          {revision.comments.length} comentario(s)
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
