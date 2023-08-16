/** @format */

import { forwardRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { variants, aligns, DropdownButtonProps } from "./types";
import { cn } from "@utils/ui";

export const Dropdown = forwardRef<HTMLButtonElement, DropdownButtonProps>(
	(
		{
			className,
			variant,
			size,
			rounded,
			align,
			children,
			options,
			id = uuidv4(),
			onClick,
			...props
		}: DropdownButtonProps,
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(false); // Add state for open/closed

		const toggleDropdown = () => {
			setIsOpen((prevState) => !prevState && options !== undefined); // Toggle state
		};
		return (
			<div className={cn("grid w-fit h-fit p-1 w-full", aligns({ align }))}>
				<button
					id={id}
					ref={ref}
					className={cn(
						variants({ variant, size, rounded, align }),
						className + " w-fit h-fit rounded-lg",
					)}
					data-dropdown-toggle="dropdown"
					onClick={toggleDropdown}
					{...props}
				>
					<div
						className="flex justify-center justify-between "
						data-dropdown-toggle="dropdown"
					>
						<div className="mr-1 capitalize">{children}</div>
						<div className="fill-current">
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
						`flex  w-44   bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600 ${
							isOpen ? "block" : "hidden"
						}`,
						aligns({ align }),
					)}
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full"
						aria-labelledby={id}
					>
						{options?.map(
							(
								{ value, label, icon, iconPosition = "left", color = "black" },
								index,
							) => (
								<li
									key={`id-${index}-${id}`}
									className="px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
									onClick={() => {
										onClick(value);
										toggleDropdown();
									}}
								>
									<p
										className={`grid grid-rows-1  grid-flow-col justify-items-stretch gap-2 text-${color}-600`}
									>
										<span className="justify-self-start">
											{iconPosition === "left" && icon}
										</span>
										<span
											className={
												iconPosition !== "left"
													? "justify-self-start"
													: "justify-self-end"
											}
										>
											{label}
										</span>

										<span className="justify-self-end">
											{iconPosition === "right" && icon}
										</span>
									</p>
								</li>
							),
						)}
					</ul>
				</div>
			</div>
		);
	},
);
Dropdown.displayName = "Dropdown";
export default Dropdown;
