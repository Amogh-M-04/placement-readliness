import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress'; // Assuming Progress component is created
import { PlayCircle, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];


// Circular Progress Component (Custom SVG)
const CircularProgress = ({ value, size = 180, strokeWidth = 15 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressOffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
                className="transform -rotate-90 w-full h-full"
                width={size}
                height={size}
            >
                <circle
                    className="text-secondary"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-accent transition-all duration-1000 ease-out"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-primary">
                <span className="text-4xl font-bold font-serif">{value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-primary/60 mt-1">/ 100</span>
            </div>
        </div>
    );
};

export function Dashboard() {
    // Check for "Shipped" status
    const [status, setStatus] = React.useState('In Progress');

    React.useEffect(() => {
        const saved = localStorage.getItem('prp_final_submission');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.isShipped) setStatus('Shipped');
            } catch (e) { }
        }
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">Overview</h1>
                    <p className="text-primary/60 mt-1">Track your placement readiness journey.</p>
                </div>
                <div className={cn(
                    "text-sm px-4 py-2 rounded-full shadow-sm border flex items-center gap-2 transition-colors duration-500",
                    status === 'Shipped'
                        ? "bg-success/10 text-success border-success/20"
                        : "text-primary/60 bg-white border-secondary"
                )}>
                    <span className="relative flex h-2 w-2">
                        <span className={cn(
                            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                            status === 'Shipped' ? "bg-success" : "bg-yellow-500"
                        )}></span>
                        <span className={cn(
                            "relative inline-flex rounded-full h-2 w-2",
                            status === 'Shipped' ? "bg-success" : "bg-yellow-500"
                        )}></span>
                    </span>
                    {status}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center py-8">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary/80">Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <CircularProgress value={72} />
                        <p className="mt-6 text-sm text-primary/60 font-medium">Readiness Score</p>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary/80">Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                                <PolarGrid stroke="#e0e7ff" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#3730a3', fontSize: 12, fontWeight: 500 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="#4338ca"
                                    strokeWidth={2}
                                    fill="#4338ca"
                                    fillOpacity={0.2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 3. Continue Practice */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg text-primary/80">Continue Practice</CardTitle>
                        <PlayCircle className="w-5 h-5 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <h3 className="font-semibold text-xl mb-1">Dynamic Programming</h3>
                            <p className="text-sm text-primary/60 mb-4">Topic: 1D Arrays</p>

                            <div className="flex items-center justify-between text-xs font-medium text-primary/70 mb-2">
                                <span>Progress</span>
                                <span>3 / 10 Completed</span>
                            </div>
                            <Progress value={30} className="h-2 mb-6" />

                            <Button className="w-full">Continue Learning</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg text-primary/80">Weekly Goals</CardTitle>
                        <CheckCircle2 className="w-5 h-5 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Problems Solved</span>
                                <span className="text-xl font-bold font-serif text-accent">12 <span className="text-sm font-sans text-primary/40 font-normal">/ 20</span></span>
                            </div>
                            <Progress value={(12 / 20) * 100} className="h-2 mb-6 bg-secondary" />

                            <div className="flex justify-between mt-8">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                                            // Mock data: Mon(0), Tue(1), Wed(2), Thu(3) active
                                            i <= 3 ? "bg-accent text-white" : "bg-secondary text-primary/40"
                                        )}>
                                            {day}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg text-primary/80">Upcoming Assessments</CardTitle>
                        <Calendar className="w-5 h-5 text-primary/40" />
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-secondary">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Test" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", type: "Review" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Interview" },
                            ].map((item, i) => (
                                <div key={i} className="py-4 flex items-center justify-between first:pt-2 last:pb-2 hover:bg-muted/30 px-2 rounded-lg transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary">{item.title}</h4>
                                            <p className="text-sm text-primary/60">{item.time}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
