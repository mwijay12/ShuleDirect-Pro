"use client"

import * as React from "react"
import { useState } from "react"
import { 
  FileText, 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  Download, 
  Loader2,
  PieChart,
  Bus,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  History
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

export default function ReportsPage() {
  const { toast } = useToast()
  const { role } = useAuth()
  const [loadingReport, setLoadingReport] = useState<string | null>(null)

  // Simulated Report Generator
  const handleGenerateReport = (reportName: string) => {
    setLoadingReport(reportName)
    
    // Simulate complex data aggregation node
    setTimeout(() => {
      setLoadingReport(null)
      toast({
        title: "Report Node Certified",
        description: `${reportName} has been generated and is ready in your vault.`,
      })
    }, 2000)
  }

  // Functional CSV Export for Defaulters (Demo Logic)
  const exportDefaultersCSV = () => {
    setLoadingReport("Defaulters List")
    
    setTimeout(() => {
      const data = [
        ["Student ID", "Name", "Class", "Balance (TZS)", "Status"],
        ["ALT-2026-001", "JUMA KHAMISI OMARI", "Standard 7", "450,000", "Critical"],
        ["ALT-2026-004", "ANNA JOSEPH KILIMA", "Form 2A", "120,000", "Partial"],
        ["ALT-2026-088", "BARAKA SAIDI", "Standard 4", "900,000", "Critical"]
      ]
      
      const csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n")
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "ShuleAltra_Defaulters_Audit.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setLoadingReport(null)
      toast({
        title: "CSV Export Successful",
        description: "Defaulters audit ledger saved to local node.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24 px-1 font-body">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Zap className="h-2.5 w-2.5 mr-1.5" /> Institutional Hub
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">Reports Center</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Generate and export system-wide analytics and records.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase tracking-widest">
            <History className="mr-2 h-4 w-4" /> Audit History
          </Button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
              <DollarSign className="h-20 w-20" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fee Collection (Term 3)</p>
            <p className="text-2xl font-black text-primary mt-2">TZS 45.5M</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-700 text-[8px] font-black rounded-full border-none">82% Target</Badge>
              <span className="text-[9px] text-muted-foreground font-bold uppercase">vs Budget Node</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
              <TrendingUp className="h-20 w-20" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Overall Pass Rate</p>
            <p className="text-2xl font-black text-accent mt-2">78.4%</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-accent/10 text-accent text-[8px] font-black rounded-full border-none">↑ 2.1%</Badge>
              <span className="text-[9px] text-muted-foreground font-bold uppercase">Since last cycle</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
              <Package className="h-20 w-20" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Canteen Inventory</p>
            <p className="text-2xl font-black text-orange-600 mt-2">Optimal</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-orange-100 text-orange-600 text-[8px] font-black rounded-full border-none">3 Items Low</Badge>
              <span className="text-[9px] text-muted-foreground font-bold uppercase">Restock Required</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <Tabs defaultValue="finance" className="space-y-8">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 flex w-full sm:w-fit overflow-x-auto shadow-inner border border-muted/50">
          <TabsTrigger value="finance" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Financial</TabsTrigger>
          <TabsTrigger value="academics" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Academics</TabsTrigger>
          <TabsTrigger value="ops" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Operations</TabsTrigger>
          <TabsTrigger value="admin" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Administrative</TabsTrigger>
        </TabsList>

        {/* Finance Section */}
        <TabsContent value="finance" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Fee Collection Ledger"
              description="Detailed chronological list of all student payments and bank reconciliation refs."
              icon={DollarSign}
              onGenerate={() => handleGenerateReport("Fee Collection Ledger")}
              isLoading={loadingReport === "Fee Collection Ledger"}
            />
            <ReportCard 
              title="Expenditure & Procurement"
              description="Full breakdown of institutional spending, petty cash, and vendor settlements."
              icon={FileText}
              onGenerate={() => handleGenerateReport("Expenditure & Procurement")}
              isLoading={loadingReport === "Expenditure & Procurement"}
            />
            <ReportCard 
              title="Defaulters List"
              description="Critical audit of students with outstanding balances for debt recovery nodes."
              icon={ShieldCheck}
              onGenerate={exportDefaultersCSV}
              isLoading={loadingReport === "Defaulters List"}
              badge="CSV EXPORT"
            />
          </div>
        </TabsContent>

        {/* Academics Section */}
        <TabsContent value="academics" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Class Performance Ranking"
              description="Institutional benchmarking of classes from peak performance to remedial nodes."
              icon={PieChart}
              onGenerate={() => handleGenerateReport("Class Performance Ranking")}
              isLoading={loadingReport === "Class Performance Ranking"}
            />
            <ReportCard 
              title="Subject Analysis Matrix"
              description="Detailed pass/fail rates per subject node for NECTA readiness audit."
              icon={ClipboardCheck}
              onGenerate={() => handleGenerateReport("Subject Analysis Matrix")}
              isLoading={loadingReport === "Subject Analysis Matrix"}
            />
            <ReportCard 
              title="Master Grade Sheet"
              description="Unified export of all student results for the current academic season."
              icon={FileText}
              onGenerate={() => handleGenerateReport("Master Grade Sheet")}
              isLoading={loadingReport === "Master Grade Sheet"}
            />
          </div>
        </TabsContent>

        {/* Ops & Logistics */}
        <TabsContent value="ops" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Canteen Usage Log"
              description="Tracking of cashless transactions and dietary consumption across the student body."
              icon={Package}
              onGenerate={() => handleGenerateReport("Canteen Usage Log")}
              isLoading={loadingReport === "Canteen Usage Log"}
            />
            <ReportCard 
              title="Inventory Asset Register"
              description="Verified property audit ledger including maintenance status of all school assets."
              icon={ClipboardCheck}
              onGenerate={() => handleGenerateReport("Inventory Asset Register")}
              isLoading={loadingReport === "Inventory Asset Register"}
            />
            <ReportCard 
              title="Transport & Bus Routes"
              description="Fleet deployment analytics and student-to-bus assignment records."
              icon={Bus}
              onGenerate={() => handleGenerateReport("Transport & Bus Routes")}
              isLoading={loadingReport === "Transport & Bus Routes"}
            />
          </div>
        </TabsContent>

        {/* Administrative */}
        <TabsContent value="admin" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Staff Attendance & Payroll"
              description="Consolidated personnel node report including monthly clock-in and payroll data."
              icon={Users}
              onGenerate={() => handleGenerateReport("Staff Attendance & Payroll")}
              isLoading={loadingReport === "Staff Attendance & Payroll"}
            />
            <ReportCard 
              title="Student Attendance Trends"
              description="Longitudinal audit of student presence rates and absenteeism warning nodes."
              icon={TrendingUp}
              onGenerate={() => handleGenerateReport("Student Attendance Trends")}
              isLoading={loadingReport === "Student Attendance Trends"}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReportCard({ 
  title, 
  description, 
  icon: Icon, 
  onGenerate, 
  isLoading,
  badge
}: { 
  title: string; 
  description: string; 
  icon: any; 
  onGenerate: () => void; 
  isLoading: boolean;
  badge?: string;
}) {
  return (
    <Card className="border-none shadow-lg bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all border border-muted/50">
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="p-4 rounded-3xl bg-primary/5 text-primary group-hover:scale-110 transition-transform shadow-inner">
            <Icon className="h-6 w-6" />
          </div>
          {badge && (
            <Badge className="bg-primary text-white border-none font-black text-[7px] uppercase px-3 py-1 rounded-full">{badge}</Badge>
          )}
        </div>
        <CardTitle className="text-lg font-black uppercase tracking-tight text-foreground/80">{title}</CardTitle>
        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <Button 
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full h-12 rounded-2xl colorful-gradient font-black text-[10px] uppercase tracking-widest shadow-xl group/btn"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4 group-hover/btn:translate-y-1 transition-transform" />
          )}
          {isLoading ? "Generating Node..." : "Generate Report"}
        </Button>
      </CardContent>
    </Card>
  )
}
