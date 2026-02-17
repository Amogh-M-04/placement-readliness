import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = {
    primary: "bg-accent text-white hover:bg-accent/90 border-transparent shadow-sm",
    secondary: "bg-transparent text-primary border-primary/20 hover:bg-primary/5",
    ghost: "bg-transparent text-primary hover:bg-primary/5 border-transparent",
    outline: "bg-transparent text-primary border-primary/20 hover:bg-primary/5"
};

const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    ...props
}) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50",
                buttonVariants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}
