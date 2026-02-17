import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { analyzeJobDescription } from '../lib/analyzer';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import {
    ArrowLeft, History, CheckCircle2, BrainCircuit, Target,
    ListChecks, FileText, Download, Copy, X, ArrowRight
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

export function Assessments() {
    const [mode, setMode] = useState('input'); // 'input', 'result', 'history'
    const [jd, setJd] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const { history, saveAnalysis, deleteAnalysis, updateAnalysis } = useAnalysisHistory();

    // Interactive State
    const [skillConfidence, setSkillConfidence] = useState({}); // { [skillName]: 'know' | 'practice' }
    const [liveScore, setLiveScore] = useState(0);

    // Initialize state when currentAnalysis changes
    useEffect(() => {
        if (currentAnalysis) {
            setSkillConfidence(currentAnalysis.skillConfidence || {});
            setLiveScore(currentAnalysis.readinessScore || 0);
        }
    }, [currentAnalysis]);

    const handleAnalyze = () => {
        if (!jd.trim()) return;
        const result = analyzeJobDescription(jd, company, role);
        // Initialize all skills as 'practice' by default if not set
        const initialConfidence = {};
        Object.values(result.extractedSkills).flat().forEach(skill => {
            initialConfidence[skill] = 'practice';
        });
        result.skillConfidence = initialConfidence;

        saveAnalysis(result);
        setCurrentAnalysis(result);
        setMode('result');
    };

    const handleViewHistory = (item) => {
        setCurrentAnalysis(item);
        setMode('result');
    };

    const toggleSkill = (skill) => {
        const currentStatus = skillConfidence[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        const newConfidence = { ...skillConfidence, [skill]: newStatus };
        setSkillConfidence(newConfidence);

        // Recalculate Score
        // Base score logic from analyzer (simplified direct modification here)
        // +2 for 'know', -2 for 'practice' relative to base isn't exact, 
        // essentially we re-evaluate dynamic portion.
        // For simplicity: We modify the stored score directly.

        let scoreChange = newStatus === 'know' ? 2 : -2;
        let newScore = Math.min(100, Math.max(0, liveScore + scoreChange));
        setLiveScore(newScore);

        // Update persistent history
        if (currentAnalysis) {
            const updated = {
                ...currentAnalysis,
                skillConfidence: newConfidence,
                readinessScore: newScore
            };
            updateAnalysis(updated);
            setCurrentAnalysis(updated);
        }
    };

    // Helper to format skill data for Radar Chart
    const getChartData = (skills) => {
        const categories = ["Core CS", "Languages", "Web Development", "Data & DB", "Cloud & DevOps"];
        return categories.map(cat => ({
            subject: cat,
            A: skills[cat] ? Math.min(100, skills[cat].length * 20 + 40) : 20,
            fullMark: 100
        }));
    };

    // Export Functions
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const downloadTxt = () => {
        if (!currentAnalysis) return;
        const { role, company, plan, checklist, questions } = currentAnalysis;

        const content = `
PLACEMENT READINESS REPORT
Role: ${role}
Company: ${company}
Date: ${new Date().toLocaleDateString()}
Score: ${liveScore}/100

=== SKILL GAPS ===
${Object.entries(skillConfidence)
                .filter(([_, status]) => status === 'practice')
                .map(([skill]) => `- ${skill}`)
                .join('\n')}

=== 7-DAY PLAN ===
${plan.map(d => `${d.day} (${d.focus}):\n${d.tasks.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

=== INTERVIEW QUESTIONS ===
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

=== CHECKLIST ===
${Object.entries(checklist).map(([r, items]) => `${r}:\n${items.map(i => `  [ ] ${i}`).join('\n')}`).join('\n\n')}
        `.trim();

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${role.replace(/\s+/g, '_')}_Plan.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getWeakSkills = () => {
        return Object.entries(skillConfidence)
            .filter(([_, status]) => status === 'practice')
            .map(([skill]) => skill)
            .slice(0, 3);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">Job Analysis</h1>
                    <p className="text-primary/70">Analyze Job Descriptions to get a personalized prep plan.</p>
                </div>
                {mode !== 'input' && (
                    <Button variant="outline" onClick={() => setMode('input')} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> New Analysis
                    </Button>
                )}
                {mode === 'input' && (
                    <Button variant="ghost" onClick={() => setMode('history')} className="gap-2">
                        <History className="w-4 h-4" /> History
                    </Button>
                )}
            </div>

            {mode === 'input' && (
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company Name</label>
                                    <Input
                                        placeholder="e.g. Google, Amazon..."
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <Input
                                        placeholder="e.g. Frontend Engineer..."
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Job Description (JD)</label>
                                <textarea
                                    className="w-full min-h-[300px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="Paste the full job description here..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                />
                            </div>
                            <Button size="lg" className="w-full" onClick={handleAnalyze} disabled={!jd.trim()}>
                                Analyze & Generate Plan
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">How it works</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-primary/70 space-y-3">
                                <p>1. <strong>Paste JD:</strong> We scan standard job descriptions for keywords.</p>
                                <p>2. <strong>Get Score:</strong> See how well your current profile matches (mock score).</p>
                                <p>3. <strong>Prep Plan:</strong> Get a 7-day varied plan covering all found topics.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Recent Analyses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {history.length === 0 ? (
                                    <p className="text-sm text-primary/50 text-center py-4">No history yet.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {history.slice(0, 3).map(item => ( // Show last 3
                                            <div
                                                key={item.id}
                                                className="text-sm p-2 hover:bg-muted rounded cursor-pointer border border-transparent hover:border-secondary transition-colors"
                                                onClick={() => handleViewHistory(item)}
                                            >
                                                <div className="font-medium">{item.role || 'Unknown Role'}</div>
                                                <div className="text-xs text-primary/50">{item.company || 'Unknown Company'} • {new Date(item.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {mode === 'history' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {history.length === 0 ? (
                            <div className="text-center py-12 text-primary/50">
                                <p>You haven't analyzed any Job Descriptions yet.</p>
                                <Button variant="link" onClick={() => setMode('input')}>Start your first analysis</Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-secondary">
                                {history.map(item => (
                                    <div key={item.id} className="py-4 flex items-center justify-between group">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.role || 'Unknown Role'}</h3>
                                            <p className="text-sm text-primary/60">{item.company || 'Unknown Company'} • Analyzed on {new Date(item.createdAt).toLocaleDateString()}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge variant={item.readinessScore > 70 ? 'success' : 'warning'}>Score: {item.readinessScore}</Badge>
                                                <Badge variant="outline">{Object.keys(item.extractedSkills).length} Skill Categories</Badge>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="sm" variant="secondary" onClick={() => handleViewHistory(item)}>View Report</Button>
                                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={(e) => { e.stopPropagation(); deleteAnalysis(item.id); }}>Delete</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {mode === 'result' && currentAnalysis && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Report */}
                    <div className="bg-primary text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <div className="text-accent-foreground/80 text-sm font-medium mb-1">ANALYSIS REPORT</div>
                            <h2 className="text-3xl font-serif font-bold mb-2">{currentAnalysis.role || 'Job Role'}</h2>
                            <p className="text-white/70 text-lg">{currentAnalysis.company}</p>
                            <div className="flex gap-2 mt-4 flex-wrap">
                                {Object.keys(currentAnalysis.extractedSkills).map(cat => (
                                    <span key={cat} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className={cn(liveScore > 70 ? "text-success" : "text-yellow-400", "transition-all duration-1000 ease-out")} strokeDasharray={351} strokeDashoffset={351 - (351 * liveScore) / 100} strokeLinecap="round" />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-bold">{liveScore}</span>
                                    <span className="text-xs text-white/60">SCORE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Intelligence & Recruitment Process */}
                    {currentAnalysis.companyProfile && (
                        <div className="space-y-6">
                            {/* Intel Card */}
                            <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-secondary/50">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <BrainCircuit className="w-5 h-5 text-accent" />
                                            Company Intelligence
                                        </CardTitle>
                                        <Badge variant="outline" className="text-[10px] bg-white/50">
                                            AI INSIGHTS
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="space-y-3 min-w-[200px]">
                                            <div>
                                                <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider mb-1">Type</div>
                                                <Badge variant={currentAnalysis.companyProfile.type === 'Enterprise' ? 'default' : 'secondary'}>
                                                    {currentAnalysis.companyProfile.type}
                                                </Badge>
                                            </div>
                                            <div>
                                                <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider mb-1">Est. Size</div>
                                                <span className="text-sm font-medium">{currentAnalysis.companyProfile.size}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 border-l border-primary/10 pl-6">
                                            <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider mb-1">Typical Hiring Focus</div>
                                            <p className="text-primary/80 leading-relaxed">
                                                {currentAnalysis.companyProfile.focus}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-[10px] text-primary/40 text-right italic">
                                        * Demo Mode: Company intel generated heuristically based on name.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Round Mapping (Timeline) */}
                            {currentAnalysis.roundMapping && currentAnalysis.roundMapping.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ListChecks className="w-5 h-5 text-accent" />
                                            Recruitment Process Map
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative space-y-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary before:to-transparent">
                                            {currentAnalysis.roundMapping.map((round, i) => (
                                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                                    {/* Icon */}
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                        <span className="text-sm font-bold text-accent">{i + 1}</span>
                                                    </div>

                                                    {/* Card */}
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-secondary/40 bg-white shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="font-bold text-primary">{round.name.split(':')[0]}</div>
                                                            <span className="text-[10px] text-primary/40 font-mono">STEP {i + 1}</span>
                                                        </div>
                                                        <div className="text-sm font-medium text-accent mb-2">{round.name.split(':')[1]}</div>
                                                        <div className="text-xs text-primary/60 mb-2">{round.desc}</div>
                                                        <div className="text-[10px] bg-secondary/30 p-2 rounded text-primary/70">
                                                            <span className="font-semibold text-primary/90">Why this matters: </span>
                                                            {round.why}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(JSON.stringify(currentAnalysis.plan, null, 2))}>
                            <Copy className="w-4 h-4" /> Copy Plan
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(JSON.stringify(currentAnalysis.checklist, null, 2))}>
                            <ListChecks className="w-4 h-4" /> Copy Checklist
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(currentAnalysis.questions.join('\n'))}>
                            <BrainCircuit className="w-4 h-4" /> Copy Questions
                        </Button>
                        <Button variant="default" size="sm" className="gap-2 ml-auto" onClick={downloadTxt}>
                            <Download className="w-4 h-4" /> Download Report
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Extracted Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-accent" /> Skill Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] w-full mb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getChartData(currentAnalysis.extractedSkills)}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-4">
                                    {Object.entries(currentAnalysis.extractedSkills).map(([cat, skills]) => (
                                        <div key={cat}>
                                            <h4 className="text-xs font-semibold uppercase text-primary/50 mb-2">{cat}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(skill => {
                                                    const isKnown = skillConfidence[skill] === 'know';
                                                    return (
                                                        <Badge
                                                            key={skill}
                                                            variant={isKnown ? 'success' : 'secondary'}
                                                            className={cn(
                                                                "cursor-pointer hover:opacity-80 transition-all select-none flex items-center gap-1",
                                                                !isKnown && "opacity-70"
                                                            )}
                                                            onClick={() => toggleSkill(skill)}
                                                        >
                                                            {isKnown ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                                                            {skill}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            {/* Action Next */}
                            <Card className="bg-primary/5 border-accent/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base text-accent"><ArrowRight className="w-5 h-5" /> Action Next</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-primary/70 mb-3">Focus on these areas to boost your score:</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {getWeakSkills().map(skill => (
                                            <Badge key={skill} variant="outline" className="text-red-500 border-red-200 bg-red-50">{skill}</Badge>
                                        ))}
                                    </div>
                                    <Button size="sm" className="w-full">Start Day 1 Plan Now</Button>
                                </CardContent>
                            </Card>

                            {/* Interview Questions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-accent" /> Likely Interview Questions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {currentAnalysis.questions.slice(0, 5).map((q, i) => ( // Show top 5 to save space
                                            <li key={i} className="flex gap-3 items-start">
                                                <div className="min-w-[24px] h-6 bg-secondary/50 rounded-full flex items-center justify-center text-xs font-bold text-primary/70">{i + 1}</div>
                                                <span className="text-sm text-primary/80 leading-relaxed">{q}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="link" size="sm" className="mt-2 text-xs" onClick={() => copyToClipboard(currentAnalysis.questions.join('\n'))}>
                                        View all 10 questions
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* 7-Day Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-accent" /> 7-Day Preparation Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {currentAnalysis.plan.map((day, i) => (
                                    <div key={i} className="bg-muted/30 p-4 rounded-lg border border-secondary">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-accent">{day.day}</span>
                                            <Badge variant="outline" className="text-[10px]">{day.focus}</Badge>
                                        </div>
                                        <ul className="space-y-2">
                                            {day.tasks.map((task, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-primary/70">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5" />
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Checklist */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ListChecks className="w-5 h-5 text-accent" /> Round-wise Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                {Object.entries(currentAnalysis.checklist).map(([round, items], i) => (
                                    <div key={i}>
                                        <h3 className="font-semibold text-primary mb-3 pb-2 border-b border-secondary">{round}</h3>
                                        <div className="space-y-2">
                                            {items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-3">
                                                    <input type="checkbox" className="w-4 h-4 rounded border-primary/20 text-accent focus:ring-accent" />
                                                    <span className="text-sm text-primary/70">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
