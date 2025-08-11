/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Message, Panel, Badge, SelectPicker, Toggle, InputGroup } from 'rsuite';
import { Alert } from '../../../../../utils/alert';

interface SugerenciasRevisionModalProps {
  show: boolean;
  onClose: () => void;
  revisionId: number;
}

interface Sugerencia {
  id: number;
  field_path: string;
  field_label: string;
  current_value: string;
  suggested_value: string;
  comment: string;
  reviewer: string;
  created_at: string;
  status?: string;
  response?: string;
  responded_by?: string;
  responded_at?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category?: 'VALOR' | 'FACTOR' | 'AREA' | 'UBICACION' | 'CARACTERISTICAS' | 'SERVICIOS' | 'MERCADO' | 'CALCULO' | 'DOCUMENTACION' | 'OTRO';
}

interface CampoEspecifico {
  path: string;
  label: string;
  currentValue: any;
  type: 'text' | 'number' | 'select' | 'currency' | 'area' | 'percentage';
  options?: string[];
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
}

export const SugerenciasRevisionModal: React.FC<SugerenciasRevisionModalProps> = ({
  show,
  onClose,
  revisionId
}) => {
  const [loading, setLoading] = useState(false);
  const [enviandoSugerencia, setEnviandoSugerencia] = useState(false);
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [nuevaSugerencia, setNuevaSugerencia] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  
  // Estados para sugerencia específica
  const [mostrarFormularioEspecifico, setMostrarFormularioEspecifico] = useState(false);
  const [campoSeleccionado, setCampoSeleccionado] = useState<string>('');
  const [valorSugerido, setValorSugerido] = useState('');
  const [prioridadSugerencia, setPrioridadSugerencia] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [categoriaSugerencia, setCategoriaSugerencia] = useState<'VALOR' | 'FACTOR' | 'AREA' | 'UBICACION' | 'CARACTERISTICAS' | 'SERVICIOS' | 'MERCADO' | 'CALCULO' | 'DOCUMENTACION' | 'OTRO'>('VALOR');
  const [comentarioEspecifico, setComentarioEspecifico] = useState('');

  // Campos específicos que se pueden sugerir modificar - COMPLETO PROCESO DE HOMOLOGACIÓN
  const camposDisponibles: CampoEspecifico[] = [
    // === VALORES Y PRECIOS PRINCIPALES ===
    { path: 'valor_terreno', label: 'Valor del Terreno', currentValue: '$850,000', type: 'currency', unit: 'MXN' },
    { path: 'valor_construccion', label: 'Valor de Construcción', currentValue: '$1,200,000', type: 'currency', unit: 'MXN' },
    { path: 'valor_total', label: 'Valor Total', currentValue: '$2,050,000', type: 'currency', unit: 'MXN' },
    { path: 'precio_venta', label: 'Precio de Venta', currentValue: '$2,200,000', type: 'currency', unit: 'MXN' },
    { path: 'precio_renta_mensual', label: 'Precio de Renta Mensual', currentValue: '$25,000', type: 'currency', unit: 'MXN/mes' },
    { path: 'precio_renta_anual', label: 'Precio de Renta Anual', currentValue: '$300,000', type: 'currency', unit: 'MXN/año' },
    { path: 'valor_unitario_terreno', label: 'Valor Unitario Terreno', currentValue: '$5,667', type: 'currency', unit: 'MXN/m²' },
    { path: 'valor_unitario_construccion', label: 'Valor Unitario Construcción', currentValue: '$10,000', type: 'currency', unit: 'MXN/m²' },
    
    // === ÁREAS Y SUPERFICIES ===
    { path: 'area_terreno', label: 'Área del Terreno', currentValue: '150', type: 'area', unit: 'm²' },
    { path: 'area_construccion', label: 'Área de Construcción', currentValue: '120', type: 'area', unit: 'm²' },
    { path: 'area_lote_promedio', label: 'Área de Lote Promedio', currentValue: '140', type: 'area', unit: 'm²' },
    { path: 'superficie_construida', label: 'Superficie Construida', currentValue: '118', type: 'area', unit: 'm²' },
    { path: 'area_vendible', label: 'Área Vendible', currentValue: '115', type: 'area', unit: 'm²' },
    { path: 'area_rentable', label: 'Área Rentable', currentValue: '110', type: 'area', unit: 'm²' },
    { path: 'frente', label: 'Frente del Lote', currentValue: '12', type: 'number', unit: 'm' },
    { path: 'fondo', label: 'Fondo del Lote', currentValue: '25', type: 'number', unit: 'm' },
    
    // === FACTORES DE HOMOLOGACIÓN ===
    { path: 'factor_edad', label: 'Factor de Edad (FEd)', currentValue: '0.95', type: 'number', validation: { min: 0.5, max: 1.2 } },
    { path: 'factor_superficie', label: 'Factor de Superficie (FSup)', currentValue: '1.02', type: 'number', validation: { min: 0.8, max: 1.3 } },
    { path: 'factor_forma', label: 'Factor de Forma (FFo)', currentValue: '1.00', type: 'number', validation: { min: 0.85, max: 1.15 } },
    { path: 'factor_topografia', label: 'Factor de Topografía (FTop)', currentValue: '1.00', type: 'number', validation: { min: 0.85, max: 1.15 } },
    { path: 'factor_uso', label: 'Factor de Uso (FUso)', currentValue: '1.00', type: 'number', validation: { min: 0.9, max: 1.1 } },
    { path: 'factor_zona', label: 'Factor de Zona (FZon)', currentValue: '1.05', type: 'number', validation: { min: 0.8, max: 1.3 } },
    { path: 'factor_ubicacion', label: 'Factor de Ubicación (FUb)', currentValue: '1.03', type: 'number', validation: { min: 0.85, max: 1.2 } },
    { path: 'factor_calidad', label: 'Factor de Calidad', currentValue: '1.06', type: 'number', validation: { min: 0.85, max: 1.25 } },
    { path: 'factor_conservacion', label: 'Factor de Conservación', currentValue: '0.98', type: 'number', validation: { min: 0.8, max: 1.1 } },
    { path: 'factor_proyecto', label: 'Factor de Proyecto (FProy)', currentValue: '1.00', type: 'number', validation: { min: 0.9, max: 1.15 } },
    { path: 'factor_nivel', label: 'Factor de Nivel', currentValue: '1.02', type: 'number', validation: { min: 0.85, max: 1.2 } },
    { path: 'factor_comercial', label: 'Factor Comercial', currentValue: '1.00', type: 'number', validation: { min: 0.9, max: 1.15 } },
    { path: 'factor_homologacion', label: 'Factor Homologación Resultante (F.Ho.Re)', currentValue: '1.08', type: 'number', validation: { min: 0.7, max: 1.4 } },
    { path: 'factor_frente', label: 'Factor de Frente', currentValue: '1.0', type: 'number', validation: { min: 0.5, max: 2.0 } },
    { path: 'coeficiente_maxmin', label: 'Coeficiente Máx/Mín', currentValue: '1.15', type: 'number', validation: { min: 1.0, max: 1.5 } },
    
    // === CARACTERÍSTICAS DE LA PROPIEDAD ===
    { path: 'antiguedad', label: 'Antigüedad', currentValue: '10', type: 'number', unit: 'años' },
    { path: 'vida_util', label: 'Vida Útil', currentValue: '50', type: 'number', unit: 'años' },
    { path: 'vida_remanente', label: 'Vida Remanente', currentValue: '40', type: 'number', unit: 'años' },
    { path: 'niveles', label: 'Número de Niveles', currentValue: '2', type: 'number', unit: 'pisos' },
    { path: 'recamaras', label: 'Número de Recámaras', currentValue: '3', type: 'number' },
    { path: 'banos', label: 'Número de Baños', currentValue: '2', type: 'number' },
    { path: 'cochera', label: 'Lugares de Estacionamiento', currentValue: '2', type: 'number' },
    
    // === CLASIFICACIONES Y TIPOS ===
    { path: 'tipo_construccion', label: 'Tipo de Construcción', currentValue: 'Residencial', type: 'select', 
      options: ['Residencial', 'Comercial', 'Industrial', 'Mixto', 'Oficinas', 'Bodega', 'Local Comercial'] },
    { path: 'uso_actual', label: 'Uso Actual', currentValue: 'Habitacional', type: 'select', 
      options: ['Habitacional', 'Comercial', 'Industrial', 'Mixto H-C', 'Mixto I-H', 'Mixto I-C', 'Servicios', 'Oficinas'] },
    { path: 'uso_suelo', label: 'Uso de Suelo', currentValue: 'Habitacional', type: 'select', 
      options: ['Habitacional', 'Comercial', 'Industrial', 'Mixto', 'Especial', 'Centro', 'Residencial'] },
    { path: 'clasificacion_construccion', label: 'Clasificación de Construcción', currentValue: 'Media Común', type: 'select', 
      options: ['Precaria', 'Baja', 'Económica', 'Comercial', 'Interés Social', 'Media Común', 'Media Alta', 'Alta', 'Lujo', 'Residencial'] },
    { path: 'estado_conservacion', label: 'Estado de Conservación', currentValue: 'Bueno', type: 'select', 
      options: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo', 'Pésimo'] },
    { path: 'calidad_construccion', label: 'Calidad de Construcción', currentValue: 'Buena', type: 'select', 
      options: ['Excelente', 'Muy Buena', 'Buena', 'Regular', 'Económica', 'Baja'] },
    { path: 'topografia', label: 'Topografía', currentValue: 'Plano', type: 'select', 
      options: ['Plano', 'Pendiente Ligera', 'Pendiente Moderada', 'Pendiente Fuerte', 'Muy Inclinado'] },
    { path: 'forma_lote', label: 'Forma del Lote', currentValue: 'Regular', type: 'select', 
      options: ['Regular', 'Irregular', 'Esquina', 'Cabecera', 'Intermedio'] },
    
    // === UBICACIÓN Y ZONA ===
    { path: 'zona_valor', label: 'Zona de Valor', currentValue: 'A', type: 'select', options: ['A', 'B', 'C', 'D'] },
    { path: 'colonia', label: 'Colonia', currentValue: 'Centro', type: 'text' },
    { path: 'calle', label: 'Calle', currentValue: 'Av. Principal', type: 'text' },
    { path: 'numero_exterior', label: 'Número Exterior', currentValue: '123', type: 'text' },
    { path: 'codigo_postal', label: 'Código Postal', currentValue: '20000', type: 'text' },
    { path: 'municipio', label: 'Municipio', currentValue: 'Aguascalientes', type: 'text' },
    
    // === SERVICIOS E INFRAESTRUCTURA ===
    { path: 'agua_potable', label: 'Agua Potable', currentValue: 'Sí', type: 'select', options: ['Sí', 'No', 'Limitado'] },
    { path: 'drenaje', label: 'Drenaje', currentValue: 'Sí', type: 'select', options: ['Sí', 'No', 'Fosa Séptica'] },
    { path: 'energia_electrica', label: 'Energía Eléctrica', currentValue: 'Sí', type: 'select', options: ['Sí', 'No'] },
    { path: 'alumbrado_publico', label: 'Alumbrado Público', currentValue: 'Sí', type: 'select', options: ['Sí', 'No', 'Deficiente'] },
    { path: 'pavimento', label: 'Pavimento', currentValue: 'Asfalto', type: 'select', options: ['Asfalto', 'Concreto', 'Empedrado', 'Terracería'] },
    { path: 'banquetas', label: 'Banquetas', currentValue: 'Sí', type: 'select', options: ['Sí', 'No', 'Parciales'] },
    { path: 'transporte_publico', label: 'Transporte Público', currentValue: 'Bueno', type: 'select', options: ['Excelente', 'Bueno', 'Regular', 'Deficiente', 'No hay'] },
    
    // === FACTORES ECONÓMICOS ===
    { path: 'factor_ajuste_tiempo', label: 'Factor de Ajuste por Tiempo', currentValue: '1.02', type: 'number', validation: { min: 0.8, max: 1.3 } },
    { path: 'factor_oferta_demanda', label: 'Factor Oferta-Demanda', currentValue: '1.00', type: 'number', validation: { min: 0.85, max: 1.2 } },
    { path: 'descuento_pronto_pago', label: 'Descuento Pronto Pago', currentValue: '0', type: 'percentage', unit: '%' },
    { path: 'gastos_venta', label: 'Gastos de Venta', currentValue: '5', type: 'percentage', unit: '%' },
    { path: 'utilidad_promotor', label: 'Utilidad del Promotor', currentValue: '15', type: 'percentage', unit: '%' },
    { path: 'tasa_capitalizacion', label: 'Tasa de Capitalización', currentValue: '8.5', type: 'percentage', unit: '%' },
    
    // === INFORMACIÓN DE MERCADO ===
    { path: 'fuente_informacion', label: 'Fuente de Información', currentValue: 'Inmobiliaria Local', type: 'text' },
    { path: 'fecha_avaluo', label: 'Fecha de Avalúo', currentValue: '2024-01-15', type: 'text' },
    { path: 'vigencia_avaluo', label: 'Vigencia del Avalúo', currentValue: '6', type: 'number', unit: 'meses' },
    { path: 'moneda', label: 'Moneda', currentValue: 'MXN', type: 'select', options: ['MXN', 'USD', 'EUR'] },
    { path: 'tipo_cambio', label: 'Tipo de Cambio (si aplica)', currentValue: '17.50', type: 'number', unit: 'MXN/USD' },
    
    // === OBSERVACIONES Y NOTAS ===
    { path: 'observaciones_generales', label: 'Observaciones Generales', currentValue: '', type: 'text' },
    { path: 'limitaciones_avaluo', label: 'Limitaciones del Avalúo', currentValue: '', type: 'text' },
    { path: 'supuestos_extraordinarios', label: 'Supuestos Extraordinarios', currentValue: '', type: 'text' },
    
    // === PORCENTAJES Y PONDERACIONES ===
    { path: 'porcentaje_ponderacion_1', label: 'Porcentaje Ponderación Comparable 1', currentValue: '30', type: 'percentage', unit: '%' },
    { path: 'porcentaje_ponderacion_2', label: 'Porcentaje Ponderación Comparable 2', currentValue: '35', type: 'percentage', unit: '%' },
    { path: 'porcentaje_ponderacion_3', label: 'Porcentaje Ponderación Comparable 3', currentValue: '25', type: 'percentage', unit: '%' },
    { path: 'porcentaje_ponderacion_4', label: 'Porcentaje Ponderación Comparable 4', currentValue: '10', type: 'percentage', unit: '%' },
    
    // === FACTORES DE REDONDEO Y AJUSTE ===
    { path: 'redondeo_a', label: 'Redondeo a', currentValue: '1000', type: 'number', unit: 'MXN' },
    { path: 'factor_ajuste_final', label: 'Factor de Ajuste Final', currentValue: '1.00', type: 'number', validation: { min: 0.8, max: 1.3 } },
    
    // === RESULTADOS FINALES ===
    { path: 'valor_promedio_ponderado', label: 'Valor Promedio Ponderado', currentValue: '$2,045,500', type: 'currency', unit: 'MXN' },
    { path: 'valor_final_redondeado', label: 'Valor Final Redondeado', currentValue: '$2,050,000', type: 'currency', unit: 'MXN' },
    { path: 'valor_por_m2_terreno', label: 'Valor por m² de Terreno', currentValue: '$13,667', type: 'currency', unit: 'MXN/m²' },
    { path: 'valor_por_m2_construccion', label: 'Valor por m² de Construcción', currentValue: '$17,083', type: 'currency', unit: 'MXN/m²' }
  ];

  useEffect(() => {
    if (show && revisionId) {
      loadSugerencias();
    }
  }, [show, revisionId]);

  const loadSugerencias = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let sugerenciasData;
      
      try {
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        sugerenciasData = data.suggestions || [];
        console.log('Sugerencias cargadas del backend:', sugerenciasData);
      } catch (backendError) {
        console.warn('Backend no disponible, usando datos de fallback:', backendError);
        
        // Datos de fallback para desarrollo
        sugerenciasData = [
          {
            id: 1,
            field_path: 'valor_unitario_terreno',
            field_label: 'Valor Unitario Terreno',
            current_value: '$5,667/m²',
            suggested_value: '$6,200/m²',
            comment: 'El valor unitario del terreno está por debajo del promedio de mercado para esta zona. Comparables recientes muestran valores entre $6,000-$6,500/m²',
            reviewer: 'María González - Perito Valuador',
            created_at: '2024-01-15T10:30:00Z',
            status: 'PENDING',
            priority: 'HIGH',
            category: 'VALOR'
          },
          {
            id: 2,
            field_path: 'factor_homologacion',
            field_label: 'Factor Homologación Resultante (F.Ho.Re)',
            current_value: '1.08',
            suggested_value: '1.12',
            comment: 'El factor de homologación resultante no refleja adecuadamente las diferencias en ubicación y servicios. Sugerir revisar factores de zona y ubicación.',
            reviewer: 'Carlos López - Revisor Técnico',
            created_at: '2024-01-14T15:45:00Z',
            status: 'APPROVED',
            response: 'Corrección aplicada tras análisis de comparables y revisión de factores',
            responded_by: 'Admin Técnico',
            responded_at: '2024-01-15T09:00:00Z',
            priority: 'MEDIUM',
            category: 'FACTOR'
          },
          {
            id: 3,
            field_path: 'area_construccion',
            field_label: 'Área de Construcción',
            current_value: '120 m²',
            suggested_value: '125 m²',
            comment: 'Discrepancia en medición. Verificar con planos arquitectónicos y medición en campo. El área parece mayor según documentación.',
            reviewer: 'Ana Martínez - Inspector Campo',
            created_at: '2024-01-13T12:20:00Z',
            status: 'PENDING',
            priority: 'LOW',
            category: 'AREA'
          },
          {
            id: 4,
            field_path: 'clasificacion_construccion',
            field_label: 'Clasificación de Construcción',
            current_value: 'Media Común',
            suggested_value: 'Media Alta',
            comment: 'Los acabados y calidad de materiales corresponden más a clasificación Media Alta. Revisar criterios de clasificación aplicados.',
            reviewer: 'Roberto Díaz - Especialista Construcción',
            created_at: '2024-01-12T16:15:00Z',
            status: 'REJECTED',
            response: 'Después de revisión en sitio, se confirma clasificación Media Común por estado de conservación y acabados estándar',
            responded_by: 'Supervisor Valuación',
            responded_at: '2024-01-14T11:30:00Z',
            priority: 'MEDIUM',
            category: 'CARACTERISTICAS'
          }
        ];
      }
      
      setSugerencias(sugerenciasData);
    } catch (error) {
      console.error('Error al cargar sugerencias:', error);
      setError('Error al cargar las sugerencias');
      Alert.Error({ title: 'Error', text: 'No se pudieron cargar las sugerencias' });
    } finally {
      setLoading(false);
    }
  };

  const enviarSugerencia = async () => {
    if (!mostrarFormularioEspecifico && !nuevaSugerencia.trim()) {
      Alert.Warning({ title: 'Atención', text: 'Por favor, escribe una sugerencia' });
      return;
    }

    if (mostrarFormularioEspecifico && (!campoSeleccionado || !valorSugerido.trim())) {
      Alert.Warning({ title: 'Atención', text: 'Por favor, selecciona un campo y proporciona el valor sugerido' });
      return;
    }

    try {
      setEnviandoSugerencia(true);

      const campoInfo = camposDisponibles.find(c => c.path === campoSeleccionado);
      
      const sugerenciaData = mostrarFormularioEspecifico ? {
        field_path: campoSeleccionado,
        field_label: campoInfo?.label || campoSeleccionado,
        current_value: campoInfo?.currentValue || '',
        suggested_value: valorSugerido,
        comment: comentarioEspecifico,
        priority: prioridadSugerencia,
        category: categoriaSugerencia
      } : {
        field_path: 'general',
        field_label: 'Comentario General',
        current_value: '',
        suggested_value: '',
        comment: nuevaSugerencia,
        priority: 'MEDIUM',
        category: 'OTRO'
      };

      try {
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sugerenciaData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log('Sugerencia enviada:', result);
        Alert.Success({ title: 'Éxito', text: 'Sugerencia enviada correctamente' });
      } catch (backendError) {
        console.warn('Backend no disponible, simulando envío:', backendError);
        Alert.Success({ title: 'Éxito', text: 'Sugerencia enviada correctamente (simulado)' });
      }

      // Limpiar formulario
      setNuevaSugerencia('');
      setCampoSeleccionado('');
      setValorSugerido('');
      setComentarioEspecifico('');
      setPrioridadSugerencia('MEDIUM');
      setCategoriaSugerencia('VALOR');
      
      // Recargar sugerencias
      await loadSugerencias();
      
    } catch (error) {
      console.error('Error al enviar sugerencia:', error);
      Alert.Error({ title: 'Error', text: 'No se pudo enviar la sugerencia' });
    } finally {
      setEnviandoSugerencia(false);
    }
  };

  const togglePanel = (index: number) => {
    setExpandedPanels(prev =>
      prev.includes(index)
        ? prev.filter((i: number) => i !== index)
        : [...prev, index]
    );
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'yellow';
      case 'LOW': return 'green';
      default: return 'blue';
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'VALOR': return 'Valor';
      case 'FACTOR': return 'Factor';
      case 'AREA': return 'Área/Superficie';
      case 'UBICACION': return 'Ubicación';
      case 'CARACTERISTICAS': return 'Características';
      case 'SERVICIOS': return 'Servicios';
      case 'MERCADO': return 'Mercado';
      case 'CALCULO': return 'Cálculo';
      case 'DOCUMENTACION': return 'Documentación';
      case 'OTRO': return 'Otro';
      default: return 'General';
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge style={{ background: '#52c41a' }}>Aprobada</Badge>;
      case 'REJECTED':
        return <Badge style={{ background: '#ff4d4f' }}>Rechazada</Badge>;
      case 'PENDING':
      default:
        return <Badge style={{ background: '#1890ff' }}>Pendiente</Badge>;
    }
  };

  const renderCampoEspecifico = () => {
    const campo = camposDisponibles.find(c => c.path === campoSeleccionado);
    if (!campo) return null;

    return (
      <div style={{ marginTop: 15, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
        <h6 style={{ marginBottom: 10, color: '#333' }}>Campo seleccionado: {campo.label}</h6>
        <div style={{ marginBottom: 10 }}>
          <strong>Valor actual:</strong> {campo.currentValue} {campo.unit && `(${campo.unit})`}
        </div>
        
        <Form.Group>
          <Form.ControlLabel>Valor sugerido *</Form.ControlLabel>
          {campo.type === 'select' && campo.options ? (
            <SelectPicker
              data={campo.options.map(opt => ({ label: opt, value: opt }))}
              value={valorSugerido}
              onChange={(value) => setValorSugerido(value || '')}
              placeholder="Selecciona una opción"
              style={{ width: '100%' }}
            />
          ) : (
            <InputGroup>
              <Input
                value={valorSugerido}
                onChange={setValorSugerido}
                placeholder={`Ingresa el nuevo ${campo.label.toLowerCase()}`}
                type={campo.type === 'number' ? 'number' : 'text'}
              />
              {campo.unit && <InputGroup.Addon>{campo.unit}</InputGroup.Addon>}
            </InputGroup>
          )}
          {campo.validation && (
            <Form.HelpText>
              {campo.validation.min && campo.validation.max && 
                `Rango permitido: ${campo.validation.min} - ${campo.validation.max}`}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Justificación</Form.ControlLabel>
          <Input
            as="textarea"
            rows={3}
            value={comentarioEspecifico}
            onChange={setComentarioEspecifico}
            placeholder="Explica la razón del cambio sugerido..."
          />
        </Form.Group>

        <div style={{ display: 'flex', gap: 15 }}>
          <Form.Group style={{ flex: 1 }}>
            <Form.ControlLabel>Prioridad</Form.ControlLabel>
            <SelectPicker
              data={[
                { label: 'Baja', value: 'LOW' },
                { label: 'Media', value: 'MEDIUM' },
                { label: 'Alta', value: 'HIGH' },
                { label: 'Crítica', value: 'CRITICAL' }
              ]}
              value={prioridadSugerencia}
              onChange={(value) => setPrioridadSugerencia(value as any)}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.ControlLabel>Categoría</Form.ControlLabel>
            <SelectPicker
              data={[
                { label: 'Valor', value: 'VALOR' },
                { label: 'Factor', value: 'FACTOR' },
                { label: 'Área/Superficie', value: 'AREA' },
                { label: 'Ubicación', value: 'UBICACION' },
                { label: 'Características', value: 'CARACTERISTICAS' },
                { label: 'Servicios', value: 'SERVICIOS' },
                { label: 'Mercado', value: 'MERCADO' },
                { label: 'Cálculo', value: 'CALCULO' },
                { label: 'Documentación', value: 'DOCUMENTACION' },
                { label: 'Otro', value: 'OTRO' }
              ]}
              value={categoriaSugerencia}
              onChange={(value) => setCategoriaSugerencia(value as any)}
              style={{ width: '100%' }}
            />
          </Form.Group>
        </div>
      </div>
    );
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Sugerencias de Revisión #{revisionId}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && (
          <Message showIcon type="error" style={{ marginBottom: 15 }}>
            {error}
          </Message>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <p>Cargando sugerencias...</p>
          </div>
        ) : (
          <div>
            {/* Formulario para nueva sugerencia */}
            <Panel header="Nueva Sugerencia" bordered style={{ marginBottom: 20 }}>
              <div style={{ marginBottom: 15 }}>
                <Toggle
                  checked={mostrarFormularioEspecifico}
                  onChange={setMostrarFormularioEspecifico}
                  style={{ marginRight: 10 }}
                />
                <span>{mostrarFormularioEspecifico ? 'Sugerencia específica' : 'Comentario general'}</span>
              </div>

              {mostrarFormularioEspecifico ? (
                <div>
                  <Form.Group>
                    <Form.ControlLabel>Campo a modificar *</Form.ControlLabel>
                    <SelectPicker
                      data={camposDisponibles.map(campo => ({
                        label: `${campo.label} (Actual: ${campo.currentValue}${campo.unit ? ' ' + campo.unit : ''})`,
                        value: campo.path
                      }))}
                      value={campoSeleccionado}
                      onChange={(value) => setCampoSeleccionado(value || '')}
                      placeholder="Buscar campo para modificar..."
                      style={{ width: '100%' }}
                      searchable
                      cleanable={false}
                    />
                  </Form.Group>

                  {campoSeleccionado && renderCampoEspecifico()}
                </div>
              ) : (
                <Form.Group>
                  <Form.ControlLabel>Comentario general</Form.ControlLabel>
                  <Input
                    as="textarea"
                    rows={4}
                    value={nuevaSugerencia}
                    onChange={setNuevaSugerencia}
                    placeholder="Describe tu sugerencia o comentario sobre esta revisión..."
                  />
                </Form.Group>
              )}

              <div style={{ marginTop: 15 }}>
                <Button 
                  appearance="primary" 
                  onClick={enviarSugerencia}
                  loading={enviandoSugerencia}
                >
                  {enviandoSugerencia ? 'Enviando...' : 'Enviar Sugerencia'}
                </Button>
              </div>
            </Panel>

            {/* Lista de sugerencias existentes */}
            <div>
              <h6 style={{ marginBottom: 15, color: '#333' }}>
                Sugerencias Existentes ({sugerencias.length})
              </h6>
              
              {sugerencias.length === 0 ? (
                <Message showIcon type="info">
                  No hay sugerencias para esta revisión
                </Message>
              ) : (
                <div>
                  {sugerencias.map((sugerencia, index) => (
                    <Panel
                      key={sugerencia.id}
                      header={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <div>
                            <strong>{sugerencia.field_label}</strong>
                            <span style={{ marginLeft: 10, fontSize: 12, color: '#666' }}>
                              por {sugerencia.reviewer}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: 5 }}>
                            {sugerencia.priority && (
                              <Badge color={getPriorityColor(sugerencia.priority)}>
                                {sugerencia.priority}
                              </Badge>
                            )}
                            {sugerencia.category && (
                              <Badge color="cyan">
                                {getCategoryLabel(sugerencia.category)}
                              </Badge>
                            )}
                            {getStatusBadge(sugerencia.status)}
                          </div>
                        </div>
                      }
                      collapsible
                      expanded={expandedPanels.includes(index)}
                      onSelect={() => togglePanel(index)}
                      bordered
                      style={{ marginBottom: 10 }}
                    >
                      <div>
                        {sugerencia.current_value && (
                          <div style={{ marginBottom: 10 }}>
                            <strong>Valor actual:</strong> {sugerencia.current_value}
                          </div>
                        )}
                        {sugerencia.suggested_value && (
                          <div style={{ marginBottom: 10 }}>
                            <strong>Valor sugerido:</strong> {sugerencia.suggested_value}
                          </div>
                        )}
                        {sugerencia.comment && (
                          <div style={{ marginBottom: 10 }}>
                            <strong>Comentario:</strong> {sugerencia.comment}
                          </div>
                        )}
                        <div style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
                          Creado: {new Date(sugerencia.created_at).toLocaleString()}
                        </div>
                        {sugerencia.status === 'APPROVED' && sugerencia.response && (
                          <div style={{ marginTop: 10, padding: 10, backgroundColor: '#f0f9ff', borderRadius: 4 }}>
                            <strong>Respuesta:</strong> {sugerencia.response}
                            <div style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
                              Respondido por {sugerencia.responded_by} el {new Date(sugerencia.responded_at!).toLocaleString()}
                            </div>
                          </div>
                        )}
                        {sugerencia.status === 'REJECTED' && sugerencia.response && (
                          <div style={{ marginTop: 10, padding: 10, backgroundColor: '#fff2f0', borderRadius: 4 }}>
                            <strong>Razón del rechazo:</strong> {sugerencia.response}
                            <div style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
                              Rechazado por {sugerencia.responded_by} el {new Date(sugerencia.responded_at!).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </Panel>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={onClose} appearance="primary">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
