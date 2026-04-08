
"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus,
  Download,
  Loader2,
  FileText,
  Smartphone,
  Zap,
  ShieldCheck,
  MessageCircle,
  Star,
  MinusCircle,
  Home,
  Bus,
  Save,
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
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"
import { exportToExcel, exportReportCardToWord } from "@/lib/export-utils"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialStudents = [
  { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", class: "Standard 7", status: "Active", type: "Boarder", contact: "+255 712 000 001", attendance: "98%", conductPoints: 85, hostel: "Mt. Kilimanjaro Wing", route: "N/A" },
  { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", class: "Standard 7", status: "Active", type: "Day", contact: "+255 754 000 002", attendance: "92%", conductPoints: 94, hostel: "N/A", route: "Mbezi Beach - Kawe" },
  { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", class: "Standard 7", status: "Active", type: "Boarder", contact: "+255 621 000 003", attendance: "100%", conductPoints: 100, hostel: "Serengeti Annex", route: "N/A" },
  { id: "PS0206098-004", name: "BILL EDMUND TARABA", class: "Standard 7", status: "Active", type: "Boarder", contact: "+255 713 000 004", attendance: "97%", conductPoints: 90, hostel: "Mt. Kilimanjaro Wing", route: "N/A" },
  { id: "PS0206098-005", name: "BRIAN JULIUS KISOMBE", class: "Standard 7", status: "Active", type: "Day", contact: "+255 713 000 005", attendance: "91%", conductPoints: 88, hostel: "N/A", route: "Kijitonyama - Sinza" },
  { id: "PS0206098-006", name: "BRYAN NICOLAUS SHIRIMA", class: "Standard 7", status: "Active", type: "Boarder", contact: "+255 713 000 006", attendance: "99%", conductPoints: 95, hostel: "Serengeti Annex", route: "N/A" },
  { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE", class: "Standard 7", status: "Active", type: "Boarder", contact: "+255 713 000 007", attendance: "99%", conductPoints: 92, hostel: "Mt. Kilimanjaro Wing", route: "N/A" },
  { id: "PS0206098-008", name: "DERICK HAGAI SAMSON", class: "Standard 7", status: "Active", type: "Day", contact: "+255 713 000 008", attendance: "95%", conductPoints: 91, hostel: "N/A", route: "Mbezi Beach - Kawe" },
  { id: "S4939-0001", name: "AGNES FRED KILIMA", class: "Form 2A", status: "Active", type: "Boarder", contact: "+255 711 111 001", attendance: "97%", conductPoints: 98, hostel: "Lake Victoria Wing", route: "N/A" },
  { id: "S4939-0002", name: "AGNES NKUNDWE MWAMBALASWA", class: "Form 2A", status: "Active", type: "Boarder", contact: "+255 711 111 002", attendance: "99%", conductPoints: 100, hostel: "Lake Victoria Wing", route: "N/A" },
  { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", class: "Form 2B", status: "Active", type: "Boarder", contact: "+255 711 111 112", attendance: "99%", conductPoints: 99, hostel: "Serengeti Annex", route: "N/A" },
  { id: "S4939-0200", name: "WILBERT RWECHUNGURA MUNYAGA", class: "Form 2B", status: "Active", type: "Boarder", contact: "+255 711 111 200", attendance: "99%", conductPoints: 100, hostel: "Serengeti Annex", route: "N/A" },
]

// Note: In a real app, these would be dozens of records. Here we simulate the searchable registry of 267.
export default function StudentsPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleUpdateStudent = (field: string, value: any) => {
    if (!selectedStudent) return
    const updated = { ...selectedStudent, [field]: value }
    setSelectedStudent(updated)
    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? updated : s))
  }

  const handleSaveStudentNode = () => {
    toast({ title: "Sovereign Identity Synced", description: `${selectedStudent.name} records updated in the 2026 Vault.` })
  }

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
        behavioralNotes: `Conduct index: ${selectedStudent.conductPoints}. Node Type: ${selectedStudent.type}.`
      })
      setAiSummary(result.summary)
      toast({ title: "Narrative Ready", description: "AI Progress report successfully synthesized." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Sync Failed", description: "Check Genkit connectivity." })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleConductChange = (id: string, amount: number) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, conductPoints: Math.min(100, Math.max(0, s.conductPoints + amount)) } : s))
    if (selectedStudent?.id === id) {
      setSelectedStudent((prev: any) => ({ ...prev, conductPoints: Math.min(100, Math.max(0, prev.conductPoints + amount)) }))
    }
    toast({ title: amount > 0 ? "Merit Awarded" : "Infraction Logged", description: `${amount > 0 ? '+' : ''}${amount} conduct points recorded.` })
  }

  const handleExportReportCard = async () => {
    if (!selectedStudent) return
    setIsExporting(true)
    const schoolName = localStorage.getItem("shule_name") || "Doris Primary School"
    await exportReportCardToWord(selectedStudent, schoolName)
    setIsExporting(false)
    toast({ title: "Document Generated", description: "Official transcript node saved locally." })
  }

  return (
    <div className="space-y-6 pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            Institutional Registry Hub 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Student Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Management of 267 active candidates & logistic nodes.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={() => exportToExcel(students, "Institutional_Registry")} variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase tracking-widest">
            <Download className="mr-2 h-4 w-4" /> Export Ledger
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase tracking-widest">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Student
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Population", value: "2,480", color: "text-primary", sub: "Global Node" },
          { label: "Boarders", value: "1,140", color: "text-green-600", sub: "Hostel Hub" },
          { label: "Day Students", value: "1,340", color: "text-accent", sub: "Fleet Hub" },
          { label: "Candidates", value: "267", color: "text-orange-600", sub: "NECTA Pool" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-lg rounded-[2rem] bg-white/60 backdrop-blur-md overflow-hidden group">
            <CardHeader className="p-5 sm:p-6">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className={cn("text-xl sm:text-2xl font-black mt-1", stat.color)}>{stat.value}</p>
              <p className="text-[8px] font-bold text-muted-foreground/60 uppercase mt-1">{stat.sub}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search students by name or ID..." 
                className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-xs" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 rounded-full px-8 bg-white border-none shadow-sm font-black text-[9px] uppercase tracking-widest text-primary">
              <Filter className="mr-2 h-4 w-4" /> Filters Hub
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-none h-14">
                <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Academic Tier</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Logistic Hub</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Conduct</TableHead>
                <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Hub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-black uppercase text-[10px] tracking-widest">
                    No matching student nodes identified.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 ring-4 ring-white shadow-xl rounded-2xl shrink-0">
                          <AvatarImage src={`https://picsum.photos/seed/${student.id}/100`} />
                          <AvatarFallback className="font-black text-primary bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors truncate">{student.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono font-black uppercase">{student.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[8px] font-black uppercase px-3 py-0.5 rounded-full border-none",
                        student.class.includes("Standard") ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      )}>{student.class}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.type === "Boarder" ? <Home className="h-3 w-3 text-primary/40" /> : <Bus className="h-3 w-3 text-primary/40" />}
                        <span className="text-[10px] font-black text-foreground/60 uppercase">{student.type === "Boarder" ? student.hostel : student.route}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-[10px]">{student.conductPoints} PTS</TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={(open) => { if (open) setSelectedStudent(student); else setAiSummary(""); }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" className="text-[10px] font-black text-primary uppercase tracking-widest rounded-full hover:bg-primary/5 h-10 px-6">Access Hub</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 font-body border-l-0 shadow-2xl">
                          <div className="bg-primary/5 p-8 sm:p-10 border-b">
                            <SheetHeader className="text-left">
                              <div className="flex flex-col sm:flex-row items-center gap-8">
                                <Avatar className="h-32 w-28 ring-8 ring-white shadow-2xl rounded-[2.5rem] shrink-0">
                                  <AvatarImage src={`https://picsum.photos/seed/${student.id}/200`} />
                                  <AvatarFallback className="text-5xl font-black bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
                                  <div className="flex flex-col gap-1">
                                    <Input 
                                      value={selectedStudent?.name || ""} 
                                      onChange={(e) => handleUpdateStudent("name", e.target.value)}
                                      className="text-2xl sm:text-3xl font-black text-primary tracking-tighter uppercase bg-transparent border-none p-0 focus-visible:ring-0 h-auto"
                                    />
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
                                      <Badge className="rounded-full bg-white text-primary border-none shadow-md font-black px-6 py-1.5 text-[9px] uppercase">{selectedStudent?.class}</Badge>
                                      <span className="text-[9px] font-mono font-black text-muted-foreground uppercase px-4 py-2 bg-white rounded-xl shadow-inner">{selectedStudent?.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-8 sm:p-10">
                            <Tabs defaultValue="overview" className="space-y-10">
                              <TabsList className="grid w-full grid-cols-4 bg-muted/40 p-1 rounded-2xl h-14">
                                <TabsTrigger value="overview" className="rounded-xl text-[9px] font-black uppercase">AI Pulse</TabsTrigger>
                                <TabsTrigger value="conduct" className="rounded-xl text-[9px] font-black uppercase">Conduct</TabsTrigger>
                                <TabsTrigger value="logistics" className="rounded-xl text-[9px] font-black uppercase">Logistics</TabsTrigger>
                                <TabsTrigger value="reports" className="rounded-xl text-[9px] font-black uppercase">Reports</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-8">
                                <Card className="border-none bg-accent/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                      <Zap className="h-5 w-5 text-accent fill-accent animate-pulse" />
                                      <span className="text-[9px] font-black text-accent uppercase tracking-widest">Sovereign AI Node</span>
                                    </div>
                                    <Button size="sm" onClick={handleGenerateAiSummary} disabled={isGeneratingAi} className="rounded-full h-11 px-10 colorful-gradient text-[9px] font-black uppercase shadow-2xl">
                                      {isGeneratingAi ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze Performance"}
                                    </Button>
                                  </div>
                                  <div className="bg-white/90 rounded-[2rem] p-8 text-xs leading-relaxed text-foreground/80 border-2 border-dashed border-accent/20 font-medium italic">
                                    {aiSummary || "Initiate academic analysis to generate a 2026 performance narrative and NECTA division prediction node."}
                                  </div>
                                </Card>
                              </TabsContent>

                              <TabsContent value="conduct" className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                  <Button className="h-24 rounded-3xl bg-green-50 text-green-700 hover:bg-green-100 border-none flex flex-col gap-2" onClick={() => handleConductChange(selectedStudent!.id, 5)}>
                                    <Star className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">Merit (+5)</span>
                                  </Button>
                                  <Button className="h-24 rounded-3xl bg-destructive/5 text-destructive hover:bg-destructive/10 border-none flex flex-col gap-2" onClick={() => handleConductChange(selectedStudent!.id, -5)}>
                                    <MinusCircle className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase">Infraction (-5)</span>
                                  </Button>
                                </div>
                                <div className="p-6 bg-muted/20 rounded-2xl border-2 border-dashed">
                                  <p className="text-center text-[10px] font-black uppercase text-muted-foreground">Current Conduct Index: {selectedStudent?.conductPoints} PTS</p>
                                </div>
                              </TabsContent>

                              <TabsContent value="logistics" className="space-y-8">
                                <div className="space-y-4">
                                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Housing/Fleet Mode</Label>
                                  <Select value={selectedStudent?.type} onValueChange={(val) => handleUpdateStudent("type", val)}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none font-bold px-6 shadow-inner">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                      <SelectItem value="Boarder">Boarder Node</SelectItem>
                                      <SelectItem value="Day">Day Student Node</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {selectedStudent?.type === "Boarder" ? (
                                  <div className="space-y-4">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Hostel Allocation</Label>
                                    <Select value={selectedStudent?.hostel} onValueChange={(val) => handleUpdateStudent("hostel", val)}>
                                      <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none font-bold px-6 shadow-inner">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-2xl">
                                        <SelectItem value="Mt. Kilimanjaro Wing">Mt. Kilimanjaro Wing (Boys)</SelectItem>
                                        <SelectItem value="Lake Victoria Wing">Lake Victoria Wing (Girls)</SelectItem>
                                        <SelectItem value="Serengeti Annex">Serengeti Annex (Boys)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Fleet Route Assignment</Label>
                                    <Select value={selectedStudent?.route} onValueChange={(val) => handleUpdateStudent("route", val)}>
                                      <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none font-bold px-6 shadow-inner">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-2xl">
                                        <SelectItem value="Mbezi Beach - Kawe">Mbezi Beach - Kawe</SelectItem>
                                        <SelectItem value="Kijitonyama - Sinza">Kijitonyama - Sinza</SelectItem>
                                        <SelectItem value="Mikocheni - Msasani">Mikocheni - Msasani</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                                <div className="space-y-4 pt-4 border-t border-dashed">
                                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Parent Contact Node</Label>
                                  <div className="flex gap-2">
                                    <Input 
                                      value={selectedStudent?.contact || ""} 
                                      onChange={(e) => handleUpdateStudent("contact", e.target.value)}
                                      className="h-12 bg-muted/20 border-none font-bold rounded-xl flex-1 shadow-inner" 
                                    />
                                    <Button variant="outline" className="h-12 w-12 rounded-xl border-primary/20 text-primary">
                                      <MessageCircle className="h-5 w-5" />
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="reports" className="space-y-8">
                                 <Button onClick={handleExportReportCard} disabled={isExporting} className="w-full rounded-3xl h-16 bg-white border-2 border-primary text-primary hover:bg-primary/5 font-black text-sm shadow-xl uppercase tracking-widest">
                                   {isExporting ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <FileText className="mr-3 h-6 w-6" />}
                                   Generate Sovereign Transcript
                                 </Button>
                              </TabsContent>
                            </Tabs>
                          </div>
                          <SheetFooter className="p-8 border-t bg-muted/10">
                            <Button onClick={handleSaveStudentNode} className="w-full rounded-2xl h-14 colorful-gradient font-black text-xs uppercase shadow-2xl">
                              <Save className="mr-2 h-4 w-4" /> Save Node Configuration
                            </Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
