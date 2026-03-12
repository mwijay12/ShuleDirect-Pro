"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Bed, 
  Home, 
  Users, 
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Thermometer,
  Stethoscope,
  ClipboardList
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const hostels = [
  { name: "Mt. Kilimanjaro Wing", type: "Boys", capacity: 200, occupied: 185, warden: "Mwl. Juma", rooms: 50, safetyScore: 98 },
  { name: "Lake Victoria Wing", type: "Girls", capacity: 200, occupied: 198, warden: "Mwl. Neema", rooms: 50, safetyScore: 100 },
  { name: "Serengeti Annex", type: "Boys", capacity: 100, occupied: 45, warden: "Mwl. Peter", rooms: 25, safetyScore: 94 },
  { name: "Zanzibar House", type: "Girls", capacity: 150, occupied: 142, warden: "Mwl. Sarah", rooms: 38, safetyScore: 96 },
]

export default function HostelPage() {
  const [selectedWing, setSelectedWing] = useState<typeof hostels[0] | null>(null)

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
        <TabsList className="bg-muted/50 p-1 h-11 rounded-xl">
          <TabsTrigger value="wings" className="font-bold rounded-lg">Hostel Wings</TabsTrigger>
          <TabsTrigger value="students" className="font-bold rounded-lg">Student List</TabsTrigger>
          <TabsTrigger value="maintenance" className="font-bold rounded-lg">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="wings" className="grid gap-6 md:grid-cols-2">
          {hostels.map((hostel) => (
            <Card key={hostel.name} className="border-none shadow-sm overflow-hidden group">
              <div className={`h-1.5 w-full ${hostel.type === "Boys" ? "bg-primary" : "bg-accent"}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{hostel.name}</CardTitle>
                    <CardDescription>{hostel.type} Accommodation</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs font-bold">{hostel.occupied}/{hostel.capacity}</Badge>
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
                    <Badge variant="secondary" className="h-5 px-1.5 text-[9px] font-bold">WI-FI</Badge>
                    <Badge variant="secondary" className="h-5 px-1.5 text-[9px] font-bold">CCTV</Badge>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 font-bold text-xs text-primary rounded-full hover:bg-primary/5" onClick={() => setSelectedWing(hostel)}>
                        Manage <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-xl">
                      <SheetHeader className="mb-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                            <Home className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <SheetTitle className="text-2xl font-headline font-bold">{selectedWing?.name}</SheetTitle>
                            <SheetDescription className="text-xs uppercase font-bold tracking-tighter">{selectedWing?.type} Wing • {selectedWing?.warden}</SheetDescription>
                          </div>
                        </div>
                      </SheetHeader>

                      <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 h-10 rounded-xl">
                          <TabsTrigger value="overview" className="text-xs font-bold">Overview</TabsTrigger>
                          <TabsTrigger value="health" className="text-xs font-bold">Health</TabsTrigger>
                          <TabsTrigger value="utilities" className="text-xs font-bold">Utilities</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl bg-muted/20 text-center">
                               <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Safety Score</p>
                               <p className="text-2xl font-black text-green-600">{selectedWing?.safetyScore}%</p>
                             </div>
                             <div className="p-4 rounded-2xl bg-muted/20 text-center">
                               <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Occupancy</p>
                               <p className="text-2xl font-black text-primary">{Math.round((selectedWing?.occupied || 0) / (selectedWing?.capacity || 1) * 100)}%</p>
                             </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                              <ClipboardList className="h-4 w-4 text-primary" /> Daily Inspection Checklist
                            </h3>
                            <div className="space-y-2">
                              {[
                                { task: "Room Hygiene Check", status: "Done" },
                                { task: "Roll Call Completion", status: "Verified" },
                                { task: "Common Area Sanitization", status: "Done" },
                                { task: "Emergency Exit Check", status: "Pending" },
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-muted/20 rounded-xl text-xs">
                                  <span>{item.task}</span>
                                  <Badge variant={item.status === "Pending" ? "outline" : "secondary"} className="text-[10px] font-bold">{item.status}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="health" className="space-y-4">
                           <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10">
                             <div className="flex items-center gap-3 mb-2">
                               <Stethoscope className="h-5 w-5 text-destructive" />
                               <span className="font-bold text-sm text-destructive">Medical Log</span>
                             </div>
                             <p className="text-xs text-muted-foreground">3 students currently in the wing sickbay with minor seasonal symptoms.</p>
                           </div>
                           <Button variant="outline" className="w-full rounded-full text-xs font-bold">
                             View Health Records
                           </Button>
                        </TabsContent>

                        <TabsContent value="utilities" className="space-y-6">
                           <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                 <Zap className="h-4 w-4 text-yellow-500" />
                                 <span className="text-xs font-bold">Electricity (LUKU)</span>
                               </div>
                               <span className="text-xs font-mono font-bold">Balance: TZS 450,200</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-yellow-500" style={{ width: '45%' }} />
                             </div>
                           </div>
                           <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                 <Thermometer className="h-4 w-4 text-blue-500" />
                                 <span className="text-xs font-bold">Water Supply Level</span>
                               </div>
                               <span className="text-xs font-mono font-bold">92% Tank Full</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500" style={{ width: '92%' }} />
                             </div>
                           </div>
                        </TabsContent>
                      </Tabs>
                    </SheetContent>
                  </Sheet>
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
