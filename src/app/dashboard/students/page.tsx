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
  Smartphone
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

  const handleCommunicate = (type: 'whatsapp' | 'sms' | 'call' | 'email') => {
    const parentName = selectedStudent?.parent || "Parent"
    const studentName = selectedStudent?.name || "Student"
    
    if (type === 'whatsapp') {
      toast({ title: "Opening WhatsApp", description: `Drafting result update for ${parentName}...` })
      window.open(`https://wa.me/${selectedStudent?.contact.replace('+', '')}?text=Habari ${parentName}, hapa ni Mlimani Academy. Maendeleo ya ${studentName} ni mazuri...`, '_blank')
    } else if (type === 'sms') {
      toast({ title: "SMS Gateway Active", description: "Message queued via Beem Africa API." })
    } else if (type === 'call') {
      window.open(`tel:${selectedStudent?.contact}`)
    } else if (type === 'email') {
      window.open(`mailto:${selectedStudent?.email}?subject=Student Progress Update: ${studentName}`)
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground font-medium">Comprehensive student records, profiles, and 2026 academic data.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto animate-in fade-in slide-in-from-right-4 duration-700">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-bold">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll New
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 animate-in fade-in zoom-in-95 duration-1000">
        {[
          { label: "Total Students", value: "1,284", color: "text-primary", trend: "+12%" },
          { label: "Active", value: "1,240", color: "text-green-600", trend: "Stable" },
          { label: "Attendance", value: "96.2%", color: "text-accent", trend: "+2%" },
          { label: "Revenue Delta", value: "+8%", color: "text-orange-600", trend: "High" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden group rounded-[2rem] bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-2 p-5">
              <div className="flex justify-between items-start">
                <CardDescription className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">{stat.label}</CardDescription>
                <Badge variant="outline" className="text-[8px] py-0 h-4 border-none bg-primary/5 text-primary font-black">{stat.trend}</Badge>
              </div>
              <CardTitle className={cn("text-2xl sm:text-3xl font-black mt-1", stat.color)}>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <CardHeader className="pb-3 px-8 pt-8 bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                placeholder="Search by name, ID or parent..."
                className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-12 rounded-full px-8 bg-white border-none shadow-sm font-black text-xs uppercase tracking-widest text-primary">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-none h-14">
                  <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Information</TableHead>
                  <TableHead className="hidden md:table-cell text-[10px] font-black uppercase tracking-widest text-muted-foreground">Class Group</TableHead>
                  <TableHead className="hidden lg:table-cell text-[10px] font-black uppercase tracking-widest text-muted-foreground">Parent/Guardian</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</TableHead>
                  <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Management</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="group transition-all hover:bg-primary/[0.02] border-b last:border-none">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-white shadow-xl transition-transform group-hover:scale-110 rounded-2xl">
                          <AvatarImage src={`https://picsum.photos/seed/${student.id}/100`} />
                          <AvatarFallback className="font-black text-primary bg-primary/5 text-lg">{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground group-hover:text-primary transition-colors">{student.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono font-black uppercase tracking-widest">{student.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="font-black text-[9px] bg-muted/80 text-muted-foreground uppercase px-4 py-1 rounded-full shadow-sm">
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-foreground/80">{student.parent}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-black">
                          <Phone className="h-3 w-3 text-primary" /> {student.contact}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={cn(
                          "text-[9px] py-0.5 px-4 border-none font-black rounded-full tracking-wider shadow-md",
                          student.status === "Active" ? "bg-green-100 text-green-700 shadow-green-100" : "bg-destructive/10 text-destructive shadow-destructive/10"
                        )}
                      >
                        {student.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={() => { setAiSummary(""); setSelectedStudent(student); }}>
                        <SheetTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs font-black text-primary hover:bg-primary/5 rounded-full px-6 h-10 border border-transparent hover:border-primary/10 transition-all"
                          >
                            Hub Access
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                          <div className="bg-primary/5 p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                              <ShieldCheck className="h-64 w-64 rotate-12" />
                            </div>
                            <SheetHeader className="text-left relative z-10">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                                <div className="relative mx-auto sm:mx-0">
                                  <Avatar className="h-32 w-28 ring-8 ring-white shadow-2xl rounded-[2.5rem]">
                                    <AvatarImage src={`https://picsum.photos/seed/${selectedStudent?.id}/200`} />
                                    <AvatarFallback className="text-5xl font-black bg-primary/5">{selectedStudent?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-green-500 border-[6px] border-white flex items-center justify-center shadow-xl animate-bounce">
                                    <CheckCircle2 className="h-6 w-6 text-white" />
                                  </div>
                                </div>
                                <div className="space-y-3 text-center sm:text-left">
                                  <SheetTitle className="text-4xl font-headline font-black text-primary leading-tight tracking-tighter">{selectedStudent?.name}</SheetTitle>
                                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
                                    <Badge className="rounded-full bg-white text-primary border-none shadow-lg font-black px-6 py-1 text-xs uppercase tracking-widest">{selectedStudent?.class}</Badge>
                                    <span className="text-[10px] font-mono font-black text-muted-foreground tracking-widest uppercase px-4 py-1.5 bg-white rounded-xl shadow-inner">{selectedStudent?.id}</span>
                                  </div>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-10 space-y-10">
                            {/* Contact Quick Actions */}
                            <div className="space-y-4">
                               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 px-2">
                                 <Zap className="h-4 w-4 text-accent fill-accent" /> Omnichannel Gateway
                               </h3>
                               <div className="grid grid-cols-4 gap-3">
                                  <Button onClick={() => handleCommunicate('whatsapp')} className="flex flex-col gap-2 h-24 rounded-[2rem] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-none shadow-sm transition-all hover:scale-105">
                                    <MessageCircle className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">WhatsApp</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('sms')} className="flex flex-col gap-2 h-24 rounded-[2rem] bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Smartphone className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">Beem SMS</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('email')} className="flex flex-col gap-2 h-24 rounded-[2rem] bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Mail className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">Email</span>
                                  </Button>
                                  <Button onClick={() => handleCommunicate('call')} className="flex flex-col gap-2 h-24 rounded-[2rem] bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-sm transition-all hover:scale-105">
                                    <Phone className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">Voice Call</span>
                                  </Button>
                               </div>
                            </div>

                            <Tabs defaultValue="overview" className="space-y-10">
                              <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-2xl h-14 shadow-inner">
                                <TabsTrigger value="overview" className="rounded-xl text-[10px] font-black tracking-widest">AI HUB</TabsTrigger>
                                <TabsTrigger value="performance" className="rounded-xl text-[10px] font-black tracking-widest">ACADEMIC</TabsTrigger>
                                <TabsTrigger value="ledger" className="rounded-xl text-[10px] font-black tracking-widest">FINANCE</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[10px] font-black tracking-widest">CONDUCT</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-10">
                                <Card className="border-none bg-accent/5 border border-accent/10 relative overflow-hidden p-8 rounded-[2.5rem] shadow-xl">
                                  <div className="absolute -right-6 -top-6 opacity-10">
                                    <Sparkles className="h-32 w-32" />
                                  </div>
                                  <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                      <Sparkles className="h-6 w-6 text-accent fill-accent" />
                                      <span className="text-xs font-black text-accent uppercase tracking-[0.2em]">AI Progress Agent</span>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      className="rounded-full h-11 px-8 colorful-gradient text-[10px] font-black shadow-[0_10px_20px_rgba(148,92,230,0.3)] hover:scale-105 transition-all"
                                      onClick={handleGenerateAiSummary}
                                      disabled={isGeneratingAi}
                                    >
                                      {isGeneratingAi ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                      ANALYZE 2026 PROGRESS
                                    </Button>
                                  </div>
                                  <div className="bg-white/90 rounded-[2rem] p-6 min-h-[140px] text-xs leading-relaxed text-foreground/80 border-2 border-dashed border-accent/20 font-medium italic shadow-inner">
                                    {aiSummary || "Click analyze to generate a high-fidelity natural language summary of this student's 2026 performance for parental reports."}
                                  </div>
                                </Card>

                                <div className="space-y-6">
                                  <div className="flex items-center justify-between mb-2 px-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                      <Stethoscope className="h-4 w-4 text-primary" /> Institutional Health Pass
                                    </h3>
                                    <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest text-primary rounded-full px-4 border border-primary/10">Log Entry</Button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-[2.5rem] bg-muted/30 border border-transparent hover:border-primary/10 transition-all text-center shadow-inner group">
                                      <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-[0.2em] group-hover:text-primary transition-colors">Blood Group</p>
                                      <p className="text-2xl font-black text-primary tracking-tighter">O Positive</p>
                                    </div>
                                    <div className="p-6 rounded-[2.5rem] bg-muted/30 border border-transparent hover:border-destructive/10 transition-all text-center shadow-inner group">
                                      <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 tracking-[0.2em] group-hover:text-destructive transition-colors">Allergies</p>
                                      <p className="text-2xl font-black text-destructive tracking-tighter">None Detected</p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="performance" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                 <div className="flex items-center justify-between mb-2 px-2">
                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">2026 Grade Matrix</h3>
                                   <Badge className="bg-primary text-white font-black px-6 py-1.5 rounded-full shadow-xl text-[10px] tracking-widest uppercase">Class Rank: #4</Badge>
                                 </div>
                                 <div className="space-y-4">
                                   {[
                                     { subject: "Mathematics", grade: "A", score: 82, trend: "up" },
                                     { subject: "Physics", grade: "B", score: 68, trend: "down" },
                                     { subject: "Chemistry", grade: "A", score: 77, trend: "stable" },
                                     { subject: "English", grade: "A", score: 85, trend: "up" },
                                     { subject: "Geography", grade: "A", score: 91, trend: "up" },
                                   ].map((sub) => (
                                     <div key={sub.subject} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white hover:bg-primary/[0.03] transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-muted/50">
                                       <div className="flex items-center gap-5">
                                          <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl group-hover:scale-110 transition-transform",
                                            sub.grade === "A" ? "bg-green-500 text-white shadow-green-100" : "bg-primary text-white shadow-primary/10"
                                          )}>
                                            {sub.grade}
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm font-black tracking-tight text-foreground/80">{sub.subject}</p>
                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Weighted: {sub.score}%</p>
                                          </div>
                                       </div>
                                       <div className={cn(
                                         "h-10 w-10 rounded-full flex items-center justify-center transition-all group-hover:rotate-12",
                                         sub.trend === "up" ? "bg-green-100 text-green-600 shadow-inner" : "bg-orange-100 text-orange-600 shadow-inner"
                                       )}>
                                         {sub.trend === "up" ? <TrendingUp className="h-5 w-5" /> : <History className="h-5 w-5" />}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                                 <Button 
                                   onClick={handleExportDocx} 
                                   disabled={isExporting}
                                   className="w-full rounded-[2.5rem] h-16 bg-white border-[3px] border-primary text-primary hover:bg-primary/5 font-black text-lg shadow-2xl mt-6 group"
                                 >
                                   {isExporting ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <FileText className="mr-3 h-6 w-6 group-hover:rotate-6 transition-transform" />}
                                   Generate 2026 Report Card
                                 </Button>
                              </TabsContent>
                              
                              <TabsContent value="ledger" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center justify-between px-2">
                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Revenue Assurance Hub</h3>
                                   <Button variant="outline" size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest rounded-full px-6 bg-white shadow-sm border-muted transition-all hover:bg-muted/50">Full Statement</Button>
                                </div>
                                <Card className="border-none shadow-inner bg-muted/20 rounded-[3rem] overflow-hidden p-3">
                                   <Table>
                                     <TableBody>
                                       {[
                                         { date: "May 12, 2024", ref: "TX-9021", type: "Fee Payment", amount: "550,000", status: "Verified", gateway: "M-Pesa" },
                                         { date: "Mar 05, 2024", ref: "TX-8812", type: "Uniform Shop", amount: "45,000", status: "Verified", gateway: "Cash" },
                                         { date: "Jan 10, 2024", ref: "TX-7712", type: "Term 1 Fees", amount: "650,000", status: "Verified", gateway: "ClickPesa" },
                                       ].map((row, i) => (
                                         <TableRow key={i} className="hover:bg-white/50 border-none transition-all rounded-3xl">
                                           <TableCell className="py-5 pl-8">
                                             <p className="text-xs font-black tracking-tight text-foreground/80">{row.type}</p>
                                             <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                                               <span className="font-mono">{row.ref}</span>
                                               <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                               <span>{row.gateway}</span>
                                             </div>
                                           </TableCell>
                                           <TableCell className="text-right pr-8">
                                             <p className="text-sm font-black text-primary">TZS {row.amount}</p>
                                             <div className="flex items-center justify-end gap-1.5 text-[9px] text-green-600 font-black uppercase tracking-widest mt-1">
                                               <CheckCircle2 className="h-3 w-3" /> {row.status}
                                             </div>
                                           </TableCell>
                                         </TableRow>
                                       ))}
                                     </TableBody>
                                   </Table>
                                </Card>
                                <div className="grid grid-cols-2 gap-4">
                                  <Button className="rounded-[2.5rem] h-14 bg-muted text-foreground hover:bg-muted/80 font-black text-xs shadow-inner uppercase tracking-widest transition-all">
                                     Void Transaction
                                  </Button>
                                  <Button className="rounded-[2.5rem] h-14 colorful-gradient font-black text-xs shadow-xl uppercase tracking-widest transition-all hover:scale-[1.02]">
                                     Issue New Invoice
                                  </Button>
                                </div>
                              </TabsContent>

                              <TabsContent value="conduct">
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                  <div className="flex items-center justify-between px-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                      <ShieldAlert className="h-4 w-4 text-orange-600 fill-orange-600/10" /> Professional Discipline Log
                                    </h3>
                                    <Button variant="secondary" size="sm" className="h-9 text-[9px] font-black uppercase tracking-widest rounded-full shadow-inner px-6 transition-all hover:bg-muted/80">Filter History</Button>
                                  </div>
                                  <div className="space-y-6">
                                    {[
                                      { date: "1 week ago", author: "Mwl. Juma", note: "Consistently participates in Physics lab sessions. Demonstrates leadership and logical clarity.", type: "Positive", id: "D-001" },
                                      { date: "3 weeks ago", author: "Headmaster", note: "Represented school in Regional Sports Meet. Awarded Certificate of Merit for sportsmanship.", type: "Achievement", id: "D-002" },
                                    ].map((note, i) => (
                                      <div key={i} className="p-8 rounded-[3rem] bg-white relative overflow-hidden border border-muted/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group hover:shadow-xl transition-all duration-500">
                                        <div className={cn("absolute left-0 top-0 bottom-0 w-2.5 transition-all group-hover:w-4", note.type === "Positive" ? "bg-green-500" : "bg-primary")} />
                                        <div className="flex justify-between items-start mb-4">
                                          <div className="space-y-1">
                                            <span className={cn(
                                              "text-[10px] font-black uppercase tracking-widest",
                                              note.type === "Positive" ? "text-green-600" : "text-primary"
                                            )}>{note.type}</span>
                                            <p className="text-[9px] font-mono text-muted-foreground uppercase font-black tracking-tighter">{note.id}</p>
                                          </div>
                                          <span className="text-[9px] font-black text-muted-foreground bg-muted/40 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-inner">{note.date}</span>
                                        </div>
                                        <p className="text-sm italic text-foreground/80 leading-relaxed font-semibold pr-4">"{note.note}"</p>
                                        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-dashed border-muted">
                                          <div className="h-8 w-8 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black shadow-inner">M</div>
                                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">— {note.author}</p>
                                        </div>
                                      </div>
                                    ))}
                                    <Button variant="outline" className="w-full rounded-[3rem] text-[10px] font-black py-12 border-2 border-dashed border-muted hover:border-primary/30 transition-all hover:bg-primary/5 uppercase tracking-[0.3em]">
                                      <Plus className="mr-3 h-6 w-6" /> Log Official Conduct Record
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}