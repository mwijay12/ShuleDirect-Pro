
"use client"

import * as React from "react"
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
  SmartphoneNfc
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

const transactions = [
  { id: "TX-9021", student: "Amani Mwamba", type: "Tuition", amount: "550,000", method: "M-Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345678" },
  { id: "TX-9022", student: "Careen Mushi", type: "Transport", amount: "120,000", method: "Tigo Pesa", date: "2024-05-12", status: "Success", controlNo: "99102345679" },
  { id: "TX-9023", student: "Baraka Juma", type: "Tuition", amount: "300,000", method: "Bank Transfer", date: "2024-05-11", status: "Pending", controlNo: "99102345680" },
  { id: "TX-9024", student: "Emanuel Lema", type: "Tuition", amount: "450,000", method: "M-Pesa", date: "2024-05-11", status: "Success", controlNo: "99102345681" },
]

export default function FinancePage() {
  const { toast } = useToast()
  
  const handleGenerateControlNumber = () => {
    toast({
      title: "Control Number Generated",
      description: "Namba ya malipo imetumwa kwa mzazi kupitia SMS (Beem Africa Gateway).",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Financial Operations (Ada)</h1>
          <p className="text-muted-foreground">Manage fees, ClickPesa reconciliation, and control numbers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" /> Reconciliation
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Smartphone className="mr-2 h-4 w-4" /> Create Bill (Control No)
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Control Number</DialogTitle>
                <DialogDescription>
                  Create a unique payment ID for ClickPesa / Mobile Money collection.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Student Name / ID</Label>
                  <Input placeholder="e.g. Amani Mwamba (2024-001)" />
                </div>
                <div className="space-y-2">
                  <Label>Fee Category</Label>
                  <Input defaultValue="Tuition Fee - Term 2" />
                </div>
                <div className="space-y-2">
                  <Label>Amount (TZS)</Label>
                  <Input type="number" defaultValue="650000" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleGenerateControlNumber} className="w-full">
                  <SmartphoneNfc className="mr-2 h-4 w-4" /> Generate & SMS Parent
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Total Revenue (Term 1)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TZS 124,500,000</div>
            <p className="text-xs mt-1 flex items-center gap-1 opacity-80">
              <ArrowUpRight className="h-3 w-3" /> 14% increase from Term 3, 2023
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">Outstanding Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">TZS 18,240,000</div>
            <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
              42 students with pending balances
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">M-Pesa / Tigo Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">82%</div>
            <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
              Payments via ClickPesa gateway
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Real-time reconciliation via ClickPesa Webhooks</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Invoice #" className="h-9 w-[150px]" />
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Control No</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{tx.student}</span>
                        <span className="text-[10px] text-muted-foreground">{tx.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{tx.controlNo}</TableCell>
                    <TableCell className="font-mono">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{tx.method}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={tx.status === "Success" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}
                        variant="secondary"
                      >
                        {tx.status}
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
            <CardTitle>Fee Structures (Ada)</CardTitle>
            <CardDescription>Multi-tiered billing configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Nursery / Primary", amount: "450,000", period: "Termly" },
              { label: "Secondary O-Level", amount: "650,000", period: "Termly" },
              { label: "Secondary A-Level", amount: "850,000", period: "Termly" },
              { label: "Transport (Route A)", amount: "120,000", period: "Monthly" },
            ].map((fee) => (
              <div key={fee.label} className="flex justify-between items-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-semibold">{fee.label}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{fee.period}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{fee.amount}</p>
                  <p className="text-[10px] text-muted-foreground">TZS</p>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Define New Fee
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
