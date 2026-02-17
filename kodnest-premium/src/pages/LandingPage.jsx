import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Video, BarChart2, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-primary font-sans flex flex-col">
            {/* Navigation */}
            <nav className="h-16 px-8 flex items-center justify-between border-b border-muted">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
                    <span className="font-serif font-bold text-xl tracking-tight">Placement Prep</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium hover:text-accent transition-colors">Login</Link>
                    <Link to="/dashboard">
                        <Button variant="primary" size="sm">Get Started</Button>
                    </Link>
                </div>
            </nav>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="px-8 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-primary">
                            Ace Your <span className="text-accent">Placement</span>
                        </h1>
                        <p className="text-lg text-primary/70 max-w-lg leading-relaxed">
                            The ultimate platform to practice coding, take mock interviews, and track your readiness for your dream job.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Link to="/dashboard">
                                <Button size="lg" className="px-8">Start Preparing Now</Button>
                            </Link>
                            <Button variant="outline" size="lg">View Roadmap</Button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-primary/60 pt-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-success" /> 500+ Questions
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-success" /> AI Mock Interviews
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted aspect-square rounded-2xl relative overflow-hidden flex items-center justify-center">
                        {/* Abstract representation of success/growth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-accent/10" />
                        <BarChart2 className="w-64 h-64 text-accent/20" />
                    </div>
                </section>

                {/* Features Grid */}
                <section className="bg-secondary/30 py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-serif font-bold text-primary">Everything you need to succeed</h2>
                            <p className="text-primary/60 max-w-2xl mx-auto">Comprehensive tools designed to cover every aspect of your placement journey.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-8 rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-accent mb-6">
                                    <Code className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Practice Problems</h3>
                                <p className="text-primary/70 leading-relaxed">
                                    Solve curated coding challenges across various difficulty levels and topics.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="bg-white p-8 rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-accent mb-6">
                                    <Video className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Mock Interviews</h3>
                                <p className="text-primary/70 leading-relaxed">
                                    Simulate real interview scenarios with AI-driven feedback on your performance.
                                </p>
                            </div>
                            {/* Feature 3 */}
                            <div className="bg-white p-8 rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-accent mb-6">
                                    <BarChart2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Track Progress</h3>
                                <p className="text-primary/70 leading-relaxed">
                                    Monitor your growth with detailed analytics and personalized insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-primary text-white py-12 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold text-lg">P</div>
                        <span className="font-serif font-bold text-lg">Placement Prep</span>
                    </div>
                    <div className="text-white/60 text-sm">
                        &copy; {new Date().getFullYear()} Placement Prep Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
