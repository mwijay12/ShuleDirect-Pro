
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Banknote, 
  Settings,
  ShieldCheck,
  FileSpreadsheet,
  Bus,
  Bed,
  ClipboardCheck,
  Zap,
  ChevronRight
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

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students (Wanafunzi)", url: "/dashboard/students", icon: Users },
  { title: "Attendance (Mahudhurio)", url: "/dashboard/attendance", icon: ClipboardCheck },
  { title: "Academics (Taaluma)", url: "/dashboard/academics", icon: GraduationCap },
  { title: "Finance (Ada na Fedha)", url: "/dashboard/finance", icon: Banknote },
  { title: "Transport (Usafiri)", url: "/dashboard/transport", icon: Bus },
  { title: "Hostel (Hosteli)", url: "/dashboard/hostel", icon: Bed },
  { title: "Insights (Reports & AI)", url: "/dashboard/reports", icon: Zap },
  { title: "Settings (Mipangilio)", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 shadow-sm transition-all duration-300">
      <SidebarHeader className="p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl colorful-gradient text-white shadow-lg shadow-primary/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col gap-0.5 leading-none overflow-hidden transition-all duration-300">
              <span className="font-headline font-extrabold text-lg text-primary tracking-tighter">ShuleDirect</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Pro Version</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="px-3 gap-1.5">
          {navItems.map((item) => {
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
                >
                  <Link href={item.url} className="flex items-center">
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
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
          "flex items-center gap-3 group bg-muted/30 p-2 rounded-2xl transition-all",
          isCollapsed ? "justify-center p-0 bg-transparent" : ""
        )}>
          <div className="h-9 w-9 shrink-0 rounded-full colorful-gradient flex items-center justify-center text-white font-extrabold text-xs shadow-md">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold truncate">Jane Doe</span>
              <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Super Admin</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
