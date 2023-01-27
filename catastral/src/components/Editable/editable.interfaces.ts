import { ChangeEventHandler } from "react";

export interface Input {

	helpText?: string;
    editing: boolean
    color?: 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | string;
    disabled?: boolean;
    error?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    size?: "small" | "medium" | string;
    variant?: 'filled'
    | 'outlined'
    | 'standard';
    loading?: boolean;
}