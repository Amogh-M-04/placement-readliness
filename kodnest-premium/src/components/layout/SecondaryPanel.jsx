import React from 'react';
import { Copy, Terminal, FlaskConical, AlertTriangle, ImagePlus } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SecondaryPanel({
    explanation = "Review the current step guidelines.",
    promptContent = "Write a prompt here..."
}) {
    return (
        <aside className="w-1/3 min-w-[320px] max-w-md border-l border-primary/10 bg-white/50 backdrop-blur-sm p-6 flex flex-col gap-6 sticky top-[height-of-header] h-full overflow-y-auto">

            <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg">Step Guidance</h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                    {explanation}
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-primary/40 block">Prompt</label>
                <div className="bg-background border border-primary/10 rounded-md p-3 text-sm font-mono text-primary/80 relative group">
                    {promptContent}
                    <button className="absolute top-2 right-2 p-1.5 hover:bg-primary/5 rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto">
                <button className="col-span-2 flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-transparent border border-primary/10 hover:border-primary/20 hover:bg-primary/5 transition-colors text-sm font-medium">
                    <Copy className="w-4 h-4" /> Copy Prompt
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm">
                    <Terminal className="w-4 h-4" /> Build
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors text-xs font-medium border border-transparent hover:border-success/20">
                    <FlaskConical className="w-3.5 h-3.5" /> It Worked
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-warning/10 text-warning hover:bg-warning/20 transition-colors text-xs font-medium border border-transparent hover:border-warning/20">
                    <AlertTriangle className="w-3.5 h-3.5" /> Error
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm text-primary/60">
                    <ImagePlus className="w-4 h-4" /> Add Screenshot
                </button>
            </div>

        </aside>
    );
}
