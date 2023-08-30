/** @format */

import { forwardRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { variants, SelectProps } from "./types";
import { cn } from "@utils/ui";
import { Tooltip } from "flowbite-react";

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
	(
		{
			className,
			variant,
			size,
			rounded,
			options,
			id = uuidv4(),
			onClick,
			...props
		}: SelectProps,
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(false); // Add state for open/closed
		const [selected, setSelected] = useState<string>(""); // Add state for open/closed
		const [currentTooltip, setCurrentTooltip] = useState<string>(""); // Add state for open/closed
		const [currentOptions] = useState(options);
		const toggleDropdown = () => {
			setIsOpen((prevState) => !prevState && options !== undefined); // Toggle state
		};
		return (
			<div className={cn("grid w-fit h-fit p-1 w-full")}>
				<button
					id={id}
					ref={ref}
					className={cn(
						variants({ variant, size, rounded }),
						className + " w-full h-fit rounded-lg ",
					)}
					data-dropdown-toggle="dropdown"
					onClick={toggleDropdown}
					{...props}
				>
					<div
						className="flex justify-center justify-between "
						data-dropdown-toggle="dropdown"
					>
						<div className="flex mr-1 capitalize">
							<span
								className="text-left underline text-gray-500 dark:text-gray-400"
								onClick={() => {
									setSelected("");
									setCurrentTooltip("");
								}}
							>
								Seleccione:
							</span>
							<span className="border-r-2 mx-2 shadow-inner" />
							<Tooltip content={currentTooltip}>
								<span className="text-center font-semibold">{selected}</span>
							</Tooltip>
						</div>

						<div className="fill-current ">
							<svg
								className={`relative top-[1px] ml-1 h-3 w-3 transform transition-transform duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</div>
					</div>
				</button>
				<div
					id={`dropdown-${id}`}
					className={cn(
						`flex  w-44   bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600  ${
							isOpen ? "block fixed w-5/12 mt-10" : "hidden"
						}`,
					)}
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full  list-none  shadow-lg bg-white relative  "
						aria-labelledby={id}
					>
						{currentOptions?.map(({ value, label, tooltip }, index) => (
							<li
								key={`id-${index}-${id}`}
								className="px-3 py-2 cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-800 ml-6 hover:list-decimal"
								onClick={() => {
									setSelected(label);
									setCurrentTooltip(tooltip ?? "");
									toggleDropdown();
									onClick(value ?? index + 1);
								}}
							>
								<Tooltip
									content={tooltip}
									placement="auto"
									className="mx-5"
									trigger="hover"
								>
									<p
										className={`grid grid-rows-1  grid-flow-col justify-items-stretch gap-2 w-full`}
									>
										<span className="justify-self-start">
											{tooltip && <></>}
											{label}
										</span>
									</p>
								</Tooltip>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
);
Select.displayName = "Select";
export default Select;
