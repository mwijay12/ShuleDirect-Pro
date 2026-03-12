"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Bell, Search, Globe, Sparkles, PlusCircle, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [greeting, setGreeting] = useState("Welcome...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hours = new Date().getHours()
    let msg = "Good Morning"
    if (hours >= 12 && hours < 16) msg = "Good Afternoon"
    if (hours >= 16) msg = "Good Evening"
    
    const timer = setTimeout(() => {
      setGreeting(msg)
      setLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 sm:h-20 shrink-0 items-center gap-2 border-b bg-card/80 backdrop-blur-md px-4 sm:px-6 sticky top-0 z-20 transition-all duration-300">
          <SidebarTrigger className="hover:bg-accent/10" />
          
          <div className="flex flex-1 items-center gap-4 sm:gap-6">
            <div className="flex flex-col">
              <h2 className={cn(
                "text-base sm:text-lg font-bold text-primary transition-all duration-500 flex items-center gap-2",
                loading ? "opacity-30 blur-sm" : "opacity-100 blur-0"
              )}>
                {greeting}, Admin! <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest hidden sm:block">
                Mlimani Academy Hub
              </p>
            </div>

            <div className="relative w-full max-w-xs hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Find student or record..."
                className="pl-10 bg-muted/30 border-none rounded-full h-9 focus-visible:ring-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="outline" className="hidden xl:flex items-center gap-1.5 border-green-200 bg-green-50 text-green-700 rounded-full px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold">LIVE SYNC</span>
            </Badge>

            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground rounded-full hover:bg-accent/10 h-9 w-9">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-1.5 w-1.5 rounded-full bg-destructive border border-card" />
            </Button>
            
            <div className="sm:flex items-center gap-2 pl-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary/20">
                A
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
