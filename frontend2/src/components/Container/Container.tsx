/** @format */

import { ContainerProps } from "./Container.types";
import { Container as Component, Header, Footer, Content, Sidebar, FlexboxGrid, Col } from "rsuite";

export const Container = (props: ContainerProps) => {
	const {
		hasHeader,
		headerChildren,
		justifyHeader,
		hasFooter,
		footerChildren,
		justifyFooter,
		hasSidebar,
		sidebarInside,
		sidebarChildren,
		justifySidebar,
		children,
		justify,
	} = props;

	return (
		<Component>
			{!sidebarInside && hasSidebar && (
				<Sidebar>
					<FlexboxGrid justify={justifySidebar ?? "center"}>
						{sidebarChildren}
					</FlexboxGrid>
				</Sidebar>
			)}
			{hasHeader && (
				<Header>
					<FlexboxGrid justify={justifyHeader ?? "center"}>{headerChildren}</FlexboxGrid>
				</Header>
			)}
			<Content>
				{sidebarInside && hasSidebar && (
					<Sidebar>
						<FlexboxGrid justify={justifySidebar ?? "center"}>
							{sidebarChildren}
						</FlexboxGrid>
					</Sidebar>
				)}
				<FlexboxGrid justify={justify ?? "center"} align="middle">
					<FlexboxGrid.Item as={Col}>{children}</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
			{hasFooter && (
				<Footer>
					<FlexboxGrid justify={justifyFooter ?? "center"}>{footerChildren}</FlexboxGrid>
				</Footer>
			)}
		</Component>
	);
};
