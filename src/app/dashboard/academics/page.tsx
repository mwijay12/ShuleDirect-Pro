
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
  FileText
} from "lucide-react"
import { Input } from "@/components/ui/input"

const results = [
  { id: "S001", name: "Amani Mwamba", math: 82, eng: 74, kisw: 91, phy: 68, chem: 77, geo: 85, civ: 70, division: "I", points: 9 },
  { id: "S002", name: "Baraka Juma", math: 42, eng: 51, kisw: 64, phy: 38, chem: 45, geo: 50, civ: 55, division: "III", points: 24 },
  { id: "S003", name: "Careen Mushi", math: 75, eng: 88, kisw: 92, phy: 80, chem: 84, geo: 88, civ: 81, division: "I", points: 7 },
  { id: "S004", name: "Doreen Peter", math: 28, eng: 34, kisw: 40, phy: 25, chem: 30, geo: 35, civ: 42, division: "0", points: 34 },
  { id: "S005", name: "Emanuel Lema", math: 65, eng: 62, kisw: 70, phy: 58, chem: 60, geo: 66, civ: 64, division: "II", points: 19 },
]

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Academic Management</h1>
          <p className="text-muted-foreground">Manage NECTA-compliant grading, subjects, and results.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export NECTA XML
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Exam
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="results">Exam Results</TabsTrigger>
          <TabsTrigger value="grading">Grading Systems</TabsTrigger>
          <TabsTrigger value="curriculum">Subjects & Topics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle>Continuous Assessment Scores</CardTitle>
                  <CardDescription>Form 4 Mock Examinations - Term 1, 2024</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-8 h-9 w-[200px]" />
                  </div>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px]">Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Math</TableHead>
                    <TableHead className="text-center">Kisw</TableHead>
                    <TableHead className="text-center">Phy</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">Division</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-mono text-xs">{result.id}</TableCell>
                      <TableCell className="font-semibold">{result.name}</TableCell>
                      <TableCell className="text-center">{result.math}</TableCell>
                      <TableCell className="text-center">{result.kisw}</TableCell>
                      <TableCell className="text-center">{result.phy}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">{result.points}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={result.division === "I" ? "default" : result.division === "0" ? "destructive" : "secondary"}
                        >
                          {result.division}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  O-Level NECTA Matrix
                </CardTitle>
                <CardDescription>Rules for Division Classification (7 Best Subjects)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    { grade: "A", range: "75 - 100", points: "1 Point" },
                    { grade: "B", range: "65 - 74", points: "2 Points" },
                    { grade: "C", range: "45 - 64", points: "3 Points" },
                    { grade: "D", range: "30 - 44", points: "4 Points" },
                    { grade: "F", range: "0 - 29", points: "5 Points" },
                  ].map((item) => (
                    <div key={item.grade} className="flex justify-between p-2 rounded-lg bg-muted/30 text-sm">
                      <span className="font-bold">{item.grade}</span>
                      <span className="text-muted-foreground">{item.range}</span>
                      <span className="font-semibold text-primary">{item.points}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-xs font-bold uppercase text-primary mb-2">Division Points Threshold</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Division I: 7 - 17</span>
                    <span>Division II: 18 - 21</span>
                    <span>Division III: 22 - 25</span>
                    <span>Division IV: 26 - 33</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  A-Level NECTA Matrix
                </CardTitle>
                <CardDescription>Higher Secondary Grading Standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    { grade: "A*", range: "90 - 100", points: "1 Point" },
                    { grade: "A", range: "80 - 89", points: "2 Points" },
                    { grade: "B", range: "70 - 79", points: "3 Points" },
                    { grade: "C", range: "60 - 69", points: "4 Points" },
                    { grade: "D", range: "50 - 59", points: "5 Points" },
                    { grade: "E", range: "40 - 49", points: "6 Points" },
                  ].map((item) => (
                    <div key={item.grade} className="flex justify-between p-2 rounded-lg bg-muted/30 text-sm">
                      <span className="font-bold text-accent">{item.grade}</span>
                      <span className="text-muted-foreground">{item.range}</span>
                      <span className="font-semibold">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
