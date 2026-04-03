
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
  Database
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
  const [activeSubject, setActiveSubject] = useState<string | null>(null)

  useEffect(() => {
    const savedRole = localStorage.getItem("shule_role")
    if (savedRole?.startsWith("TEACHER_")) {
      setActiveSubject(savedRole.split("_")[1])
    }
  }, [])

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

  const handleExportMatrix = () => {
    exportToExcel(results, "Academic_Matrix_2026")
    toast({ title: "Matrix Exported", description: "Full transcript matrix saved as Excel." })
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
          <Button onClick={handleExportMatrix} variant="secondary" className="flex-1 sm:flex-none rounded-full h-11 font-bold text-xs">
            <Download className="mr-2 h-4 w-4" /> Export Matrix
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-xl w-full sm:w-fit overflow-x-auto h-auto flex gap-1 shadow-inner">
          <TabsTrigger value="results" className="rounded-lg font-bold py-2 text-xs px-6">Live Matrix</TabsTrigger>
          <TabsTrigger value="entry" className="rounded-lg font-bold py-2 text-xs px-6">Grading Desk</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg font-bold py-2 text-xs px-6">AI Insights</TabsTrigger>
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" /> Subject Node Distribution
                </CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest">Weighted averages across all academic tiers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] p-8 pt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <RechartsTooltip cursor={{fill: 'rgba(31, 91, 166, 0.05)'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="avg" fill="#1F5BA6" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2rem] flex flex-col items-center justify-center p-10 bg-primary text-white text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                 <GraduationCap className="h-48 w-48" />
               </div>
               <div className="h-16 w-16 rounded-3xl bg-white shadow-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                 <TrendingUp className="h-8 w-8 text-primary" />
               </div>
               <h3 className="text-4xl font-black tracking-tighter">84.2% Pass Rate</h3>
               <p className="text-white/70 font-bold mt-4 max-w-xs text-xs uppercase tracking-widest">Institutional proficiency improved by 4.2% for 2026 vs 2025 node.</p>
               <Button className="rounded-full px-10 font-black h-12 mt-8 bg-white text-primary hover:bg-white/90 shadow-2xl uppercase text-[10px] tracking-widest">
                 Generate Official Audit
               </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
