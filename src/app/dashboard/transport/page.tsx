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
  Globe,
  Navigation,
  Loader2
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
import { triggerN8nWebhook } from "@/lib/n8n"

const routes = [
  { id: "R-01", name: "Mbezi Beach - Kawe", driver: "Bakari Said", phone: "0712-333444", vehicle: "T 442 ABC", students: 42, status: "Active", fuelRating: "8.5 km/l", capacity: 60, currentLoc: "Kawe Node" },
  { id: "R-02", name: "Kijitonyama - Sinza", driver: "John Mrema", phone: "0754-111222", vehicle: "T 119 XYZ", students: 38, status: "Standby", fuelRating: "7.2 km/l", capacity: 50, currentLoc: "Depot" },
  { id: "R-03", name: "Mikocheni - Msasani", driver: "Hassan Ali", phone: "0621-777888", vehicle: "T 901 DFG", students: 35, status: "Active", fuelRating: "9.1 km/l", capacity: 45, currentLoc: "Mikocheni" },
  { id: "R-04", name: "Tegeta - Bunju", driver: "Peter Lema", phone: "0713-555666", vehicle: "T 202 JKL", students: 45, status: "Maintenance", fuelRating: "6.8 km/l", capacity: 60, currentLoc: "Garage" },
]

export default function TransportPage() {
  const { toast } = useToast()
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isDispatching, setIsDispatching] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  const handleBatchDispatch = (routeName: string) => {
    setIsDispatching(true)
    // Real n8n trigger for batch parent notification
    triggerN8nWebhook("attendance-update", { 
      route: routeName, 
      status: "Dispatched",
      msg: `Institutional Bus for ${routeName} has commenced transit.`
    })

    setTimeout(() => {
      setIsDispatching(false)
      toast({
        title: "Route Dispatched",
        description: `Batch alerts sent to parents on ${routeName}.`,
      })
    }, 1500)
  }

  const handleStartSmartBoarding = () => {
    setIsScanning(true)
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("boarding-reader", { fps: 10, qrbox: 250 }, false)
      scanner.render((decodedText) => {
        scanner.clear()
        setIsScanning(false)
        toast({
          title: "Individual Verified",
          description: `Student ID: ${decodedText} assigned to ${selectedRoute?.name || 'Route Alpha'}.`,
        })
      }, (err) => {})
      scannerRef.current = scanner
    }, 100)
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black tracking-widest uppercase rounded-full">
            Institutional Fleet Hub 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-headline font-black text-primary tracking-tight uppercase">Logistics Node</h1>
          <p className="text-muted-foreground font-bold text-[9px] uppercase tracking-widest leading-none">Operational fleet management & batch route dispatch.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Dialog open={isScanning} onOpenChange={setIsScanning}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 px-6 border-primary/20 text-primary bg-white shadow-sm font-black text-[10px] uppercase tracking-widest group">
                <QrCode className="mr-2 h-4 w-4" /> Verify Node
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-0 overflow-hidden max-w-md border-none shadow-2xl">
              <DialogHeader className="bg-primary/5 p-8 border-b">
                <DialogTitle className="text-xl font-black text-primary uppercase text-center">Identity Verification</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-center">Scan Student ID for quick assignment check</DialogDescription>
              </DialogHeader>
              <div className="p-8">
                <div id="boarding-reader" className="w-full aspect-square bg-muted rounded-3xl overflow-hidden border-2 border-dashed border-primary/20" />
              </div>
              <div className="p-8 pt-0 flex flex-col items-center text-center gap-4">
                <Button variant="ghost" className="w-full font-black text-[10px] uppercase" onClick={() => setIsScanning(false)}>Close Scanner</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="flex-1 sm:flex-none rounded-full h-11 px-8 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> New Route
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Fleet Ready", value: "12 Buses", sub: "Verified", icon: Bus, color: "text-primary" },
          { label: "Active Routes", value: "8 Nodes", sub: "In Transit", icon: Navigation, color: "text-accent" },
          { label: "Safety Score", value: "100%", sub: "Audit Passed", icon: ShieldCheck, color: "text-green-600" },
          { label: "Beem Node", value: "4,280", sub: "SMS Balance", icon: Zap, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-md bg-white/60 backdrop-blur-md rounded-[1.5rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-5 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16" />
                </div>
                <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl font-black mt-1 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest truncate">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
          <CardHeader className="bg-muted/30 p-6 sm:p-8 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Institutional Routes</CardTitle>
              <CardDescription className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Manage fleet dispatch & real-time route status</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search route..." className="pl-10 h-10 rounded-full border-none bg-white shadow-inner font-bold text-xs" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none h-14">
                  <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Route Hub</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Lead Personnel</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Status</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-all">
                    <TableCell className="pl-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{route.name}</span>
                        <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{route.vehicle}</span>
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
                      <Badge className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border-none",
                        route.status === "Active" ? "bg-green-100 text-green-700" :
                        route.status === "Maintenance" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      )}>
                        {route.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleBatchDispatch(route.name)}
                          disabled={isDispatching || route.status !== "Active" && route.status !== "Standby"}
                          className="h-9 px-4 rounded-full font-black text-[9px] uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-md"
                        >
                          {isDispatching ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Navigation className="h-3 w-3 mr-2" />}
                          Dispatch Batch
                        </Button>
                        <Sheet onOpenChange={(open) => open && setSelectedRoute(route)}>
                          <SheetTrigger asChild>
                            <Button variant="ghost" className="h-9 px-4 rounded-full font-black text-[9px] uppercase tracking-widest text-primary hover:bg-primary/5">Details</Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-l-0 shadow-2xl p-0">
                            <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                              <Bus className="absolute top-0 right-0 p-10 opacity-5 h-64 w-64 rotate-12" />
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
                                 <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent text-center shadow-inner">
                                   <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Efficiency</p>
                                   <p className="text-2xl font-black text-green-600 tracking-tighter">{selectedRoute?.fuelRating}</p>
                                 </div>
                                 <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent text-center shadow-inner">
                                   <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Payload</p>
                                   <p className="text-2xl font-black text-accent tracking-tighter">{selectedRoute?.students} Nodes</p>
                                 </div>
                              </div>

                              <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Operational History</h3>
                                  <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-4 py-1 rounded-full uppercase">Audit Feed</Badge>
                                </div>
                                <div className="space-y-3">
                                  {[
                                    { msg: "Batch Dispatch: Departure Confirmation", time: "07:15 AM", status: "Success" },
                                    { msg: "Safety Hub: Pre-trip Inspection", time: "06:45 AM", status: "Verified" },
                                    { msg: "Fuel Node: Replenished 45L", time: "May 12", status: "Logged" },
                                  ].map((log, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-muted/50">
                                      <div>
                                        <p className="text-xs font-black tracking-tight text-foreground/80">{log.msg}</p>
                                        <p className="text-[9px] text-muted-foreground font-black uppercase mt-1">{log.time}</p>
                                      </div>
                                      <Badge variant="outline" className="text-[8px] font-black border-primary/20 text-primary uppercase">{log.status}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white overflow-hidden relative group p-8">
             <ShieldCheck className="absolute top-0 right-0 p-6 opacity-10 h-32 w-32 group-hover:scale-110 transition-transform" />
             <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Institutional Guarantee</p>
                  <h3 className="text-xl font-black tracking-tight">Pure Fleet Safety</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Simplify parent communication with Batch Dispatch. One click notifies everyone on the route, reducing staff workload while maintaining 100% visibility.
                </p>
                <Button className="w-full rounded-2xl h-12 bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-2xl">
                  Fleet Map Protocol
                </Button>
             </div>
          </Card>

          <Card className="border-none shadow-xl rounded-[2rem] bg-accent/5 border border-accent/10 p-8">
             <div className="flex items-center gap-3 mb-4 text-accent">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Maintenance Node</span>
             </div>
             <p className="text-xs font-medium text-accent/80 leading-relaxed">
               Bus T 202 JKL is currently offline for scheduled engine synthesis. Ensure Route R-04 standby vehicle is active for the evening cycle.
             </p>
             <Button variant="outline" size="sm" className="mt-6 w-full rounded-full border-accent/20 text-accent font-black text-[9px] uppercase tracking-widest h-10">
               Safety Logs
             </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
