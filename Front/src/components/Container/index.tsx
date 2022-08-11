/** @format */

import { Container as Component, Header, Content, Footer, Sidebar } from "rsuite";
import { ContainerProps } from "./index.types";

export const Container = ({ children, header, footer, sidebar }: ContainerProps): JSX.Element => {
	const SideBar = (): JSX.Element => (
		<>{sidebar !== undefined && <Sidebar>{sidebar.children}</Sidebar>}</>
	);
	const position = sidebar?.position ?? "right";
	return (
		<Component>
			{sidebar?.outside && position.includes("right") && <SideBar />}

			{header !== undefined && <Header>{header}</Header>}
			<Content>
				{sidebar?.outside !== undefined &&
					!sidebar?.outside &&
					position.includes("right") && <SideBar />}
				{children}
				{sidebar?.outside !== undefined &&
					!sidebar?.outside &&
					position.includes("left") && <SideBar />}
			</Content>
			{footer !== undefined && <Footer>{footer}</Footer>}
			{sidebar?.outside && position.includes("left") && <SideBar />}
		</Component>
	);
};
