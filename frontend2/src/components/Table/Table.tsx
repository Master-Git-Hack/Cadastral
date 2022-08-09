/** @format */

import { TableComponent, TableProps } from "./Table.types";

const className = (props: TableProps): string =>
	`align-self-middle align-middle justify-content-center align-items-center justify-content-sm-center text-center ${
		props.className
	} table-${props.type ?? "light"}`;

export const Container = (props: TableProps): JSX.Element => (
	<table
		className={`table table-sm table-responsive table-responsive-sm table-striped table-hover align-self-middle align-middle justify-content-center justify-content-sm-center text-center align-items-center ${
			props.className ?? "table-bordered"
		}`}
	>
		{props.children}
	</table>
);
export const Header = (props: TableProps): JSX.Element => (
	<thead className={className(props)}>{props.children}</thead>
);
export const Body = (props: TableProps): JSX.Element => (
	<tbody className={className(props)}>{props.children}</tbody>
);
export const Footer = (props: TableProps): JSX.Element => (
	<tfoot className={className(props)}>{props.children}</tfoot>
);
export const Component = (props: TableComponent): JSX.Element => {
	const { name, header, customHeader, body, customBody, footer, customFooter, hasFooter } = props;
	return (
		<Container>
			<Header>
				{customHeader ?? (
					<tr>
						{header &&
							header.map((item: string, index: number) => (
								<th key={`table header component for ${name} ${index}`}>{item}</th>
							))}
					</tr>
				)}
			</Header>
			<Body>
				{customBody ??
					(body &&
						body.map((item: any, index: number) => (
							<tr key={`table body component for ${name} ${index}`}>
								{item.map((subItem: any, indx: number) => (
									<td key={`table body component for ${name} ${index} ${indx}`}>
										{subItem}
									</td>
								))}
							</tr>
						)))}
			</Body>
			{hasFooter && (
				<Footer>
					{customFooter ??
						(footer && (
							<tr>
								{footer.map((item: any, index: number) => (
									<td key={`table footer component for ${name} ${index}`}>
										{item}
									</td>
								))}
							</tr>
						))}
				</Footer>
			)}
		</Container>
	);
};
export const Table = { Container, Header, Body, Footer, Component };
