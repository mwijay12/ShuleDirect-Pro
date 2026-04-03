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
  ClipboardList,
  Lightbulb,
  Droplets,
  MoreVertical,
  Activity,
  AlertCircle,
  CheckCircle2
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
import { useToast } from "@/hooks/use-toast"

const hostels = [
  { id: "W-01", name: "Mt. Kilimanjaro Wing", type: "Boys", capacity: 200, occupied: 185, warden: "Mwl. Juma", rooms: 50, safetyScore: 98, block: "Block A" },
  { id: "W-02", name: "Lake Victoria Wing", type: "Girls", capacity: 200, occupied: 198, warden: "Mwl. Neema", rooms: 50, safetyScore: 100, block: "Block B" },
  { id: "W-03", name: "Serengeti Annex", type: "Boys", capacity: 100, occupied: 45, warden: "Mwl. Peter", rooms: 25, safetyScore: 94, block: "Block C" },
  { id: "W-04", name: "Zanzibar House", type: "Girls", capacity: 150, occupied: 142, warden: "Mwl. Sarah", rooms: 38, safetyScore: 96, block: "Block D" },
]

export default function HostelPage() {
  const { toast } = useToast()
  const [selectedWing, setSelectedWing] = useState<typeof hostels[0] | null>(null)

  const handleNewRegistration = () => {
    toast({
      title: "Registration Initialized",
      description: "Allocating bed space in 2026 Housing Node.",
    })
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-1">
        <div className="space-y-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest rounded-full uppercase">
            Logistics & Housing Node
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight">Hostel Management</h1>
          <p className="text-muted-foreground font-medium text-sm">Institutional boarding infrastructure, utility monitoring, and safety audits.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-12 px-6 border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest bg-white shadow-sm">
            Allocation Map
          </Button>
          <Button onClick={handleNewRegistration} className="flex-1 sm:flex-none rounded-full h-12 px-6 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest">
            <Plus className="mr-2 h-4 w-4" /> New Registration
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Boarders", value: "570", sub: "85% Capacity", icon: Users, color: "text-primary" },
          { label: "Empty Beds", value: "80", sub: "Across all Wings", icon: Bed, color: "text-accent" },
          { label: "LUKU Node", value: "TZS 450k", sub: "Electricity Hub", icon: Zap, color: "text-yellow-600" },
          { label: "Water Level", value: "92%", sub: "Reserves Normal", icon: Droplets, color: "text-blue-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-5 sm:p-6 relative">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-2xl font-black mt-2 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest truncate">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="wings" className="space-y-8">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-14 flex w-full sm:w-fit overflow-x-auto shadow-inner">
          <TabsTrigger value="wings" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Hostel Wings</TabsTrigger>
          <TabsTrigger value="utilities" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Utility Pulse</TabsTrigger>
          <TabsTrigger value="maintenance" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Facility Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="wings" className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="border-none shadow-xl overflow-hidden group rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <div className={`h-2 w-full ${hostel.type === "Boys" ? "bg-primary" : "bg-accent"}`} />
              <CardHeader className="pb-4 pt-8 px-8">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2 font-black text-[8px] uppercase tracking-widest">{hostel.block}</Badge>
                    <CardTitle className="text-xl sm:text-2xl font-black group-hover:text-primary transition-colors">{hostel.name}</CardTitle>
                    <CardDescription className="text-xs font-bold">{hostel.type} Accommodation</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-foreground/80">{hostel.occupied}</div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Enrolled Nodes</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Lead Warden</p>
                    <p className="text-sm font-bold text-foreground/70">{hostel.warden}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Safety Index</p>
                    <p className="text-sm font-bold text-green-600">{hostel.safetyScore}%</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Capacity Load</span>
                    <span>{Math.round((hostel.occupied / hostel.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(hostel.occupied / hostel.capacity) * 100} className="h-2 bg-muted/50" />
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  <Badge variant="outline" className="h-6 px-3 text-[9px] font-black uppercase border-primary/10 bg-primary/5 text-primary">CCTV LIVE</Badge>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-10 px-6 font-black text-[10px] uppercase tracking-widest text-primary rounded-full hover:bg-primary/5 transition-all group" onClick={() => setSelectedWing(hostel)}>
                        Inspect Node <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                      <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                          <Home className="h-48 sm:h-64 w-48 sm:w-64 rotate-12" />
                        </div>
                        <SheetHeader className="text-left relative z-10">
                          <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                              <Home className="h-8 w-8" />
                            </div>
                            <div className="space-y-1">
                              <SheetTitle className="text-2xl sm:text-3xl font-black text-primary tracking-tight">{selectedWing?.name}</SheetTitle>
                              <div className="flex items-center gap-3">
                                <Badge className="rounded-full bg-white text-primary border-none shadow-md font-black px-4 py-1 text-[9px] uppercase">{selectedWing?.block}</Badge>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Guardian: {selectedWing?.warden}</span>
                              </div>
                            </div>
                          </div>
                        </SheetHeader>
                      </div>

                      <div className="p-8 sm:p-10 space-y-10">
                        <Tabs defaultValue="overview" className="space-y-10">
                          <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 rounded-2xl h-14 shadow-inner">
                            <TabsTrigger value="overview" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Overview</TabsTrigger>
                            <TabsTrigger value="inspection" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Inspection</TabsTrigger>
                            <TabsTrigger value="health" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Health</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-10">
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent hover:border-primary/10 transition-all text-center shadow-inner group overflow-hidden">
                                 <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-widest group-hover:text-primary transition-colors">Safety Index</p>
                                 <p className="text-3xl font-black text-green-600 tracking-tighter">{selectedWing?.safetyScore}%</p>
                               </div>
                               <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent hover:border-accent/10 transition-all text-center shadow-inner group overflow-hidden">
                                 <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-widest group-hover:text-accent transition-colors">Occupancy</p>
                                 <p className="text-3xl font-black text-accent tracking-tighter">{Math.round((selectedWing?.occupied || 0) / (selectedWing?.capacity || 1) * 100)}%</p>
                               </div>
                            </div>

                            <div className="space-y-6">
                              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 px-2">
                                <Zap className="h-4 w-4 text-yellow-500 shrink-0" /> LUKU Node Status
                              </h3>
                              <Card className="border-none shadow-sm bg-yellow-50/50 p-6 rounded-[2rem] border border-yellow-100">
                                <div className="flex justify-between items-end mb-4">
                                  <div>
                                    <p className="text-xs font-bold text-yellow-900">Current Balance</p>
                                    <p className="text-2xl font-black text-yellow-950">TZS 45,200</p>
                                  </div>
                                  <Badge className="bg-yellow-200 text-yellow-800 border-none font-black text-[8px] px-3 py-1 rounded-full uppercase">Est. 4 Days</Badge>
                                </div>
                                <Progress value={45} className="h-2 bg-yellow-200/50" />
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="inspection" className="space-y-8">
                            <div className="flex justify-between items-center px-2">
                              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-primary shrink-0" /> Audit Checklist
                              </h3>
                              <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-4 py-1 rounded-full uppercase tracking-widest">Weekly Node</Badge>
                            </div>
                            
                            <div className="space-y-3">
                              {[
                                { task: "Room Hygiene Audit", icon: Home, status: "Verified" },
                                { task: "Lighting & Electrical Check", icon: Lightbulb, status: "Healthy" },
                                { task: "Plumbing & Leak Detection", icon: Droplets, status: "Inspected" },
                                { task: "Evening Roll Call Node", icon: Users, status: "Done" },
                                { task: "Emergency Exit Clearance", icon: ShieldCheck, status: "Pending" },
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-muted/50 group hover:border-primary/20 transition-all cursor-pointer">
                                  <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                      <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground/80">{item.task}</span>
                                  </div>
                                  <Badge 
                                    variant={item.status === "Pending" ? "outline" : "secondary"} 
                                    className={cn(
                                      "text-[9px] font-black uppercase tracking-widest px-3 h-6 rounded-full border-none",
                                      item.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                                    )}
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                            <Button className="w-full h-14 rounded-2xl colorful-gradient font-black uppercase text-xs tracking-[0.2em] shadow-xl group">
                              Submit Audit <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </TabsContent>

                          <TabsContent value="health" className="space-y-6">
                             <div className="p-8 rounded-[2.5rem] bg-destructive/5 border border-destructive/10 text-center space-y-4">
                               <Stethoscope className="h-10 w-10 text-destructive mx-auto animate-float" />
                               <div className="space-y-1">
                                 <p className="text-lg font-black text-destructive tracking-tight">Medical Sickbay Node</p>
                                 <p className="text-xs font-medium text-destructive/70">3 Active health logs currently tracked in this wing.</p>
                               </div>
                               <Button variant="outline" className="w-full rounded-full border-destructive/20 text-destructive font-black text-[9px] uppercase tracking-widest h-11">
                                 View Sickbay Registry
                               </Button>
                             </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="utilities" className="space-y-8">
           <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-2xl rounded-[3rem] bg-yellow-50/50 p-10 border border-yellow-100 overflow-hidden relative group">
                 <Zap className="absolute -right-4 -top-4 h-32 w-32 text-yellow-200/40 group-hover:rotate-12 transition-transform" />
                 <div className="relative z-10 space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-yellow-800/60">Electricity Hub</p>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-yellow-900 tracking-tighter">LUKU Control Node</h3>
                      <p className="text-sm font-medium text-yellow-800/70">Centralized institutional electricity management.</p>
                    </div>
                    <div className="flex items-center gap-4 py-4 border-y border-yellow-200/50">
                       <div className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-yellow-600">
                         <Zap className="h-6 w-6" />
                       </div>
                       <div className="flex-1">
                         <p className="text-[9px] font-black uppercase text-yellow-800/40 tracking-widest">Main Node Balance</p>
                         <p className="text-xl font-black text-yellow-900">TZS 1,240,500</p>
                       </div>
                    </div>
                    <Button className="w-full h-12 rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl">Recharge Node</Button>
                 </div>
              </Card>

              <Card className="border-none shadow-2xl rounded-[3rem] bg-blue-50/50 p-10 border border-blue-100 overflow-hidden relative group">
                 <Droplets className="absolute -right-4 -top-4 h-32 w-32 text-blue-200/40 group-hover:rotate-12 transition-transform" />
                 <div className="relative z-10 space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-800/60">Water Infrastructure</p>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-blue-900 tracking-tighter">Reserves Tracking</h3>
                      <p className="text-sm font-medium text-blue-800/70">Main Tank & Reservoir supply status.</p>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black uppercase text-blue-800/60 tracking-widest">
                         <span>Tank Alpha</span>
                         <span>92%</span>
                       </div>
                       <div className="h-3 w-full bg-blue-200/50 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-blue-500 animate-pulse-soft" style={{ width: '92%' }} />
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] justify-center pt-2">
                      <CheckCircle2 className="h-3 w-3" /> Supply Healthy
                    </div>
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-muted/30 p-8 border-b">
              <CardTitle className="text-2xl font-black">Institutional Facility Audit</CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">General maintenance status across primary nodes</CardDescription>
            </CardHeader>
            <CardContent className="p-8 grid gap-6 md:grid-cols-3">
              {[
                { label: "Electricity (LUKU)", value: "Healthy", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
                { label: "Water Infrastructure", value: "Normal Flow", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Hygiene Compliance", value: "Verified Today", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
              ].map((item) => (
                <div key={item.label} className={cn("flex flex-col items-center text-center gap-4 p-8 rounded-[2.5rem] border border-transparent hover:border-muted transition-all", item.bg)}>
                  <div className={`h-16 w-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center ${item.color} animate-float`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-black text-foreground/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="p-10 rounded-[3rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4 mx-1">
         <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary border border-primary/10">
           <AlertCircle className="h-7 w-7" />
         </div>
         <div className="space-y-1">
           <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">Institutional Safety Protocol</p>
           <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm font-medium">
             All hostel wings are archived under the 2026 Housing Node. Monthly maintenance audits are mandated by the principal's office for national compliance.
           </p>
         </div>
      </div>
    </div>
  )
}
