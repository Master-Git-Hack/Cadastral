"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertCircle,
	CheckCircle,
	Clock,
	FileText,
	Plus,
	RefreshCw,
	XCircle,
} from "lucide-react";
import {
	useRevisionIntegration,
	type RevisionInfo,
	type RevisionStatus,
} from "@/hooks/useRevisionIntegration";

interface RevisionStatusDisplayProps {
	recordType: "terreno" | "renta";
	recordId: number;
	className?: string;
	showCreateButton?: boolean;
	onRevisionCreated?: () => void;
}

// Configuración de estilos para cada estado
const statusConfig = {
	sin_revision: {
		label: "Sin Revisión",
		badge: "secondary",
		icon: FileText,
		color: "text-gray-500",
		bgColor: "bg-gray-50",
	},
	en_revision: {
		label: "En Revisión",
		badge: "default",
		icon: Clock,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	revisado: {
		label: "Revisado",
		badge: "default",
		icon: CheckCircle,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	rechazado: {
		label: "Rechazado",
		badge: "destructive",
		icon: XCircle,
		color: "text-red-600",
		bgColor: "bg-red-50",
	},
} as const;

/**
 * Componente para mostrar el estado de revisiones de un registro de homologación
 */
export function RevisionStatusDisplay({
	recordType,
	recordId,
	className = "",
	showCreateButton = true,
	onRevisionCreated,
}: RevisionStatusDisplayProps) {
	const [isCreatingRevision, setIsCreatingRevision] = useState(false);

	const {
		revisionInfo,
		isLoading,
		error,
		refreshRevisionStatus,
		createRevision,
		hasPermissionToReview,
	} = useRevisionIntegration({
		recordType,
		recordId,
		enabled: recordId > 0,
	});

	const handleCreateRevision = async () => {
		if (isCreatingRevision) return;

		setIsCreatingRevision(true);
		try {
			await createRevision();
			onRevisionCreated?.();
		} catch (err) {
			console.error("Error creando revisión:", err);
		} finally {
			setIsCreatingRevision(false);
		}
	};

	const handleRefresh = async () => {
		await refreshRevisionStatus();
	};

	if (!revisionInfo || recordId === 0) {
		return null;
	}

	const config = statusConfig[revisionInfo.status];
	const Icon = config.icon;

	return (
		<Card
			className={`${className} ${config.bgColor} border-l-4 border-l-current`}
		>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon className={`h-5 w-5 ${config.color}`} />
						<CardTitle className="text-lg">Estado de Revisión</CardTitle>
						<Badge variant={config.badge as any}>{config.label}</Badge>
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleRefresh}
							disabled={isLoading}
							className="h-8 w-8 p-0"
						>
							<RefreshCw
								className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
							/>
						</Button>

						{showCreateButton &&
							!revisionInfo.hasRevisions &&
							hasPermissionToReview && (
								<Button
									variant="outline"
									size="sm"
									onClick={handleCreateRevision}
									disabled={isCreatingRevision}
									className="text-xs"
								>
									<Plus className="h-3 w-3 mr-1" />
									{isCreatingRevision ? "Creando..." : "Nueva Revisión"}
								</Button>
							)}
					</div>
				</div>

				<CardDescription>
					{recordType === "terreno" ? "Terreno" : "Renta"} #{recordId}
				</CardDescription>
			</CardHeader>

			<CardContent>
				{error && (
					<div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded mb-3">
						<AlertCircle className="h-4 w-4" />
						<span className="text-sm">Error: {error}</span>
					</div>
				)}

				{revisionInfo.hasRevisions ? (
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4 text-sm">
							<div className="text-center">
								<div className="font-semibold text-blue-600">
									{revisionInfo.pendingCount}
								</div>
								<div className="text-gray-500">Pendientes</div>
							</div>

							<div className="text-center">
								<div className="font-semibold text-green-600">
									{revisionInfo.completedCount}
								</div>
								<div className="text-gray-500">Completadas</div>
							</div>

							<div className="text-center">
								<div className="font-semibold text-red-600">
									{revisionInfo.rejectedCount}
								</div>
								<div className="text-gray-500">Rechazadas</div>
							</div>
						</div>

						{revisionInfo.lastReviewDate && (
							<div className="pt-2 border-t text-xs text-gray-600">
								<div>
									Última revisión:{" "}
									{new Date(revisionInfo.lastReviewDate).toLocaleDateString()}
								</div>
								{revisionInfo.reviewer && (
									<div>Por: {revisionInfo.reviewer}</div>
								)}
							</div>
						)}
					</div>
				) : (
					<div className="text-sm text-gray-600 py-2">
						Este registro no tiene revisiones asociadas
					</div>
				)}

				{revisionInfo.hasRevisions && revisionInfo.id && (
					<div className="pt-3 border-t mt-3">
						<Button
							variant="outline"
							size="sm"
							className="w-full text-xs"
							onClick={() => {
								// Navegar a la página de revisión
								if (typeof window !== "undefined") {
									window.open(`/revisiones/${revisionInfo.id}`, "_blank");
								}
							}}
						>
							<FileText className="h-3 w-3 mr-1" />
							Ver Detalles de Revisión
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

/**
 * Componente más compacto para mostrar solo el badge de estado
 */
export function RevisionStatusBadge({
	recordType,
	recordId,
	className = "",
}: Omit<RevisionStatusDisplayProps, "showCreateButton" | "onRevisionCreated">) {
	const { revisionInfo, isLoading } = useRevisionIntegration({
		recordType,
		recordId,
		enabled: recordId > 0,
	});

	if (isLoading || !revisionInfo || recordId === 0) {
		return null;
	}

	const config = statusConfig[revisionInfo.status];
	const Icon = config.icon;

	return (
		<Badge variant={config.badge as any} className={`${className} gap-1`}>
			<Icon className="h-3 w-3" />
			{config.label}
		</Badge>
	);
}

export default RevisionStatusDisplay;
