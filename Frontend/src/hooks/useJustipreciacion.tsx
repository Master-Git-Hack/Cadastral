/** @format */
import { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { load, getState } from "../redux/Justipreciacion";
import { useAppDispatch, useAppSelector } from "../redux/app";
export const useJustipreciacion = () => {
	const state = useAppSelector(getState);
	const dispatch = useAppDispatch();
	const { query } = useRouter();
	const queries = useMemo(() => query, [query]);
	useEffect(() => {}, [queries]);
	return { queries };
};
