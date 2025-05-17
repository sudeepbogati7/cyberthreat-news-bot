"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Bell, Search, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMobile } from "@/hooks/use-mobile-custom";

export function Navbar() {
    const isMobile = useMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-10 w-10 text-cyan-500" />

                        <div className="flex flex-col ">
                            <span className="text-xl font-bold tracking-tight">DeepCyber<span className="text-red-600">Q</span> </span>
                            <div className="text-xs"> Your AI-Powered Cyber Threat Companion.</div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-cyan-500"
                        >
                            Home
                        </Link>
                        <Link
                            href="/threats"
                            className="text-sm font-medium transition-colors hover:text-cyan-500"
                        >
                            Threats
                        </Link>
                        <Link
                            href="/breaches"
                            className="text-sm font-medium transition-colors hover:text-cyan-500"
                        >
                            Data Breaches
                        </Link>
                        <Link
                            href="/news"
                            className="text-sm font-medium transition-colors hover:text-cyan-500"
                        >
                            News
                        </Link>
                        <Link
                            href="/resources"
                            className="text-sm font-medium transition-colors hover:text-cyan-500"
                        >
                            Resources
                        </Link>
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full bg-slate-800">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-slate-900 text-white border-slate-800">
                            <DropdownMenuItem className="hover:bg-slate-800">
                                <Link href="/account/register" className="w-full">Register</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-800">
                                <Link href="/account/login" className="w-full">Login</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="text-slate-400 hover:text-white"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobile && isMenuOpen && (
                <div className="container px-4 pb-4 bg-slate-950 border-b border-slate-800">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium py-2 transition-colors hover:text-cyan-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/threats"
                            className="text-sm font-medium py-2 transition-colors hover:text-cyan-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Threats
                        </Link>
                        <Link
                            href="/breaches"
                            className="text-sm font-medium py-2 transition-colors hover:text-cyan-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Data Breaches
                        </Link>
                        <Link
                            href="/news"
                            className="text-sm font-medium py-2 transition-colors hover:text-cyan-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            href="/resources"
                            className="text-sm font-medium py-2 transition-colors hover:text-cyan-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resources
                        </Link>
                        <div className="flex space-x-4 pt-2">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                <Search className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                <Bell className="h-5 w-5" />
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
