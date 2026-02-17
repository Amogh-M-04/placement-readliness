import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export function TopBar({
    projectName = "KodNest Premium",
    currentStep = 1,
    totalSteps = 5,
    status = "In Progress"
}) {
    return (
        <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-background sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="font-semibold text-sm tracking-wide">{projectName}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-primary/60">
                <span>Step {currentStep}</span>
                <span className="text-primary/20">/</span>
                <span>{totalSteps}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary/5 shadow-sm">
                {status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                ) : status === 'In Progress' ? (
                    <Clock className="w-4 h-4 text-warning" />
                ) : (
                    <Circle className="w-4 h-4 text-primary/20" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider">{status}</span>
            </div>
        </header>
    );
}
