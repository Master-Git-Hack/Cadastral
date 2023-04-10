/** @format */

import { useState, useEffect, useMemo } from "react";

export const useFactors = ({ name, tag, position, options, record = undefined }: any) => {
	const template = (id: number) => ({ id, ...options[0], result: 1 });
	const [state, setState] = useState(
		record ?? {
			name,
			tag,
			position,
			subject: options[0],
			data: [template(1)],
		},
	);
	const data = useMemo(
		() =>
			state.data.map((item: any, index: number) => ({
				...item,
				id: index + 1,
				result: state.subject.value / item.value ?? 1,
			})),
		[state.data, state.subject],
	);
	useEffect(() => setState((state: any) => ({ ...state, data })), [data]);
	const push = () =>
		setState(({ data, ...state }: any) => ({
			...state,
			data: [...data, template(data.length + 1)],
		}));
	const pop = () =>
		setState(({ data, ...state }: any) => ({
			...state,
			data: data.slice(0, data.length > 1 ? data.length - 1 : 1),
		}));
	const popID = (id: number) =>
		setState(({ data, ...state }: any) => ({
			...state,
			data: data.filter((item: any) => item.id !== id),
		}));
	const set: any = {
		data: {
			object: (id: number, value: any) =>
				setState(({ data, ...state }: any) => ({
					...state,
					data: data.map((item: any) => (item.id === id ? { ...item, ...value } : item)),
				})),
			values: (id: number, key: string, value: any) =>
				setState(({ data, ...state }: any) => ({
					...state,
					data: data.map((item: any) =>
						item.id === id ? { ...item, [key]: value } : item,
					),
				})),
		},
		subject: (value: any) =>
			setState((state: any) => ({
				...state,
				subject: options.find((item: any) => item.value === value),
			})),
	};

	return { state, push, pop, popID, set };
};
