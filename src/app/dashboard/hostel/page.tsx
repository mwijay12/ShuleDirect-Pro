
"use client"

import * as React from "react"
import { 
  Bed, 
  Home, 
  Users, 
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Thermometer,
  Zap
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const hostels = [
  { name: "Mt. Kilimanjaro Wing", type: "Boys", capacity: 200, occupied: 185, warden: "Mwl. Juma", rooms: 50 },
  { name: "Lake Victoria Wing", type: "Girls", capacity: 200, occupied: 198, warden: "Mwl. Neema", rooms: 50 },
  { name: "Serengeti Annex", type: "Boys", capacity: 100, occupied: 45, warden: "Mwl. Peter", rooms: 25 },
  { name: "Zanzibar House", type: "Girls", capacity: 150, occupied: 142, warden: "Mwl. Sarah", rooms: 38 },
]

export default function HostelPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Hostel Management</h1>
          <p className="text-muted-foreground">Oversee boarding facilities, room allocations, and student safety.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Allocation Map
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Registration
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Total Boarders</CardDescription>
            <CardTitle className="text-3xl">570 Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={85} className="h-2" />
              <span className="text-xs font-bold">85% Full</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Available Beds</CardDescription>
            <CardTitle className="text-3xl text-accent">80</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across all 4 hostel wings</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Incident Reports</CardDescription>
            <CardTitle className="text-3xl text-destructive">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600 font-bold">Clean record for 14 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wings" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="wings">Hostel Wings</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="wings" className="grid gap-6 md:grid-cols-2">
          {hostels.map((hostel) => (
            <Card key={hostel.name} className="border-none shadow-sm overflow-hidden group">
              <div className={`h-1.5 w-full ${hostel.type === "Boys" ? "bg-primary" : "bg-accent"}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{hostel.name}</CardTitle>
                    <CardDescription>{hostel.type} Accommodation</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono">{hostel.occupied}/{hostel.capacity}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Warden</p>
                    <p className="text-sm font-semibold">{hostel.warden}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Rooms</p>
                    <p className="text-sm font-semibold">{hostel.rooms} Fully Setup</p>
                  </div>
                </div>
                <div className="pt-2 border-t flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">Wi-Fi</Badge>
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">CCTV</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 group-hover:text-primary transition-colors">
                    Manage <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="maintenance">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>System & Maintenance Health</CardTitle>
              <CardDescription>Status of facility utilities</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Electricity (LUKU)", value: "Healthy", icon: Zap, color: "text-yellow-500" },
                { label: "Water Supply", value: "Normal Flow", icon: Home, color: "text-blue-500" },
                { label: "Hygiene Status", value: "Inspected Today", icon: ShieldCheck, color: "text-green-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className={`p-2 rounded-lg bg-background shadow-sm ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
