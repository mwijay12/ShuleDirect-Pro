
"use client"

import * as React from "react"
import { useState } from "react"
import { 
  PackageSearch, 
  Search, 
  QrCode, 
  Plus, 
  Filter, 
  HardDrive, 
  FlaskConical, 
  BookMarked, 
  Armchair,
  MoreVertical,
  ArrowUpRight,
  TrendingDown,
  Activity,
  ShieldCheck,
  ChevronRight,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const initialAssets = [
  { id: "AST-901", name: "Lenovo ThinkPad L14", category: "ICT", code: "S1234/ICT/001", condition: "Good", location: "Computer Lab", price: "1,200,000" },
  { id: "AST-902", name: "Laboratory Microscope", category: "Laboratory", code: "S1234/LAB/042", condition: "New", location: "Physics Lab", price: "450,000" },
  { id: "AST-903", name: "Wooden Desk - Large", category: "Furniture", code: "S1234/FUR/881", condition: "Fair", location: "Form 4A", price: "85,000" },
  { id: "AST-904", name: "Science Encyclopedia Set", category: "Library", code: "S1234/LIB/201", condition: "Good", location: "Main Library", price: "320,000" },
]

export default function AssetsPage() {
  const { toast } = useToast()
  const [assets, setAssets] = useState(initialAssets)

  const handleScanQR = () => {
    toast({
      title: "Scanner Initialized",
      description: "Ready to process Institutional QR Node.",
    })
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-1">
        <div className="space-y-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest uppercase rounded-full shadow-sm">
            Institutional Inventory Node
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight">Inventory & Assets</h1>
          <p className="text-muted-foreground font-medium text-sm">Managing school property with high-fidelity tracking & QR audits.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Button onClick={handleScanQR} variant="outline" className="flex-1 sm:flex-none rounded-full h-12 px-6 border-primary/20 text-primary bg-white shadow-md font-black text-[10px] uppercase tracking-widest group">
            <QrCode className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Scan QR Node
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-12 px-6 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Asset
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Assets", value: "1,248", sub: "Verified", icon: HardDrive, color: "text-primary" },
          { label: "ICT Node", value: "84", sub: "Lab Online", icon: FlaskConical, color: "text-blue-600" },
          { label: "Damaged", value: "12", sub: "Repair Req", icon: Activity, color: "text-destructive" },
          { label: "Audit Sync", value: "100%", sub: "2026 Node", icon: ShieldCheck, color: "text-green-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-3xl font-black mt-2 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest truncate">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/30 pb-6 pt-8 px-4 sm:px-8 border-b">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 rounded-3xl bg-primary text-white shadow-xl shrink-0">
                <PackageSearch className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl font-black tracking-tight">Institutional Ledger</CardTitle>
                <CardDescription className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-primary/60">Asset condition & location mapping</CardDescription>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="relative flex-1 sm:min-w-[300px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input placeholder="Find equipment by code..." className="pl-12 h-12 rounded-full border-none bg-white shadow-inner font-bold text-sm" />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white border-none shadow-sm shrink-0">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/10">
              <TableRow className="border-none h-14">
                <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Asset Node</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Category</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Identification</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Condition</TableHead>
                <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                  <TableCell className="pl-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{asset.name}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">{asset.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary px-3 py-0.5">
                      {asset.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-[10px] font-mono font-black text-foreground/60 bg-muted px-2 py-1 rounded-lg shadow-inner">{asset.code}</code>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border-none shadow-sm",
                      asset.condition === "New" ? "bg-green-100 text-green-700" :
                      asset.condition === "Fair" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {asset.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-xl rounded-[2.5rem] bg-slate-900 text-white overflow-hidden group">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <Download className="h-6 w-6 text-accent" /> Export Node
            </CardTitle>
            <CardDescription className="text-white/40 text-[10px] font-black uppercase tracking-widest">Official Audit Documentation</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <p className="text-sm text-white/60 leading-relaxed font-medium">Generate high-fidelity institutional ledgers for financial audits and annual property verification.</p>
            <div className="flex gap-2">
              <Button className="flex-1 rounded-2xl h-12 bg-white text-slate-900 hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-xl">Excel Ledger</Button>
              <Button variant="outline" className="flex-1 rounded-2xl h-12 border-white/20 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest">PDF Node</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
             <QrCode className="h-48 w-48 rotate-12" />
           </div>
           <CardHeader className="p-8 pb-4 relative z-10">
             <CardTitle className="text-xl font-black">QR Tagging Protocol</CardTitle>
             <CardDescription className="text-white/60 text-[10px] font-black uppercase tracking-widest">Instant Node Identification</CardDescription>
           </CardHeader>
           <CardContent className="p-8 pt-0 relative z-10">
             <p className="text-sm text-white/80 leading-relaxed font-medium mb-6">Each institutional asset is assigned a unique 2026 QR node for rapid scanning and verification.</p>
             <Button className="w-full rounded-2xl h-12 bg-accent text-white hover:bg-accent/90 font-black text-[10px] uppercase tracking-widest shadow-2xl">Print QR Batch</Button>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
