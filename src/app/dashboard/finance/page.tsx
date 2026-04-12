
"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Banknote, 
  Receipt, 
  Search,
  Plus,
  FileSpreadsheet,
  Loader2,
  Filter,
  SmartphoneNfc,
  CheckCircle,
  Activity,
  Zap,
  Wallet,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
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
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { exportToExcel } from "@/lib/export-utils"
import { processPaymentTransaction } from "@/lib/finance-engine"
import { useInstitutionalReconciliation } from "@/hooks/use-finance"
import { usePettyCash } from "@/hooks/use-petty-cash"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Progress } from "@/components/ui/progress"

const BUDGETS = {
  "Science Lab": 500000,
  "Sports": 300000,
  "Admin": 1000000,
  "Maintenance": 400000,
  "Transport": 600000
}

export default function FinancePage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const { collected, outstanding, target, collectionRate, isLoading } = useInstitutionalReconciliation()
  const { expenses, addExpense, updateStatus, stats, isLoading: pettyLoading } = usePettyCash()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAddingExpense, setIsAddingExpense] = useState(false)

  // Live Student Stream
  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students"), orderBy("name", "asc")), [db])
  const { data: students } = useCollection(studentsQuery)

  const handleProcessPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await processPaymentTransaction(db, {
        studentId: formData.get("studentId") as string,
        amount: parseFloat(formData.get("amount") as string),
        controlNumber: "99" + Math.floor(100000000 + Math.random() * 900000000).toString(),
        term: formData.get("term") as any,
        method: formData.get("method") as any,
        recordedBy: user?.email || "System",
        academicYear: 2026
      })
      
      toast({ title: "Transaction Verified", description: "Ledger updated and balance recalculated." })
    } catch (err: any) {
      toast({ variant: "destructive", title: "Transaction Failed", description: err.message })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleNewExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const amount = parseFloat(formData.get("amount") as string)
    const dept = formData.get("department") as string

    // Budget Check Node
    const currentSpent = stats.deptSpending[dept] || 0
    if (currentSpent + amount > (BUDGETS[dept as keyof typeof BUDGETS] || 0)) {
      toast({ variant: "destructive", title: "Budget Limit Exceeded", description: `This expense exceeds the ${dept} allocation.` })
      return
    }

    try {
      await addExpense({
        department: dept,
        category: formData.get("category"),
        description: formData.get("description"),
        amount: amount,
        recordedBy: user?.email || "Staff"
      })
      setIsAddingExpense(false)
      toast({ title: "Expense Node Saved", description: amount < 50000 ? "Auto-approved via Threshold Rules." : "Queued for departmental approval." })
    } catch (err) {
      toast({ variant: "destructive", title: "Persistence Error", description: "Could not save expense node." })
    }
  }

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-32 px-1">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary px-4 py-1 h-6 text-[9px] font-black tracking-widest uppercase rounded-full shadow-sm">
            Reactive Financial Ledger • 2026
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Institutional Accounts</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm max-w-xl leading-relaxed uppercase tracking-tighter">Real-time balance computation & revenue assurance nodes.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-accent p-6 rounded-3xl text-white shadow-xl min-w-[280px]">
          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-white/60 tracking-widest">Collection Rate</p>
            <p className="text-2xl font-black">{collectionRate.toFixed(1)}%</p>
            <div className="w-full bg-white/20 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-white h-full transition-all duration-1000" style={{ width: `${collectionRate}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: formatMoney(collected), icon: Banknote, color: "text-green-600" },
          { title: "Outstanding Node", value: formatMoney(outstanding), icon: ArrowUpRight, color: "text-destructive" },
          { title: "Petty Cash Float", value: formatMoney(stats.totalApproved), icon: Wallet, color: "text-primary" },
          { title: "Verified Nodes", value: students?.length || "0", icon: CheckCircle, color: "text-orange-600" },
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

      <Tabs defaultValue="reconciliation" className="space-y-8">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 flex w-full sm:w-fit overflow-x-auto shadow-inner">
          <TabsTrigger value="reconciliation" className="rounded-xl font-black px-8 text-[10px] uppercase tracking-widest">Global Reconciliation</TabsTrigger>
          <TabsTrigger value="petty-cash" className="rounded-xl font-black px-8 text-[10px] uppercase tracking-widest">Petty Cash Hub</TabsTrigger>
          <TabsTrigger value="invoice" className="rounded-xl font-black px-8 text-[10px] uppercase tracking-widest">Payment Portal</TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-muted/30 p-6 sm:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tight">Fee Integrity Matrix</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Live audit of student balances</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-12 rounded-full border-none bg-white shadow-sm font-black text-[10px] uppercase px-6">
                  <Filter className="h-4 w-4 mr-2" /> Class Filter
                </Button>
                <Button 
                  onClick={() => exportToExcel(students || [], "Reconciliation_Audit")}
                  className="h-12 rounded-full colorful-gradient font-black text-[10px] uppercase px-8 shadow-xl"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" /> Export Audit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-none h-14">
                    <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest">Student Node</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Expected</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Collected</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Balance</TableHead>
                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={5} className="h-32 text-center"><Loader2 className="animate-spin inline mr-2" /> Syncing Node...</TableCell></TableRow>
                  ) : students?.map((s) => (
                    <TableRow key={s.id} className="group border-b last:border-none hover:bg-primary/[0.02]">
                      <TableCell className="pl-10 py-6">
                        <p className="font-black text-sm text-foreground/80">{s.name}</p>
                        <p className="text-[9px] text-muted-foreground font-mono font-black uppercase">{s.id}</p>
                      </TableCell>
                      <TableCell className="text-center font-bold text-xs">TZS {formatMoney((s.totalFeesExpected || 0) + (s.arrears || 0))}</TableCell>
                      <TableCell className="text-center font-bold text-xs text-green-600">TZS {formatMoney(s.totalPaid || 0)}</TableCell>
                      <TableCell className="text-center">
                        <span className={cn("font-black text-sm", (s.balance || 0) > 0 ? "text-destructive" : "text-green-600")}>
                          TZS {formatMoney(s.balance || 0)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <Badge className={cn(
                          "font-black text-[9px] px-4 py-1 rounded-full uppercase shadow-sm",
                          (s.balance || 0) <= 0 ? "bg-green-100 text-green-700" : "bg-orange-50 text-orange-600"
                        )}>
                          {(s.balance || 0) <= 0 ? 'CLEARED NODE' : 'OUTSTANDING'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="petty-cash" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl font-black uppercase">Log Department Expense</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Atomic operational entry</CardDescription>
                </CardHeader>
                <form onSubmit={handleNewExpense} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Department</Label>
                    <Select name="department" required>
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold">
                        <SelectValue placeholder="Select Dept..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Object.keys(BUDGETS).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Description</Label>
                    <Input name="description" placeholder="e.g. Science Lab Chemicals" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Amount (TZS)</Label>
                    <Input name="amount" type="number" placeholder="50,000" required className="h-12 rounded-xl bg-muted/20 border-none font-black text-lg px-5 shadow-inner" />
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl mt-2">
                    Initialize Expense Node
                  </Button>
                </form>
              </Card>

              <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white p-8">
                <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                  <Activity className="h-5 w-5" /> Budget Monitor
                </h3>
                <div className="space-y-6">
                  {Object.entries(BUDGETS).map(([dept, budget]) => {
                    const spent = stats.deptSpending[dept] || 0
                    const perc = (spent / budget) * 100
                    return (
                      <div key={dept} className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase">
                          <span>{dept}</span>
                          <span className={cn(perc > 80 ? "text-orange-400" : "text-white/60")}>{formatMoney(spent)} / {formatMoney(budget)}</span>
                        </div>
                        <Progress value={perc} className={cn("h-1.5", perc > 80 ? "bg-orange-900" : "bg-white/10")} />
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            <Card className="lg:col-span-8 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
              <CardHeader className="bg-muted/30 p-8 border-b flex flex-row justify-between items-center">
                <CardTitle className="text-xl font-black uppercase">Departmental Ledger</CardTitle>
                <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">
                  {expenses.length} Sovereign Nodes
                </Badge>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader className="bg-muted/10">
                    <TableRow className="border-none h-14">
                      <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Expense Node</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Amount</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Status</TableHead>
                      <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pettyLoading ? (
                      <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="animate-spin inline mr-2" /> Syncing Node...</TableCell></TableRow>
                    ) : expenses.map((ex) => (
                      <TableRow key={ex.id} className="group border-b last:border-none hover:bg-primary/[0.02]">
                        <TableCell className="pl-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-black text-sm text-foreground/80 uppercase">{ex.description}</span>
                            <span className="text-[9px] text-muted-foreground font-black uppercase">{ex.department} • {ex.recordedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-xs">TZS {formatMoney(ex.amount)}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            "font-black text-[8px] px-3 py-0.5 rounded-full uppercase",
                            ex.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            ex.status === 'Rejected' ? 'bg-destructive/10 text-destructive' : 'bg-orange-50 text-orange-600'
                          )}>
                            {ex.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          {ex.status === 'Pending' && user?.email && (
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 rounded-full text-[8px] font-black text-green-600 uppercase" onClick={() => updateStatus(ex.id, 'Approved', user.email!)}>Approve</Button>
                              <Button variant="ghost" size="sm" className="h-8 rounded-full text-[8px] font-black text-destructive uppercase" onClick={() => updateStatus(ex.id, 'Rejected', user.email!)}>Reject</Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoice" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-5 border-none shadow-xl rounded-[2.5rem] bg-white p-8">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-xl font-black uppercase">Record Official Payment</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Atomic transaction entry</CardDescription>
              </CardHeader>
              <form onSubmit={handleProcessPayment} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Target Student</Label>
                  <Select name="studentId" required>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold">
                      <SelectValue placeholder="Select candidate node..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {students?.map(s => <SelectItem key={s.id} value={s.id}>{s.name} ({s.id})</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Academic Term</Label>
                    <Select name="term" defaultValue="Term 1">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Term 1">Term 1 Node</SelectItem>
                        <SelectItem value="Term 2">Term 2 Node</SelectItem>
                        <SelectItem value="Term 3">Term 3 Node</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Method Hub</Label>
                    <Select name="method" defaultValue="Bank">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="M-Pesa">M-Pesa</SelectItem>
                        <SelectItem value="Bank">Bank Transfer</SelectItem>
                        <SelectItem value="Cash">Cash Ledger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Amount Node (TZS)</Label>
                  <Input name="amount" type="number" placeholder="500,000" required className="h-14 rounded-2xl bg-muted/20 border-none font-black text-xl px-6 text-primary shadow-inner" />
                </div>
                <Button type="submit" disabled={isProcessing} className="w-full h-16 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl group">
                  {isProcessing ? <Loader2 className="animate-spin mr-2" /> : <SmartphoneNfc className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                  Verify & Commit Transaction
                </Button>
              </form>
            </Card>

            <div className="lg:col-span-7 space-y-6">
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white p-8 relative overflow-hidden group">
                <Wallet className="absolute -right-4 -top-4 h-32 w-32 opacity-10 group-hover:rotate-12 transition-transform" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Institutional Guarantee</p>
                    <h3 className="text-2xl font-black tracking-tight uppercase">Sovereign Audit Protocol</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-medium max-w-md">
                    Every transaction processed through this hub triggers a recursive balance calculation. 
                    Parents receive instant WhatsApp alerts via Evolution API upon commitment.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-[8px] font-black uppercase opacity-60">Verified Today</p>
                      <p className="text-xl font-black">14 Nodes</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-[8px] font-black uppercase opacity-60">Dispatched Alerts</p>
                      <p className="text-xl font-black">100%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-xl rounded-[2.5rem] bg-accent/5 border border-accent/10 p-8">
                <div className="flex items-center gap-3 mb-4 text-accent">
                  <Zap className="h-5 w-5 fill-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Optimization Notice</span>
                </div>
                <p className="text-xs font-bold text-accent/80 leading-relaxed uppercase tracking-tighter">
                  Current collection efficiency is at {collectionRate.toFixed(1)}%. Automated reminders for Term 1 balances are scheduled for dispatch in 48 hours.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
