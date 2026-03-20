
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
  History,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Zap,
  Trash2
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

const initialStudents = [
  { id: "2026-001", name: "Amani Mwamba", class: "O-Level Stream A", gender: "Male", status: "Active", parent: "Juma Mwamba", contact: "+255 712 000 001", attendance: "98%", balance: "TZS 120,000", email: "amani@example.com" },
  { id: "2026-002", name: "Careen Mushi", class: "Primary Node 7", gender: "Female", status: "Active", parent: "Sarah Mushi", contact: "+255 754 000 002", attendance: "92%", balance: "TZS 0", email: "careen@example.com" },
  { id: "2026-003", name: "Baraka Juma", class: "A-Level PCM", gender: "Male", status: "Active", parent: "Fatuma Juma", contact: "+255 621 000 003", attendance: "85%", balance: "TZS 450,000", email: "baraka@example.com" },
  { id: "2026-004", name: "Doreen Peter", class: "O-Level Stream C", gender: "Female", status: "Inactive", parent: "Peter John", contact: "+255 788 000 004", attendance: "60%", balance: "TZS 1,200,000", email: "doreen@example.com" },
  { id: "2026-005", name: "Emanuel Lema", class: "A-Level HGL", gender: "Male", status: "Active", parent: "David Lema", contact: "+255 713 000 005", attendance: "95%", balance: "TZS 50,000", email: "emanuel@example.com" },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState<typeof initialStudents[0] | null>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    toast({
      title: "Record Purged",
      description: "Student data removed from 2026 node.",
    })
  }

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

  const handleCommunicate = (type: 'whatsapp' | 'sms' | 'call' | 'email') => {
    const parentName = selectedStudent?.parent || "Parent"
    const studentName = selectedStudent?.name || "Student"
    
    if (type === 'whatsapp') {
      toast({ title: "Opening WhatsApp", description: `Drafting update for ${parentName}...` })
      window.open(`https://wa.me/${selectedStudent?.contact.replace('+', '')}?text=Habari ${parentName}, hapa ni ShuleDirect Node. Maendeleo ya ${studentName} ni mazuri...`, '_blank')
    } else if (type === 'sms') {
      toast({ title: "SMS Gateway Active", description: "Message queued via Beem Africa API." })
    } else if (type === 'call') {
      window.open(`tel:${selectedStudent?.contact}`)
    } else if (type === 'email') {
      window.open(`mailto:${selectedStudent?.email}?subject=Student Progress Update: ${studentName}`)
    }
  }

  return (
    <div className="space-y-6 pb-20 overflow-x-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground font-medium text-xs sm:text-sm">National-scale institutional student records 2026.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-bold">
            <Download className="mr-2 h-4 w-4 shrink-0" /> Export
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black">
            <UserPlus className="mr-2 h-4 w-4 shrink-0" /> Enroll
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Population", value: "1,284", color: "text-primary", trend: "+12%" },
          { label: "Active", value: "1,240", color: "text-green-600", trend: "Stable" },
          { label: "Presence", value: "96.2%", color: "text-accent", trend: "+2%" },
          { label: "Delta", value: "+8%", color: "text-orange-600", trend: "High" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[2rem] bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-2 p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <CardDescription className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</CardDescription>
                <Badge variant="outline" className="text-[7px] sm:text-[8px] py-0 h-4 border-none bg-primary/5 text-primary font-black">{stat.trend}</Badge>
              </div>
              {/* FIXED: Reduced font size for population numbers on small screens/tablets */}
              <CardTitle className={cn("text-xl sm:text-2xl lg:text-3xl font-black mt-1 truncate", stat.color)}>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="pb-3 px-4 sm:px-8 pt-6 sm:pt-8 bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                placeholder="Search students..."
                className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-12 rounded-full px-8 bg-white border-none shadow-sm font-black text-xs uppercase tracking-widest text-primary shrink-0">
              <Filter className="mr-2 h-4 w-4 shrink-0" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-none h-14">
                <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level / Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Institutional Status</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hub Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="group transition-all hover:bg-primary/[0.02] border-b last:border-none">
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white shadow-xl transition-transform group-hover:scale-110 rounded-2xl shrink-0">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/100`} />
                        <AvatarFallback className="font-black text-primary bg-primary/5 text-lg">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-black text-sm text-foreground group-hover:text-primary transition-colors truncate">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono font-black uppercase tracking-widest truncate">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-black text-[9px] bg-muted/80 text-muted-foreground uppercase px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[9px] py-0.5 px-4 border-none font-black rounded-full tracking-wider shadow-md whitespace-nowrap",
                        student.status === "Active" ? "bg-green-100 text-green-700 shadow-green-100" : "bg-destructive/10 text-destructive shadow-destructive/10"
                      )}
                    >
                      {student.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <Sheet onOpenChange={() => { setAiSummary(""); setSelectedStudent(student); }}>
                        <SheetTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs font-black text-primary hover:bg-primary/5 rounded-full px-6 h-10 border border-transparent hover:border-primary/10 transition-all"
                          >
                            Hub
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                          <div className="bg-primary/5 p-6 sm:p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                              <ShieldCheck className="h-48 sm:h-64 w-48 sm:w-64 rotate-12" />
                            </div>
                            <SheetHeader className="text-left relative z-10">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                                <div className="relative mx-auto sm:mx-0 shrink-0">
                                  <Avatar className="h-24 w-20 sm:h-32 sm:w-28 ring-8 ring-white shadow-2xl rounded-[2rem] sm:rounded-[2.5rem]">
                                    <AvatarImage src={`https://picsum.photos/seed/${selectedStudent?.id}/200`} />
                                    <AvatarFallback className="text-4xl sm:text-5xl font-black bg-primary/5">{selectedStudent?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500 border-[4px] sm:border-[6px] border-white flex items-center justify-center shadow-xl animate-bounce">
                                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                  </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3 text-center sm:text-left overflow-hidden">
                                  <SheetTitle className="text-2xl sm:text-4xl font-headline font-black text-primary leading-tight tracking-tighter truncate">{selectedStudent?.name}</SheetTitle>
                                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 items-center">
                                    <Badge className="rounded-full bg-white text-primary border-none shadow-lg font-black px-4 sm:px-6 py-1 text-[10px] sm:text-xs uppercase tracking-widest">{selectedStudent?.class}</Badge>
                                    <span className="text-[9px] sm:text-[10px] font-mono font-black text-muted-foreground tracking-widest uppercase px-3 sm:px-4 py-1.5 bg-white rounded-xl shadow-inner">{selectedStudent?.id}</span>
                                  </div>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-6 sm:p-10 space-y-8 sm:space-y-10">
                            {/* Omnichannel Gateway */}
                            <div className="space-y-4">
                               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 px-2">
                                 <Zap className="h-4 w-4 text-accent fill-accent shrink-0" /> Omnichannel Gateway
                               </h3>
                               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <Button onClick={() => handleCommunicate('whatsapp')} className="flex flex-col gap-2 h-20 sm:h-24 rounded-2xl sm:rounded-[2rem] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-none shadow-sm transition-all hover:scale-105">
                                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase">WhatsApp</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('sms')} className="flex flex-col gap-2 h-20 sm:h-24 rounded-2xl sm:rounded-[2rem] bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase">Beem SMS</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('email')} className="flex flex-col gap-2 h-20 sm:h-24 rounded-2xl sm:rounded-[2rem] bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase">Email</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('call')} className="flex flex-col gap-2 h-20 sm:h-24 rounded-2xl sm:rounded-[2rem] bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase">Voice Call</span>
                                  </Button>
                               </div>
                            </div>

                            <Tabs defaultValue="overview" className="space-y-8 sm:space-y-10">
                              <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-2xl h-12 sm:h-14 shadow-inner overflow-x-auto">
                                <TabsTrigger value="overview" className="rounded-xl text-[8px] sm:text-[10px] font-black tracking-widest px-1 sm:px-2">AI HUB</TabsTrigger>
                                <TabsTrigger value="performance" className="rounded-xl text-[8px] sm:text-[10px] font-black tracking-widest px-1 sm:px-2">ACADEMIC</TabsTrigger>
                                <TabsTrigger value="ledger" className="rounded-xl text-[8px] sm:text-[10px] font-black tracking-widest px-1 sm:px-2">FINANCE</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[8px] sm:text-[10px] font-black tracking-widest px-1 sm:px-2">CONDUCT</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-8 sm:space-y-10">
                                <Card className="border-none bg-accent/5 border border-accent/10 relative overflow-hidden p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-xl">
                                  <div className="absolute -right-6 -top-6 opacity-10">
                                    <Sparkles className="h-24 sm:h-32 w-24 sm:w-32" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent fill-accent shrink-0" />
                                      <span className="text-[10px] sm:text-xs font-black text-accent uppercase tracking-[0.2em]">AI Progress Agent</span>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      className="w-full sm:w-auto rounded-full h-10 sm:h-11 px-6 sm:px-8 colorful-gradient text-[9px] sm:text-[10px] font-black shadow-lg hover:scale-105 transition-all"
                                      onClick={handleGenerateAiSummary}
                                      disabled={isGeneratingAi}
                                    >
                                      {isGeneratingAi ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                      ANALYZE 2026
                                    </Button>
                                  </div>
                                  <div className="bg-white/90 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 min-h-[120px] sm:min-h-[140px] text-[10px] sm:text-xs leading-relaxed text-foreground/80 border-2 border-dashed border-accent/20 font-medium italic shadow-inner">
                                    {aiSummary || "Initiate analysis to generate a high-fidelity narrative progress report for this student node."}
                                  </div>
                                </Card>

                                <div className="space-y-4 sm:space-y-6">
                                  <div className="flex items-center justify-between mb-2 px-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 truncate">
                                      <Stethoscope className="h-4 w-4 text-primary shrink-0" /> Health Passport
                                    </h3>
                                    <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest text-primary rounded-full px-4 border border-primary/10 shrink-0">Log</Button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-muted/30 border border-transparent hover:border-primary/10 transition-all text-center shadow-inner group overflow-hidden">
                                      <p className="text-[8px] sm:text-[9px] font-black uppercase text-muted-foreground mb-1 sm:mb-2 tracking-widest group-hover:text-primary transition-colors">Blood Node</p>
                                      <p className="text-xl sm:text-2xl font-black text-primary tracking-tighter">O Positive</p>
                                    </div>
                                    <div className="p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-muted/30 border border-transparent hover:border-destructive/10 transition-all text-center shadow-inner group overflow-hidden">
                                      <p className="text-[8px] sm:text-[9px] font-black uppercase text-muted-foreground mb-1 sm:mb-2 tracking-widest group-hover:text-destructive transition-colors">Alerts</p>
                                      <p className="text-xl sm:text-2xl font-black text-destructive tracking-tighter truncate">None</p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="performance" className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                 <div className="flex items-center justify-between mb-2 px-2 overflow-hidden">
                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground truncate mr-2">2026 Matrix</h3>
                                   <Badge className="bg-primary text-white font-black px-4 sm:px-6 py-1.5 rounded-full shadow-xl text-[9px] sm:text-[10px] tracking-widest uppercase shrink-0">RANK: #4</Badge>
                                 </div>
                                 <div className="space-y-3 sm:space-y-4">
                                   {[
                                     { subject: "Mathematics", grade: "A", score: 82, trend: "up" },
                                     { subject: "Physics", grade: "B", score: 68, trend: "down" },
                                     { subject: "Chemistry", grade: "A", score: 77, trend: "stable" },
                                     { subject: "English", grade: "A", score: 85, trend: "up" },
                                   ].map((sub) => (
                                     <div key={sub.subject} className="flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] bg-white hover:bg-primary/[0.03] transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-muted/50 overflow-hidden">
                                       <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                          <div className={cn(
                                            "h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl shadow-xl group-hover:scale-110 transition-transform shrink-0",
                                            sub.grade === "A" ? "bg-green-500 text-white shadow-green-100" : "bg-primary text-white shadow-primary/10"
                                          )}>
                                            {sub.grade}
                                          </div>
                                          <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
                                            <p className="text-xs sm:text-sm font-black tracking-tight text-foreground/80 truncate">{sub.subject}</p>
                                            <p className="text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest truncate">{sub.score}% Weighted</p>
                                          </div>
                                       </div>
                                       <div className={cn(
                                         "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all group-hover:rotate-12 shrink-0 ml-2",
                                         sub.trend === "up" ? "bg-green-100 text-green-600 shadow-inner" : "bg-orange-100 text-orange-600 shadow-inner"
                                       )}>
                                         {sub.trend === "up" ? <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <History className="h-4 w-4 sm:h-5 sm:w-5" />}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                                 <Button 
                                   onClick={handleExportDocx} 
                                   disabled={isExporting}
                                   className="w-full rounded-2xl sm:rounded-[2.5rem] h-14 sm:h-16 bg-white border-[2px] sm:border-[3px] border-primary text-primary hover:bg-primary/5 font-black text-sm sm:text-lg shadow-2xl mt-4 sm:mt-6 group"
                                 >
                                   {isExporting ? <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" /> : <FileText className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-6 transition-transform" />}
                                   Generate Report Card
                                 </Button>
                              </TabsContent>
                              
                              <TabsContent value="ledger" className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center justify-between px-2 overflow-hidden">
                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground truncate mr-2">Revenue Hub</h3>
                                   <Button variant="outline" size="sm" className="h-9 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-full px-4 sm:px-6 bg-white shadow-sm border-muted shrink-0 transition-all">Statement</Button>
                                </div>
                                <Card className="border-none shadow-inner bg-muted/20 rounded-3xl sm:rounded-[3rem] overflow-hidden p-2 sm:p-3">
                                   <Table>
                                     <TableBody>
                                       {[
                                         { date: "May 12, 2026", ref: "TX-9021", type: "Fee Node", amount: "550,000", status: "Verified", gateway: "M-Pesa" },
                                         { date: "Mar 05, 2026", ref: "TX-8812", type: "Store Sale", amount: "45,000", status: "Verified", gateway: "Cash" },
                                       ].map((row, i) => (
                                         <TableRow key={i} className="hover:bg-white/50 border-none transition-all rounded-2xl">
                                           <TableCell className="py-4 sm:py-5 pl-4 sm:pl-8 overflow-hidden min-w-[150px]">
                                             <p className="text-[10px] sm:text-xs font-black tracking-tight text-foreground/80 truncate">{row.type}</p>
                                             <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1 truncate">
                                               <span className="font-mono">{row.ref}</span>
                                               <span className="h-1 w-1 rounded-full bg-muted-foreground/30 shrink-0" />
                                               <span className="truncate">{row.gateway}</span>
                                             </div>
                                           </TableCell>
                                           <TableCell className="text-right pr-4 sm:pr-8 shrink-0">
                                             <p className="text-[10px] sm:text-sm font-black text-primary whitespace-nowrap">TZS {row.amount}</p>
                                             <div className="flex items-center justify-end gap-1 text-[8px] sm:text-[9px] text-green-600 font-black uppercase tracking-widest mt-1">
                                               <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> OK
                                             </div>
                                           </TableCell>
                                         </TableRow>
                                       ))}
                                     </TableBody>
                                   </Table>
                                </Card>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                  <Button className="rounded-[1.5rem] sm:rounded-[2.5rem] h-12 sm:h-14 bg-muted text-foreground hover:bg-muted/80 font-black text-[9px] sm:text-xs shadow-inner uppercase tracking-widest transition-all truncate">
                                     Void Node
                                  </Button>
                                  <Button className="rounded-[1.5rem] sm:rounded-[2.5rem] h-12 sm:h-14 colorful-gradient font-black text-[9px] sm:text-xs shadow-xl uppercase tracking-widest transition-all truncate">
                                     Invoice Node
                                  </Button>
                                </div>
                              </TabsContent>

                              <TabsContent value="conduct">
                                <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                  <div className="flex items-center justify-between px-2 overflow-hidden">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 truncate">
                                      <ShieldAlert className="h-4 w-4 text-orange-600 fill-orange-600/10 shrink-0" /> Discipline Node
                                    </h3>
                                    <Button variant="secondary" size="sm" className="h-8 sm:h-9 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-full shadow-inner px-4 sm:px-6 shrink-0 transition-all">Filter</Button>
                                  </div>
                                  <div className="space-y-4 sm:space-y-6">
                                    {[
                                      { date: "1 week ago", author: "Mwl. Juma", note: "Consistently participates in Physics lab sessions. Demonstrates leadership and logical clarity.", type: "Positive", id: "D-001" },
                                    ].map((note, i) => (
                                      <div key={i} className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] bg-white relative overflow-hidden border border-muted/50 shadow-sm group hover:shadow-xl transition-all duration-500">
                                        <div className={cn("absolute left-0 top-0 bottom-0 w-2 transition-all group-hover:w-3", note.type === "Positive" ? "bg-green-500" : "bg-primary")} />
                                        <div className="flex justify-between items-start mb-4 gap-2">
                                          <div className="space-y-1 min-w-0">
                                            <span className={cn(
                                              "text-[9px] sm:text-[10px] font-black uppercase tracking-widest truncate block",
                                              note.type === "Positive" ? "text-green-600" : "text-primary"
                                            )}>{note.type}</span>
                                            <p className="text-[8px] sm:text-[9px] font-mono text-muted-foreground uppercase font-black tracking-tighter truncate">{note.id}</p>
                                          </div>
                                          <span className="text-[8px] sm:text-[9px] font-black text-muted-foreground bg-muted/40 px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest shadow-inner whitespace-nowrap shrink-0">{note.date}</span>
                                        </div>
                                        <p className="text-[11px] sm:text-sm italic text-foreground/80 leading-relaxed font-semibold pr-2">"{note.note}"</p>
                                        <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-dashed border-muted overflow-hidden">
                                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-[9px] sm:text-[10px] font-black shadow-inner shrink-0">M</div>
                                          <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate">— {note.author}</p>
                                        </div>
                                      </div>
                                    ))}
                                    <Button variant="outline" className="w-full rounded-[2rem] sm:rounded-[3rem] text-[9px] sm:text-[10px] font-black py-8 sm:py-12 border-2 border-dashed border-muted hover:border-primary/30 transition-all hover:bg-primary/5 uppercase tracking-[0.3em] overflow-hidden">
                                      <Plus className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 shrink-0" /> Log Conduct
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                      >
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
