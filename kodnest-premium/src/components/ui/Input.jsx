import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium text-primary/80">{label}</label>}
            <div className="relative">
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-shadow",
                        error && "border-warning focus-visible:ring-warning/50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <div className="absolute right-3 top-2.5 text-warning pointer-events-none">
                        <AlertCircle className="h-4 w-4" />
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-warning mt-1">{error}</p>}
        </div>
    );
});
Input.displayName = "Input";
