
"use client"

import * as React from "react"
import { useState, useMemo } from "react"
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
  Activity,
  ArrowUpCircle,
  Save
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
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"

const initialTransactions = [
  { id: "TX-9021", student: "AGNES FRED KILIMA", type: "Tuition", amount: 550000, method: "M-Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345678" },
  { id: "TX-9022", student: "DAVID ERICK MWIJAGE", type: "Uniform", amount: 120000, method: "Tigo Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345679" },
  { id: "TX-9023", student: "ALVIN MICHAEL GILLA", type: "Stationery", amount: 45000, method: "Cash", date: "2024-05-11", status: "Success", controlNo: "N/A" },
]

const initialPettyCash = [
  { id: "PC-001", item: "Laboratory Reagents", amount: 85000, dept: "Science", status: "Approved" },
  { id: "PC-002", item: "A4 Printing Paper", amount: 45000, dept: "Admin", status: "Approved" },
  { id: "PC-003", item: "Football Pump", amount: 12000, dept: "Sports", status: "Pending" },
]

export default function FinancePage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [controlNo, setControlNo] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  
  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity } = useDoc(identityRef)
  const isDemo = identity?.demoMode === true

  const [transactions, setTransactions] = useState(isDemo ? initialTransactions : [])
  const [pettyCash, setPettyCash] = useState(isDemo ? initialPettyCash : [])

  // RIGID CALCULATIONS NODE
  const totals = useMemo(() => {
    const revenue = transactions.reduce((acc, curr) => acc + curr.amount, 0)
    const expenses = pettyCash.reduce((acc, curr) => acc + curr.amount, 0)
    const outstanding = isDemo ? 18200000 : 0
    return { revenue, expenses, outstanding, float: isDemo ? 1200000 : 0 }
  }, [transactions, pettyCash, isDemo])
  
  const handleGenerateControlNumber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const student = formData.get("student") as string
    const amount = parseInt(formData.get("amount") as string)
    const newNo = "99" + Math.floor(100000000 + Math.random() * 900000000).toString()
    
    setControlNo(newNo)
    const newTx = {
      id: `TX-${Math.floor(Math.random() * 10000)}`,
      student: student || "Student Node",
      type: "Fee Generation",
      amount: amount,
      method: "Pending",
      date: new Date().toISOString().split('T')[0],
      status: "Success",
      controlNo: newNo
    }
    setTransactions(prev => [newTx, ...prev])

    triggerN8nWebhook("fee-payment", { studentName: student, amount, controlNumber: newNo });
    toast({ title: "Control Number Generated", description: `Payment ID ${newNo} dispatched via WhatsApp.` })
  }

  const handleAddPettyCash = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newExpense = {
      id: `PC-${Math.floor(Math.random() * 1000)}`,
      item: formData.get("item") as string,
      amount: parseInt(formData.get("amount") as string),
      dept: formData.get("dept") as string,
      status: "Approved"
    }
    setPettyCash(prev => [newExpense, ...prev])
    toast({ title: "Expense Node Authorized", description: `Petty cash for ${newExpense.item} synchronized.` })
  }

  const handleExportFinance = () => {
    setIsExporting(true)
    setTimeout(() => {
      exportToExcel(transactions, "Institutional_Financial_Ledger");
      setIsExporting(false)
      toast({ title: "Excel Ledger Generated", description: "Audit-ready financial statement node saved locally." })
    }, 1000)
  }

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-32 px-1">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest uppercase rounded-full shadow-sm">
            Financial Assurance Hub • 2026 Ledger
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Institutional Accounts</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm max-w-xl leading-relaxed uppercase tracking-tighter">Revenue assurance, ClickPesa reconciliation, and operational petty cash matrix.</p>
        </div>
        
        <Card className="border-none shadow-xl bg-accent text-white rounded-3xl p-6 min-w-[280px] overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
             <MessageSquare className="h-20 w-20" />
           </div>
           <div className="relative z-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Beem Gateway Credits</p>
                <p className="text-2xl font-black">{isDemo ? "4,280" : "0"} Credits</p>
                <Badge className="bg-white/20 text-white border-none font-black text-[8px] h-4 mt-1">SOVEREIGN SYNC</Badge>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: formatMoney(totals.revenue), icon: Banknote, color: "text-green-600" },
          { title: "Outstanding Node", value: formatMoney(totals.outstanding), icon: ArrowUpRight, color: "text-destructive" },
          { title: "Expenditure Hub", value: formatMoney(totals.expenses), icon: TrendingDown, color: "text-orange-600" },
          { title: "Petty Float", value: formatMoney(totals.float), icon: Wallet, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden group hover:-translate-y-1 transition-all">
            <CardContent className="p-5 sm:p-6">
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-[10px] font-black text-muted-foreground">TZS</span>
                <span className={cn("text-xl sm:text-2xl font-black truncate", stat.color)}>{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="fees" className="space-y-8">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 flex w-full sm:w-fit overflow-x-auto shadow-inner">
          <TabsTrigger value="fees" className="rounded-xl font-black px-8 text-[10px] uppercase tracking-widest">Fee Ledger</TabsTrigger>
          <TabsTrigger value="petty" className="rounded-xl font-black px-8 text-[10px] uppercase tracking-widest">Petty Cash Node</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-muted/30 p-6 sm:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black uppercase tracking-tight">Fee Reconciliation</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Verified transactions via 2026 Sovereign Hub</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none h-12 rounded-full border-none bg-white shadow-sm font-black text-[10px] uppercase text-primary px-6">
                  <Filter className="h-4 w-4 mr-2" /> Ledger Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 sm:flex-none h-12 rounded-full colorful-gradient font-black text-[10px] uppercase px-8 shadow-xl">
                      <Plus className="h-4 w-4 mr-2" /> Invoice Node
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md font-body">
                    <DialogHeader className="bg-primary/5 p-8 border-b">
                      <DialogTitle className="text-xl font-black text-primary uppercase">New Invoice Node</DialogTitle>
                      <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Generate official 2026 control numbers.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGenerateControlNumber} className="p-8 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Target Candidate</Label>
                        <Input name="student" placeholder="e.g. ALEXANDER MLAWA" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Category</Label>
                          <Input name="category" defaultValue="Tuition Hub" className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Amount (TZS)</Label>
                          <Input name="amount" type="number" defaultValue="650000" className="h-12 rounded-xl bg-muted/20 border-none font-black text-primary shadow-inner px-5" />
                        </div>
                      </div>
                      {controlNo && (
                        <div className="p-6 bg-green-50 border border-green-100 rounded-[2rem] text-center animate-in zoom-in-95">
                          <p className="text-[10px] text-green-700 font-black uppercase mb-2">Active Control ID</p>
                          <p className="text-3xl font-mono font-black text-green-900 tracking-tight">{controlNo}</p>
                        </div>
                      )}
                      <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl group">
                        <SmartphoneNfc className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                        Generate & Dispatch Hub
                      </Button>
                    </form>
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
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Amount (TZS)</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Status</TableHead>
                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest">Hub</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-black text-[10px] uppercase">
                        No transactions synchronized.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((tx) => (
                      <TableRow key={tx.id} className="group border-b last:border-none hover:bg-primary/[0.02] transition-colors">
                        <TableCell className="pl-10 py-6">
                          <p className="font-black text-sm text-foreground/80">{tx.student}</p>
                          <p className="text-[9px] text-muted-foreground font-mono font-black uppercase">{tx.id}</p>
                        </TableCell>
                        <TableCell>
                          <code className="text-[10px] font-black bg-muted/50 px-3 py-1.5 rounded-lg text-primary border border-primary/5">{tx.controlNo}</code>
                        </TableCell>
                        <TableCell className="text-center font-black text-sm text-foreground/70">TZS {formatMoney(tx.amount)}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-100 text-green-700 border-none font-black text-[9px] px-4 py-1 rounded-full shadow-sm uppercase">SUCCESS NODE</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="petty" className="space-y-6">
           <div className="grid gap-6 lg:grid-cols-12">
              <Card className="lg:col-span-8 border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-md">
                <CardHeader className="bg-muted/20 border-b p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <CardTitle className="text-xl font-black uppercase tracking-tight">Petty Cash Ledger</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Operational expenditure reconciliation hub</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-full h-11 px-8 colorful-gradient font-black text-[10px] uppercase shadow-lg">
                        <ArrowDownCircle className="mr-2 h-4 w-4" /> Log Expense Node
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md">
                      <DialogHeader className="bg-primary/5 p-8 border-b">
                        <DialogTitle className="text-xl font-black uppercase text-primary">Expense Authorization</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddPettyCash} className="p-8 space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Item/Service Node</Label>
                          <Input name="item" placeholder="e.g. Printing Supplies" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Dept Hub</Label>
                            <Input name="dept" placeholder="Admin" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Amount (TZS)</Label>
                            <Input name="amount" type="number" required className="h-12 rounded-xl bg-muted/20 border-none font-black text-primary shadow-inner px-5" />
                          </div>
                        </div>
                        <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">Initialize Expense Node</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <Table className="min-w-[800px]">
                    <TableHeader className="bg-muted/10">
                      <TableRow className="border-none h-14">
                        <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Expense Item</TableHead>
                        <TableHead className="text-[9px] font-black uppercase tracking-widest">Department Node</TableHead>
                        <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Amount</TableHead>
                        <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pettyCash.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground font-black text-[10px] uppercase">
                            No petty cash records.
                          </TableCell>
                        </TableRow>
                      ) : (
                        pettyCash.map((item) => (
                          <TableRow key={item.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                            <TableCell className="pl-8 py-6">
                              <p className="font-black text-sm text-foreground/80">{item.item}</p>
                              <p className="text-[9px] font-mono font-black text-muted-foreground uppercase">{item.id}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary px-3 py-0.5">
                                {item.dept} NODE
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center font-mono font-black text-xs text-foreground/70">TZS {formatMoney(item.amount)}</TableCell>
                            <TableCell className="text-right pr-8">
                              <Badge className={cn(
                                "text-[9px] font-black uppercase px-4 py-1 rounded-full border-none shadow-sm",
                                item.status === "Approved" ? "bg-green-100 text-green-700" : "bg-orange-50 text-orange-600"
                              )}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="lg:col-span-4 space-y-6">
                 <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white p-8 relative overflow-hidden group">
                    <Wallet className="absolute -right-4 -top-4 h-24 w-24 opacity-10 group-hover:rotate-12 transition-transform" />
                    <div className="relative z-10 space-y-6">
                       <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Institutional Float Hub</p>
                         <h3 className="text-2xl font-black tracking-tight uppercase">Main Petty Float</h3>
                       </div>
                       <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                          <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Liquid Node Float</p>
                          <p className="text-3xl font-black">TZS {formatMoney(totals.float)}</p>
                       </div>
                       <Button className="w-full h-12 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-2xl">Refill Float Node</Button>
                    </div>
                 </Card>

                 <Card className="border-none shadow-xl rounded-[2.5rem] bg-accent/5 border border-accent/10 p-8">
                    <div className="flex items-center gap-3 mb-4 text-accent">
                       <Activity className="h-5 w-5" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Audit Notice</span>
                    </div>
                    <p className="text-xs font-bold text-accent/80 leading-relaxed uppercase tracking-tighter">
                      Operational expenditure for the 2026 cycle must be reconciled weekly. Ensure all science lab nodes are logged via Hub PC-X.
                    </p>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 rounded-[3rem] bg-primary text-white shadow-2xl relative overflow-hidden mt-8">
        <div className="space-y-2 relative z-10 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white uppercase">Generate Audit Ledger</h2>
          <p className="text-white/70 font-medium text-[10px] uppercase tracking-widest">Official financial reporting node for 2026 academic assessments.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
          <Button 
            variant="outline" 
            onClick={handleExportFinance}
            disabled={isExporting}
            className="h-14 rounded-full border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white font-black text-[9px] uppercase tracking-widest px-10 shadow-lg"
          >
            {isExporting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <FileSpreadsheet className="h-5 w-5 mr-2" />}
            Export Excel Statement
          </Button>
          <Button className="h-14 rounded-full bg-white text-primary hover:bg-white/90 font-black text-[9px] uppercase tracking-widest px-10 shadow-2xl">
            <Printer className="h-5 w-5 mr-2" /> Print Global Ledger
          </Button>
        </div>
      </div>
    </div>
  )
}
