/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";

export const RevisionesAvaluosApi = createApi({
	reducerPath: "RevisionesAvaluos",
	baseQuery,
	endpoints: ({ mutation }) => ({
		getAllChecklist: mutation<unknown, null>({
			query: () => ({
				url: `checklist/all`,
				method: "GET",
			}),
		}),
		getAllRevisions: mutation<unknown, null>({
			query: () => ({
				url: `revisiones/all`,
				method: "GET",
			}),
		}),
		getChecklist: mutation<unknown, { id: number }>({
			query: ({ id }) => ({
				url: `checklist/${id}`,
				method: "GET",
			}),
		}),
		getRevision: mutation<unknown, { id: number }>({
			query: ({ id }) => ({
				url: `revisiones/${id}`,
				method: "GET",
			}),
		}),
		createChecklist: mutation<unknown, unknown>({
			query: (data) => ({
				url: `checklist/create`,
				method: "POST",
				data,
			}),
		}),
		createRevision: mutation<unknown, unknown>({
			query: (data) => ({
				url: `revisiones/create`,
				method: "POST",
				data,
			}),
		}),
		updateChecklist: mutation<unknown, unknown>({
			query: ({ id, data }) => ({
				url: `checklist/${id}`,
				method: "PATCH",
				data,
			}),
		}),
		updateRevision: mutation<unknown, unknown>({
			query: ({ id, data }) => ({
				url: `revisiones/${id}`,
				method: "PATCH",
				data,
			}),
		}),
	}),
});

export const { useGetAllChecklistMutation } = RevisionesAvaluosApi;
