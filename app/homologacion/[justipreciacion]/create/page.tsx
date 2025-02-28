'use client';
import { Suspense,Fragment } from "react"
import Spinner from "@/components/ui/spinner"
import Error from "@/components/error"
import { useSearchParams } from "next/navigation";
import Layout from "@/components/navbar/index";
export const Homologacion = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "1";
    const useLegacy = searchParams.get("legacy") === "true";
    const user = searchParams.get("user");
    if (useLegacy && user===null){
        return <Error message="Usuario no encontrado" />
    }
	const Component = useLegacy ? Fragment : Layout;

	return (
		<Component>
			<>test</>
		</Component>
	);
}
export default function CreateHomologacion() {
    return (
            <Suspense fallback={<Spinner />}>
                <Homologacion />
            </Suspense>
    )
};