/** @format */

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { asFancyNumber, formatNumb } from ".@/utils/number";

import { Title, Header } from "./table";

const Body = ({ options, data, subject, name, tag }: BodyProps) => {
	// const dispatch = useAppDispatch();
	return (
		<>
			<Header name={tag} />
			<tr className="table-warning">
				<td>SUJETO</td>
				<td style={{ minWidth: 150 }}>
					<div className="p-1">
						<Select
							label={subject.label}
							value={subject.value}
							defaultValue={subject}
							onChange={({ currentTarget: { value } }) =>
								dispatch(
									updateCommonSubject({
										key: name,
										value: searchByValue(options, Number(value)),
									}),
								) && dispatch(updateFactors())
							}
							data={options}
							className="bg-warning bg-opacity-25 text-center"
						/>
					</div>
				</td>
				<td>{asFancyNumber(subject.value)}</td>
			</tr>
			{data.map(({ id, label, value, result }: any, index: number) => (
				<tr key={`table for age factor ${index}`}>
					<td>C{id}</td>
					<td>
						<Select
							index={index}
							label={label}
							value={value}
							defaultValue={value}
							onChange={({ currentTarget: { value } }) => {
								const target = searchByValue(options, Number(value));

								dispatch(
									updateCommonData({
										index,
										key: name,
										value: {
											...target,
											result: formatNumb(subject.value / target.value),
										},
									}),
								);
								dispatch(updateFactors());
							}}
							data={options}
						/>
					</td>
					<td>{asFancyNumber(value)}</td>
					<td>{asFancyNumber(result)}</td>
				</tr>
			))}
		</>
	);
};
export const Common = (props: any) => {
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const { data, subject, name } = factors[props.name];
	const { options } = handlers[props.name];

	return (
		<Component
			name={props.name}
			customHeader={<Title name={name} />}
			customBody={
				<Body
					tag={name}
					name={props.name}
					data={data}
					subject={subject}
					options={options}
				/>
			}
		/>
	);
};
