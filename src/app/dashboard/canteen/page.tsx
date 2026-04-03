"use client"

import * as React from "react"
import { useState } from "react"
import { 
  ShoppingCart, 
  Wallet, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  Search,
  Plus,
  Zap,
  ShieldCheck,
  Smartphone,
  Utensils,
  History
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const canteenTransactions = [
  { id: "CAN-101", student: "Amani Mwamba", item: "Balanced Lunch Node", amount: "2,500", time: "12:45 PM", status: "Paid" },
  { id: "CAN-102", student: "Careen Mushi", item: "Health Snack Node", amount: "1,200", time: "10:30 AM", status: "Paid" },
  { id: "CAN-103", student: "Baraka Juma", item: "Evening Tea Node", amount: "800", time: "04:15 PM", status: "Paid" },
]

export default function CanteenPage() {
  const { toast } = useToast()

  const handleRefillWallet = () => {
    toast({
      title: "Mobile Money Node Activated",
      description: "Redirecting to ClickPesa for student wallet top-up.",
    })
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-1">
        <div className="space-y-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest rounded-full uppercase shadow-sm">
            Cashless Canteen Hub 2026
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight uppercase">Dietary & Retail Node</h1>
          <p className="text-muted-foreground font-medium text-sm">Institutional nutrition tracking and secure student wallet management.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Button variant="outline" onClick={handleRefillWallet} className="flex-1 sm:flex-none rounded-full h-12 px-6 border-primary/20 text-primary bg-white shadow-md font-black text-[10px] uppercase tracking-widest group">
            <Smartphone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Top-up Wallet
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-12 px-6 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest">
            <Plus className="mr-2 h-4 w-4" /> New Sale Node
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Daily Revenue", value: "TZS 482,500", sub: "Cashless Hub", icon: TrendingUp, color: "text-green-600" },
          { label: "Avg Wallet", value: "TZS 12,400", sub: "Per Student", icon: Wallet, color: "text-primary" },
          { label: "Food Inventory", value: "94%", sub: "Healthy Stock", icon: Utensils, color: "text-accent" },
          { label: "Active Nodes", value: "1,240", sub: "Student Cards", icon: Users, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-6 relative">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-2xl font-black mt-2 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-md">
          <CardHeader className="bg-muted/30 p-8 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black uppercase">Live Sales Stream</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Verified dietary transactions</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-10 h-10 rounded-full border-none bg-white shadow-inner font-bold text-xs" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none">
                  <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Dietary Node</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Amount</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {canteenTransactions.map((tx) => (
                  <TableRow key={tx.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                    <TableCell className="pl-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-sm text-foreground/80">{tx.student}</span>
                        <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{tx.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary">
                        {tx.item}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-mono font-black text-xs text-foreground/70">TZS {tx.amount}</TableCell>
                    <TableCell className="text-right pr-8">
                      <span className="text-[10px] font-black text-muted-foreground flex items-center justify-end gap-2">
                        <Clock className="h-3 w-3" /> {tx.time}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-xl rounded-[2rem] bg-primary text-white overflow-hidden relative group p-8">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
               <ShieldCheck className="h-24 w-24" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Institutional Guarantee</p>
                  <h3 className="text-xl font-black tracking-tight">Pure Performance Canteen</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Eliminate physical cash risks. Automated alerts dispatched to parents via Beem SMS for every transaction node.
                </p>
                <Button className="w-full rounded-2xl h-12 bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-2xl">
                  Inventory Audit
                </Button>
             </div>
          </Card>

          <Card className="border-none shadow-xl rounded-[2rem] bg-accent/5 border border-accent/10 p-8">
             <div className="flex items-center gap-3 mb-4 text-accent">
                <Zap className="h-5 w-5 fill-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest">Gateway Node</span>
             </div>
             <p className="text-xs font-medium text-accent/80 leading-relaxed">
               Beem SMS credits are low. Re-charge communication node to ensure parents receive real-time meal notifications.
             </p>
             <Button variant="outline" size="sm" className="mt-6 w-full rounded-full border-accent/20 text-accent font-black text-[9px] uppercase tracking-widest h-10">
               Buy SMS Credits
             </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
