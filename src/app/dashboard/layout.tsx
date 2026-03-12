
"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Bell, Search, Globe, CloudCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-6 sticky top-0 z-10">
          <SidebarTrigger />
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students, results, invoices..."
                className="pl-9 bg-muted/50 border-none"
              />
            </div>
            <Badge variant="outline" className="hidden lg:flex items-center gap-1.5 border-green-200 bg-green-50 text-green-700">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Offline Ready (Delta Sync Active)
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Mlimani Academy</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Dar Es Salaam, TZ</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
