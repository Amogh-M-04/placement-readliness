import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User, Bell, Search, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';


export function DashboardLayout() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Code, label: 'Practice', path: '/practice' },
        { icon: ClipboardCheck, label: 'Assessments', path: '/assessments' },
        { icon: BookOpen, label: 'Resources', path: '/resources' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Rocket, label: 'Ship & Proof', path: '/prp/proof' },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-20">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold text-lg mr-3 shadow-inner">P</div>
                    <div>
                        <span className="font-serif font-bold text-lg tracking-wide block leading-none">Placement Prep</span>
                        <span className="text-[10px] text-white/50 font-mono">v1.2</span>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'} // Only exact match for dashboard root if needed, but routing usually handles this. keeping it simple.
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-white/10 text-white shadow-sm font-medium"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold mb-1">Premium Plan</h4>
                        <p className="text-xs text-white/50 mb-3">Unlock all features</p>
                        <button className="w-full py-1.5 text-xs bg-accent hover:bg-accent/90 rounded text-white font-medium transition-colors">Upgrade</button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-muted px-8 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-xl font-serif font-bold text-primary">Overview</h2>

                    <div className="flex items-center gap-6">
                        <div className="w-64 hidden md:block">
                            {/* Search placeholder */}
                            <div className="relative">
                                <Search className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border-transparent rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-primary/60 hover:text-primary hover:bg-muted/50 rounded-full transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-warning rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-accent font-bold border-2 border-white shadow-sm ring-2 ring-transparent hover:ring-accent/20 transition-all cursor-pointer">
                                AM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
