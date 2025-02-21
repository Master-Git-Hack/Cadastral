/** @format */

import type { ColumnDef } from "@tanstack/react-table";

export interface IMetaTable {
	db_name: string;
	table_name: string;
	schema_name: string;
	title: string;
	purpose: string;
	abstract: string;
	username: string;
	update_date: string;
	version: number;
	[key: string]: any;
}
export const columns: ColumnDef<IMetaTable>[] = [
	{
		accessorKey: "db_name",
		header: "Nombre de la Base de Datos",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "table_name",
		header: "Nombre de la Tabla",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "schema_name",
		header: "Nombre del Esquema",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "title",
		header: "Título",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "purpose",
		header: "Propósito",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "abstract",
		header: "Resumen",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "username",
		header: "Usuario",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "version",
		header: "Versión",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
	{
		accessorKey: "update_date",
		header: "Fecha de Actualización",
		cell: (info) => info.getValue(),
		enableSorting: true, // Enable sorting for this column
	},
];
