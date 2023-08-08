/** @format */

import { InputMask } from "primereact/inputmask";
import { MaskProps, BASE_STYLE } from "./types";
import { ElementRef, forwardRef } from "react";

import { cn } from "@utils/ui";

export const Mask = forwardRef<ElementRef<typeof InputMask>, MaskProps>(
	({ className, ...props }, ref) => {
		return <InputMask className={cn(BASE_STYLE, className)} ref={ref} {...props} />;
	},
);
Mask.displayName = "Mask";

export default Mask;
