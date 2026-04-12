
"use client"

import * as React from "react"
import { useState, useMemo } from "react"
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
  AlertCircle,
  History,
  FileText,
  AlertTriangle,
  Scale,
  QrCode,
  Smartphone,
  Info
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { exportToExcel } from "@/lib/export-utils"
import { processPaymentTransaction, generateInstitutionalControlNumber, ControlNumberResponse } from "@/lib/finance-engine"
import { useInstitutionalReconciliation } from "@/hooks/use-finance"
import { usePettyCash } from "@/hooks/use-petty-cash"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { Progress } from "@/components/ui/progress"
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"

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
  const { collected, outstanding, target, collectionRate, isLoading, transactions, pending, disputed, weeklyTotal } = useInstitutionalReconciliation()
  const { expenses, addExpense, updateStatus, stats, isLoading: pettyLoading } = usePettyCash()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGeneratingBill, setIsGeneratingBill] = useState(false)
  const [activeBill, setActiveBill] = useState<ControlNumberResponse | null>(null)
  const [ledgerSearch, setLedgerSearch] = useState("")

  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students"), orderBy("name", "asc")), [db])
  const { data: students } = useCollection(studentsQuery)

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.controlNumber?.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      t.studentName?.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      t.transactionReference?.toLowerCase().includes(ledgerSearch.toLowerCase())
    )
  }, [ledgerSearch, transactions])

  const handleGenerateBill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGeneratingBill(true)
    const formData = new FormData(e.currentTarget)
    const studentId = formData.get("studentId") as string
    const student = students?.find(s => s.id === studentId)

    try {
      const bill = await generateInstitutionalControlNumber(db, {
        schoolId: "school-001",
        studentId,
        amount: parseFloat(formData.get("amount") as string),
        feeType: formData.get("feeType") as any,
        payerName: student?.name || "Guardian",
        payerPhone: formData.get("phone") as string || student?.contact || "+255",
        expiresInDays: 7
      })
      setActiveBill(bill)
      toast({ title: "Control Number Generated", description: "Payment instructions dispatched via WhatsApp." })
    } catch (err: any) {
      toast({ variant: "destructive", title: "Gateway Error", description: err.message })
    } finally {
      setIsGeneratingBill(false)
    }
  }

  const handleProcessManualPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await processPaymentTransaction(db, {
        studentId: formData.get("studentId") as string,
        amount: parseFloat(formData.get("amount") as string),
        controlNumber: formData.get("controlNumber") as string || "CASH-" + Date.now(),
        feeType: formData.get("feeType") as any,
        paymentMethod: formData.get("method") as any,
        recordedBy: user?.email || "Staff",
        academicYear: 2026,
        deviceInfo: navigator.userAgent
      })
      
      toast({ title: "Transaction Verified", description: "Ledger updated and balance recalculated." })
    } catch (err: any) {
      toast({ variant: "destructive", title: "Audit Integrity Error", description: err.message })
    } finally {
      setIsProcessing(false)
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
            Forensic Institutional Ledger • 2026
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Financial Assurance</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm max-w-xl leading-relaxed uppercase tracking-tighter">Immutable audit trail and real-time revenue reconciliation.</p>
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
          { title: "Revenue (7D)", value: formatMoney(weeklyTotal), icon: Zap, color: "text-green-600" },
          { title: "Disputed Nodes", value: disputed, icon: AlertTriangle, color: "text-destructive" },
          { title: "Pending Sync", value: pending, icon: History, color: "text-primary" },
          { title: "Outstanding", value: formatMoney(outstanding), icon: Scale, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden group hover:-translate-y-1 transition-all">
            <CardContent className="p-5 sm:p-6">
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <stat.icon className={cn("h-4 w-4 mr-2", stat.color)} />
                <span className={cn("text-xl sm:text-2xl font-black truncate", stat.color)}>
                  {stat.value}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="forensic-ledger" className="space-y-8">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 flex w-full sm:w-fit overflow-x-auto shadow-inner border border-muted/50 px-1">
          <TabsTrigger value="reconciliation" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Global Balances</TabsTrigger>
          <TabsTrigger value="forensic-ledger" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Forensic Ledger</TabsTrigger>
          <TabsTrigger value="petty-cash" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Petty Cash</TabsTrigger>
          <TabsTrigger value="control-number" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Control No</TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-muted/30 p-6 sm:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tight">Fee Integrity Matrix</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Live audit of student balances</CardDescription>
              </div>
              <Button 
                onClick={() => exportToExcel(students || [], "Institutional_Reconciliation")}
                className="h-12 rounded-full colorful-gradient font-black text-[10px] uppercase px-8 shadow-xl"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" /> Export Audit
              </Button>
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
                    <TableRow><TableCell colSpan={5} className="h-32 text-center"><Loader2 className="animate-spin inline mr-2" /> Syncing Hub...</TableCell></TableRow>
                  ) : students?.map((s) => (
                    <TableRow key={s.id} className="group border-b last:border-none hover:bg-primary/[0.02]">
                      <TableCell className="pl-10 py-6">
                        <p className="font-black text-sm text-foreground/80">{s.name}</p>
                        <p className="text-[9px] text-muted-foreground font-mono font-black uppercase">{s.id} • {s.class}</p>
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
                          {(s.balance || 0) <= 0 ? 'CLEARED' : 'OUTSTANDING'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control-number" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-5 border-none shadow-xl rounded-[2.5rem] bg-white p-8">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-xl font-black uppercase">ClickPesa Billing Node</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Generate verifiable control numbers</CardDescription>
              </CardHeader>
              <form onSubmit={handleGenerateBill} className="space-y-6">
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
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Fee Category</Label>
                    <Select name="feeType" defaultValue="Tuition">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Tuition">Tuition Fee</SelectItem>
                        <SelectItem value="Boarding">Boarding Hub</SelectItem>
                        <SelectItem value="Transport">Fleet Node</SelectItem>
                        <SelectItem value="Exam Fee">National Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Amount (TZS)</Label>
                    <Input name="amount" type="number" placeholder="500,000" required className="h-12 rounded-xl bg-muted/20 border-none font-black px-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Payer WhatsApp Number</Label>
                  <Input name="phone" placeholder="+255 7XX XXX XXX" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5" />
                </div>
                <Button type="submit" disabled={isGeneratingBill} className="w-full h-16 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl group">
                  {isGeneratingBill ? <Loader2 className="animate-spin mr-2" /> : <ShieldCheck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                  Generate Control No
                </Button>
              </form>
            </Card>

            <div className="lg:col-span-7 space-y-6">
              {activeBill ? (
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white p-10 relative overflow-hidden animate-in zoom-in-95 duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <QrCode className="h-48 w-48" />
                  </div>
                  <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Institutional Bill Node</p>
                        <h3 className="text-3xl font-black tracking-tighter">TZS {activeBill.amount.toLocaleString()}</h3>
                      </div>
                      <Badge className="bg-white/20 text-white border-none px-4 py-1 rounded-full font-black text-[9px] uppercase">EXPIRES: {activeBill.expiresAt.toLocaleDateString()}</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-[2rem] shadow-2xl flex flex-col items-center gap-4">
                        <img src={activeBill.qrCodeUrl} alt="Scan to pay" className="h-40 w-40" />
                        <p className="text-[10px] font-black text-primary uppercase">Scan to Pay Node</p>
                      </div>
                      <div className="space-y-6">
                        <div className="p-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10">
                          <p className="text-[10px] font-black uppercase text-white/60 mb-2">USSD Payment Code</p>
                          <code className="text-2xl font-black tracking-widest">{activeBill.ussdCode}</code>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10">
                          <p className="text-[10px] font-black uppercase text-white/60 mb-2">Control Number</p>
                          <code className="text-xl font-black tracking-widest">{activeBill.controlNumber}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1 rounded-2xl h-14 bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase shadow-xl">
                        <Smartphone className="mr-2 h-4 w-4" /> Resend WhatsApp
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-2xl h-14 border-white/20 text-white hover:bg-white/10 font-black text-[10px] uppercase">
                        Print Invoice
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-20 border-2 border-dashed border-primary/10 rounded-[3rem] text-center space-y-6">
                  <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                    <Info className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-primary uppercase">Ready for Billing</h3>
                    <p className="text-xs text-muted-foreground font-medium max-w-xs leading-relaxed uppercase tracking-tighter">
                      Select a student and specify the fee amount to generate a hardened ClickPesa control number.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forensic-ledger" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-muted/30 p-8 border-b">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div>
                  <CardTitle className="text-xl font-black uppercase">Transaction Ledger</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase text-primary/60">Immutable audit records for TRA compliance</CardDescription>
                </div>
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search Control No / Student..." 
                    className="pl-12 h-12 rounded-full border-none bg-white shadow-inner font-bold text-xs" 
                    value={ledgerSearch}
                    onChange={(e) => setLedgerSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[1000px]">
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-none h-14">
                    <TableHead className="pl-10 text-[9px] font-black uppercase">Identity Node</TableHead>
                    <TableHead className="text-[9px] font-black uppercase">Student Node</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-center">Amount</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-center">Method</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-center">Status</TableHead>
                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase">Audit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="group border-b last:border-none hover:bg-primary/[0.02]">
                      <TableCell className="pl-10 py-6">
                        <div className="flex flex-col">
                          <code className="text-xs font-black text-primary">{tx.controlNumber}</code>
                          <span className="text-[8px] font-mono text-muted-foreground uppercase">{tx.transactionReference || "NO_EXT_REF"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase text-foreground/80">{tx.studentName}</span>
                          <span className="text-[9px] text-muted-foreground font-black uppercase">{tx.class} • {tx.feeType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-black text-xs">TZS {formatMoney(tx.amount)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[8px] font-black uppercase rounded-full bg-white">{tx.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn(
                          "text-[8px] font-black uppercase px-3 py-0.5 rounded-full border-none shadow-sm",
                          tx.status === 'Verified' ? 'bg-green-100 text-green-700' : 
                          tx.status === 'Disputed' ? 'bg-destructive/10 text-destructive animate-pulse' : 'bg-orange-50 text-orange-600'
                        )}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[8px] font-bold text-muted-foreground uppercase">By: {tx.recordedBy}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 text-[8px] font-black text-primary uppercase">Inspect</Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2.5rem] p-10 max-w-md border-none shadow-2xl">
                              <DialogHeader className="text-center space-y-4">
                                <div className="h-16 w-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                                  <ShieldCheck className="h-8 w-8" />
                                </div>
                                <DialogTitle className="text-xl font-black uppercase">Forensic Audit Node</DialogTitle>
                                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Immutable Transaction Record</DialogDescription>
                              </DialogHeader>
                              <div className="py-8 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-muted/20 rounded-2xl shadow-inner">
                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Integrity Hash</p>
                                    <code className="text-[10px] font-mono text-primary font-black break-all">{tx.integrityHash || "N/A"}</code>
                                  </div>
                                  <div className="p-4 bg-muted/20 rounded-2xl shadow-inner">
                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Source Node</p>
                                    <p className="text-[10px] font-black uppercase truncate">{tx.deviceInfo || "Admin Portal"}</p>
                                  </div>
                                </div>
                                <div className="p-4 bg-muted/20 rounded-2xl shadow-inner space-y-3">
                                  <p className="text-[8px] font-black text-muted-foreground uppercase">Lifecycle Trail</p>
                                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                    <span>Created</span>
                                    <span className="text-muted-foreground">{tx.createdAt?.toDate().toLocaleString() || "N/A"}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                    <span>Verified</span>
                                    <span className="text-green-600">{tx.reconciledAt?.toDate().toLocaleString() || "PENDING"}</span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
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
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  addExpense({
                    department: formData.get("department"),
                    category: formData.get("category"),
                    description: formData.get("description"),
                    amount: parseFloat(formData.get("amount") as string),
                    recordedBy: user?.email || "Staff"
                  });
                  toast({ title: "Expense Node Saved" });
                }} className="space-y-5">
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
                  {expenses.length} Operational Nodes
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
                          {ex.status === 'Pending' && (
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 rounded-full text-[8px] font-black text-green-600 uppercase" onClick={() => updateStatus(ex.id, 'Approved', user?.email!)}>Approve</Button>
                              <Button variant="ghost" size="sm" className="h-8 rounded-full text-[8px] font-black text-destructive uppercase" onClick={() => updateStatus(ex.id, 'Rejected', user?.email!)}>Reject</Button>
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
      </Tabs>
    </div>
  )
}
