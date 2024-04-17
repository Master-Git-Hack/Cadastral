/** @format */

import { forwardRef } from "react";
import { variantsArea, AreaProps } from "./types";
import { cn } from "@utils/ui";
export const Area = forwardRef<HTMLTextAreaElement, AreaProps>(
	({ className, variant, size, rounded, validation, ...props }, ref) => (
		<textarea
			ref={ref}
			{...props}
			className={cn(
				variantsArea({ variant, size, rounded, validation }),
				className + " w-full rounded-md",
			)}
		/>
	),
);
Area.displayName = "TextArea";
export default Area;
