
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
  Coffee
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
  
  const handleGenerateControlNumber = () => {
    const newNo = "99" + Math.floor(100000000 + Math.random() * 900000000).toString()
    setControlNo(newNo)
    toast({
      title: "Control Number Generated",
      description: `Payment ID ${newNo} sent to parent via SMS.`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-primary">Finance & Accounts</h1>
          <p className="text-muted-foreground">Revenue assurance and operational expenditure tracking.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            <Receipt className="mr-2 h-4 w-4" /> Financial Reports
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full colorful-gradient">
                <Plus className="mr-2 h-4 w-4" /> Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Generate Control Number</DialogTitle>
                <DialogDescription>Create unique payment IDs for ClickPesa / Mobile Money.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Student / Customer</Label>
                  <Input placeholder="e.g. Amani Mwamba" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input defaultValue="Tuition Fee" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (TZS)</Label>
                    <Input type="number" defaultValue="650000" className="rounded-lg" />
                  </div>
                </div>
                {controlNo && (
                  <div className="p-6 bg-green-50/80 border border-green-100 rounded-2xl text-center">
                    <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest mb-2">Active Control No</p>
                    <p className="text-3xl font-mono font-extrabold text-green-900 tracking-tight">{controlNo}</p>
                    <p className="text-[10px] text-green-600 mt-2 flex items-center justify-center gap-1 font-bold">
                      <CheckCircle className="h-3 w-3" /> CLICKPESA SYNCED
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleGenerateControlNumber} className="w-full rounded-full colorful-gradient">
                  <SmartphoneNfc className="mr-2 h-4 w-4" /> Generate & SMS Parent
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Wallet className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">TZS 124.5M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 opacity-80 font-bold">
              <ArrowUpRight className="h-3 w-3" /> 14% growth vs T3
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-accent text-accent-foreground overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <ShoppingCart className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest">Store Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">TZS 12.8M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 opacity-80 font-bold">
              Stationery & Uniforms
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-destructive">TZS 18.2M</div>
            <p className="text-[10px] mt-2 text-muted-foreground font-bold">
              42 Pending Invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-orange-600">TZS 45.1M</div>
            <p className="text-[10px] mt-2 flex items-center gap-1 text-muted-foreground font-bold">
              <TrendingDown className="h-3 w-3" /> Within budget
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-11 flex w-full sm:w-fit overflow-x-auto">
          <TabsTrigger value="transactions" className="rounded-lg font-bold">Reconciliation</TabsTrigger>
          <TabsTrigger value="pettycash" className="rounded-lg font-bold">Expenditure Hub</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-lg font-bold">Inventory Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/20">
              <div>
                <CardTitle className="text-lg">Fee Reconciliation</CardTitle>
                <CardDescription>Verified via ClickPesa webhooks</CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-9 h-9 w-full sm:w-[200px] border-none bg-white rounded-full shadow-sm" />
                </div>
                <Button variant="outline" size="sm" className="rounded-full bg-white shadow-sm h-9 px-4"><Download className="h-4 w-4 mr-2" /> Export</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="pl-6">Customer</TableHead>
                    <TableHead>Control No</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="group cursor-pointer">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{tx.student}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{tx.id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] font-bold text-primary">{tx.controlNo}</TableCell>
                      <TableCell className="font-bold">TZS {tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[9px] font-extrabold uppercase bg-muted/80">{tx.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-full px-3 py-0 h-5 text-[10px] font-bold">
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pettycash">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg">Petty Cash & Vouchers</CardTitle>
              </div>
              <Button size="sm" className="rounded-full h-9 font-bold">
                 <Plus className="mr-2 h-4 w-4" /> New Voucher
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-muted/30">
                   <TableRow className="border-none">
                     <TableHead className="pl-6">Description</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Amount (TZS)</TableHead>
                     <TableHead>Date</TableHead>
                     <TableHead className="text-right pr-6">Status</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {pettyCash.map((item) => (
                     <TableRow key={item.id} className="hover:bg-muted/20 border-none">
                       <TableCell className="pl-6 py-4">
                         <div className="flex flex-col">
                           <span className="font-bold text-sm">{item.desc}</span>
                           <span className="text-[10px] text-muted-foreground font-mono">{item.id}</span>
                         </div>
                       </TableCell>
                       <TableCell>
                         <Badge variant="outline" className="text-[10px] font-bold border-muted-foreground/20">{item.category}</Badge>
                       </TableCell>
                       <TableCell className="font-bold text-sm text-orange-600">-{item.amount}</TableCell>
                       <TableCell className="text-xs text-muted-foreground">{item.date}</TableCell>
                       <TableCell className="text-right pr-6">
                         <Badge 
                           className={cn(
                             "text-[10px] py-0 h-5 px-3 font-bold",
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

        <TabsContent value="inventory" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shirt className="h-5 w-5 text-primary" /> Uniform & Stationery Shop
              </CardTitle>
              <CardDescription>Daily sales from the school store.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { item: "School Blazer (Form 1)", stock: 45, sales: "1.2M", trend: "+5%" },
                { item: "Exercise Books (Set of 10)", stock: 890, sales: "0.8M", trend: "+12%" },
                { item: "School Tracksuit", stock: 12, sales: "2.1M", trend: "+2%" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-bold">{row.item}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">In Stock: {row.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-primary">TZS {row.sales}</p>
                    <p className="text-[10px] text-green-600 font-bold">{row.trend} This Week</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Coffee className="h-5 w-5 text-accent" /> Canteen & Meals
              </CardTitle>
              <CardDescription>Weekly food program revenue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center py-8">
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
                <p className="text-4xl font-extrabold text-accent">TZS 8.4M</p>
                <p className="text-xs text-muted-foreground font-bold mt-2 uppercase tracking-widest">Total Weekly Meal Sales</p>
              </div>
              <Button variant="outline" className="w-full rounded-full border-accent/20 text-accent">Manage Meal Plans</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
