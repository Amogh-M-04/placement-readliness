import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Lock, Rocket, ChevronRight, AlertOctagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'prp_test_checklist';
const TOTAL_ITEMS = 10;

export function ShipLock() {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const checkedItems = JSON.parse(saved);
                const count = Object.values(checkedItems).filter(Boolean).length;
                setPassedCount(count);
                setIsLocked(count < TOTAL_ITEMS);
            } catch (e) {
                setPassedCount(0);
                setIsLocked(true);
            }
        } else {
            setPassedCount(0);
            setIsLocked(true);
        }
    }, []);

    if (isLocked) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-red-200 bg-red-50/30">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4 animate-pulse">
                            <Lock className="w-10 h-10" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-red-700">Shipping Locked</h1>
                            <p className="text-red-900/70">
                                You have only passed <span className="font-bold">{passedCount}/{TOTAL_ITEMS}</span> tests.
                            </p>
                            <p className="text-sm text-red-900/60 max-w-xs mx-auto">
                                The deployment pipeline is paused until all manual verification checks are completed.
                            </p>
                        </div>

                        <Button
                            variant="destructive"
                            className="w-full gap-2"
                            onClick={() => navigate('/prp/07-test')}
                        >
                            <AlertOctagon className="w-4 h-4" />
                            Go to Flight Checklist
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-accent/20 bg-accent/5">
                <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                        <Rocket className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-accent">Ready to Ship!</h1>
                        <p className="text-primary/70">
                            All {TOTAL_ITEMS} verification protocols have been passed.
                        </p>
                        <p className="text-sm text-primary/60">
                            Systems are nominal. You are cleared for deployment.
                        </p>
                    </div>

                    <a
                        href="https://vercel.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                    >
                        <Button className="w-full gap-2 text-lg h-12">
                            Deploy Now <ChevronRight className="w-5 h-5" />
                        </Button>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
