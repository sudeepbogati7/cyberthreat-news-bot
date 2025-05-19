"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, LayoutDashboard, Newspaper, AlertTriangle, User, Settings, LogOut, Menu, Bot } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"

const navItems = [
    {
        title: "Dashboard",
        href: "/cyber/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Threat News",
        href: "/cyber/recent-threat-news",
        icon: Newspaper,
    },
    {
        title: "Popular Threats",
        href: "/cyber/popular-threats",
        icon: AlertTriangle,
    },
    {
        title: "Chat",
        href: "/cyber/chat",
        icon: Bot,
    },
    {
        title: "Profile",
        href: "/cyber/profile",
        icon: User,
    },
    {
        title: "Settings",
        href: "/cyber/settings",
        icon: Settings,
    },
]

export function CyberSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="flex h-20 items-center border-b px-4">
                <Link href="/cyber/dashboard" className="flex items-center gap-2">
                    <Shield className="h-10 w-10 text-cyan-500" />

                    <div className="flex flex-col ">
                        <span className="text-xl font-bold tracking-tight">DeepCyber<span className="text-cyan-600">Q</span> </span>
                        <div className="text-xs"> Your AI-Powered Cyber Threat Companion.</div>
                    </div>
                </Link>
                <div className="ml-auto md:hidden">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Main Navigation</SidebarGroupLabel> */}
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    tooltip={item.title}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/account/login">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
