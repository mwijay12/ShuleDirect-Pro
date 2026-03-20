
"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { 
  Bell, 
  Search, 
  LayoutDashboard, 
  ClipboardCheck, 
  Users, 
  Banknote,
  Menu,
  ShieldCheck,
  Loader2,
  Clock,
  CloudOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const AUTO_LOGOUT_MS = 10 * 60 * 1000 // 10 Minutes

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
    // Sync School Name
    const savedName = localStorage.getItem("shule_name")
    if (savedName) setSchoolName(savedName)

    // Initial App Boot
    const loadTimer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2000)

    const hours = new Date().getHours()
    let msg = "Good Morning"
    if (hours >= 12 && hours < 16) msg = "Good Afternoon"
    if (hours >= 16) msg = "Good Evening"
    setGreeting(msg)

    // Security Listeners
    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keydown", resetTimer)
    resetTimer()
    
    return () => {
      clearTimeout(loadTimer)
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
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-[2.5rem] colorful-gradient flex items-center justify-center text-white shadow-2xl animate-bounce">
            <ShieldCheck className="h-14 w-14" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        </div>
        <div className="text-center space-y-2 px-4">
          <h1 className="text-2xl font-headline font-black text-primary tracking-tighter truncate max-w-xs">{schoolName}</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] animate-pulse">Initializing Security Node</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background flex flex-col min-w-0 w-full relative overflow-hidden">
        {/* FIXED: Header re-engineered for rigid responsiveness */}
        <header className="flex h-16 sm:h-24 shrink-0 items-center gap-2 border-b bg-card/80 backdrop-blur-md px-4 sm:px-8 sticky top-0 z-20 w-full overflow-hidden">
          <div className="flex items-center gap-2 md:hidden shrink-0">
             <SidebarTrigger>
               <Menu className="h-5 w-5" />
             </SidebarTrigger>
          </div>
          <div className="hidden md:block shrink-0">
            <SidebarTrigger className="hover:bg-accent/10" />
          </div>
          
          <div className="flex flex-1 items-center gap-2 sm:gap-8 min-w-0 px-2 sm:px-4 overflow-hidden">
            <div className="flex flex-col min-w-0 overflow-hidden">
              <h2 className="text-sm sm:text-xl lg:text-2xl font-black text-primary flex items-center gap-2 truncate whitespace-nowrap tracking-tight">
                {greeting}<span className="hidden lg:inline">, Administrator! 👋</span>
              </h2>
              <div className="flex items-center gap-2 overflow-hidden">
                <p className="text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest truncate">
                  {schoolName} Hub
                </p>
                <Badge variant="outline" className="hidden xl:flex border-green-200 bg-green-50 text-green-700 h-4 text-[7px] font-black px-2 rounded-full whitespace-nowrap">
                  OFFLINE CACHE ACTIVE
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto">
            <div className="hidden xl:flex flex-col items-end mr-2">
               <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Security Node</span>
               <div className="flex items-center gap-1">
                 <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                 <span className="text-[10px] font-mono font-bold text-muted-foreground">Lock: 10m</span>
               </div>
            </div>
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground rounded-full hover:bg-accent/10 h-10 w-10 shrink-0">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-destructive border-2 border-white" />
            </Button>
            
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-xl shadow-primary/20 shrink-0">
              A
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full relative p-4 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors px-2",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
