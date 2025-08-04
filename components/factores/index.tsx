/** @format */

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CommonFactor,
  ClassificationFactor,
  TypeFormFactor,
  UsageFactor,
  TopographyFactor,
  BuildingFactor,
  QualityFactor,
  LevelFactor,
  ProjectFactor
} from "./common-factor";
import { AgeFactor } from "./age-factor";
import { LocationFactor, ZoneFactor } from "./symbol-factor";
import { FactorSelector } from "./factor-selector";
import type { AgeContainerProps, CompilationProps } from "@/store/factores/types";

// Contenedor para edad y zona
export const AgeContainer: React.FC<AgeContainerProps> = ({ type }: { type: "TERRENO" | "RENTA" }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {type !== "TERRENO" && (
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-2xl">
              <AgeFactor />
            </div>
          </div>
        )}
      </div>
      
      <ZoneFactor />
    </div>
  );
};

// Contenedor para factores comunes en grid
interface CommonContainerProps {
  components: string[];
}

const CommonContainer: React.FC<CommonContainerProps> = ({ components }: { components: string[] }) => {
  const getComponent = (componentName: string) => {
    switch (componentName) {
      case "Classification":
        return <ClassificationFactor />;
      case "TypeForm":
        return <TypeFormFactor />;
      case "Usage":
        return <UsageFactor />;
      case "Topography":
        return <TopographyFactor />;
      case "Building":
        return <BuildingFactor />;
      case "Quality":
        return <QualityFactor />;
      case "Level":
        return <LevelFactor />;
      case "Project":
        return <ProjectFactor />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {components.map((component: string) => (
        <div key={component}>
          {getComponent(component)}
        </div>
      ))}
    </div>
  );
};

// Contenedor para símbolos/zona
interface SymbolContainerProps {
  name: "Location" | "Zone";
}

const SymbolContainer: React.FC<SymbolContainerProps> = ({ name }: { name: "Location" | "Zone" }) => (
  <div className="w-full">
    {name === "Location" ? <LocationFactor /> : <ZoneFactor />}
  </div>
);

// Componente principal de compilación de factores
export const Compilation: React.FC<CompilationProps> = ({ type }: { type: "TERRENO" | "RENTA" }) => {
  return (
    <div className="space-y-8">
      {/* Factores básicos */}
      <CommonContainer components={["Classification", "TypeForm"]} />
      
      {/* Factor de ubicación */}
      <SymbolContainer name="Location" />
      
      {/* Factores de terreno */}
      <CommonContainer components={["Usage", "Topography"]} />
      
      {/* Factores de construcción */}
      <CommonContainer components={["Building", "Quality"]} />
      
      {/* Factores específicos para RENTA */}
      {type === "RENTA" && (
        <CommonContainer components={["Level", "Project"]} />
      )}
    </div>
  );
};

// Exportar todos los componentes principales
export const Factores = {
  AgeFactor,
  AgeContainer,
  CommonFactor,
  LocationFactor,
  ZoneFactor,
  Compilation,
  FactorSelector,
  
  // Factores específicos
  ClassificationFactor,
  TypeFormFactor,
  UsageFactor,
  TopographyFactor,
  BuildingFactor,
  QualityFactor,
  LevelFactor,
  ProjectFactor,
};
