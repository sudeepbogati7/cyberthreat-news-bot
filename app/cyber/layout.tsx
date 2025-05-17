import type React from "react"
import { CyberSidebar } from "@/components/cyber-sidebar"
// import { ThemeProvider } from "@/components/theme-provider"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Bell, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Suspense } from "react";

export default function CyberLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="cyberpulse-theme">
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <CyberSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-4 md:gap-8">
              <form className="flex-1 md:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search threats..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  5
                </span>
              </Button>
              <UserNav />
            </div>
          </header>
          <Suspense>
            <main className="grid flex-1 items-start gap-4 p-4 md:gap-8 md:p-6">{children}</main>
          </Suspense>
        </div>
      </div>
    </SidebarProvider>
    // </ThemeProvider>
  )
}
