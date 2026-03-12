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
  GraduationCap,
  Calculator,
  FileText,
  TrendingUp,
  Settings2,
  LineChart,
  ArrowRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

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
          <p className="text-muted-foreground">Manage grading, subjects, and NECTA-compliant performance matrix.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full">
            <Download className="mr-2 h-4 w-4" /> Export NECTA XML
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Exam
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full sm:w-fit overflow-x-auto">
          <TabsTrigger value="results">Exam Results</TabsTrigger>
          <TabsTrigger value="grading">Grading Rules</TabsTrigger>
          <TabsTrigger value="curriculum">Subjects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3 px-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1 text-left">
                  <CardTitle>Continuous Assessment Scores</CardTitle>
                  <CardDescription>Form 4 Mock Examinations - Term 1, 2024</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-9 h-10 w-[200px] rounded-full" />
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Math</TableHead>
                    <TableHead className="text-center">English</TableHead>
                    <TableHead className="text-center">Division</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-mono text-[10px]">{result.id}</TableCell>
                      <TableCell className="font-semibold text-sm">{result.name}</TableCell>
                      <TableCell className="text-center text-sm">{result.math}</TableCell>
                      <TableCell className="text-center text-sm">{result.eng}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={cn(
                            "text-[10px] py-0 h-5 px-2",
                            result.division === "I" ? "bg-green-100 text-green-700" : 
                            result.division === "0" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                          )}
                          variant="outline"
                        >
                          Div {result.division}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="font-bold text-primary text-xs">View Breakdown</Button>
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
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Average Performance by Subject</CardTitle>
                <CardDescription>Term 1 Class Averages</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="avg" fill="#1F5BA6" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm flex flex-col justify-center text-center p-8 bg-primary/5">
               <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-primary">84.2% Passed</h3>
               <p className="text-muted-foreground text-sm mt-2">Overall class passing rate compared to last term's 78%.</p>
               <Button className="mt-6 rounded-full w-fit mx-auto" variant="outline">
                 Download Detailed Insights
               </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grading">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  O-Level NECTA Matrix (CSEE)
                </CardTitle>
                <CardDescription>Points calculated from 7 Best Subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { grade: "A", range: "75 - 100", pts: "1" },
                  { grade: "B", range: "65 - 74", pts: "2" },
                  { grade: "C", range: "45 - 64", pts: "3" },
                  { grade: "D", range: "30 - 44", pts: "4" },
                  { grade: "F", range: "0 - 29", pts: "5" },
                ].map((row) => (
                  <div key={row.grade} className="flex justify-between p-3 rounded-xl bg-muted/30 text-sm font-medium">
                    <span className="font-bold text-primary">{row.grade}</span>
                    <span className="text-muted-foreground">{row.range}</span>
                    <span className="font-bold">{row.pts} Point{row.pts !== "1" && "s"}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle>Division Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="p-3 bg-white rounded-xl shadow-sm border border-accent/10 flex justify-between">
                   <span className="font-bold">Division I</span>
                   <span className="text-accent font-mono">7 - 17 Points</span>
                 </div>
                 <div className="p-3 bg-white rounded-xl shadow-sm border border-accent/10 flex justify-between">
                   <span className="font-bold">Division II</span>
                   <span className="text-accent font-mono">18 - 21 Points</span>
                 </div>
                 <div className="p-3 bg-white rounded-xl shadow-sm border border-accent/10 flex justify-between">
                   <span className="font-bold">Division III</span>
                   <span className="text-accent font-mono">22 - 25 Points</span>
                 </div>
                 <div className="p-3 bg-white rounded-xl shadow-sm border border-accent/10 flex justify-between">
                   <span className="font-bold">Division IV</span>
                   <span className="text-accent font-mono">26 - 33 Points</span>
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
