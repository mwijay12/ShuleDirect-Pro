
"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus,
  Download,
  CheckCircle2,
  Trash2,
  Loader2,
  FileText,
  Smartphone,
  Zap,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  Mail,
  Phone
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
  SheetHeader, 
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"
import { exportToExcel, exportReportCardToWord } from "@/lib/export-utils"
import { triggerN8nWebhook } from "@/lib/n8n"

const initialStudents = [
  { id: "2026-001", name: "Amani Mwamba", class: "O-Level Stream A", status: "Active", contact: "+255 712 000 001", attendance: "98%", email: "amani@example.com" },
  { id: "2026-002", name: "Careen Mushi", class: "Primary Node 7", status: "Active", contact: "+255 754 000 002", attendance: "92%", email: "careen@example.com" },
  { id: "2026-003", name: "Baraka Juma", class: "A-Level PCM", status: "Active", contact: "+255 621 000 003", attendance: "85%", email: "baraka@example.com" },
  { id: "2026-004", name: "Doreen Peter", class: "O-Level Stream C", status: "Inactive", contact: "+255 788 000 004", attendance: "60%", email: "doreen@example.com" },
  { id: "2026-005", name: "Emanuel Lema", class: "A-Level HGL", status: "Active", contact: "+255 713 000 005", attendance: "95%", email: "emanuel@example.com" },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
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
          { subject: "Mathematics", grade: "A", comment: "Exceptional proficiency." },
          { subject: "Physics", grade: "B", comment: "Strong conceptual understanding." }
        ],
        attendanceSummary: `Consistently high presence of ${selectedStudent.attendance}.`,
        behavioralNotes: "Demonstrates institutional leadership and active participation."
      })
      setAiSummary(result.summary)
      triggerN8nWebhook("attendance-update", { studentId: selectedStudent.id, summary: result.summary })
      toast({ title: "Narrative Ready", description: "AI Progress report successfully synced." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Sync Failed", description: "Could not initialize narrative agent." })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    toast({
      title: "Record Terminated",
      description: "Student node removed from 2026 registry.",
    })
  }

  const handleRegistryExport = () => {
    exportToExcel(students, "Institutional_Registry_2026")
    toast({ title: "Registry Exported", description: "Institutional Excel saved successfully." })
  }

  const handleExportReportCard = async () => {
    if (!selectedStudent) return
    setIsExporting(true)
    const schoolName = localStorage.getItem("shule_name") || "ShuleDirect Pro"
    await exportReportCardToWord(selectedStudent, schoolName)
    setIsExporting(false)
    toast({ title: "Hard Copy Generated", description: "Official Word transcript downloaded." })
  }

  const handleCommunicate = (type: string) => {
    toast({ title: "Gateway Dispatch", description: `${type.toUpperCase()} alert sent via Beem Node.` })
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">Institutional Student Nodes — 2026 Academic Season.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleRegistryExport} variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-bold text-xs uppercase tracking-widest">
            <Download className="mr-2 h-4 w-4" /> Export Node
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-xs uppercase tracking-widest">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Hub
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Population", value: "1,284", color: "text-primary", sub: "+12% Growth" },
          { label: "Active Nodes", value: "1,240", color: "text-green-600", sub: "Operational" },
          { label: "Attendance", value: "96.2%", color: "text-accent", sub: "Verified" },
          { label: "Season Delta", value: "+8%", color: "text-orange-600", sub: "High Perf" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden group hover:-translate-y-1 transition-all">
            <CardHeader className="p-5 sm:p-6">
              <CardDescription className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</CardDescription>
              <CardTitle className={cn("text-xl sm:text-2xl font-black mt-1 truncate", stat.color)}>{stat.value}</CardTitle>
              <p className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-tighter mt-1">{stat.sub}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input placeholder="Search students..." className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-sm" />
            </div>
            <Button variant="outline" className="h-12 rounded-full px-8 bg-white border-none shadow-sm font-black text-xs uppercase tracking-widest text-primary">
              <Filter className="mr-2 h-4 w-4" /> Season Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-none h-14">
                <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Student Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Academic Hub</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Compliance</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="group transition-all hover:bg-primary/[0.02] border-b last:border-none">
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 ring-4 ring-white shadow-xl rounded-2xl shrink-0">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/100`} />
                        <AvatarFallback className="font-black text-primary bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-black text-sm text-foreground group-hover:text-primary transition-colors truncate">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono font-black uppercase tracking-widest truncate">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-black text-[9px] bg-muted/80 text-muted-foreground uppercase px-4 py-1 rounded-full">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-[9px] py-0.5 px-4 border-none font-black rounded-full shadow-sm", student.status === "Active" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive")}>
                      {student.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end items-center gap-2">
                      <Sheet onOpenChange={(open) => { if (open) setSelectedStudent(student); else setAiSummary(""); }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-xs font-black text-primary hover:bg-primary/5 rounded-full px-6 h-10 border border-transparent hover:border-primary/10 transition-all">Hub Access</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0">
                          <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                              <ShieldCheck className="h-48 sm:h-64 w-48 sm:w-64 rotate-12" />
                            </div>
                            <SheetHeader className="text-left relative z-10">
                              <div className="flex flex-col sm:flex-row items-center gap-8">
                                <Avatar className="h-32 w-28 ring-8 ring-white shadow-2xl rounded-[2.5rem] shrink-0">
                                  <AvatarImage src={`https://picsum.photos/seed/${student.id}/200`} />
                                  <AvatarFallback className="text-5xl font-black bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-3 text-center sm:text-left overflow-hidden">
                                  <SheetTitle className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tighter leading-none">{student.name}</SheetTitle>
                                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
                                    <Badge className="rounded-full bg-white text-primary border-none shadow-lg font-black px-6 py-1.5 text-xs uppercase tracking-widest">{student.class}</Badge>
                                    <span className="text-[10px] font-mono font-black text-muted-foreground tracking-widest uppercase px-4 py-2 bg-white rounded-xl shadow-inner">{student.id}</span>
                                  </div>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-8 sm:p-10 space-y-10">
                            <div className="space-y-4">
                               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 px-2">
                                 <Zap className="h-4 w-4 text-accent fill-accent shrink-0" /> Communications Node
                               </h3>
                               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <Button onClick={() => handleCommunicate('whatsapp')} className="flex flex-col gap-2 h-20 rounded-2xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-none transition-all">
                                    <MessageCircle className="h-5 w-5" />
                                    <span className="text-[8px] font-black uppercase">WhatsApp</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('sms')} className="flex flex-col gap-2 h-20 rounded-2xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none transition-all">
                                    <Smartphone className="h-5 w-5" />
                                    <span className="text-[8px] font-black uppercase">SMS Beem</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('email')} className="flex flex-col gap-2 h-20 rounded-2xl bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none transition-all">
                                    <Mail className="h-5 w-5" />
                                    <span className="text-[8px] font-black uppercase">Email</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('call')} className="flex flex-col gap-2 h-20 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 border-none transition-all">
                                    <Phone className="h-5 w-5" />
                                    <span className="text-[8px] font-black uppercase">Voice</span>
                                  </Button>
                               </div>
                            </div>

                            <Tabs defaultValue="overview" className="space-y-10">
                              <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 rounded-2xl h-14 shadow-inner">
                                <TabsTrigger value="overview" className="rounded-xl text-[10px] font-black uppercase tracking-widest">AI Agent</TabsTrigger>
                                <TabsTrigger value="performance" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Academic</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Conduct</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-10">
                                <Card className="border-none bg-accent/5 border border-accent/10 relative overflow-hidden p-8 rounded-[2.5rem] shadow-xl">
                                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-3">
                                      <Zap className="h-5 w-5 text-accent fill-accent animate-pulse" />
                                      <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Institutional AI Node</span>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      className="w-full sm:w-auto rounded-full h-12 px-10 colorful-gradient text-[10px] font-black shadow-2xl"
                                      onClick={handleGenerateAiSummary}
                                      disabled={isGeneratingAi}
                                    >
                                      {isGeneratingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                                      ANALYZE NODE
                                    </Button>
                                  </div>
                                  <div className="bg-white/90 rounded-[2rem] p-8 text-xs sm:text-sm leading-relaxed text-foreground/80 border-2 border-dashed border-accent/20 font-medium italic shadow-inner min-h-[120px]">
                                    {aiSummary || "Initiate academic analysis to generate a 2026 performance narrative for this student node."}
                                  </div>
                                </Card>
                              </TabsContent>

                              <TabsContent value="performance" className="space-y-8">
                                 <div className="flex items-center justify-between px-2">
                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Current 2026 Matrix</h3>
                                   <Badge className="bg-primary text-white font-black px-5 py-2 rounded-full text-[10px] tracking-widest shadow-lg">RANK: TOP 10%</Badge>
                                 </div>
                                 <div className="space-y-3">
                                   {[
                                     { subject: "Mathematics", grade: "A", score: 82 },
                                     { subject: "Physics", grade: "B", score: 68 },
                                   ].map((sub) => (
                                     <div key={sub.subject} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm border border-muted/50 group hover:border-primary/20 transition-all">
                                       <div className="flex items-center gap-5">
                                          <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-xl transition-transform group-hover:rotate-6">
                                            {sub.grade}
                                          </div>
                                          <div>
                                            <p className="text-sm font-black tracking-tight text-foreground/80">{sub.subject}</p>
                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{sub.score}% Grade Weight</p>
                                          </div>
                                       </div>
                                       <TrendingUp className="h-5 w-5 text-green-600" />
                                     </div>
                                   ))}
                                 </div>
                                 <Button 
                                   onClick={handleExportReportCard} 
                                   disabled={isExporting}
                                   className="w-full rounded-3xl h-16 bg-white border-[2.5px] border-primary text-primary hover:bg-primary/5 font-black text-sm shadow-xl group mt-6"
                                 >
                                   {isExporting ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />}
                                   Export Official Word Transcript
                                 </Button>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5" onClick={() => handleDeleteStudent(student.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
