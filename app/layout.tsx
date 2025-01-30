/** @format */

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import { PrimeReactProvider } from "primereact/api";
//theme
import "primereact/resources/themes/tailwind-light/theme.css";
import "primeicons/primeicons.css";
//core
import "primereact/resources/primereact.min.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dirección General de Recursos Materiales, Servicios Generales y Catastro",
	description:
		"Modulos desarrollados para el uso de la Dirección General de Recursos Materiales, Servicios Generales y Catastro por parte del departamento de plataformas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<PrimeReactProvider>{children}</PrimeReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
