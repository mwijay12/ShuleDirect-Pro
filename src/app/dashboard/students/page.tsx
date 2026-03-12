"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  Download,
  GraduationCap,
  MapPin,
  FileText,
  Calendar,
  Banknote,
  LineChart,
  ArrowRight
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const students = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", gender: "Male", status: "Active", parent: "Juma Mwamba", contact: "+255 712 000 001", attendance: "98%", balance: "TZS 120,000" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4B", gender: "Female", status: "Active", parent: "Sarah Mushi", contact: "+255 754 000 002", attendance: "92%", balance: "TZS 0" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 3A", gender: "Male", status: "Active", parent: "Fatuma Juma", contact: "+255 621 000 003", attendance: "85%", balance: "TZS 450,000" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 2C", gender: "Female", status: "Inactive", parent: "Peter John", contact: "+255 788 000 004", attendance: "60%", balance: "TZS 1,200,000" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", gender: "Male", status: "Active", parent: "David Lema", contact: "+255 713 000 005", attendance: "95%", balance: "TZS 50,000" },
]

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Student Directory</h1>
          <p className="text-muted-foreground">Manage student enrollment, profiles, and parent records.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none colorful-gradient">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Student
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Total Students", value: "1,284", color: "text-primary" },
          { label: "Active", value: "1,240", color: "text-green-600" },
          { label: "Girls", value: "652", color: "text-accent" },
          { label: "Boys", value: "632", color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardDescription className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</CardDescription>
              <CardTitle className={cn("text-xl sm:text-2xl", stat.color)}>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or class..."
                className="pl-9 bg-muted/30 border-none rounded-full"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-full">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Student</TableHead>
                <TableHead className="hidden md:table-cell">Class</TableHead>
                <TableHead className="hidden lg:table-cell">Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/40`} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="font-medium text-[10px]">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col">
                      <span className="text-xs">{student.parent}</span>
                      <span className="text-[10px] text-muted-foreground">{student.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === "Active" ? "default" : "destructive"}
                      className="text-[9px] py-0 h-4 px-1.5"
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs font-bold text-primary hover:text-primary hover:bg-primary/5"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View Profile
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-xl overflow-auto">
                        <SheetHeader className="text-left mb-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-16 w-16 border-4 border-primary/10 shadow-xl">
                              <AvatarImage src={`https://picsum.photos/seed/${student?.id}/100`} />
                              <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <SheetTitle className="text-2xl">{student?.name}</SheetTitle>
                              <SheetDescription className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="rounded-full">{student?.class}</Badge>
                                <span className="font-mono text-xs">{student?.id}</span>
                              </SheetDescription>
                            </div>
                          </div>
                        </SheetHeader>

                        <Tabs defaultValue="overview" className="space-y-6">
                          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="academics">Academics</TabsTrigger>
                            <TabsTrigger value="finance">Finance</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="border-none bg-muted/30">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                  <Calendar className="h-5 w-5 text-primary mb-2" />
                                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Attendance</p>
                                  <p className="text-xl font-bold">{student?.attendance}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-none bg-muted/30">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                  <Banknote className="h-5 w-5 text-destructive mb-2" />
                                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Fee Balance</p>
                                  <p className="text-xl font-bold text-destructive">{student?.balance}</p>
                                </CardContent>
                              </Card>
                            </div>

                            <Card className="border-none shadow-sm">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-2 gap-y-3 text-sm">
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Gender</p>
                                  <p className="font-medium">{student?.gender}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Enrollment Date</p>
                                  <p className="font-medium">Jan 12, 2024</p>
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Parent/Guardian</p>
                                  <p className="font-medium">{student?.parent}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Contact</p>
                                  <p className="font-medium">{student?.contact}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="academics" className="space-y-4">
                             <div className="space-y-3">
                               {[
                                 { subject: "Mathematics", grade: "A", score: 82 },
                                 { subject: "Kiswahili", grade: "A", score: 91 },
                                 { subject: "Physics", grade: "C", score: 58 },
                                 { subject: "English", grade: "B", score: 74 },
                               ].map((sub) => (
                                 <div key={sub.subject} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                   <div>
                                     <p className="text-sm font-bold">{sub.subject}</p>
                                     <p className="text-[10px] text-muted-foreground">Terminal Exam 1</p>
                                   </div>
                                   <div className="flex items-center gap-4">
                                     <span className="text-sm font-mono">{sub.score}%</span>
                                     <Badge className={cn(
                                       "h-8 w-8 rounded-lg flex items-center justify-center font-bold",
                                       sub.grade === "A" ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                                     )}>
                                       {sub.grade}
                                     </Badge>
                                   </div>
                                 </div>
                               ))}
                             </div>
                             <Button className="w-full rounded-full" variant="outline">
                               Full Academic Transcript <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                          </TabsContent>
                          
                          <TabsContent value="finance" className="space-y-4">
                            <div className="p-4 border rounded-2xl border-dashed">
                              <p className="text-xs font-bold text-muted-foreground uppercase mb-4">Payment History</p>
                              <div className="space-y-4">
                                {[
                                  { date: "Mar 10, 2024", type: "Fee Payment", amount: "500,000", status: "Verified" },
                                  { date: "Jan 15, 2024", type: "Admission", amount: "200,000", status: "Verified" },
                                ].map((payment, i) => (
                                  <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <Banknote className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <p className="font-bold">{payment.type}</p>
                                        <p className="text-[10px] text-muted-foreground">{payment.date}</p>
                                      </div>
                                    </div>
                                    <p className="font-mono font-bold">TZS {payment.amount}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full rounded-full colorful-gradient">
                              Generate Invoice
                            </Button>
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
