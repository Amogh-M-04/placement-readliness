import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
    default: "bg-primary/10 text-primary border-transparent",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    destructive: "bg-destructive text-destructive-foreground border-transparent",
    outline: "text-foreground",
    success: "bg-success/15 text-success border-transparent",
    warning: "bg-warning/15 text-warning border-transparent",
};

export function Badge({ className, variant = "default", ...props }) {
    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", badgeVariants[variant], className)} {...props} />
    );
}
