import React from 'react';

export function PrimaryWorkspace({ children }) {
    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
                {children}
            </div>
        </div>
    );
}
