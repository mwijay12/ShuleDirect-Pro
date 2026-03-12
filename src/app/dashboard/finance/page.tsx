
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
  ChevronRight
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

const pettyCash = [
  { id: "EX-101", desc: "Lab Reagents (Chem)", category: "Academics", amount: "85,000", date: "Today", status: "Approved" },
  { id: "EX-102", desc: "Fuel for Bus T 442", category: "Transport", amount: "150,000", date: "Today", status: "Pending" },
  { id: "EX-103", desc: "Cleaning Supplies", category: "Operations", amount: "42,000", date: "Yesterday", status: "Approved" },
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
        title: "Ledger Exported",
        description: "Full financial statement (XLSX) downloaded.",
      })
    }, 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Finance & Accounts</h1>
          <p className="text-muted-foreground font-medium text-sm">Revenue assurance, petty cash tracking, and ClickPesa reconciliation.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleExportFinance} 
            disabled={isExporting}
            className="flex-1 sm:flex-none rounded-full h-12 border-primary/20 text-primary font-bold shadow-sm"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
            Export Ledger
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none rounded-full h-12 colorful-gradient font-black shadow-xl px-8">
                <Plus className="mr-2 h-5 w-5" /> Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md">
              <DialogHeader className="bg-primary/5 p-8 border-b">
                <DialogTitle className="text-2xl font-black text-primary">Generate Control Number</DialogTitle>
                <DialogDescription className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Unique payment IDs for Mobile Money reconciliation.</DialogDescription>
              </DialogHeader>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Student</Label>
                  <Input placeholder="e.g. Amani Mwamba" className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
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
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Badge className="bg-green-600 text-white font-black text-[9px] rounded-full border-none">CLICKPESA SYNCED</Badge>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="p-8 pt-0">
                <Button onClick={handleGenerateControlNumber} className="w-full h-14 rounded-2xl colorful-gradient font-black text-lg shadow-xl group">
                  <SmartphoneNfc className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" /> 
                  Generate & SMS Parent
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-xl bg-primary text-primary-foreground overflow-hidden relative rounded-[2rem]">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Wallet className="h-32 w-32" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black opacity-80 uppercase tracking-[0.2em]">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">TZS 124.5M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 opacity-80 font-black">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-400" /> 14% GROWTH VS T3
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl bg-accent text-accent-foreground overflow-hidden relative rounded-[2rem]">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <ShoppingCart className="h-32 w-32" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black opacity-80 uppercase tracking-[0.2em]">Sales Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">TZS 12.8M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 opacity-80 font-black uppercase tracking-widest">
              Stationery & Uniforms
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-destructive">TZS 18.2M</div>
            <p className="text-[10px] mt-2 text-muted-foreground font-black uppercase tracking-widest">
              42 Pending Invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-600">TZS 45.1M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 text-muted-foreground font-black uppercase tracking-widest">
              <TrendingDown className="h-3.5 w-3.5 text-orange-500" /> Within Budget
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-14 flex w-full sm:w-fit overflow-x-auto shadow-inner">
          <TabsTrigger value="transactions" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Reconciliation</TabsTrigger>
          <TabsTrigger value="pettycash" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Expenditure</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-xl font-black px-8 py-2 text-xs uppercase tracking-widest">Store Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md overflow-hidden rounded-[2.5rem]">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/20 border-b p-8">
              <div>
                <CardTitle className="text-xl font-black">Fee Reconciliation Hub</CardTitle>
                <CardDescription className="font-bold text-xs uppercase tracking-tighter">Verified transactions via ClickPesa/Beem webhooks</CardDescription>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input placeholder="Search logs..." className="pl-10 h-11 w-full sm:w-[250px] border-none bg-white rounded-full shadow-sm font-medium" />
                </div>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-full bg-white shadow-sm border-none">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/5">
                  <TableRow className="hover:bg-transparent border-none h-14">
                    <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Control No</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (TZS)</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="group cursor-pointer border-b last:border-none transition-colors">
                      <TableCell className="pl-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground group-hover:text-primary transition-colors">{tx.student}</span>
                          <span className="text-[10px] text-muted-foreground font-mono font-black uppercase">{tx.id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[11px] font-black text-primary px-4 py-1 bg-primary/5 rounded-lg w-fit inline-block mt-4">{tx.controlNo}</TableCell>
                      <TableCell className="font-black text-sm">TZS {tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[9px] font-black uppercase bg-muted/80 px-3 py-0.5 rounded-full tracking-tighter">{tx.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-full px-4 py-0.5 h-6 text-[10px] font-black shadow-sm">
                          {tx.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pettycash" className="space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-8 bg-muted/20 border-b">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-lg shadow-orange-100">
                  <ArrowDownCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Petty Cash & Vouchers</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Manage day-to-day operational expenditure.</CardDescription>
                </div>
              </div>
              <Button className="rounded-full h-12 font-black px-8 colorful-gradient shadow-xl">
                 <Plus className="mr-2 h-5 w-5" /> New Voucher
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-muted/5">
                   <TableRow className="border-none h-14">
                     <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Voucher Desc</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (TZS)</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</TableHead>
                     <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {pettyCash.map((item) => (
                     <TableRow key={item.id} className="hover:bg-muted/20 border-none transition-colors">
                       <TableCell className="pl-8 py-5">
                         <div className="flex flex-col">
                           <span className="font-black text-sm text-foreground">{item.desc}</span>
                           <span className="text-[10px] text-muted-foreground font-mono font-black uppercase">{item.id}</span>
                         </div>
                       </TableCell>
                       <TableCell>
                         <Badge variant="outline" className="text-[10px] font-black border-muted-foreground/20 px-3 uppercase">{item.category}</Badge>
                       </TableCell>
                       <TableCell className="font-black text-sm text-orange-600">-{item.amount}</TableCell>
                       <TableCell className="text-xs font-bold text-muted-foreground">{item.date}</TableCell>
                       <TableCell className="text-right pr-8">
                         <Badge 
                           className={cn(
                             "text-[9px] py-0.5 px-4 font-black rounded-full shadow-sm",
                             item.status === "Approved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                           )}
                         >
                           {item.status.toUpperCase()}
                         </Badge>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="bg-primary/5 p-8 border-b">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Shirt className="h-6 w-6 text-primary" /> Uniform & Stationery Shop
              </CardTitle>
              <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Direct daily sales from the institutional store.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {[
                { item: "School Blazer (Form 1)", stock: 45, sales: "1.2M", trend: "+5%" },
                { item: "Exercise Books (Set of 10)", stock: 890, sales: "0.8M", trend: "+12%" },
                { item: "School Tracksuit", stock: 12, sales: "2.1M", trend: "+2%" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center p-5 rounded-[2rem] bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer shadow-inner">
                  <div>
                    <p className="text-sm font-black tracking-tight">{row.item}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">In Stock: {row.stock} Units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">TZS {row.sales}</p>
                    <p className="text-[10px] text-green-600 font-black uppercase tracking-tighter">{row.trend} This Week</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2 rounded-full font-black text-xs uppercase tracking-widest text-primary hover:bg-primary/5 h-12">
                Manage Stock & Pricing
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden flex flex-col">
            <CardHeader className="bg-accent/5 p-8 border-b">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Coffee className="h-6 w-6 text-accent" /> Canteen & Meals
              </CardTitle>
              <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Revenue assurance for student meal programs.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex-1 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="p-10 rounded-[3rem] bg-accent/5 border-2 border-dashed border-accent/20 w-full relative group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                <p className="text-5xl font-black text-accent tracking-tighter">TZS 8.4M</p>
                <p className="text-[10px] text-muted-foreground font-black mt-3 uppercase tracking-[0.2em]">Total Weekly Meal Program Revenue</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full pt-4">
                <div className="p-4 rounded-2xl bg-muted/20 text-center">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Boarders</p>
                  <p className="text-sm font-black text-primary">570 Active</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/20 text-center">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Day Scholars</p>
                  <p className="text-sm font-black text-primary">124 Opt-in</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-[2rem] border-accent/20 text-accent font-black h-12 shadow-sm">
                Manage Meal Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
