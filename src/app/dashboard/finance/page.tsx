
"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Banknote, 
  Receipt, 
  CreditCard, 
  Smartphone, 
  ArrowUpRight, 
  Search,
  Download,
  Wallet,
  Plus,
  ArrowRight,
  ShieldCheck,
  SmartphoneNfc,
  CheckCircle,
  TrendingDown,
  ShoppingCart,
  Shirt,
  Calculator,
  ArrowDownCircle,
  Coffee,
  FileSpreadsheet,
  Loader2,
  Filter,
  ArrowDownRight,
  ChevronRight,
  Printer,
  FileText,
  MessageSquare,
  Zap,
  Activity
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { exportToExcel } from "@/lib/export-utils"
import { triggerN8nWebhook } from "@/lib/n8n"

const transactions = [
  { id: "TX-9021", student: "Amani Mwamba", type: "Tuition", amount: "550,000", method: "M-Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345678" },
  { id: "TX-9022", student: "Careen Mushi", type: "Uniform", amount: "120,000", method: "Tigo Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345679" },
  { id: "TX-9023", student: "Baraka Juma", type: "Stationery", amount: "45,000", method: "Cash", date: "2024-05-11", status: "Success", controlNo: "N/A" },
]

export default function FinancePage() {
  const { toast } = useToast()
  const [controlNo, setControlNo] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  
  const handleGenerateControlNumber = () => {
    const newNo = "99" + Math.floor(100000000 + Math.random() * 900000000).toString()
    setControlNo(newNo)
    triggerN8nWebhook("fee-payment", { studentName: "Student", amount: "650000", controlNumber: newNo });
    toast({ title: "Control Number Generated", description: `Payment ID ${newNo} dispatched via n8n gateway.` })
  }

  const handleExportFinance = () => {
    setIsExporting(true)
    setTimeout(() => {
      exportToExcel(transactions, "Institutional_Financial_Ledger");
      setIsExporting(false)
      toast({ title: "Excel Ledger Generated", description: "Official financial statement saved locally." })
    }, 1000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-32 px-1">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest uppercase rounded-full">
            Financial Node • Audit Ready 2026
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Institutional Accounts</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm max-w-xl">Revenue assurance and ClickPesa reconciliation node.</p>
        </div>
        
        {/* Beem SMS Credits Node */}
        <Card className="border-none shadow-xl bg-accent text-white rounded-3xl p-6 min-w-[280px] overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
             <MessageSquare className="h-20 w-20" />
           </div>
           <div className="relative z-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Beem SMS Node</p>
                <p className="text-2xl font-black">4,280 Credits</p>
                <Badge className="bg-white/20 text-white border-none font-black text-[8px] h-4 mt-1">ACTIVE NODE</Badge>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Revenue", value: "142.5M", icon: Banknote, color: "text-green-600" },
          { title: "Outstanding", value: "18.2M", icon: ArrowUpRight, color: "text-destructive" },
          { title: "Expenditure", value: "45.1M", icon: TrendingDown, color: "text-orange-600" },
          { title: "Gateway", value: "ONLINE", icon: Activity, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden">
            <CardContent className="p-5 sm:p-6">
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-[10px] font-black text-muted-foreground">{stat.title === "Gateway" ? "" : "TZS"}</span>
                <span className={cn("text-xl sm:text-2xl font-black truncate", stat.color)}>{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
        <CardHeader className="bg-muted/30 p-6 sm:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black">Fee Reconciliation</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Verified transactions via 2026 Node</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none h-12 rounded-full border-none bg-white shadow-sm font-black text-[10px] uppercase text-primary px-6">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none h-12 rounded-full colorful-gradient font-black text-[10px] uppercase px-8 shadow-xl">
                  <Plus className="h-4 w-4 mr-2" /> Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md font-body">
                <DialogHeader className="bg-primary/5 p-8 border-b">
                  <DialogTitle className="text-xl font-black text-primary">Invoice Node</DialogTitle>
                  <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Generate official control numbers.</DialogDescription>
                </DialogHeader>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground">Target Student</Label>
                    <Input placeholder="Search name..." className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground">Category</Label>
                      <Input defaultValue="Tuition Fee" className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground">Amount (TZS)</Label>
                      <Input type="number" defaultValue="650000" className="h-12 rounded-xl bg-muted/20 border-none font-black text-primary" />
                    </div>
                  </div>
                  {controlNo && (
                    <div className="p-6 bg-green-50 border border-green-100 rounded-[2rem] text-center">
                      <p className="text-[10px] text-green-700 font-black uppercase mb-2">Active Control No</p>
                      <p className="text-3xl font-mono font-black text-green-900 tracking-tight">{controlNo}</p>
                    </div>
                  )}
                </div>
                <DialogFooter className="p-8 pt-0">
                  <Button onClick={handleGenerateControlNumber} className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl group">
                    <SmartphoneNfc className="mr-2 h-5 w-5" /> 
                    Generate & SMS Parent
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/10">
              <TableRow className="border-none h-14">
                <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Control Number</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Amount (TZS)</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest">Hub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="group border-b last:border-none hover:bg-primary/[0.02] transition-colors">
                  <TableCell className="pl-10 py-6">
                    <p className="font-black text-sm">{tx.student}</p>
                    <p className="text-[9px] text-muted-foreground font-mono font-black uppercase">{tx.id}</p>
                  </TableCell>
                  <TableCell>
                    <code className="text-[10px] font-black bg-muted px-3 py-1 rounded-lg text-foreground/70">{tx.controlNo}</code>
                  </TableCell>
                  <TableCell className="font-black text-sm">TZS {tx.amount}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 border-none font-black text-[9px] px-4 py-1 rounded-full">SUCCESS</Badge>
                  </TableCell>
                  <TableCell className="text-right pr-10">
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 rounded-[3rem] bg-primary text-white shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">Generate Global Ledger</h2>
          <p className="text-white/70 font-medium text-[10px] uppercase tracking-widest">Official reporting node for 2026 academic audits.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
          <Button 
            variant="outline" 
            onClick={handleExportFinance}
            disabled={isExporting}
            className="h-14 rounded-full border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white font-black text-[9px] uppercase tracking-widest px-10"
          >
            {isExporting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <FileSpreadsheet className="h-5 w-5 mr-2" />}
            Export Excel Ledger
          </Button>
          <Button className="h-14 rounded-full bg-white text-primary hover:bg-white/90 font-black text-[9px] uppercase tracking-widest px-10 shadow-xl">
            <Printer className="h-5 w-5 mr-2" /> Print Statement
          </Button>
        </div>
      </div>
    </div>
  )
}
