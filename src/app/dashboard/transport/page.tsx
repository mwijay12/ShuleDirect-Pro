"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { 
  Bus, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Clock, 
  Search,
  Plus,
  ArrowRight,
  User,
  Fuel,
  History,
  AlertTriangle,
  QrCode,
  Smartphone,
  CheckCircle2,
  Zap,
  Globe
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Html5QrcodeScanner } from "html5-qrcode"

const routes = [
  { id: "R-01", name: "Mbezi Beach - Kawe", driver: "Bakari Said", phone: "0712-333444", vehicle: "T 442 ABC", students: 42, status: "Active", fuelRating: "8.5 km/l", capacity: 60 },
  { id: "R-02", name: "Kijitonyama - Sinza", driver: "John Mrema", phone: "0754-111222", vehicle: "T 119 XYZ", students: 38, status: "Active", fuelRating: "7.2 km/l", capacity: 50 },
  { id: "R-03", name: "Mikocheni - Msasani", driver: "Hassan Ali", phone: "0621-777888", vehicle: "T 901 DFG", students: 35, status: "Active", fuelRating: "9.1 km/l", capacity: 45 },
  { id: "R-04", name: "Tegeta - Bunju", driver: "Peter Lema", phone: "0713-555666", vehicle: "T 202 JKL", students: 45, status: "Active", fuelRating: "6.8 km/l", capacity: 60 },
]

