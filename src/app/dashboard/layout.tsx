"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { 
  Bell, 
  Menu,
  ShieldCheck,
  Loader2,
  Clock,
  LayoutDashboard,
  ClipboardCheck,
  Users,
  Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { InstitutionalLoader } from "@/components/ui/institutional-loader"

const AUTO_LOGOUT_MS = 15 * 60 * 1000 // 15 Minutes

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [greeting, setGreeting] = useState("Welcome")
  const [schoolName, setSchoolName] = useState("ShuleDirect Pro")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleLogout = React.useCallback(() => {
    localStorage.clear()
    router.push("/login")
  }, [router])

  const resetTimer = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleLogout()
    }, AUTO_LOGOUT_MS)
  }, [handleLogout])

  useEffect(() => {
    const savedName = localStorage.getItem("shule_name")
    if (savedName) setSchoolName(savedName)

    const hours = new Date().getHours()
    let msg = "Good Morning"
    if (hours >= 12 && hours < 16) msg = "Good Afternoon"
    if (hours >= 16) msg = "Good Evening"
    setGreeting(msg)

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keydown", resetTimer)
    resetTimer()
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("keydown", resetTimer)
    }
  }, [resetTimer])

  const bottomNavItems = [
    { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Register", icon: ClipboardCheck, href: "/dashboard/attendance" },
    { label: "Students", icon: Users, href: "/dashboard/students" },
    { label: "Finance", icon: Banknote, href: "/dashboard/finance" },
  ]

  if (isInitialLoading) {
    return <InstitutionalLoader onComplete={() => setIsInitialLoading(false)} />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background flex flex-col min-w-0 w-full relative overflow-hidden min-h-screen">
        <header className="flex h-16 sm:h-20 shrink-0 items-center gap-2 border-b bg-card/80 backdrop-blur-md px-4 sm:px-8 sticky top-0 z-20 w-full">
          <div className="flex items-center gap-2 md:hidden">
             <SidebarTrigger>
               <Menu className="h-5 w-5" />
             </SidebarTrigger>
          </div>
          <div className="hidden md:block">
            <SidebarTrigger className="hover:bg-accent/10" />
          </div>
          
          <div className="flex flex-1 items-center gap-4 min-w-0 px-2">
            <div className="flex flex-col min-w-0">
              <h2 className="text-xs sm:text-lg font-black text-primary flex items-center gap-2 truncate tracking-tight">
                {greeting}<span className="hidden lg:inline">, Administrator! 👋</span>
              </h2>
              <div className="flex items-center gap-2 overflow-hidden">
                <p className="text-[8px] sm:text-[9px] text-muted-foreground font-black uppercase tracking-widest truncate">
                  {schoolName} Hub
                </p>
                <Badge variant="outline" className="hidden sm:flex border-green-200 bg-green-50 text-green-700 h-4 text-[7px] font-black px-2 rounded-full whitespace-nowrap">
                  SECURE 2026
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden xl:flex flex-col items-end mr-2">
               <span className="text-[8px] font-black text-primary uppercase tracking-tighter">Identity Node</span>
               <div className="flex items-center gap-1">
                 <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                 <span className="text-[9px] font-mono font-bold text-muted-foreground">Session: 15m</span>
               </div>
            </div>
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground rounded-full h-10 w-10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-destructive border-2 border-white" />
            </Button>
            
            <div className="h-9 w-9 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-xl shadow-primary/20 shrink-0">
              A
            </div>
          </div>
        </header>
        
        <main className="flex-1 w-full relative p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto min-w-0">
            {children}
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-2 z-50 shadow-lg">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors px-2 min-w-0",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-[8px] font-black uppercase tracking-tighter truncate w-full text-center">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
