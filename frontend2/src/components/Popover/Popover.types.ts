import { ReactNode } from 'react';
export interface PopoverProps {
    id: string;
    title?: ReactNode | ReactNode[];
    tooltip: ReactNode | ReactNode[];
    trigger?:| 'click'
    | 'contextMenu'
    | 'hover'
    | 'focus'
    | 'active'
    | 'none';
    placement?:| 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'bottomStart'
    | 'bottomEnd'
    | 'topStart'
    | 'topEnd'
    | 'leftStart'
    | 'leftEnd'
    | 'rightStart'
    | 'rightEnd'
    | 'auto'
    | 'autoVerticalStart'
    | 'autoVerticalEnd'
    | 'autoHorizontalStart'
    | 'autoHorizontalEnd';
    children: ReactNode | ReactNode[];
}