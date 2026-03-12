
"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Banknote, 
  Settings,
  ShieldCheck,
  Bus,
  Bed,
  ClipboardCheck,
  Zap,
  ChevronRight,
  LogOut,
  X,
  HelpCircle,
  Star
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const allNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "TEACHER", "BURSAR", "TEACHER_MATH", "TEACHER_ENG", "TEACHER_KISW", "TEACHER_PHY", "TEACHER_CHEM"] },
  { title: "Student Directory", url: "/dashboard/students", icon: Users, roles: ["ADMIN", "TEACHER", "TEACHER_MATH", "TEACHER_ENG", "TEACHER_KISW", "TEACHER_PHY", "TEACHER_CHEM"] },
  { title: "Daily Register", url: "/dashboard/attendance", icon: ClipboardCheck, roles: ["ADMIN", "TEACHER", "TEACHER_MATH", "TEACHER_ENG", "TEACHER_KISW", "TEACHER_PHY", "TEACHER_CHEM"] },
  { title: "Academic Hub", url: "/dashboard/academics", icon: GraduationCap, roles: ["ADMIN", "TEACHER", "TEACHER_MATH", "TEACHER_ENG", "TEACHER_KISW", "TEACHER_PHY", "TEACHER_CHEM"] },
  { title: "Finance Hub", url: "/dashboard/finance", icon: Banknote, roles: ["ADMIN", "BURSAR"] },
  { title: "Transport", url: "/dashboard/transport", icon: Bus, roles: ["ADMIN", "BURSAR"] },
  { title: "Hostel", url: "/dashboard/hostel", icon: Bed, roles: ["ADMIN", "BURSAR"] },
  { title: "NECTA Reports", url: "/dashboard/reports", icon: Zap, roles: ["ADMIN", "TEACHER", "BURSAR"] },
  { title: "Help Center", url: "/dashboard/help", icon: HelpCircle, roles: ["ADMIN", "TEACHER", "BURSAR", "TEACHER_MATH", "TEACHER_ENG", "TEACHER_KISW", "TEACHER_PHY", "TEACHER_CHEM"] },
  { title: "System Admin", url: "/dashboard/settings", icon: Settings, roles: ["ADMIN"] },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, setOpenMobile, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed"
  const [role, setRole] = useState<string>("TEACHER")

  useEffect(() => {
    const savedRole = localStorage.getItem("shule_role")
    if (savedRole) setRole(savedRole)
  }, [])

  const filteredItems = allNavItems.filter(item => item.roles.includes(role))

  const handleLogout = () => {
    localStorage.removeItem("shule_role")
    localStorage.removeItem("shule_key")
    router.push("/login")
  }

  const getRoleLabel = (role: string) => {
    if (role.startsWith("TEACHER_")) {
      const subject = role.split("_")[1]
      return `${subject} Department`
    }
    return role
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 shadow-sm transition-all duration-300 font-body">
      <SidebarHeader className="p-6 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl colorful-gradient text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
              <ShieldCheck className="h-7 w-7" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5 leading-none overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="font-headline font-black text-xl text-primary tracking-tighter">ShuleDirect</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-black">Pro Hub 2026</span>
              </div>
            )}
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50" onClick={() => setOpenMobile(false)}>
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarMenu className="gap-2">
          {filteredItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "relative group h-12 px-4 rounded-[1.25rem] transition-all duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <Link href={item.url} className="flex items-center">
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-500 group-hover:rotate-12",
                      isActive ? "text-white" : "text-muted-foreground"
                    )} />
                    {!isCollapsed && (
                      <span className="ml-4 font-black text-xs uppercase tracking-widest truncate flex-1">
                        {item.title}
                      </span>
                    )}
                    {!isCollapsed && isActive && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/40 mt-auto space-y-6">
        {!isCollapsed && (
          <div className="p-5 rounded-[2rem] bg-muted/30 border border-dashed border-primary/20 space-y-3 animate-in fade-in duration-1000">
            <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest">
              <Star className="h-3 w-3 fill-primary" /> Powered By
            </div>
            <p className="text-[10px] font-black leading-tight">
              ShulePro Maker Team <br/>
              <span className="text-muted-foreground font-medium italic">Architect Excellence</span>
            </p>
          </div>
        )}

        <div className={cn(
          "flex flex-col gap-3",
          isCollapsed ? "items-center" : ""
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-4 group bg-primary/5 p-3 rounded-2xl border border-primary/10 shadow-inner">
              <div className="h-10 w-10 shrink-0 rounded-full colorful-gradient flex items-center justify-center text-white font-black text-xs shadow-lg animate-pulse-soft">
                {role.charAt(0)}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary truncate">Session Active</span>
                <span className="text-[9px] text-muted-foreground font-black uppercase tracking-tighter truncate">{getRoleLabel(role)}</span>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl text-destructive font-black text-[10px] uppercase tracking-widest hover:bg-destructive/10 transition-all group",
              isCollapsed ? "justify-center" : "w-full"
            )}
          >
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span>Logout Portal</span>}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
