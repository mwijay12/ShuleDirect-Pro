
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Banknote, 
  Sparkles, 
  Settings,
  ShieldCheck,
  FileSpreadsheet,
  Bus,
  Bed,
  MessageSquare
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students (Wanafunzi)",
    url: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Academics (Taaluma)",
    url: "/dashboard/academics",
    icon: GraduationCap,
  },
  {
    title: "Finance (Ada)",
    url: "/dashboard/finance",
    icon: Banknote,
  },
  {
    title: "Transport (Usafiri)",
    url: "/dashboard/transport",
    icon: Bus,
  },
  {
    title: "Hostel (Hosteli)",
    url: "/dashboard/hostel",
    icon: Bed,
  },
  {
    title: "AI Hub",
    url: "/dashboard/ai-tools",
    icon: Sparkles,
  },
  {
    title: "NECTA Reports",
    url: "/dashboard/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-lg text-primary">ShuleDirect</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Pro Version</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
                className="transition-all duration-200"
              >
                <Link href={item.url}>
                  <item.icon />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Jane Doe</span>
            <span className="text-xs text-muted-foreground">Administrator</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
