
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Download, 
  Search, 
  Calculator,
  TrendingUp,
  LineChart,
  GraduationCap,
  FileUp,
  Loader2,
  ChevronRight,
  BookOpen,
  Database,
  RefreshCw,
  Globe,
  CheckCircle2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { exportToExcel } from "@/lib/export-utils"

const initialResults = [
  { id: "S001", name: "Amani Mwamba", math: 82, eng: 74, kisw: 91, phy: 68, chem: 77, geo: 85, civ: 70, division: "I", points: 9 },
  { id: "S002", name: "Baraka Juma", math: 42, eng: 51, kisw: 64, phy: 38, chem: 45, geo: 50, civ: 55, division: "III", points: 24 },
  { id: "S003", name: "Careen Mushi", math: 75, eng: 88, kisw: 92, phy: 80, chem: 84, geo: 88, civ: 81, division: "I", points: 7 },
  { id: "S004", name: "Doreen Peter", math: 28, eng: 34, kisw: 40, phy: 25, chem: 30, geo: 35, civ: 42, division: "0", points: 34 },
  { id: "S005", name: "Emanuel Lema", math: 65, eng: 62, kisw: 70, phy: 58, chem: 60, geo: 66, civ: 64, division: "II", points: 19 },
]

const subjectPerformanceData = [
  { subject: "Math", avg: 65 },
  { subject: "English", avg: 72 },
  { subject: "Swahili", avg: 85 },
  { subject: "Physics", avg: 48 },
  { subject: "Chemistry", avg: 54 },
  { subject: "Biology", avg: 61 },
]

export default function AcademicsPage() {
  const { toast } = useToast()
  const [results, setResults] = useState(initialResults)
  const [isUploading, setIsUploading] = useState(false)
  const [isSyncingPrems, setIsSyncingPrems] = useState(false)

  const handleExcelUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Excel Import Successful",
        description: `Successfully processed records for the 2026 season.`,
      })
    }, 2000)
  }

  const handlePremsSync = () => {
    setIsSyncingPrems(true)
    setTimeout(() => {
      setIsSyncingPrems(false)
      toast({
        title: "PReMS Node Synced",
        description: "Institutional records successfully pushed to national gateway.",
      })
    }, 3000)
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 h-5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Database className="h-2.5 w-2.5 mr-1.5" /> 2026 Academic Node
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Academic Matrix</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">NECTA-aligned institutional grading infrastructure.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <Button 
            variant="outline" 
            onClick={handleExcelUpload} 
            disabled={isUploading}
            className="flex-1 sm:flex-none rounded-full h-11 border-dashed border-primary text-primary hover:bg-primary/5 font-bold text-xs"
          >
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
            Import Results
          </Button>
          <Button onClick={handlePremsSync} disabled={isSyncingPrems} className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient font-black text-xs uppercase shadow-xl group">
            {isSyncingPrems ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />}
            PReMS Sync
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-xl w-full sm:w-fit overflow-x-auto h-auto flex gap-1 shadow-inner">
          <TabsTrigger value="results" className="rounded-lg font-bold py-2 text-xs px-6">Live Matrix</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg font-bold py-2 text-xs px-6">AI Insights</TabsTrigger>
          <TabsTrigger value="prems" className="rounded-lg font-bold py-2 text-xs px-6">PReMS Gateway</TabsTrigger>
          <TabsTrigger value="criteria" className="rounded-lg font-bold py-2 text-xs px-6">NECTA Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2rem]">
            <CardHeader className="pb-3 px-6 pt-6 bg-muted/20 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg font-black">2026 Terminal Examination Ledger</CardTitle>
                <div className="relative w-full sm:w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                  <Input placeholder="Search ledger..." className="pl-10 h-10 rounded-full bg-white border-none shadow-sm text-xs font-bold" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader className="bg-muted/10">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">ID Node</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Full Name</TableHead>
                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Math</TableHead>
                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Eng</TableHead>
                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Kisw</TableHead>
                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Pts</TableHead>
                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Division</TableHead>
                    <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                      <TableCell className="pl-8 py-5 font-mono text-[10px] font-black text-muted-foreground">{result.id}</TableCell>
                      <TableCell className="font-bold text-sm text-foreground/80">{result.name}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-xs">{result.math}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-xs">{result.eng}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-xs">{result.kisw}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1 rounded-full">{result.points}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={cn(
                            "text-[9px] py-0.5 px-3 border-none font-black rounded-full shadow-sm",
                            result.division === "I" ? "bg-green-100 text-green-700" : 
                            result.division === "0" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                          )}
                        >
                          DIV {result.division}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase hover:bg-primary/5 rounded-full px-4">Transcript</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prems" className="space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white/60 backdrop-blur-md overflow-hidden">
            <CardHeader className="p-8 border-b bg-primary/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-primary flex items-center gap-3">
                    <Globe className="h-6 w-6" /> PReMS Node Verification
                  </CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest">National student Record synchronization</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 border-none font-black px-4 py-1 rounded-full text-[10px]">GATEWAY READY</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Synced Records", value: "2,480", icon: CheckCircle2, color: "text-green-600" },
                  { label: "Pending Upload", value: "12", icon: RefreshCw, color: "text-orange-600" },
                  { label: "Gateway Status", value: "Operational", icon: Globe, color: "text-primary" },
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-[2rem] bg-muted/20 border border-transparent hover:border-primary/10 transition-all text-center group">
                    <div className={cn("h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", item.color)}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
                    <p className="text-2xl font-black text-foreground/80 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-primary/20 bg-primary/5 text-center space-y-6">
                <p className="text-sm font-medium text-muted-foreground max-w-lg mx-auto">
                  Ensure all students have valid Birth Certificate IDs and Parents' National ID numbers (NIDA) for successful PReMS verification.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={handlePremsSync} disabled={isSyncingPrems} className="rounded-full h-14 px-10 colorful-gradient font-black text-xs uppercase tracking-widest shadow-2xl">
                    {isSyncingPrems ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCw className="mr-2 h-5 w-5" />}
                    Initialize Full Node Sync
                  </Button>
                  <Button variant="outline" className="rounded-full h-14 px-10 bg-white border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest shadow-sm">
                    Generate XML Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
