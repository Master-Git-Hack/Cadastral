/** @format */
export interface TitleProps {
	name: string;
	colSpan?: number;
	title?: string;
}
export interface AgeContainerProps {
	type: "TERRENO" | "RENTA";
}
export const Title = ({ name, colSpan, title }: TitleProps) => (
	<tr>
		<th colSpan={colSpan ?? 4}>{title ?? `FACTOR POR ${name.toUpperCase()}`}</th>
	</tr>
);

export interface CommonProps {
	name: string;
}

export interface ContainerProps {
	components: Array<string>;
}
export interface HeaderProps {
	name: string;
	isAge?: boolean;
}

export const Header = ({ name, isAge }: HeaderProps) => (
	<tr>
		<td>#</td>
		<td>
			<div
				className={
					isAge ? "bg-warning bg-opacity-75 text-white" : "d-inline p-2 text-bg-dark"
				}
			>
				<strong>{name.toUpperCase()} </strong>
			</div>
		</td>
		{!isAge && <td>Calificación</td>}
		<td rowSpan={!isAge ? 2 : 1}>Factores</td>
	</tr>
);