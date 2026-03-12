"use client"

import * as React from "react"
import { useState } from "react"
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
  AlertTriangle
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

const routes = [
  { id: "R-01", name: "Mbezi Beach - Kawe", driver: "Bakari Said", phone: "0712-333444", vehicle: "T 442 ABC", students: 42, status: "Active", fuelRating: "8.5 km/l", capacity: 60 },
  { id: "R-02", name: "Kijitonyama - Sinza", driver: "John Mrema", phone: "0754-111222", vehicle: "T 119 XYZ", students: 38, status: "Active", fuelRating: "7.2 km/l", capacity: 50 },
  { id: "R-03", name: "Mikocheni - Msasani", driver: "Hassan Ali", phone: "0621-777888", vehicle: "T 901 DFG", students: 35, status: "Active", fuelRating: "9.1 km/l", capacity: 45 },
  { id: "R-04", name: "Tegeta - Bunju", driver: "Peter Lema", phone: "0713-555666", vehicle: "T 202 JKL", students: 45, status: "Active", fuelRating: "6.8 km/l", capacity: 60 },
]

export default function TransportPage() {
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Transport Management</h1>
          <p className="text-muted-foreground">Manage bus routes, tracking, and student transport assignments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" /> Scheduling
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Route
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-sm bg-accent text-accent-foreground">
          <CardHeader className="pb-2">
            <CardDescription className="text-white/80 uppercase text-[10px] font-bold tracking-widest">Active Fleet</CardDescription>
            <CardTitle className="text-3xl">12 Buses</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Transport Users</CardDescription>
            <CardTitle className="text-3xl">480 Students</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Covered Areas</CardDescription>
            <CardTitle className="text-3xl">24 Zones</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Safety Compliance</CardDescription>
            <CardTitle className="text-3xl text-green-600">100%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Routes</CardTitle>
                <CardDescription>Daily transport log and driver details</CardDescription>
              </div>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Find route..." className="pl-9 h-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="text-center">Students</TableHead>
                  <TableHead className="text-right">Management</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id} className="group">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">{route.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{route.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{route.driver}</span>
                        <span className="text-[10px] text-muted-foreground">{route.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[10px]">{route.vehicle}</Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium">{route.students}</TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-primary font-bold text-xs rounded-full h-8" onClick={() => setSelectedRoute(route)}>
                            Route View
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-xl">
                          <SheetHeader className="mb-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Bus className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <SheetTitle className="text-2xl font-headline font-bold">{selectedRoute?.name}</SheetTitle>
                                <SheetDescription className="text-xs uppercase font-bold tracking-tighter">{selectedRoute?.vehicle} • {selectedRoute?.status}</SheetDescription>
                              </div>
                            </div>
                          </SheetHeader>

                          <Tabs defaultValue="details" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 h-10 rounded-xl">
                              <TabsTrigger value="details" className="text-xs font-bold">Details</TabsTrigger>
                              <TabsTrigger value="students" className="text-xs font-bold">Students</TabsTrigger>
                              <TabsTrigger value="logs" className="text-xs font-bold">Logs</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/10 transition-colors">
                                  <div className="flex items-center gap-2 mb-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead Driver</span>
                                  </div>
                                  <p className="text-sm font-bold">{selectedRoute?.driver}</p>
                                  <p className="text-xs text-muted-foreground">{selectedRoute?.phone}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/10 transition-colors">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Fuel className="h-4 w-4 text-orange-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fuel Consumption</span>
                                  </div>
                                  <p className="text-sm font-bold">{selectedRoute?.fuelRating}</p>
                                  <p className="text-xs text-muted-foreground">Current Avg</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                                  <span>Vehicle Capacity</span>
                                  <span>{Math.round((selectedRoute?.students || 0) / (selectedRoute?.capacity || 1) * 100)}% Used</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${Math.round((selectedRoute?.students || 0) / (selectedRoute?.capacity || 1) * 100)}%` }} 
                                  />
                                </div>
                                <p className="text-[10px] text-muted-foreground">{selectedRoute?.students} Students Assigned / {selectedRoute?.capacity} Seats Available</p>
                              </div>

                              <Card className="border-none shadow-none bg-primary/5">
                                <CardHeader className="p-4 pb-2">
                                  <CardTitle className="text-xs font-bold flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" /> Maintenance Health
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">Engine Oil Status</span>
                                      <span className="font-bold text-green-600">Good</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">Brake System</span>
                                      <span className="font-bold text-green-600">Inspected</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">Next Major Service</span>
                                      <span className="font-bold text-primary">In 1,240 km</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="students">
                              <div className="rounded-2xl border border-dashed p-4 text-center">
                                <Users className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-xs font-bold text-muted-foreground mb-4">42 Students assigned to this route</p>
                                <Button size="sm" variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-wider">
                                  Export Manifest
                                </Button>
                              </div>
                            </TabsContent>

                            <TabsContent value="logs" className="space-y-4">
                              <div className="space-y-3">
                                {[
                                  { date: "May 12, 07:15 AM", event: "Completed Morning Drop-off", status: "Success" },
                                  { date: "May 11, 04:30 PM", event: "Completed Evening Drop-off", status: "Success" },
                                  { date: "May 11, 07:22 AM", event: "Route Delay (Heavy Traffic)", status: "Alert" },
                                ].map((log, i) => (
                                  <div key={i} className="flex gap-4 p-3 bg-muted/20 rounded-xl relative overflow-hidden">
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", log.status === "Alert" ? "bg-orange-500" : "bg-green-500")} />
                                    <div>
                                      <p className="text-xs font-bold">{log.event}</p>
                                      <p className="text-[9px] text-muted-foreground font-mono">{log.date}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Fleet Safety & Tracking</CardTitle>
            <CardDescription>Real-time updates from drivers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-dashed border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="font-bold text-sm">Pre-Trip Inspection</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All 12 buses have completed the mandatory morning safety check for today.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h4>
              {[
                { time: "07:15 AM", msg: "Route R-01 arrived at school", type: "success" },
                { time: "07:10 AM", msg: "Route R-03 10 mins delay (Traffic)", type: "warning" },
                { time: "06:45 AM", msg: "Route R-02 started morning pickup", type: "info" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <span className="font-mono text-muted-foreground shrink-0">{log.time}</span>
                  <span className="font-medium">{log.msg}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-2 rounded-full font-bold" variant="secondary">
              Live Fleet Map <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
