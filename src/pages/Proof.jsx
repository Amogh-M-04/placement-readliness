import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, Copy, Trophy } from 'lucide-react';

const CHECKLIST_KEY = 'prp_test_checklist';
const SUBMISSION_KEY = 'prp_final_submission';

const STEPS = [
    { id: 1, label: 'Project Setup & Routing' },
    { id: 2, label: 'Premium Design System' },
    { id: 3, label: 'Dashboard & Layout' },
    { id: 4, label: 'Job Analysis Engine' },
    { id: 5, label: 'Company Intelligence' },
    { id: 6, label: 'History Persistence' },
    { id: 7, label: 'Pre-Ship Testing' },
    { id: 8, label: 'Final Proof & Links' }
];

export function Proof() {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [isTestComplete, setIsTestComplete] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        // 1. Check Tests
        const savedTests = localStorage.getItem(CHECKLIST_KEY);
        if (savedTests) {
            try {
                const parsed = JSON.parse(savedTests);
                const count = Object.values(parsed).filter(Boolean).length;
                setIsTestComplete(count === 10);
            } catch (e) {
                setIsTestComplete(false);
            }
        }

        // 2. Load Saved Links
        const savedSubmission = localStorage.getItem(SUBMISSION_KEY);
        if (savedSubmission) {
            try {
                const parsed = JSON.parse(savedSubmission);
                setLinks(parsed.links || { lovable: '', github: '', deployed: '' });
                setIsShipped(parsed.isShipped || false);
            } catch (e) { console.error(e); }
        }
    }, []);

    useEffect(() => {
        // Auto-save and check "Shipped" status
        const areLinksValid = Object.values(links).every(l => l && l.startsWith('http'));
        const newShippedStatus = isTestComplete && areLinksValid;

        setIsShipped(newShippedStatus);

        localStorage.setItem(SUBMISSION_KEY, JSON.stringify({
            links,
            isShipped: newShippedStatus,
            updatedAt: new Date().toISOString()
        }));
    }, [links, isTestComplete]);

    const handleCopy = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        alert("Submission copied to clipboard!");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">Proof of Work</h1>
                    <p className="text-primary/70">Finalize your project and generate your submission proof.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary/60">Status:</span>
                    <Badge variant={isShipped ? "success" : "warning"} className="text-base px-3 py-1">
                        {isShipped ? "SHIPPED 🚀" : "IN PROGRESS"}
                    </Badge>
                </div>
            </div>

            {isShipped && (
                <div className="bg-success/10 border border-success/20 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-success-dark mb-2">You built a real product.</h2>
                    <p className="text-success-dark/80 text-lg max-w-2xl mx-auto">
                        Not a tutorial. Not a clone. A structured tool that solves a real problem.<br />
                        This is your proof of work.
                    </p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Steps Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Build Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {STEPS.map((step) => {
                            // Logic for step status
                            let isDone = true; // Default true for Steps 1-6 as per requirement ("Show all 8 steps...")
                            if (step.id === 7) isDone = isTestComplete;
                            if (step.id === 8) isDone = isShipped;

                            return (
                                <div key={step.id} className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-success text-white' : 'bg-secondary text-primary/50'}`}>
                                            {step.id}
                                        </div>
                                        <span className={`font-medium ${isDone ? 'text-primary' : 'text-primary/60'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {isDone ? (
                                        <Badge variant="success" className="text-[10px]">COMPLETED</Badge>
                                    ) : (
                                        <Badge variant="secondary" className="text-[10px]">PENDING</Badge>
                                    )}
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Artifact Inputs */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submission Artifacts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Lovable Project Link <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="https://lovable.dev/..."
                                    value={links.lovable}
                                    onChange={(e) => setLinks({ ...links, lovable: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">GitHub Repository Link <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={(e) => setLinks({ ...links, github: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Deployed URL <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="https://..."
                                    value={links.deployed}
                                    onChange={(e) => setLinks({ ...links, deployed: e.target.value })}
                                />
                            </div>

                            {!isTestComplete && (
                                <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Complete the Pre-Ship Checklist (/prp/07-test) to unlock shipping.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Button
                        size="lg"
                        className="w-full gap-2"
                        disabled={!isShipped}
                        onClick={handleCopy}
                    >
                        <Copy className="w-4 h-4" /> Copy Final Submission
                    </Button>

                    <p className="text-xs text-center text-primary/40">
                        Button enables when all steps are verified and links are valid.
                    </p>
                </div>
            </div>
        </div>
    );
}
