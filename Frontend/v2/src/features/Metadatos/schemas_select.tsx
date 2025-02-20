/** @format */
"use client";
import { forwardRef, useState } from "react";
import Select from "@components/Input/select";
import { useGetSchemasQuery } from "@redux-api/Schemas/index";
import { SchemasProps } from "./types";

export const SchemaSelect = forwardRef<HTMLDivElement, SchemasProps>(
	({ schema_name, table_name, db, currentSchema }, ref) => {
		const { data, isLoading, isError, error } = useGetSchemasQuery(db);
		const { schemas, tables } = data?.data;
		console.log(schemas, tables);

		const [current] = useState<string>(currentSchema ?? schemas[0]?.value);
		const [options] = useState(tables[current]);
		return (
			<div ref={ref}>
				<div className="flex inline-flex  w-full py-1">
					<label className="text-start w-6/12 ">Nombre del Schema</label>
					<Select
						variant="outline"
						className="w-12"
						size="sm"
						onClick={schema_name}
						options={schemas}
					/>
				</div>
				<div className="flex inline-flex  w-full py-1">
					<label className="text-start w-6/12 ">Nombre de la Tabla</label>
					<Select
						variant="outline"
						className="w-12"
						size="sm"
						onClick={table_name}
						options={options}
					/>
				</div>
			</div>
		);
	},
);
SchemaSelect.displayName = "SchemaSelect";
export default SchemaSelect;
