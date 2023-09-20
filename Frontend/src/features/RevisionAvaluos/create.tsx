/** @format */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import { ToggleSwitch } from "flowbite-react";
import Requirements from "./requirements";
export default function Create() {
	const { type } = useParams();
	const [value, setValue] = useState(false);

	return (
		<div className="flex inline-flex">
			<Requirements options={{ antecedentes: <>test</> }}>
				<div className="w-96">
					<ToggleSwitch
						label={
							value ? (
								<span className="pi pi-check text-emerald-500 border-emerald-200" />
							) : (
								<span className="pi pi-times text-rose-500 border-rose-500" />
							)
						}
						checked={value}
						onChange={() => setValue(!value)}
					/>
				</div>
			</Requirements>
		</div>
	);
}
