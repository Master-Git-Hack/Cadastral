/** @format */
import { StepperProps, Items, Label, Icon } from "./types";
import { forwardRef, useState } from "react";
import { cn } from "@utils/ui";
import { Tooltip } from "flowbite-react";
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
	({ items, activeIndex, onClick, className }) => {
		const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
		return (
			<ol className={cn("flex items-center w-full mx-10", className)}>
				{items.map(({ label: { children: labelChildren }, icon }: Items, index: number) => (
					<li
						key={`${labelChildren}-${index}`}
						data-tooltip-target="tooltip-light"
						data-tooltip-style="light"
						className={`flex w-full items-center  cursor-pointer ${
							items.length - 1 === index
								? ""
								: "after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block "
						} ${
							index === currentIndex
								? "text-blue-600 dark:text-blue-500 font-bold after:border-blue-100 dark:after:border-blue-800"
								: "text-gray-500 dark:text-gray-400"
						}`}
						onClick={() => {
							setCurrentIndex(index);
							onClick(index);
						}}
					>
						<Tooltip content={index !== currentIndex ? labelChildren : index + 1}>
							<span
								className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
									index === currentIndex
										? "bg-blue-100 dark:bg-blue-800"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<span
									className={`flex items-center justify-center w-8 h-8  rounded-full shrink-0 dark:border-blue-500 text-center ${
										index === currentIndex ? "text-xs font-light z-0" : ""
									}`}
								>
									{index === currentIndex ? labelChildren : index + 1}
								</span>
							</span>
						</Tooltip>
					</li>
				))}
			</ol>
		);
	},
);
Stepper.displayName = "Stepper";
export default Stepper;
