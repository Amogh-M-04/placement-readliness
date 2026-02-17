import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'prp_test_checklist';

const CHECKLIST_ITEMS = [
    { id: 'jd-validation', label: 'JD required validation works', hint: 'Try analyzing with empty JD. Button should be disabled.' },
    { id: 'short-jd-warning', label: 'Short JD warning shows for <200 chars', hint: 'Paste a short text. Check validation message.' },
    { id: 'skills-extraction', label: 'Skills extraction groups correctly', hint: 'Verify extraction of Core CS, Languages, etc.' },
    { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Test "Google" vs "Startup". Rounds should differ.' },
    { id: 'score-deterministic', label: 'Score calculation is deterministic', hint: 'Same inputs should yield same base score.' },
    { id: 'skill-toggles', label: 'Skill toggles update score live', hint: 'Toggle skills and watch score change.' },
    { id: 'changes-persist', label: 'Changes persist after refresh', hint: 'Refresh page. Toggles/score should remain.' },
    { id: 'history-saves', label: 'History saves and loads correctly', hint: 'Check "History" tab for previous runs.' },
    { id: 'export-buttons', label: 'Export buttons copy the correct content', hint: 'Test "Copy Plan" and paste it.' },
    { id: 'no-console-errors', label: 'No console errors on core pages', hint: 'Check DevTools console.' }
];

export function TestChecklist() {
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
    }, []);

    const toggleItem = (id) => {
        const newState = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    };

    const resetChecklist = () => {
        if (confirm('Reset all progress?')) {
            setCheckedItems({});
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === CHECKLIST_ITEMS.length;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">Pre-Ship Checklist</h1>
                    <p className="text-primary/70">Verify all 10 items before shippping the update.</p>
                </div>
                <Button variant="outline" onClick={resetChecklist} className="gap-2">
                    <RotateCcw className="w-4 h-4" /> Reset Playlist
                </Button>
            </div>

            <Card className={isComplete ? "bg-green-50/50 border-green-200" : "bg-yellow-50/50 border-yellow-200"}>
                <CardContent className="pt-6 flex items-center gap-4">
                    <div className="text-4xl font-bold">{passedCount} / {CHECKLIST_ITEMS.length}</div>
                    <div>
                        <h3 className="font-semibold text-lg">{isComplete ? "All Systems Go! 🚀" : "Tests Pending"}</h3>
                        <p className="text-sm opacity-80">{isComplete ? "You are ready to ship." : "Fix issues before shipping."}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Verification Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {CHECKLIST_ITEMS.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-secondary/20">
                            <input
                                type="checkbox"
                                id={item.id}
                                checked={!!checkedItems[item.id]}
                                onChange={() => toggleItem(item.id)}
                                className="mt-1 w-5 h-5 rounded border-primary/20 text-accent focus:ring-accent cursor-pointer"
                            />
                            <div className="space-y-1">
                                <label htmlFor={item.id} className="font-medium text-primary cursor-pointer select-none">
                                    {item.label}
                                </label>
                                <p className="text-xs text-primary/50 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    How to test: {item.hint}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
