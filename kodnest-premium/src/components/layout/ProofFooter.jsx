import React from 'react';
import { Square, CheckSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ProofFooter() {
    const [checks, setChecks] = React.useState({
        uiFrame: false,
        logic: false,
        tests: false,
        deployed: false,
    });

    const toggleCheck = (key) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const steps = [
        { key: 'uiFrame', label: 'UI Built' },
        { key: 'logic', label: 'Logic Working' },
        { key: 'tests', label: 'Test Passed' },
        { key: 'deployed', label: 'Deployed' },
    ];

    return (
        <footer className="h-16 border-t border-primary/10 bg-white flex items-center justify-between px-8 sticky bottom-0 z-40 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-8">
                <span className="text-sm font-serif font-bold text-primary/40 uppercase tracking-widest">Verification</span>
                <div className="flex items-center gap-6">
                    {steps.map((step) => (
                        <button
                            key={step.key}
                            onClick={() => toggleCheck(step.key)}
                            className={cn(
                                "flex items-center gap-2 text-sm transition-colors duration-200",
                                checks[step.key] ? "text-primary font-medium" : "text-primary/40 hover:text-primary/60"
                            )}
                        >
                            {checks[step.key] ? (
                                <CheckSquare className="w-4 h-4 text-accent" />
                            ) : (
                                <Square className="w-4 h-4" />
                            )}
                            {step.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-xs text-primary/30 font-mono">
                All checks required to proceed
            </div>
        </footer>
    );
}
