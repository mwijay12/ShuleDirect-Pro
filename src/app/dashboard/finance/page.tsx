
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
  FileText
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
import { Separator } from "@/components/ui/separator"

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
    toast({
      title: "Control Number Generated",
      description: `Payment ID ${newNo} sent to parent via Beem SMS.`,
    })
  }

  const handleExportFinance = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Financial Statement Generated",
        description: "Institutional ledger (PDF) exported successfully.",
      })
    }, 2000)
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-32 px-1">
      {/* Editorial Responsive Header */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest uppercase rounded-full">
            Financial Node • Audit Ready 2026
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-headline font-black text-primary tracking-tight leading-none">Institutional Accounts</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm max-w-xl">Revenue assurance, petty cash tracking, and automated ClickPesa reconciliation for institutional scale.</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Revenue", value: "142.5M", sub: "+14% Growth", icon: Banknote, color: "text-green-600" },
          { title: "Outstanding", value: "18.2M", sub: "42 Invoices", icon: ArrowUpRight, color: "text-destructive" },
          { title: "Expenditure", value: "45.1M", sub: "Approved", icon: TrendingDown, color: "text-orange-600" },
          { title: "Reconciled", value: "98.4%", sub: "ClickPesa", icon: CheckCircle, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] group hover:-translate-y-1 transition-all overflow-hidden">
            <CardContent className="p-5 sm:p-8 relative">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                <stat.icon className="h-16 w-16 sm:h-24 sm:w-24" />
              </div>
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-[10px] font-black text-muted-foreground">TZS</span>
                <span className={cn("text-xl sm:text-3xl font-black tracking-tighter truncate", stat.color)}>{stat.value}</span>
              </div>
              <p className="text-[8px] font-black text-muted-foreground mt-1 uppercase tracking-widest">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
        <CardHeader className="bg-muted/30 p-6 sm:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-black">Fee Reconciliation</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Verified transactions via institutional gateways</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none h-12 rounded-full border-none bg-white shadow-sm font-black text-[10px] uppercase tracking-widest text-primary px-6">
              <Filter className="h-4 w-4 mr-2" /> Filter Hub
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none h-12 rounded-full colorful-gradient font-black text-[10px] uppercase tracking-widest px-8 shadow-xl">
                  <Plus className="h-4 w-4 mr-2" /> Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md">
                <DialogHeader className="bg-primary/5 p-8 border-b">
                  <DialogTitle className="text-2xl font-black text-primary">Invoice Node</DialogTitle>
                  <DialogDescription className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Generate official payment control numbers.</DialogDescription>
                </DialogHeader>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Student</Label>
                    <Input placeholder="Search name..." className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
                      <Input defaultValue="Tuition Fee" className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (TZS)</Label>
                      <Input type="number" defaultValue="650000" className="h-12 rounded-xl bg-muted/20 border-none font-black text-primary" />
                    </div>
                  </div>
                  {controlNo && (
                    <div className="p-8 bg-green-50 border border-green-100 rounded-[2rem] text-center animate-in zoom-in-95 duration-500">
                      <p className="text-[10px] text-green-700 font-black uppercase tracking-widest mb-2">Active Control No</p>
                      <p className="text-4xl font-mono font-black text-green-900 tracking-tight">{controlNo}</p>
                    </div>
                  )}
                </div>
                <DialogFooter className="p-8 pt-0">
                  <Button onClick={handleGenerateControlNumber} className="w-full h-14 rounded-2xl colorful-gradient font-black text-sm uppercase tracking-widest shadow-xl group">
                    <SmartphoneNfc className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
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
              <TableRow className="border-none h-14 hover:bg-transparent">
                <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Control Number</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Amount (TZS)</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Category</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest">Hub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="group border-b last:border-none hover:bg-primary/[0.02] transition-colors">
                  <TableCell className="pl-10 py-6">
                    <p className="font-black text-sm group-hover:text-primary transition-colors">{tx.student}</p>
                    <p className="text-[9px] text-muted-foreground font-mono font-black uppercase">{tx.id}</p>
                  </TableCell>
                  <TableCell>
                    <code className="text-[10px] font-black bg-muted px-3 py-1 rounded-lg text-foreground/70">{tx.controlNo}</code>
                  </TableCell>
                  <TableCell className="font-black text-sm">TZS {tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">{tx.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 border-none font-black text-[9px] px-4 py-1 rounded-full shadow-sm uppercase tracking-tighter">SUCCESS</Badge>
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

      {/* Re-organized bottom actions as requested */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 rounded-[3rem] bg-primary text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 p-10 opacity-10">
          <Calculator className="h-48 w-48 rotate-12" />
        </div>
        <div className="space-y-2 relative z-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">Generate Global Ledger</h2>
          <p className="text-white/70 font-medium text-xs sm:text-sm max-w-sm uppercase tracking-widest">Official financial reporting node for 2026 academic audits.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
          <Button 
            variant="outline" 
            onClick={handleExportFinance}
            disabled={isExporting}
            className="h-14 rounded-full border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10"
          >
            {isExporting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <FileText className="h-5 w-5 mr-2" />}
            Export PDF Ledger
          </Button>
          <Button 
            className="h-14 rounded-full bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-[0.2em] px-10 shadow-xl"
          >
            <Printer className="h-5 w-5 mr-2" /> Print Statement
          </Button>
        </div>
      </div>
    </div>
  )
}
