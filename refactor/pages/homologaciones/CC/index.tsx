/** @format */

import { NextPage } from "next";
import { useRouter } from "next/router";
export default function CostosConstruccion(): NextPage {
	const { query } = useRouter();
	console.log(query);
	return <>s</>;
}
