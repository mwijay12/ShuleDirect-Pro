"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus,
  Download,
  Calendar,
  Banknote,
  ArrowRight,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const students = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", gender: "Male", status: "Active", parent: "Juma Mwamba", contact: "+255 712 000 001", attendance: "98%", balance: "TZS 120,000", email: "amani@example.com" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4B", gender: "Female", status: "Active", parent: "Sarah Mushi", contact: "+255 754 000 002", attendance: "92%", balance: "TZS 0", email: "careen@example.com" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 3A", gender: "Male", status: "Active", parent: "Fatuma Juma", contact: "+255 621 000 003", attendance: "85%", balance: "TZS 450,000", email: "baraka@example.com" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 2C", gender: "Female", status: "Inactive", parent: "Peter John", contact: "+255 788 000 004", attendance: "60%", balance: "TZS 1,200,000", email: "doreen@example.com" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", gender: "Male", status: "Active", parent: "David Lema", contact: "+255 713 000 005", attendance: "95%", balance: "TZS 50,000", email: "emanuel@example.com" },
]

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Student Directory</h1>
          <p className="text-muted-foreground">Comprehensive student records, profiles, and historical data.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll New
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Total Students", value: "1,284", color: "text-primary", trend: "+12%" },
          { label: "Active", value: "1,240", color: "text-green-600", trend: "Stable" },
          { label: "Attendance", value: "96.2%", color: "text-accent", trend: "+2%" },
          { label: "Revenue Delta", value: "+8%", color: "text-orange-600", trend: "High" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 p-4">
              <div className="flex justify-between items-start">
                <CardDescription className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</CardDescription>
                <Badge variant="outline" className="text-[8px] py-0 h-4 border-none bg-muted/50">{stat.trend}</Badge>
              </div>
              <CardTitle className={cn("text-xl sm:text-2xl", stat.color)}>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="pb-3 px-6 pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or parent..."
                className="pl-10 bg-muted/40 border-none rounded-full h-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-10 rounded-full px-4">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="pl-6">Student Information</TableHead>
                <TableHead className="hidden md:table-cell">Class Group</TableHead>
                <TableHead className="hidden lg:table-cell">Parent/Guardian</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead className="text-right pr-6">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="group transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/40`} />
                        <AvatarFallback className="font-bold text-primary">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono uppercase">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="font-bold text-[10px] bg-muted/60 text-muted-foreground uppercase px-2 py-0">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{student.parent}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Phone className="h-2 w-2" /> {student.contact}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[9px] py-0 h-5 px-2 border-none font-bold rounded-full",
                        student.status === "Active" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {student.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs font-bold text-primary hover:bg-primary/5 rounded-full"
                          onClick={() => setSelectedStudent(student)}
                        >
                          Deep View
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl">
                        <SheetHeader className="text-left mb-8">
                          <div className="flex items-center gap-6 mb-6">
                            <div className="relative">
                              <Avatar className="h-24 w-24 ring-4 ring-primary/10 shadow-xl rounded-2xl">
                                <AvatarImage src={`https://picsum.photos/seed/${selectedStudent?.id}/150`} />
                                <AvatarFallback className="text-3xl font-bold bg-primary/5">{selectedStudent?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <SheetTitle className="text-3xl font-headline font-extrabold text-primary">{selectedStudent?.name}</SheetTitle>
                              <div className="flex flex-wrap gap-2 items-center">
                                <Badge variant="secondary" className="rounded-full bg-primary/5 text-primary border-none">{selectedStudent?.class}</Badge>
                                <span className="text-xs font-mono text-muted-foreground tracking-tighter uppercase">{selectedStudent?.id}</span>
                              </div>
                            </div>
                          </div>
                        </SheetHeader>

                        <Tabs defaultValue="overview" className="space-y-8">
                          <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-xl h-11">
                            <TabsTrigger value="overview" className="rounded-lg text-xs font-bold">Overview</TabsTrigger>
                            <TabsTrigger value="performance" className="rounded-lg text-xs font-bold">Performance</TabsTrigger>
                            <TabsTrigger value="ledger" className="rounded-lg text-xs font-bold">Ledger</TabsTrigger>
                            <TabsTrigger value="behavior" className="rounded-lg text-xs font-bold">Notes</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="border-none bg-primary/5 shadow-none group">
                                <CardContent className="p-5 flex flex-col items-center justify-center text-center">
                                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                    <Clock className="h-5 w-5 text-primary" />
                                  </div>
                                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Attendance</p>
                                  <p className="text-2xl font-black text-primary">{selectedStudent?.attendance}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-none bg-orange-50 shadow-none group">
                                <CardContent className="p-5 flex flex-col items-center justify-center text-center">
                                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                    <Banknote className="h-5 w-5 text-orange-600" />
                                  </div>
                                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Balance Due</p>
                                  <p className="text-2xl font-black text-orange-700">{selectedStudent?.balance}</p>
                                </CardContent>
                              </Card>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Detailed Information</h3>
                              <div className="grid grid-cols-2 gap-y-6 bg-muted/20 p-6 rounded-2xl">
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Residency</p>
                                  <p className="font-semibold text-sm">Off-Campus (Day)</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</p>
                                  <p className="font-semibold text-sm truncate">{selectedStudent?.email}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Emergency Contact</p>
                                  <p className="font-semibold text-sm">{selectedStudent?.contact}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Blood Type</p>
                                  <p className="font-semibold text-sm">O Positive</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="performance" className="space-y-6">
                             <div className="flex items-center justify-between mb-2">
                               <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject Matrix</h3>
                               <Badge className="bg-green-100 text-green-700">Rank: #4 in Class</Badge>
                             </div>
                             <div className="space-y-3">
                               {[
                                 { subject: "Mathematics", grade: "A", score: 82, trend: "up" },
                                 { subject: "Physics", grade: "B", score: 68, trend: "down" },
                                 { subject: "Chemistry", grade: "A", score: 77, trend: "stable" },
                                 { subject: "English", grade: "A", score: 85, trend: "up" },
                                 { subject: "Geography", grade: "A", score: 91, trend: "up" },
                               ].map((sub) => (
                                 <div key={sub.subject} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors">
                                   <div className="flex items-center gap-3">
                                      <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs",
                                        sub.grade === "A" ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                                      )}>
                                        {sub.grade}
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold">{sub.subject}</p>
                                        <p className="text-[10px] text-muted-foreground">Score: {sub.score}%</p>
                                      </div>
                                   </div>
                                   {sub.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                                 </div>
                               ))}
                             </div>
                          </TabsContent>
                          
                          <TabsContent value="ledger" className="space-y-4">
                            <div className="flex items-center justify-between">
                               <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Transaction History</h3>
                               <Button variant="outline" size="sm" className="h-8 text-[10px] rounded-full">Download PDF</Button>
                            </div>
                            <div className="rounded-2xl border border-dashed p-2">
                               <Table>
                                 <TableBody>
                                   {[
                                     { date: "May 12, 2024", ref: "TX-9021", type: "Fee Payment", amount: "550,000", status: "Verified" },
                                     { date: "Mar 05, 2024", ref: "TX-8812", type: "Uniform Shop", amount: "45,000", status: "Verified" },
                                     { date: "Jan 10, 2024", ref: "TX-7712", type: "Term 1 Fees", amount: "650,000", status: "Verified" },
                                   ].map((row, i) => (
                                     <TableRow key={i} className="hover:bg-muted/30 border-none">
                                       <TableCell className="py-3">
                                         <p className="text-xs font-bold">{row.type}</p>
                                         <p className="text-[9px] text-muted-foreground font-mono">{row.ref}</p>
                                       </TableCell>
                                       <TableCell className="text-right">
                                         <p className="text-xs font-bold">TZS {row.amount}</p>
                                         <p className="text-[9px] text-green-600 font-bold uppercase">{row.status}</p>
                                       </TableCell>
                                     </TableRow>
                                   ))}
                                 </TableBody>
                               </Table>
                            </div>
                            <Button className="w-full rounded-full colorful-gradient h-11 font-bold">
                               Issue New Invoice
                            </Button>
                          </TabsContent>

                          <TabsContent value="behavior">
                            <div className="space-y-4">
                              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Staff Logs & Conduct</h3>
                              <div className="space-y-4">
                                {[
                                  { date: "1 week ago", author: "Mwl. Juma", note: "Consistently participates in Physics lab sessions. Demonstrates leadership.", type: "Positive" },
                                  { date: "3 weeks ago", author: "Headmaster", note: "Represented school in Regional Sports Meet. Awarded Certificate of Merit.", type: "Achievement" },
                                ].map((note, i) => (
                                  <div key={i} className="p-4 rounded-2xl bg-muted/10 relative overflow-hidden">
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", note.type === "Positive" ? "bg-green-500" : "bg-primary")} />
                                    <div className="flex justify-between items-start mb-2">
                                      <span className="text-[10px] font-bold text-primary uppercase">{note.type}</span>
                                      <span className="text-[10px] text-muted-foreground">{note.date}</span>
                                    </div>
                                    <p className="text-xs italic text-foreground/80 leading-relaxed">"{note.note}"</p>
                                    <p className="text-[10px] font-bold mt-2 text-muted-foreground">— {note.author}</p>
                                  </div>
                                ))}
                                <Button variant="secondary" className="w-full rounded-full text-xs font-bold py-6">
                                  <Plus className="mr-2 h-4 w-4" /> Add New Observation
                                </Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