export default function TransportPage() {
  const { toast } = useToast()
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  const handleStartSmartBoarding = () => {
    setIsScanning(true)
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("boarding-reader", { fps: 10, qrbox: 250 }, false)
      scanner.render((decodedText) => {
        scanner.clear()
        setIsScanning(false)
        toast({
          title: "Student Boarded",
          description: `ID: ${decodedText} verified. WhatsApp alert dispatched to parent.`,
        })
      }, (err) => {})
      scannerRef.current = scanner
    }, 100)
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-4 py-1 text-[9px] font-black tracking-widest uppercase rounded-full shadow-sm">
            Institutional Fleet Node 2026
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight uppercase">Transport Logistics</h1>
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest leading-none">Smart route tracking and student boarding verification.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Dialog open={isScanning} onOpenChange={setIsScanning}>
            <DialogTrigger asChild>
              <Button onClick={handleStartSmartBoarding} variant="outline" className="flex-1 sm:flex-none rounded-full h-12 px-8 border-primary/20 text-primary bg-white shadow-md font-black text-[10px] uppercase tracking-widest group">
                <QrCode className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Smart Boarding
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden max-w-md border-none shadow-2xl">
              <DialogHeader className="bg-primary/5 p-8 border-b">
                <DialogTitle className="text-xl font-black text-primary uppercase text-center">Live Boarding Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-center">Scan Student ID for real-time dispatch</DialogDescription>
              </DialogHeader>
              <div className="p-8">
                <div id="boarding-reader" className="w-full aspect-square bg-muted rounded-3xl overflow-hidden border-2 border-dashed border-primary/20" />
              </div>
              <div className="p-8 pt-0 flex flex-col items-center text-center gap-4">
                <div className="flex items-center gap-2 text-green-600 font-black text-[9px] uppercase tracking-widest">
                  <Globe className="h-3 w-3 animate-pulse" /> Beem SMS Node Active
                </div>
                <Button variant="ghost" className="w-full font-black text-[10px] uppercase" onClick={() => setIsScanning(false)}>Cancel Dispatch</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="flex-1 sm:flex-none rounded-full h-12 px-8 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Route Node
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Fleet", value: "12 Buses", sub: "Operational", icon: Bus, color: "text-primary" },
          { label: "Users", value: "480 Node", sub: "Assigned", icon: Users, color: "text-accent" },
          { label: "Safety Index", value: "100%", sub: "Audit Verified", icon: ShieldCheck, color: "text-green-600" },
          { label: "Beem Credits", value: "4,280", sub: "SMS Alerts", icon: Zap, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-2xl font-black mt-2 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest truncate">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-none shadow-2xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
          <CardHeader className="bg-muted/30 p-8 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black uppercase">Institutional Routes</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Fleet dispatch and driver verification hub</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search route node..." className="pl-10 h-10 rounded-full border-none bg-white shadow-inner font-bold text-xs" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none h-14">
                  <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Route Node</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Lead Driver</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Capacity</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-all">
                    <TableCell className="pl-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{route.name}</span>
                        <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{route.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"><User className="h-4 w-4" /></div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black">{route.driver}</span>
                          <span className="text-[9px] text-muted-foreground font-medium">{route.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-black text-[9px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary">{route.students} / {route.capacity}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={(open) => open && setSelectedRoute(route)}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" className="h-9 px-6 rounded-full font-black text-[9px] uppercase tracking-widest text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all">Fleet View</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                          <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                              <Bus className="h-48 w-48 rotate-12" />
                            </div>
                            <SheetHeader className="text-left relative z-10">
                              <div className="flex items-center gap-6">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                                  <Bus className="h-8 w-8" />
                                </div>
                                <div className="space-y-1">
                                  <SheetTitle className="text-2xl font-black text-primary tracking-tight uppercase">{selectedRoute?.name}</SheetTitle>
                                  <Badge className="rounded-full bg-white text-primary border-none shadow-md font-black px-4 py-1 text-[9px] uppercase">{selectedRoute?.vehicle}</Badge>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>
                          
                          <div className="p-8 sm:p-10 space-y-10">
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent hover:border-primary/10 transition-all text-center shadow-inner overflow-hidden">
                                 <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-widest">Efficiency</p>
                                 <p className="text-3xl font-black text-green-600 tracking-tighter">{selectedRoute?.fuelRating}</p>
                               </div>
                               <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent hover:border-accent/10 transition-all text-center shadow-inner overflow-hidden">
                                 <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-widest">Load Factor</p>
                                 <p className="text-3xl font-black text-accent tracking-tighter">{Math.round((selectedRoute?.students || 0) / (selectedRoute?.capacity || 1) * 100)}%</p>
                               </div>
                            </div>

                            <div className="space-y-6">
                              <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Logistics History</h3>
                                <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-4 py-1 rounded-full">LIVE FEED</Badge>
                              </div>
                              <div className="space-y-3">
                                {[
                                  { msg: "Morning Pickup Completed Node R-01", time: "07:45 AM", status: "Success" },
                                  { msg: "Fleet Maintenance: Oil Synthesis", time: "May 10", status: "Verified" },
                                ].map((log, i) => (
                                  <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm border border-muted/50 group hover:border-primary/20 transition-all">
                                    <div>
                                      <p className="text-xs font-black tracking-tight text-foreground/80">{log.msg}</p>
                                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1">{log.time}</p>
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black border-primary/20 text-primary">{log.status}</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white overflow-hidden relative group p-8">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
               <ShieldCheck className="h-24 w-24" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Institutional Safety Hub</p>
                  <h3 className="text-xl font-black tracking-tight">Pure Performance Tracking</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Zero-app parent communication node. Automated WhatsApp alerts dispatched via n8n triggers for every boarding event.
                </p>
                <Button className="w-full rounded-2xl h-12 bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-2xl">
                  Live Fleet Map
                </Button>
             </div>
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] bg-accent/5 border border-accent/10 p-8">
             <div className="flex items-center gap-3 mb-4 text-accent">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Gateway Notice</span>
             </div>
             <p className="text-xs font-medium text-accent/80 leading-relaxed">
               Fleet safety audits for the 2026 Season are mandatory. Ensure all vehicle nodes have completed the pre-trip verification.
             </p>
             <Button variant="outline" size="sm" className="mt-6 w-full rounded-full border-accent/20 text-accent font-black text-[9px] uppercase tracking-widest h-10">
               Access Safety Logs
             </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
