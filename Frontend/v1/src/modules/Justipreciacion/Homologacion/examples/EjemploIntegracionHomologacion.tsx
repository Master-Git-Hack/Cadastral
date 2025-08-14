import React from 'react';
import HomologacionRevisionControl from '../components/HomologacionRevisionControl';

interface HomologacionPageProps {
  // Ejemplo de props que podría recibir una página de homologación
  recordType: 'TERRENO' | 'RENTA';
  recordId: number;
  justipreciacionId: number;
}

/**
 * Ejemplo de cómo integrar el control de revisiones en una página de homologación existente
 */
export const EjemploIntegracionHomologacion: React.FC<HomologacionPageProps> = ({
  recordType,
  recordId,
  justipreciacionId
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Homologación de {recordType}</h1>
      
      {/* Integrar el control de revisiones al inicio de la página */}
      <HomologacionRevisionControl
        recordType={recordType}
        recordId={recordId}
        justipreciacionId={justipreciacionId}
        enabled={true}
      />
      
      {/* Aquí iría el contenido existente de la homologación */}
      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h2>Datos de Homologación</h2>
        <p>Aquí se mostraría el formulario de homologación existente...</p>
        
        {/* Ejemplo de información */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div>
            <label>Tipo:</label>
            <div>{recordType}</div>
          </div>
          <div>
            <label>ID del Registro:</label>
            <div>{recordId}</div>
          </div>
          <div>
            <label>ID de Justipreciación:</label>
            <div>{justipreciacionId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ejemplo de uso en una ruta
export const ExampleUsage = () => {
  // Estos valores normalmente vendrían de los parámetros de la ruta o el estado de la aplicación
  const recordType: 'TERRENO' | 'RENTA' = 'TERRENO';
  const recordId = 171; // ID del terreno/renta
  const justipreciacionId = 388; // ID de la justipreciación

  return (
    <EjemploIntegracionHomologacion
      recordType={recordType}
      recordId={recordId}
      justipreciacionId={justipreciacionId}
    />
  );
};
