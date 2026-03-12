"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Download, 
  Filter, 
  Search, 
  Calculator,
  TrendingUp,
  LineChart,
  GraduationCap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/lib/utils"

const results = [
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Academic Hub</h1>
          <p className="text-muted-foreground">Comprehensive NECTA-aligned grading and performance analytics.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full">
            <Download className="mr-2 h-4 w-4" /> NECTA XML Export
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient">
            <Plus className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-xl w-full sm:w-fit overflow-x-auto">
          <TabsTrigger value="results" className="rounded-lg font-bold">Performance Matrix</TabsTrigger>
          <TabsTrigger value="grading" className="rounded-lg font-bold">Grading Matrix</TabsTrigger>
          <TabsTrigger value="subjects" className="rounded-lg font-bold">Subjects & Syllabus</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg font-bold">Trends & AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-3 px-6 pt-6 bg-muted/20">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Terminal Examination Results</CardTitle>
                  <CardDescription>Form 4 Mock - Term 1, 2024</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search records..." className="pl-10 h-10 w-[240px] rounded-full bg-white border-none shadow-sm" />
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm border-none">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="pl-6 w-[120px]">Student ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead className="text-center">Math</TableHead>
                    <TableHead className="text-center">English</TableHead>
                    <TableHead className="text-center">Swahili</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">Division</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id} className="group hover:bg-muted/20">
                      <TableCell className="pl-6 font-mono text-[10px] text-muted-foreground">{result.id}</TableCell>
                      <TableCell className="font-bold text-sm">{result.name}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{result.math}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{result.eng}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{result.kisw}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">{result.points}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={cn(
                            "text-[10px] py-0 h-5 px-2 border-none font-bold",
                            result.division === "I" ? "bg-green-100 text-green-700" : 
                            result.division === "0" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                          )}
                        >
                          DIV {result.division}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="sm" className="font-bold text-primary text-xs hover:bg-primary/5 rounded-full">Report Card</Button>
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
            <Card className="border-none shadow-sm p-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" /> Subject Averages
                </CardTitle>
                <CardDescription>Performance distribution across key learning areas</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <RechartsTooltip cursor={{fill: 'rgba(31, 91, 166, 0.05)'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="avg" fill="#1F5BA6" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm flex flex-col items-center justify-center p-10 bg-primary/5 text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                 <GraduationCap className="h-32 w-32" />
               </div>
               <div className="h-16 w-16 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6">
                 <TrendingUp className="h-8 w-8 text-primary" />
               </div>
               <h3 className="text-4xl font-black text-primary tracking-tighter">84.2% Passed</h3>
               <p className="text-muted-foreground font-medium mt-3 max-w-xs">Overall class passing rate (Division I-III) improved by 6.2% vs last term.</p>
               <div className="flex gap-3 mt-8">
                 <Button className="rounded-full px-6 font-bold h-11" variant="outline">
                   Subject Details
                 </Button>
                 <Button className="rounded-full px-6 font-bold h-11 colorful-gradient">
                   Generate CSV
                 </Button>
               </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grading">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  O-Level NECTA (CSEE) Matrix
                </CardTitle>
                <CardDescription>Aggregation based on Best 7 Subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { grade: "A", range: "75 - 100", pts: "1" },
                  { grade: "B", range: "65 - 74", pts: "2" },
                  { grade: "C", range: "45 - 64", pts: "3" },
                  { grade: "D", range: "30 - 44", pts: "4" },
                  { grade: "F", range: "0 - 29", pts: "5" },
                ].map((row) => (
                  <div key={row.grade} className="flex justify-between items-center p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors border border-transparent hover:border-primary/10">
                    <span className="font-black text-primary text-lg">{row.grade}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{row.range}%</span>
                    <Badge variant="secondary" className="font-bold text-[10px] bg-white shadow-sm border-none px-3">
                      {row.pts} POINT{row.pts !== "1" && "S"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-accent/5 border border-accent/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Division Classification</CardTitle>
                <CardDescription>Official NECTA Aggregate Thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 {[
                   { div: "Division I", range: "7 - 17 Points" },
                   { div: "Division II", range: "18 - 21 Points" },
                   { div: "Division III", range: "22 - 25 Points" },
                   { div: "Division IV", range: "26 - 33 Points" },
                   { div: "Division 0", range: "34+ Points" },
                 ].map((row, i) => (
                   <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-accent/5 flex justify-between items-center hover:translate-x-1 transition-transform cursor-default">
                     <span className="font-extrabold text-sm">{row.div}</span>
                     <span className="text-accent font-mono text-xs font-black">{row.range}</span>
                   </div>
                 ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
