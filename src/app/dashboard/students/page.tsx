
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
  Phone,
  Stethoscope,
  Activity,
  Heart,
  Star,
  Trophy,
  AlertCircle,
  MinusCircle,
  Home
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialStudents = [
  // Doris Primary Nodes
  { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", class: "Primary Std 7", status: "Active", contact: "+255 712 000 001", attendance: "98%", conductPoints: 85, trend: "up", hostel: "Mt. Kilimanjaro Wing" },
  { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", class: "Primary Std 7", status: "Active", contact: "+255 754 000 002", attendance: "92%", conductPoints: 94, trend: "up", hostel: "Lake Victoria Wing" },
  { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", class: "Primary Std 7", status: "Active", contact: "+255 621 000 003", attendance: "100%", conductPoints: 100, trend: "up", hostel: "Serengeti Annex" },
  { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE", class: "Primary Std 7", status: "Active", contact: "+255 713 000 005", attendance: "99%", conductPoints: 92, trend: "up", hostel: "Mt. Kilimanjaro Wing" },
  { id: "PS0206098-013", name: "GERALD KENETH KANDIMBA", class: "Primary Std 7", status: "Active", contact: "+255 714 000 006", attendance: "96%", conductPoints: 85, trend: "up", hostel: "Mt. Kilimanjaro Wing" },
  
  // Centennial Christian Nodes
  { id: "S4939-0001", name: "AGNES FRED KILIMA", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 001", attendance: "97%", conductPoints: 98, trend: "up", hostel: "Lake Victoria Wing" },
  { id: "S4939-0002", name: "AGNES NKUNDWE MWAMBALASWA", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 002", attendance: "99%", conductPoints: 100, trend: "up", hostel: "Lake Victoria Wing" },
  { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 112", attendance: "98%", conductPoints: 95, trend: "up", hostel: "Mt. Kilimanjaro Wing" },
  { id: "S4939-0140", name: "IAN RICHARD CYIZA", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 140", attendance: "96%", conductPoints: 92, trend: "up", hostel: "Serengeti Annex" },
  { id: "S4939-0161", name: "KENNEDY DISMAS RWIHULA", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 161", attendance: "95%", conductPoints: 88, trend: "up", hostel: "Mt. Kilimanjaro Wing" },
  { id: "S4939-0200", name: "WILBERT RWECHUNGURA MUNYAGA", class: "O-Level Form 2", status: "Active", contact: "+255 711 111 200", attendance: "99%", conductPoints: 100, trend: "up", hostel: "Serengeti Annex" },
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
          { subject: "Science", grade: "A", comment: "Strong conceptual understanding." }
        ],
        attendanceSummary: `Consistently high presence of ${selectedStudent.attendance}.`,
        behavioralNotes: `Conduct index: ${selectedStudent.conductPoints}. Demonstrates institutional leadership.`
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

  const handleConductChange = (id: string, amount: number) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, conductPoints: Math.min(100, Math.max(0, s.conductPoints + amount)) } : s))
    if (amount > 0) {
      toast({ title: "Merit Awarded", description: `+${amount} conduct points registered.` })
    } else {
      toast({ variant: "destructive", title: "Infraction Logged", description: `${amount} conduct points deducted.` })
    }
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    toast({ title: "Record Terminated", description: "Student node removed from 2026 registry." })
  }

  const handleRegistryExport = () => {
    exportToExcel(students, "Institutional_Registry_2026")
    toast({ title: "Registry Exported", description: "Institutional Excel saved successfully." })
  }

  const handleExportReportCard = async () => {
    if (!selectedStudent) return
    setIsExporting(true)
    const schoolName = localStorage.getItem("shule_name") || "Institutional Node"
    await exportReportCardToWord(selectedStudent, schoolName)
    setIsExporting(false)
    toast({ title: "Hard Copy Generated", description: "Official Word transcript downloaded." })
  }

  const updateStudentHostel = (id: string, hostel: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, hostel } : s))
    toast({ title: "Allocation Updated", description: "Hostel node assigned successfully." })
  }

  return (
    <div className="space-y-6 pb-20 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            Institutional Registry 2026
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight uppercase">Student Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Management of active students & conduct indices.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleRegistryExport} variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase tracking-widest">
            <Download className="mr-2 h-4 w-4" /> Export Node
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase tracking-widest">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Hub
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Population Node", value: "2,480", color: "text-primary", sub: "Global Count" },
          { label: "Active Nodes", value: "2,480", color: "text-green-600", sub: "Operational" },
          { label: "Attendance", value: "96.2%", color: "text-accent", sub: "Verified" },
          { label: "Syllabus", value: "78.4%", color: "text-orange-600", sub: "Peak Progress" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden group hover:-translate-y-1 transition-all">
            <CardHeader className="p-5 sm:p-6">
              <CardDescription className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</CardDescription>
              <CardTitle className={cn("text-xl sm:text-2xl font-black mt-1 truncate", stat.color)}>{stat.value}</CardTitle>
              <p className="text-[8px] font-bold text-muted-foreground/60 uppercase mt-1">{stat.sub}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input placeholder="Search students..." className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-xs" />
            </div>
            <Button variant="outline" className="h-12 rounded-full px-8 bg-white border-none shadow-sm font-black text-[9px] uppercase tracking-widest text-primary">
              <Filter className="mr-2 h-4 w-4" /> Season Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-none h-14">
                <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Node</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Academic Hub</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Hostel Node</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Conduct</TableHead>
                <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
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
                    <Badge variant="secondary" className="font-black text-[8px] bg-muted/80 text-muted-foreground uppercase px-4 py-1 rounded-full">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="h-3.5 w-3.5 text-primary/40" />
                      <span className="text-[10px] font-black text-foreground/60 uppercase">{student.hostel}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "text-[10px] font-black px-3 py-1 rounded-full",
                      student.conductPoints >= 80 ? "bg-green-100 text-green-700" :
                      student.conductPoints >= 50 ? "bg-orange-100 text-orange-700" : "bg-destructive/10 text-destructive"
                    )}>
                      {student.conductPoints} PTS
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end items-center gap-2">
                      <Sheet onOpenChange={(open) => { if (open) setSelectedStudent(student); else setAiSummary(""); }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary hover:bg-primary/5 rounded-full px-6 h-10 border border-transparent hover:border-primary/10 transition-all uppercase tracking-widest">Hub Access</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
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
                                  <SheetTitle className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tighter leading-none uppercase">{student.name}</SheetTitle>
                                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
                                    <Badge className="rounded-full bg-white text-primary border-none shadow-lg font-black px-6 py-1.5 text-[9px] uppercase tracking-widest">{student.class}</Badge>
                                    <span className="text-[9px] font-mono font-black text-muted-foreground tracking-widest uppercase px-4 py-2 bg-white rounded-xl shadow-inner">{student.id}</span>
                                  </div>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-8 sm:p-10 space-y-10">
                            <Tabs defaultValue="overview" className="space-y-10">
                              <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-2xl h-14 shadow-inner">
                                <TabsTrigger value="overview" className="rounded-xl text-[9px] font-black uppercase tracking-widest">AI Node</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Conduct</TabsTrigger>
                                <TabsTrigger value="allocation" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Housing</TabsTrigger>
                                <TabsTrigger value="academic" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Reports</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-10">
                                <Card className="border-none bg-accent/5 border border-accent/10 relative overflow-hidden p-8 rounded-[2.5rem] shadow-xl">
                                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-3">
                                      <Zap className="h-5 w-5 text-accent fill-accent animate-pulse" />
                                      <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">Institutional AI Node</span>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      className="w-full sm:w-auto rounded-full h-12 px-10 colorful-gradient text-[9px] font-black shadow-2xl uppercase tracking-widest"
                                      onClick={handleGenerateAiSummary}
                                      disabled={isGeneratingAi}
                                    >
                                      {isGeneratingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                                      ANALYZE NODE
                                    </Button>
                                  </div>
                                  <div className="bg-white/90 rounded-[2rem] p-8 text-xs leading-relaxed text-foreground/80 border-2 border-dashed border-accent/20 font-medium italic shadow-inner min-h-[120px]">
                                    {aiSummary || "Initiate academic analysis to generate a 2026 performance narrative and NECTA prediction."}
                                  </div>
                                </Card>
                              </TabsContent>

                              <TabsContent value="conduct" className="space-y-8">
                                <div className="flex items-center justify-between px-2">
                                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-orange-500" /> Conduct Index Hub
                                  </h3>
                                  <Badge className="bg-orange-50 text-orange-600 border-none font-black px-4 py-1 rounded-full text-[9px]">ACTIVE INDEX: {selectedStudent?.conductPoints} PTS</Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <Button 
                                    className="h-24 rounded-3xl bg-green-50 text-green-700 hover:bg-green-100 border-none flex flex-col gap-2 transition-all group"
                                    onClick={() => handleConductChange(selectedStudent!.id, 5)}
                                  >
                                    <Star className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Award Merit (+5)</span>
                                  </Button>
                                  <Button 
                                    className="h-24 rounded-3xl bg-destructive/5 text-destructive hover:bg-destructive/10 border-none flex flex-col gap-2 transition-all group"
                                    onClick={() => handleConductChange(selectedStudent!.id, -5)}
                                  >
                                    <MinusCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Log Infraction (-5)</span>
                                  </Button>
                                </div>
                              </TabsContent>

                              <TabsContent value="allocation" className="space-y-6">
                                <div className="space-y-4">
                                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Hostel Allocation Node</Label>
                                  <Select defaultValue={selectedStudent?.hostel} onValueChange={(val) => updateStudentHostel(selectedStudent!.id, val)}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none font-bold shadow-inner px-6">
                                      <SelectValue placeholder="Select Wing..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                      <SelectItem value="Mt. Kilimanjaro Wing">Mt. Kilimanjaro Wing (Boys)</SelectItem>
                                      <SelectItem value="Lake Victoria Wing">Lake Victoria Wing (Girls)</SelectItem>
                                      <SelectItem value="Serengeti Annex">Serengeti Annex (Boys)</SelectItem>
                                      <SelectItem value="N/A">Unassigned / Day Student</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-[9px] font-medium text-muted-foreground text-center italic">Assignment to a housing node synchronizes the student with the wing warden's audit ledger.</p>
                                </div>
                              </TabsContent>

                              <TabsContent value="academic" className="space-y-8">
                                 <Button 
                                   onClick={handleExportReportCard} 
                                   disabled={isExporting}
                                   className="w-full rounded-3xl h-16 bg-white border-[2.5px] border-primary text-primary hover:bg-primary/5 font-black text-sm shadow-xl group uppercase tracking-widest"
                                 >
                                   {isExporting ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />}
                                   Official Word Transcript
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
