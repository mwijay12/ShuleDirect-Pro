
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Bell, Search, Globe, Sparkles, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [greeting, setGreeting] = useState("Habari...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hours = new Date().getHours()
    let msg = "Habari za Asubuhi" // Good Morning
    if (hours >= 12 && hours < 16) msg = "Habari za Mchana" // Good Afternoon
    if (hours >= 16) msg = "Habari za Jioni" // Good Evening
    
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
        <header className="flex h-20 shrink-0 items-center gap-4 border-b bg-card/80 backdrop-blur-md px-6 sticky top-0 z-20 transition-all duration-300">
          <SidebarTrigger className="hover:bg-accent/10" />
          
          <div className="flex flex-1 items-center gap-6">
            <div className="flex flex-col">
              <h2 className={cn(
                "text-lg font-bold text-primary transition-all duration-500 flex items-center gap-2",
                loading ? "opacity-30 blur-sm" : "opacity-100 blur-0"
              )}>
                {greeting}, Admin! <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest hidden md:block">
                Mlimani Academy Hub
              </p>
            </div>

            <div className="relative w-full max-w-xs hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Find a student or bill..."
                className="pl-10 bg-muted/30 border-none rounded-full h-9 focus-visible:ring-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:border-primary">
              <PlusCircle className="mr-2 h-4 w-4 text-primary" /> Quick Action
            </Button>
            
            <Badge variant="outline" className="hidden xl:flex items-center gap-1.5 border-green-200 bg-green-50 text-green-700 rounded-full px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold">LIVE SYNC</span>
            </Badge>

            <div className="h-8 w-px bg-border mx-1" />
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground rounded-full hover:bg-accent/10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive border-2 border-card" />
            </Button>
            
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                A
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
