
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
  AlertCircle,
  Stethoscope,
  ShieldAlert,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Loader2,
  FileText,
  History
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
import { useToast } from "@/hooks/use-toast"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"

const students = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", gender: "Male", status: "Active", parent: "Juma Mwamba", contact: "+255 712 000 001", attendance: "98%", balance: "TZS 120,000", email: "amani@example.com" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4B", gender: "Female", status: "Active", parent: "Sarah Mushi", contact: "+255 754 000 002", attendance: "92%", balance: "TZS 0", email: "careen@example.com" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 3A", gender: "Male", status: "Active", parent: "Fatuma Juma", contact: "+255 621 000 003", attendance: "85%", balance: "TZS 450,000", email: "baraka@example.com" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 2C", gender: "Female", status: "Inactive", parent: "Peter John", contact: "+255 788 000 004", attendance: "60%", balance: "TZS 1,200,000", email: "doreen@example.com" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", gender: "Male", status: "Active", parent: "David Lema", contact: "+255 713 000 005", attendance: "95%", balance: "TZS 50,000", email: "emanuel@example.com" },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  const handleGenerateAiSummary = async () => {
    if (!selectedStudent) return
    setIsGeneratingAi(true)
    try {
      const result = await generateStudentProgressSummary({
        studentName: selectedStudent.name,
        academicPerformance: [
          { subject: "Mathematics", grade: "A", comment: "Excellent logic skills." },
          { subject: "Physics", grade: "B", comment: "Improving in practical work." }
        ],
        attendanceSummary: `Current attendance is ${selectedStudent.attendance}. Generally punctual.`,
        behavioralNotes: "Demonstrates positive leadership in class and participates actively."
      })
      setAiSummary(result.summary)
      toast({ title: "Summary Ready", description: "AI progress report generated." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not generate summary." })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleExportDocx = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Report Card Generated",
        description: `Official DOCX for ${selectedStudent?.name} downloaded.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Student Directory</h1>
          <p className="text-muted-foreground">Comprehensive student records, profiles, and historical data.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full h-11">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient h-11">
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
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <CardHeader className="pb-2 p-4">
              <div className="flex justify-between items-start">
                <CardDescription className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</CardDescription>
                <Badge variant="outline" className="text-[8px] py-0 h-4 border-none bg-muted/50 font-black">{stat.trend}</Badge>
              </div>
              <CardTitle className={cn("text-xl sm:text-2xl font-black", stat.color)}>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-card/60 backdrop-blur-md">
        <CardHeader className="pb-3 px-6 pt-6 bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search by name, ID or parent..."
                className="pl-10 bg-white border-none rounded-full h-11 shadow-sm font-medium"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-11 rounded-full px-6 bg-white border-none shadow-sm font-bold">
                <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Information</TableHead>
                <TableHead className="hidden md:table-cell text-[10px] font-black uppercase tracking-widest text-muted-foreground">Class Group</TableHead>
                <TableHead className="hidden lg:table-cell text-[10px] font-black uppercase tracking-widest text-muted-foreground">Parent/Guardian</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</TableHead>
                <TableHead className="text-right pr-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="group transition-colors border-b last:border-none">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11 ring-2 ring-background shadow-lg transition-transform group-hover:scale-105 rounded-2xl">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/100`} />
                        <AvatarFallback className="font-black text-primary bg-primary/5 text-lg">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="font-black text-[10px] bg-muted/60 text-muted-foreground uppercase px-3 py-0.5 rounded-full">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{student.parent}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                        <Phone className="h-2.5 w-2.5" /> {student.contact}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[9px] py-0 h-5 px-3 border-none font-black rounded-full tracking-wider shadow-sm",
                        student.status === "Active" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {student.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Sheet onOpenChange={() => { setAiSummary(""); setSelectedStudent(student); }}>
                      <SheetTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs font-black text-primary hover:bg-primary/5 rounded-full px-4"
                        >
                          Profile Hub
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0">
                        <div className="bg-primary/5 p-8 border-b relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5">
                            <ShieldCheck className="h-48 w-48 rotate-12" />
                          </div>
                          <SheetHeader className="text-left relative z-10">
                            <div className="flex items-center gap-6">
                              <div className="relative">
                                <Avatar className="h-28 w-24 ring-4 ring-white shadow-2xl rounded-3xl">
                                  <AvatarImage src={`https://picsum.photos/seed/${selectedStudent?.id}/200`} />
                                  <AvatarFallback className="text-4xl font-black bg-primary/5">{selectedStudent?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
                                  <CheckCircle2 className="h-5 w-5 text-white" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <SheetTitle className="text-3xl font-headline font-black text-primary leading-none">{selectedStudent?.name}</SheetTitle>
                                <div className="flex flex-wrap gap-2 items-center">
                                  <Badge variant="secondary" className="rounded-full bg-white text-primary border-none shadow-sm font-black px-4">{selectedStudent?.class}</Badge>
                                  <span className="text-xs font-mono font-black text-muted-foreground tracking-tighter uppercase px-3 py-1 bg-muted/20 rounded-lg">{selectedStudent?.id}</span>
                                </div>
                              </div>
                            </div>
                          </SheetHeader>
                        </div>

                        <div className="p-8">
                          <Tabs defaultValue="overview" className="space-y-8">
                            <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-2xl h-12 shadow-inner">
                              <TabsTrigger value="overview" className="rounded-xl text-xs font-black">AI Hub</TabsTrigger>
                              <TabsTrigger value="performance" className="rounded-xl text-xs font-black">Academic</TabsTrigger>
                              <TabsTrigger value="ledger" className="rounded-xl text-xs font-black">Financial</TabsTrigger>
                              <TabsTrigger value="conduct" className="rounded-xl text-xs font-black">Discipline</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-8">
                              <Card className="border-none bg-accent/5 border border-accent/10 relative overflow-hidden p-6 rounded-[2rem]">
                                <div className="absolute -right-4 -top-4 opacity-5">
                                  <Sparkles className="h-24 w-24" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-accent" />
                                    <span className="text-sm font-black text-accent uppercase tracking-widest">AI Progress Agent</span>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    className="rounded-full h-10 px-6 colorful-gradient text-[10px] font-black shadow-lg"
                                    onClick={handleGenerateAiSummary}
                                    disabled={isGeneratingAi}
                                  >
                                    {isGeneratingAi ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                    Analyze & Summarize
                                  </Button>
                                </div>
                                <div className="bg-white/80 rounded-2xl p-5 min-h-[120px] text-xs leading-relaxed text-foreground/80 border border-dashed border-accent/20 font-medium italic">
                                  {aiSummary || "Click analyze to generate a natural language summary of this student's current performance for parents and staff reports."}
                                </div>
                              </Card>

                              <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4 text-primary" /> Medical Passport
                                  </h3>
                                  <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest text-primary rounded-full px-3">Update Record</Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-5 rounded-[2rem] bg-muted/20 border border-transparent hover:bg-muted/30 transition-colors text-center shadow-inner">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-widest">Blood Group</p>
                                    <p className="text-lg font-black text-primary">O Positive</p>
                                  </div>
                                  <div className="p-5 rounded-[2rem] bg-muted/20 border border-transparent hover:bg-muted/30 transition-colors text-center shadow-inner">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-widest">Allergies</p>
                                    <p className="text-lg font-black text-destructive">N/A</p>
                                  </div>
                                </div>
                                <div className="p-5 rounded-[2rem] bg-red-50 border border-red-100 flex items-start gap-4">
                                  <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 shrink-0">
                                    <ShieldAlert className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-black text-red-700 uppercase tracking-widest">Medical History</span>
                                    <p className="text-[11px] text-red-600/80 leading-relaxed font-medium mt-1">No chronic alerts. Last full checkup completed at Term 1 commencement. Vaccinations up to date.</p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="performance" className="space-y-6">
                               <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Official Grade Matrix</h3>
                                 <Badge className="bg-primary text-white font-black px-4 py-1 rounded-full shadow-lg">Rank: #4 in Class</Badge>
                               </div>
                               <div className="space-y-3">
                                 {[
                                   { subject: "Mathematics", grade: "A", score: 82, trend: "up" },
                                   { subject: "Physics", grade: "B", score: 68, trend: "down" },
                                   { subject: "Chemistry", grade: "A", score: 77, trend: "stable" },
                                   { subject: "English", grade: "A", score: 85, trend: "up" },
                                   { subject: "Geography", grade: "A", score: 91, trend: "up" },
                                 ].map((sub) => (
                                   <div key={sub.subject} className="flex items-center justify-between p-5 rounded-[2.5rem] bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group shadow-inner">
                                     <div className="flex items-center gap-4">
                                        <div className={cn(
                                          "h-12 w-12 rounded-[1.25rem] flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform",
                                          sub.grade === "A" ? "bg-green-100 text-green-700 shadow-green-100" : "bg-primary/10 text-primary shadow-primary/10"
                                        )}>
                                          {sub.grade}
                                        </div>
                                        <div>
                                          <p className="text-sm font-black tracking-tight">{sub.subject}</p>
                                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Weighted Score: {sub.score}%</p>
                                        </div>
                                     </div>
                                     {sub.trend === "up" ? (
                                       <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                         <TrendingUp className="h-4 w-4" />
                                       </div>
                                     ) : (
                                       <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                         <History className="h-4 w-4" />
                                       </div>
                                     )}
                                   </div>
                                 ))}
                               </div>
                               <Button 
                                 onClick={handleExportDocx} 
                                 disabled={isExporting}
                                 className="w-full rounded-[2rem] h-14 bg-white border-2 border-primary text-primary hover:bg-primary/5 font-black text-base shadow-xl mt-4"
                               >
                                 {isExporting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileText className="mr-2 h-5 w-5" />}
                                 Export Official Report Card (DOCX)
                               </Button>
                            </TabsContent>
                            
                            <TabsContent value="ledger" className="space-y-6">
                              <div className="flex items-center justify-between">
                                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Revenue Assurance Ledger</h3>
                                 <Button variant="outline" size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest rounded-full px-4 bg-white shadow-sm">Download Full Statement</Button>
                              </div>
                              <Card className="border-none shadow-inner bg-muted/20 rounded-[2.5rem] overflow-hidden p-2">
                                 <Table>
                                   <TableBody>
                                     {[
                                       { date: "May 12, 2024", ref: "TX-9021", type: "Fee Payment", amount: "550,000", status: "Verified", gateway: "M-Pesa" },
                                       { date: "Mar 05, 2024", ref: "TX-8812", type: "Uniform Shop", amount: "45,000", status: "Verified", gateway: "Cash" },
                                       { date: "Jan 10, 2024", ref: "TX-7712", type: "Term 1 Fees", amount: "650,000", status: "Verified", gateway: "ClickPesa" },
                                     ].map((row, i) => (
                                       <TableRow key={i} className="hover:bg-muted/30 border-none transition-colors">
                                         <TableCell className="py-4 pl-6">
                                           <p className="text-xs font-black tracking-tight">{row.type}</p>
                                           <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-tighter">
                                             <span className="font-mono">{row.ref}</span>
                                             <span>•</span>
                                             <span>{row.gateway}</span>
                                           </div>
                                         </TableCell>
                                         <TableCell className="text-right pr-6">
                                           <p className="text-sm font-black text-primary">TZS {row.amount}</p>
                                           <div className="flex items-center justify-end gap-1 text-[9px] text-green-600 font-black uppercase tracking-widest">
                                             <CheckCircle2 className="h-2.5 w-2.5" /> {row.status}
                                           </div>
                                         </TableCell>
                                       </TableRow>
                                     ))}
                                   </TableBody>
                                 </Table>
                              </Card>
                              <div className="grid grid-cols-2 gap-4">
                                <Button className="rounded-[2rem] h-12 bg-muted/20 text-foreground hover:bg-muted/30 font-black text-xs shadow-inner">
                                   Void Last Transaction
                                </Button>
                                <Button className="rounded-[2rem] h-12 colorful-gradient font-black text-xs shadow-lg">
                                   Issue New Invoice
                                </Button>
                              </div>
                            </TabsContent>

                            <TabsContent value="conduct">
                              <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-orange-600" /> Professional Discipline Log
                                  </h3>
                                  <Button variant="secondary" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest rounded-full shadow-inner">Filter Logs</Button>
                                </div>
                                <div className="space-y-4">
                                  {[
                                    { date: "1 week ago", author: "Mwl. Juma", note: "Consistently participates in Physics lab sessions. Demonstrates leadership and logical clarity.", type: "Positive", id: "D-001" },
                                    { date: "3 weeks ago", author: "Headmaster", note: "Represented school in Regional Sports Meet. Awarded Certificate of Merit for sportsmanship.", type: "Achievement", id: "D-002" },
                                  ].map((note, i) => (
                                    <div key={i} className="p-6 rounded-[2.5rem] bg-white relative overflow-hidden border border-muted-foreground/10 shadow-sm group hover:shadow-md transition-shadow">
                                      <div className={cn("absolute left-0 top-0 bottom-0 w-2 transition-all group-hover:w-3", note.type === "Positive" ? "bg-green-500" : "bg-primary")} />
                                      <div className="flex justify-between items-start mb-3">
                                        <div className="space-y-1">
                                          <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            note.type === "Positive" ? "text-green-600" : "text-primary"
                                          )}>{note.type}</span>
                                          <p className="text-[9px] font-mono text-muted-foreground uppercase">{note.id}</p>
                                        </div>
                                        <span className="text-[9px] font-black text-muted-foreground bg-muted/30 px-3 py-1 rounded-full uppercase">{note.date}</span>
                                      </div>
                                      <p className="text-[11px] italic text-foreground leading-relaxed font-semibold">"{note.note}"</p>
                                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dashed">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-black">M</div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">— {note.author}</p>
                                      </div>
                                    </div>
                                  ))}
                                  <Button variant="outline" className="w-full rounded-[2rem] text-xs font-black py-8 border-2 border-dashed border-muted hover:border-primary/30 transition-all hover:bg-primary/5">
                                    <Plus className="mr-2 h-5 w-5" /> Log New Conduct Record
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
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
