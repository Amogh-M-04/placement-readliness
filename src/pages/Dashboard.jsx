import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Activity, Users } from 'lucide-react';

export function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Problems Solved</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+14% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mock Interviews</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assessment Score</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Top 10% of candidates</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">Keep the streak going!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            You completed "Two Sum" and "Reverse Linked List" today.
                        </p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recommended Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                                <span className="text-sm text-primary">Dynamic Programming Basics</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-warning rounded-full mr-2"></span>
                                <span className="text-sm text-primary">Graph Traversal (BFS/DFS)</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                                <span className="text-sm text-primary">System Design: URL Shortener</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
