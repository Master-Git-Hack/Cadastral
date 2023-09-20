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
			query: (body) => ({
				url: `checklist/create`,
				method: "POST",
				body,
			}),
		}),
		createRevision: mutation<unknown, unknown>({
			query: (body) => ({
				url: `revisiones/create`,
				method: "POST",
				body,
			}),
		}),
		updateChecklist: mutation<unknown, unknown>({
			query: ({ id, body }) => ({
				url: `checklist/${id}`,
				method: "PATCH",
				body,
			}),
		}),
		updateRevision: mutation<unknown, unknown>({
			query: ({ id, body }) => ({
				url: `revisiones/${id}`,
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const { useGetAllChecklistMutation } = RevisionesAvaluosApi;
