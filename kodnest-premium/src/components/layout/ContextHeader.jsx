import React from 'react';

export function ContextHeader({
    title = "Context Header",
    description = "A clear purpose for this step."
}) {
    return (
        <div className="px-8 py-12 max-w-4xl">
            <h1 className="text-4xl font-serif font-bold text-primary mb-3 leading-tight">
                {title}
            </h1>
            <p className="text-lg text-primary/70 max-w-2xl leading-relaxed">
                {description}
            </p>
        </div>
    );
}
