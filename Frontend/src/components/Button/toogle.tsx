/** @format */
import {forwardRef,ElementRef}
import { ToggleButton } from "primereact/togglebutton";
import {ToggleProps} from "./types";
export const Toggle = forwardRef<ElementRef<typeof ToggleButton>, import {ToggleProps} from "./types";
>(({ className, ...props }, ref) => {
    
    <div className="">
        <ToggleButton {...props}/>
    </div>
})