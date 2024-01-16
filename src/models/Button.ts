import { ReactNode } from "react";

export interface Button {
    icon?: ReactNode;
    onlyIcon?: boolean;
    className?: string;
    link?: boolean;
    navLink?: boolean;
    href?: string;
    hiddenText?: string;
    disabled?: boolean;
    onClick?: any;
}