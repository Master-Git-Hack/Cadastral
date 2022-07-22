/** @format */

import { Table, Header, Body, Footer } from "./Table";

export const TableComponent = (props: {
	name: string;
	header: string[];
	customHeader?: JSX.Element;
	body: any[];
	customBody?: JSX.Element;
	footer?: string[];
	customFooter?: JSX.Element;
	hasFooter?: boolean;
}) => {
	const { name, header, customHeader, body, customBody, footer, customFooter, hasFooter } = props;
	return (
		<Table>
			<Header>
				{customHeader !== undefined ? (
					customHeader
				) : (
					<tr>
						{header.map((item: string, index: number) => (
							<th key={`table header component for ${name} ${index}`}>{item}</th>
						))}
					</tr>
				)}
			</Header>
			<Body>
				{customBody !== undefined
					? customBody
					: body.map((item: any, index: number) => (
							<tr key={`table body component for ${name} ${index}`}>
								{item.map((subItem: any, indx: number) => (
									<td key={`table body component for ${name} ${index} ${indx}`}>
										{subItem}
									</td>
								))}
							</tr>
					  ))}
			</Body>
			{hasFooter !== undefined && hasFooter && (
				<Footer>
					{customFooter !== undefined && customFooter}
					{footer !== undefined &&
						footer.map((item: any, index: number) => (
							<tr key={`table footer component for ${name} ${index}`}>{item}</tr>
						))}
				</Footer>
			)}
		</Table>
	);
};
