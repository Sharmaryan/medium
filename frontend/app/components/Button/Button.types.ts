import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children : ReactNode
    fill: 'outline' | 'solid' | 'clear'
    isLoading? : boolean
}