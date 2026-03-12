
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
  X
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
    <Sidebar collapsible="icon" className="border-r border-border/50 shadow-sm transition-all duration-300">
      <SidebarHeader className="p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl colorful-gradient text-white shadow-lg">
              <ShieldCheck className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                <span className="font-headline font-extrabold text-lg text-primary tracking-tighter">ShuleDirect</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Pro Hub</span>
              </div>
            )}
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setOpenMobile(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="px-3 gap-1.5">
          {filteredItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "relative group h-11 px-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary hover:bg-primary/15" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <Link href={item.url} className="flex items-center">
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                    {!isCollapsed && (
                      <span className="ml-3 font-bold text-sm truncate flex-1">
                        {item.title}
                      </span>
                    )}
                    {!isCollapsed && isActive && (
                      <ChevronRight className="h-3 w-3 opacity-50" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 mt-auto">
        <div className={cn(
          "flex flex-col gap-2",
          isCollapsed ? "items-center" : ""
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 group bg-muted/30 p-2 rounded-2xl">
              <div className="h-9 w-9 shrink-0 rounded-full colorful-gradient flex items-center justify-center text-white font-extrabold text-xs">
                {role.charAt(0)}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate">Career Access</span>
                <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{getRoleLabel(role)}</span>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2 p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors",
              isCollapsed ? "justify-center" : "w-full"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="text-xs font-bold">Logout Portal</span>}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
