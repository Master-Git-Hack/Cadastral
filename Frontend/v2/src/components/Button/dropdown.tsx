/** @format */

import { forwardRef, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { variants, aligns, DropdownButtonProps } from "./types";
import { cn } from "@utils/ui";
import { Button } from "flowbite-react";

import { OverlayPanel } from "primereact/overlaypanel";
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
		const panel = useRef(null);
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div className={cn("grid w-fit h-fit p-1 w-full", aligns({ align }))}>
				<Button
					ref={ref}
					{...props}
					color="light"
					pill
					onClick={(e) => panel.current.toggle(e)}
				>
					<div
						className="flex  items-center justify-center justify-between "
						data-dropdown-toggle="dropdown"
					>
						<div className="mr-1 capitalize">{children}</div>
						<div className="fill-current">
							<svg
								className={`relative top-[1px] ml-1 h-3 w-3 transform transition-transform duration-300
								 ${isOpen ? "rotate-180" : ""}`}
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
				</Button>
				<OverlayPanel
					onShow={() => setIsOpen(true)}
					onHide={() => setIsOpen(false)}
					ref={panel}
					dismissable
					pt={{
						root: {
							className: "bg-white dark:bg-gray-800",
						},
					}}
				>
					<ul
						role="list"
						className="pmy-2 text-sm text-gray-700 dark:text-gray-200 w-full divide-y divide-slate-200"
						aria-labelledby={id}
					>
						{options?.map(
							(
								{ value, label, icon, iconPosition = "left", color = "black" },
								index,
							) => (
								<li
									key={`id-${index}-${id}`}
									className="px-3 py-2 cursor-pointer hover:bg-slate-100 
									dark:odd:bg-slate-800 dark:even:bg-slate-700
									dark:text-white dark:hover:bg-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-200"
									onClick={() => {
										onClick(value);
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
				</OverlayPanel>
			</div>
		);
	},
);
Dropdown.displayName = "Dropdown";
export default Dropdown;
