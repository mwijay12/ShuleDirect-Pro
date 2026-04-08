"use client"

import * as React from "react"
import { useState, useMemo, useRef } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus,
  Download,
  Loader2,
  FileText,
  Save,
  Trash2,
  Upload,
  Home,
  Bus,
  Zap,
  MessageCircle,
  Star,
  MinusCircle,
  Sparkles,
  ChevronRight,
  ClipboardCheck,
  ScanLine,
  Camera,
  ShieldCheck,
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
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useMemoFirebase, useDoc } from "@/firebase"
import { collection, doc, query, writeBatch, orderBy } from "firebase/firestore"
import { updateDocumentNonBlocking, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import * as XLSX from 'xlsx'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"
import { scanStudentRegistration } from "@/ai/flows/scan-student-registration-flow"
import { exportReportCardToWord } from "@/lib/export-utils"

const DORIS_DEMO_STUDENTS = [
  { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", class: "Standard 7", type: "Boarder", hostel: "Mt. Kilimanjaro Wing", contact: "0712345678", conductPoints: 100 },
  { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", class: "Standard 7", type: "Day", route: "Mbezi Beach - Kawe", contact: "0754111222", conductPoints: 94 },
  { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", class: "Standard 7", type: "Boarder", hostel: "Serengeti Annex", contact: "0621777888", conductPoints: 100 },
  { id: "S4939-0001", name: "AGNES FRED KILIMA", class: "Form 2", type: "Boarder", hostel: "Lake Victoria Wing", contact: "0788123456", conductPoints: 98 },
  { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", class: "Form 2", type: "Boarder", hostel: "Serengeti Annex", contact: "0711999888", conductPoints: 99 },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity } = useDoc(identityRef)

  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students"), orderBy("name", "asc")), [db])
  const { data: firestoreStudents, isLoading } = useCollection(studentsQuery)

  const isDemo = identity?.demoMode === true

  const students = useMemo(() => {
    if (isDemo && (!firestoreStudents || firestoreStudents.length === 0)) {
      return DORIS_DEMO_STUDENTS
    }
    return firestoreStudents || []
  }, [firestoreStudents, isDemo])

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleUpdateStudent = (id: string, updates: any) => {
    if (isDemo && !firestoreStudents?.find(s => s.id === id)) {
      toast({ variant: "destructive", title: "Official Mode Required", description: "You cannot edit demo nodes. Switch to official mode or import students first." })
      return
    }
    updateDocumentNonBlocking(doc(db, "schools", "school-001", "students", id), updates)
    if (selectedStudent?.id === id) {
      setSelectedStudent(prev => ({...prev, ...updates}))
    }
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
        await addDocumentNonBlocking(collection(db, "schools", "school-001", "students"), newStudent)
        toast({ title: "AI Enrollment Success", description: `Synchronized ${result.name} to database node.` })
      } catch (err) {
        toast({ variant: "destructive", title: "Scan Node Failed", description: "Could not parse registration document." })
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
          { subject: "English", grade: "B", comment: "Fluent communication node." },
          { subject: "Science", grade: "A", comment: "Peak curiosity." }
        ],
        attendanceSummary: "Consistent attendance at 98.4%.",
        behavioralNotes: `Conduct Score: ${selectedStudent.conductPoints || 100} PTS. Overall disciplined student.`
      })
      setAiSummary(result.summary)
      toast({ title: "AI Synthesis Complete", description: "Narrative report generated for parent conferencing." })
    } catch (err) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Internal AI node error." })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleExportTranscript = async () => {
    const schoolName = identity?.name || "ShuleDirect Pro"
    await exportReportCardToWord(selectedStudent, schoolName)
    toast({ title: "Transcript Exported", description: "Official Word document saved locally." })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      handleUpdateStudent(selectedStudent.id, { photo: reader.result as string })
      toast({ title: "Identity Node Synced", description: "Student photo updated." })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6 pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase rounded-full">
            {isDemo ? "DEMO DATA ACTIVE" : "OFFICIAL REGISTRY"}
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Management of {students.length} active students & logistic hubs.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase group">
                <ScanLine className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> AI Smart Enroll
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-8 max-w-md border-none shadow-2xl">
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="text-xl font-black uppercase">Smart Enrollment Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Extract student details via registration scan</DialogDescription>
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
                <p className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest italic">Supports official NECTA & admission nodes.</p>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase">
            <Upload className="mr-2 h-4 w-4" /> Import Ledger
            <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx, .xls, .csv" />
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase px-8">
            <Plus className="mr-2 h-4 w-4" /> Enroll Manual
          </Button>
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
          ) : students.length === 0 ? (
            <div className="p-32 text-center flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center">
                <Users className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-primary uppercase">No Active Candidates</h3>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest max-w-sm">The 2026 Sovereign Ledger is empty. Enable "Demo Mode" in Settings or import students via Excel.</p>
              </div>
              <Button variant="outline" className="rounded-full px-8 h-12 font-black uppercase text-[10px] border-primary/20 text-primary">
                Initialize Registry
              </Button>
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
                          <AvatarFallback className="font-black text-primary bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
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
                          {student.type === "Boarder" ? student.hostel : student.route}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "font-black text-[10px] px-3 py-1 rounded-full shadow-sm",
                        (student.conductPoints || 100) >= 90 ? "text-green-700 bg-green-50" : "text-orange-700 bg-orange-50"
                      )}>
                        {student.conductPoints || 100} PTS
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={(open) => { if (open) { setSelectedStudent(student); setAiSummary(null); } }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" className="text-[10px] font-black text-primary uppercase rounded-full group/btn hover:bg-primary/5">
                            Access Hub <ChevronRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l-0 shadow-2xl font-body">
                          <div className="bg-primary/5 p-10 border-b relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                              <Zap className="h-48 w-48" />
                            </div>
                            <SheetHeader className="text-left flex-row items-center gap-8 relative z-10">
                              <div className="relative group">
                                <Avatar className="h-28 w-24 rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden">
                                  <AvatarImage src={selectedStudent?.photo} className="object-cover" />
                                  <AvatarFallback className="text-3xl font-black text-primary bg-white">{selectedStudent?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer rounded-[2rem] transition-opacity">
                                  <Upload className="h-6 w-6 text-white" />
                                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                </label>
                              </div>
                              <div className="space-y-3">
                                <Input 
                                  value={selectedStudent?.name || ""} 
                                  onChange={(e) => handleUpdateStudent(selectedStudent.id, { name: e.target.value.toUpperCase() })}
                                  className="text-2xl font-black text-primary uppercase bg-transparent border-none p-0 focus-visible:ring-0 h-auto"
                                />
                                <div className="flex flex-wrap gap-2">
                                  <Badge className="rounded-full bg-white text-primary border-none shadow-md px-4 py-1 text-[9px] uppercase tracking-widest font-black">{selectedStudent?.class}</Badge>
                                  <span className="text-[9px] font-mono font-black text-muted-foreground px-3 py-1 bg-white rounded-lg shadow-inner">{selectedStudent?.id}</span>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-10 space-y-10">
                            <Tabs defaultValue="logistics" className="space-y-8">
                              <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 grid w-full grid-cols-3 shadow-inner">
                                <TabsTrigger value="logistics" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Logistics Hub</TabsTrigger>
                                <TabsTrigger value="academic" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Academic Hub</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Merit Hub</TabsTrigger>
                              </TabsList>

                              <TabsContent value="logistics" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <div className="space-y-4">
                                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1 tracking-[0.2em]">Institutional Mode</Label>
                                  <div className="grid grid-cols-2 gap-4">
                                    <Button 
                                      variant="outline" 
                                      className={cn("h-16 rounded-2xl font-black uppercase text-[10px] flex flex-col gap-1 border-2 transition-all shadow-sm", selectedStudent?.type === "Boarder" ? "border-primary bg-primary/5 text-primary" : "opacity-50 border-transparent bg-muted/20")}
                                      onClick={() => handleUpdateStudent(selectedStudent.id, { type: "Boarder", hostel: "Mt. Kilimanjaro Wing", route: "N/A" })}
                                    >
                                      <Home className="h-4 w-4" />
                                      Boarder Hub
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      className={cn("h-16 rounded-2xl font-black uppercase text-[10px] flex flex-col gap-1 border-2 transition-all shadow-sm", selectedStudent?.type === "Day" ? "border-primary bg-primary/5 text-primary" : "opacity-50 border-transparent bg-muted/20")}
                                      onClick={() => handleUpdateStudent(selectedStudent.id, { type: "Day", route: "Mbezi Beach - Kawe", hostel: "N/A" })}
                                    >
                                      <Bus className="h-4 w-4" />
                                      Day Node
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Parent Contact</Label>
                                    <div className="flex gap-2">
                                      <Input 
                                        value={selectedStudent?.contact || ""} 
                                        onChange={(e) => handleUpdateStudent(selectedStudent.id, { contact: e.target.value })}
                                        className="h-12 bg-muted/20 border-none font-bold rounded-xl px-5 shadow-inner" 
                                      />
                                      <Button variant="outline" className="h-12 w-12 rounded-xl border-primary/20 text-primary shadow-sm">
                                        <MessageCircle className="h-5 w-5" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Allocation Hub</Label>
                                    <Select 
                                      value={selectedStudent?.type === "Boarder" ? (selectedStudent?.hostel || "Mt. Kilimanjaro Wing") : (selectedStudent?.route || "Mbezi Beach - Kawe")}
                                      onValueChange={(val) => handleUpdateStudent(selectedStudent.id, selectedStudent?.type === "Boarder" ? { hostel: val } : { route: val })}
                                    >
                                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs shadow-inner">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-xl">
                                        {selectedStudent?.type === "Boarder" ? (
                                          <>
                                            <SelectItem value="Mt. Kilimanjaro Wing">Kilimanjaro Wing</SelectItem>
                                            <SelectItem value="Serengeti Annex">Serengeti Annex</SelectItem>
                                            <SelectItem value="Lake Victoria Wing">Lake Victoria Wing</SelectItem>
                                          </>
                                        ) : (
                                          <>
                                            <SelectItem value="Mbezi Beach - Kawe">Mbezi Route</SelectItem>
                                            <SelectItem value="Kijitonyama - Sinza">Kijitonyama Route</SelectItem>
                                            <SelectItem value="Mikocheni - Msasani">Mikocheni Route</SelectItem>
                                          </>
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="academic" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <Card className="border-none shadow-inner bg-muted/10 rounded-[2.5rem] overflow-hidden">
                                  <CardHeader className="bg-primary/5 p-8 flex flex-row items-center justify-between">
                                    <div className="space-y-1">
                                      <CardTitle className="text-base font-black uppercase tracking-widest text-primary">AI Narrative Synthesis</CardTitle>
                                      <CardDescription className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Gemini-Powered Performance Mapping</CardDescription>
                                    </div>
                                    <Button 
                                      onClick={handleGenerateAiSummary} 
                                      disabled={isGeneratingAi} 
                                      className="rounded-full colorful-gradient h-10 px-6 font-black text-[9px] uppercase tracking-widest shadow-lg"
                                    >
                                      {isGeneratingAi ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />}
                                      Synthesize Node
                                    </Button>
                                  </CardHeader>
                                  <CardContent className="p-8 min-h-[200px]">
                                    {aiSummary ? (
                                      <div className="prose prose-sm font-medium text-foreground/80 leading-relaxed text-xs">
                                        {aiSummary}
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center h-[150px] text-center space-y-4 opacity-30">
                                        <Sparkles className="h-10 w-10 text-primary" />
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em]">Ready for Generation</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                <Button variant="outline" onClick={handleExportTranscript} className="w-full h-14 rounded-2xl border-primary/10 text-primary font-black uppercase text-xs hover:bg-primary/5 group shadow-sm">
                                  <FileText className="mr-2 h-5 w-5" /> Official Performance Transcript <Download className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Button>
                              </TabsContent>

                              <TabsContent value="conduct" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <div className="grid grid-cols-2 gap-4">
                                  <Button 
                                    className="h-24 rounded-[2rem] bg-green-50 text-green-700 hover:bg-green-100 border-none flex flex-col gap-2 transition-all hover:-translate-y-1 shadow-sm" 
                                    onClick={() => handleUpdateStudent(selectedStudent.id, { conductPoints: (selectedStudent.conductPoints || 100) + 5 })}
                                  >
                                    <Star className="h-6 w-6 fill-green-600" />
                                    <div className="text-center">
                                      <p className="text-[10px] font-black uppercase">Award Merit Node</p>
                                      <p className="text-[8px] font-bold opacity-60">+5 PTS</p>
                                    </div>
                                  </Button>
                                  <Button 
                                    className="h-24 rounded-[2rem] bg-destructive/5 text-destructive hover:bg-destructive/10 border-none flex flex-col gap-2 transition-all hover:-translate-y-1 shadow-sm" 
                                    onClick={() => handleUpdateStudent(selectedStudent.id, { conductPoints: (selectedStudent.conductPoints || 100) - 5 })}
                                  >
                                    <MinusCircle className="h-6 w-6" />
                                    <div className="text-center">
                                      <p className="text-[10px] font-black uppercase tracking-tight">Log Infraction</p>
                                      <p className="text-[8px] font-bold opacity-60">-5 PTS</p>
                                    </div>
                                  </Button>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-white border border-muted/50 shadow-inner space-y-4">
                                  <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Conduct Index</p>
                                    <Badge className={cn(
                                      "font-black text-xs px-4 py-1 rounded-full",
                                      (selectedStudent?.conductPoints || 100) >= 90 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                    )}>
                                      {selectedStudent?.conductPoints || 100} Points
                                    </Badge>
                                  </div>
                                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary transition-all duration-1000" 
                                      style={{ width: `${selectedStudent?.conductPoints || 100}%` }} 
                                    />
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                          <SheetFooter className="p-8 border-t bg-muted/10">
                            <p className="text-[8px] font-bold text-muted-foreground text-center w-full uppercase tracking-[0.4em]">Sovereign Hub Identity Verified • 2026 Academic Season</p>
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
