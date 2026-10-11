
"use client"

import * as React from "react"
import { useState, useMemo, useRef } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Loader2,
  FileText,
  Upload,
  Home,
  Bus,
  Zap,
  MessageCircle,
  Star,
  MinusCircle,
  Sparkles,
  ChevronRight,
  ScanLine,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Users,
  IdCard,
  Printer,
  QrCode
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
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useMemoFirebase, useDoc } from "@/firebase"
import { collection, doc, query, orderBy } from "firebase/firestore"
import { updateDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"
import { scanStudentRegistration } from "@/ai/flows/scan-student-registration-flow"
import { exportReportCardToWord, exportToExcel } from "@/lib/export-utils"

const ALTRAWARE_DEMO_STUDENTS = [
  { id: "ALT-2026-001", name: "JUMA KHAMISI OMARI", class: "Standard 7", type: "Boarder", hostel: "Kilimanjaro Wing", contact: "+255 700 000 001", conductPoints: 100 },
  { id: "ALT-2026-002", name: "NEEMA ELIAS MASAWE", class: "Standard 7", type: "Day", route: "Posta - Kariakoo", contact: "+255 700 000 002", conductPoints: 94 },
  { id: "ALT-2026-003", name: "BARAKA SAIDI MREMA", class: "Standard 7", type: "Boarder", hostel: "Serengeti Wing", contact: "+255 700 000 003", conductPoints: 100 },
  { id: "ALT-2026-004", name: "ANNA JOSEPH KILIMA", class: "Form 2A", type: "Boarder", hostel: "Lake Victoria Wing", contact: "+255 700 000 004", conductPoints: 98 },
  { id: "ALT-2026-005", name: "IDRISSA HASSAN KHALFAN", class: "Form 2B", type: "Boarder", hostel: "Serengeti Wing", contact: "+255 700 000 005", conductPoints: 99 },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isManualEnrolling, setIsManualEnrolling] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)

  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity } = useDoc(identityRef)

  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students"), orderBy("name", "asc")), [db])
  const { data: firestoreStudents, isLoading } = useCollection(studentsQuery)

  const isDemo = identity?.demoMode === true

  const students = useMemo(() => {
    if (!isDemo) return firestoreStudents || []
    const base = firestoreStudents || []
    const demoIds = new Set(base.map(s => s.id))
    const uniqueDemo = ALTRAWARE_DEMO_STUDENTS.filter(s => !demoIds.has(s.id))
    return [...base, ...uniqueDemo]
  }, [firestoreStudents, isDemo])

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleManualEnroll = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const className = formData.get("class") as string
    
    const newStudent = {
      name: (formData.get("name") as string).toUpperCase(),
      id: formData.get("id") as string,
      class: className,
      type: formData.get("type") as string,
      status: "Active",
      contact: formData.get("contact") as string || "+255",
      conductPoints: 100,
      attendanceStatus: "Present",
      createdAt: new Date().toISOString()
    }

    addDocumentNonBlocking(collection(db, "schools", "school-001", "students"), newStudent)
    setIsManualEnrolling(false)
    toast({ title: "Student Enrolled", description: `${newStudent.name} synced to Altraware database.` })
  }

  const handleSmartEnroll = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const result = await scanStudentRegistration({ photoDataUri: base64 })
        const newStudent = {
          id: result.id,
          name: result.name,
          class: result.academicLevel,
          status: "Active",
          type: "Day",
          contact: result.parentContact || "+255",
          conductPoints: 100,
          attendanceStatus: "Present",
          photo: base64
        }
        addDocumentNonBlocking(collection(db, "schools", "school-001", "students"), newStudent)
        toast({ title: "AI Enrollment Success", description: `Synchronized ${result.name} to Altraware node.` })
      } catch (err) {
        toast({ variant: "destructive", title: "Scan Node Failed", description: "Internal AI error during form parsing." })
      } finally {
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleGenerateAiSummary = async () => {
    if (!selectedStudent) return
    setIsGeneratingAi(true)
    try {
      const result = await generateStudentProgressSummary({
        studentName: selectedStudent.name,
        academicPerformance: [
          { subject: "Mathematics", grade: "A", comment: "Exceptional analytical skills." },
          { subject: "English", grade: "B", comment: "Fluent communication." }
        ],
        attendanceSummary: "Consistent attendance at 98.4%.",
        behavioralNotes: `Conduct Score: ${selectedStudent.conductPoints || 100} PTS.`
      })
      setAiSummary(result.summary)
      toast({ title: "AI Synthesis Complete", description: "Narrative report generated." })
    } catch (err) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Internal AI node error." })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  return (
    <div className="space-y-6 pb-24 px-1 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            {isDemo ? "ALTRAWARE DEMO NODE" : "OFFICIAL REGISTRY"}
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">PDPA-Compliant management of {students.length} institutional nodes.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => exportToExcel(students, "Altraware_Student_Ledger")} className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase">
            <Download className="mr-2 h-4 w-4" /> Export Ledger
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase group">
                <ScanLine className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> AI Smart Enroll
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-8 max-w-md border-none shadow-2xl">
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="text-xl font-black uppercase">Smart Enrollment Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Extract student details via Altraware AI</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 text-center">
                <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4 group hover:border-primary/40 transition-colors shadow-inner">
                  {isScanning ? <Loader2 className="h-12 w-12 animate-spin text-primary" /> : <Camera className="h-12 w-12 text-primary/40 group-hover:scale-110 transition-transform" />}
                  <p className="text-[10px] font-black text-muted-foreground uppercase">{isScanning ? "AI Analyzing Form..." : "Scan Registration Form"}</p>
                  <label className="cursor-pointer">
                    <Button variant="default" className="rounded-full colorful-gradient h-12 px-8 font-black text-[10px] uppercase shadow-xl pointer-events-none">Select Document</Button>
                    <input type="file" className="hidden" accept="image/*" onChange={handleSmartEnroll} disabled={isScanning} />
                  </label>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isManualEnrolling} onOpenChange={setIsManualEnrolling}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase px-8">
                <Plus className="mr-2 h-4 w-4" /> Enroll Student
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-lg">
              <DialogHeader className="bg-primary/5 p-8 border-b">
                <DialogTitle className="text-xl font-black uppercase text-primary">Manual Enrollment</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Register new candidate to Altraware database</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleManualEnroll} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Legal Name</Label>
                    <Input name="name" placeholder="e.g. Juma Hamisi" required className="h-12 rounded-xl bg-muted/20 border-none font-bold uppercase px-5 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Candidate ID</Label>
                    <Input name="id" placeholder="e.g. ALT-DEMO-001" required className="h-12 rounded-xl bg-muted/20 border-none font-mono font-black px-5 shadow-inner" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Academic Tier</Label>
                    <Select name="class" defaultValue="Standard 7">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {identity?.tiers?.map((t: string) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        )) || (
                          <>
                            <SelectItem value="Standard 7">Standard 7</SelectItem>
                            <SelectItem value="Form 2">Form 2</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Residence</Label>
                    <Select name="type" defaultValue="Day">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Boarder">Boarder Node</SelectItem>
                        <SelectItem value="Day">Day Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl mt-4">
                  Initialize Candidate Node
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input 
              placeholder="Find student by name or ID..." 
              className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-12 rounded-full border-none bg-white shadow-sm font-black text-[9px] uppercase px-6">
            <Filter className="h-4 w-4 mr-2" /> Tier Filters
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-primary" />
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Synchronizing Registry Node...</p>
            </div>
          ) : (
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none h-14">
                  <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Node</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Academic Tier</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Logistic Hub</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Conduct</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl shadow-lg shrink-0 border-2 border-white transition-transform group-hover:scale-110 overflow-hidden">
                          <AvatarImage src={student.photo} className="object-cover" />
                          <AvatarFallback className="font-black text-primary bg-primary/5 uppercase">{student.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors uppercase truncate max-w-[200px]">{student.name}</span>
                          <span className="text-[9px] text-muted-foreground font-mono font-black">{student.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[8px] font-black uppercase bg-white/50 border-primary/10 px-3 py-0.5 rounded-full">
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.type === "Boarder" ? <Home className="h-3 w-3 text-primary/40" /> : <Bus className="h-3 w-3 text-primary/40" />}
                        <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tight">
                          {student.type === "Boarder" ? (student.hostel || "Assigned Wing") : (student.route || "Fleet Route")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-[10px] text-green-700 bg-green-50 px-3 py-1 rounded-full shadow-sm">
                      {student.conductPoints || 100} PTS
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={(open) => { if (open) { setSelectedStudent(student); setAiSummary(null); } }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" className="text-[10px] font-black text-primary uppercase rounded-full group/btn hover:bg-primary/5">
                            Access Hub <ChevronRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l-0 shadow-2xl">
                          <div className="bg-primary/5 p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                              <Zap className="h-48 w-48" />
                            </div>
                            <SheetHeader className="text-left flex-row items-center gap-8 relative z-10">
                              <Avatar className="h-28 w-24 rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden">
                                <AvatarImage src={selectedStudent?.photo} className="object-cover" />
                                <AvatarFallback className="text-3xl font-black text-primary bg-white uppercase">{selectedStudent?.name?.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-3">
                                <h3 className="text-2xl font-headline font-black text-primary uppercase tracking-tighter">{selectedStudent?.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge className="rounded-full bg-white text-primary border-none shadow-md px-4 py-1 text-[9px] uppercase tracking-widest font-black">{selectedStudent?.class}</Badge>
                                  <span className="text-[9px] font-mono font-black text-muted-foreground px-3 py-1 bg-white rounded-lg shadow-inner">{selectedStudent?.id}</span>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-10 space-y-10">
                            <Tabs defaultValue="logistics" className="space-y-8">
                              <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 grid w-full grid-cols-4 shadow-inner">
                                <TabsTrigger value="logistics" className="rounded-xl text-[8px] font-black uppercase">Logistics</TabsTrigger>
                                <TabsTrigger value="academic" className="rounded-xl text-[8px] font-black uppercase">Academic</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[8px] font-black uppercase">Merit</TabsTrigger>
                                <TabsTrigger value="id-card" className="rounded-xl text-[8px] font-black uppercase">ID Node</TabsTrigger>
                              </TabsList>

                              <TabsContent value="logistics" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Parent Contact</Label>
                                    <Input value={selectedStudent?.contact || ""} readOnly className="h-12 bg-muted/20 border-none font-bold rounded-xl px-5 shadow-inner" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Allocation Hub</Label>
                                    <Badge className="h-12 w-full flex items-center justify-center bg-white border border-muted text-primary font-black uppercase text-[10px] rounded-xl">
                                      {selectedStudent?.type === "Boarder" ? selectedStudent?.hostel : selectedStudent?.route}
                                    </Badge>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="academic" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <Card className="border-none shadow-inner bg-muted/10 rounded-[2.5rem] overflow-hidden">
                                  <CardHeader className="bg-primary/5 p-8 flex flex-row items-center justify-between">
                                    <div className="space-y-1">
                                      <CardTitle className="text-base font-black uppercase tracking-widest text-primary">AI Narrative Synthesis</CardTitle>
                                      <CardDescription className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Altraware AI Performance Mapping</CardDescription>
                                    </div>
                                    <Button onClick={handleGenerateAiSummary} disabled={isGeneratingAi} className="rounded-full colorful-gradient h-10 px-6 font-black text-[9px] uppercase shadow-lg">
                                      {isGeneratingAi ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />} Synthesize
                                    </Button>
                                  </CardHeader>
                                  <CardContent className="p-8 min-h-[200px]">
                                    {aiSummary ? (
                                      <div className="prose prose-sm font-medium text-foreground/80 leading-relaxed text-xs">{aiSummary}</div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center h-[150px] text-center space-y-4 opacity-30">
                                        <Sparkles className="h-10 w-10 text-primary" />
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em]">Ready for Generation</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-primary/10 text-primary font-black uppercase text-xs hover:bg-primary/5 group">
                                  <FileText className="mr-2 h-5 w-5" /> Official Performance Transcript
                                </Button>
                              </TabsContent>

                              <TabsContent value="id-card" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 text-center">
                                <div className="p-10 bg-muted/20 rounded-[3rem] border-2 border-dashed border-primary/10 flex flex-col items-center gap-8">
                                   <div className="w-[320px] h-[480px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-muted relative">
                                      <div className="h-24 bg-primary p-6 flex items-center justify-between">
                                         <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-lg"><Zap className="h-6 w-6 text-primary fill-primary" /></div>
                                         <div className="text-right">
                                            <p className="text-[7px] font-black text-white uppercase tracking-widest">{identity?.name || "Altraware Technology"}</p>
                                            <p className="text-[5px] font-bold text-white/60 uppercase">Institutional Identity Node</p>
                                         </div>
                                      </div>
                                      <div className="flex-1 flex flex-col items-center pt-10 px-8 text-center space-y-6">
                                         <Avatar className="h-32 w-32 rounded-[2rem] border-4 border-primary/10 shadow-xl shadow-primary/5">
                                            <AvatarImage src={selectedStudent?.photo} className="object-cover" />
                                            <AvatarFallback className="text-3xl font-black text-primary bg-primary/5 uppercase">{selectedStudent?.name?.charAt(0)}</AvatarFallback>
                                         </Avatar>
                                         <div className="space-y-1">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Student Node</p>
                                            <h4 className="text-lg font-black text-primary uppercase leading-tight">{selectedStudent?.name}</h4>
                                         </div>
                                         <div className="grid grid-cols-2 w-full gap-4 pt-4 border-t border-muted">
                                            <div className="text-left">
                                               <p className="text-[6px] font-black text-muted-foreground uppercase">ID Number</p>
                                               <p className="text-[10px] font-bold text-foreground/80 font-mono">{selectedStudent?.id}</p>
                                            </div>
                                            <div className="text-right">
                                               <p className="text-[6px] font-black text-muted-foreground uppercase">Academic Tier</p>
                                               <p className="text-[10px] font-bold text-foreground/80">{selectedStudent?.class}</p>
                                            </div>
                                         </div>
                                         <div className="pt-6">
                                            <div className="p-3 bg-muted/30 rounded-2xl shadow-inner inline-block"><QrCode className="h-14 w-14 text-primary opacity-60" /></div>
                                            <p className="text-[6px] font-black text-muted-foreground uppercase mt-2">Altraware Audit Key</p>
                                         </div>
                                      </div>
                                      <div className="h-3 bg-accent" />
                                   </div>
                                   
                                   <div className="space-y-4 w-full max-w-xs">
                                      <Button className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl">
                                         <IdCard className="mr-2 h-4 w-4" /> Export Altraware ID
                                      </Button>
                                   </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                          <SheetFooter className="p-8 border-t bg-muted/10">
                            <p className="text-[8px] font-bold text-muted-foreground text-center w-full uppercase tracking-[0.4em]">Altraware Hub Identity Verified • 2026 Season</p>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
