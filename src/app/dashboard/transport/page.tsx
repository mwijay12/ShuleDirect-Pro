
"use client"

import * as React from "react"
import { 
  Bus, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Clock, 
  Search,
  Plus,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const routes = [
  { id: "R-01", name: "Mbezi Beach - Kawe", driver: "Bakari Said", phone: "0712-333444", vehicle: "T 442 ABC", students: 42, status: "Active" },
  { id: "R-02", name: "Kijitonyama - Sinza", driver: "John Mrema", phone: "0754-111222", vehicle: "T 119 XYZ", students: 38, status: "Active" },
  { id: "R-03", name: "Mikocheni - Msasani", driver: "Hassan Ali", phone: "0621-777888", vehicle: "T 901 DFG", students: 35, status: "Active" },
  { id: "R-04", name: "Tegeta - Bunju", driver: "Peter Lema", phone: "0713-555666", vehicle: "T 202 JKL", students: 45, status: "Active" },
]

export default function TransportPage() {
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
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{route.name}</span>
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
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-2 py-0 h-5">
                        {route.status}
                      </Badge>
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
            
            <Button className="w-full mt-2" variant="secondary">
              Live Fleet Map <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
