import {ReactNode} from "react";
export interface ISpinnerProps {
    size?: number;
    color?: string;
    className?: string;
    children?: ReactNode | ReactNode[];
    blur?: boolean;
}