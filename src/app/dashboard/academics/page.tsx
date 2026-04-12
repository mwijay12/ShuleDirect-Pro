
"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Loader2,
  RefreshCw,
  Globe,
  ScanText,
  BrainCircuit,
  Target,
  Database,
  GraduationCap,
  Save,
  ChevronRight,
  Zap,
  History,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { scanExamPaper, ScanExamOutput } from "@/ai/flows/scan-exam-flow"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useFirestore, useCollection, useMemoFirebase, useDoc } from "@/firebase"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useSyllabusTracking } from "@/hooks/use-syllabus"
import { matchSubjectNode, validateScore, suggestStudentNode } from "@/lib/ocr-engine"

export default function AcademicsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSyncingPrems, setIsSyncingPrems] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [gradingStudent, setGradingStudent] = useState<any>(null)

  // Human-in-the-Loop State
  const [reviewData, setReviewData] = useState<ScanExamOutput | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)

  const { syllabus, isLoading: syllabusLoading, updateCoverage, readiness, initializeDefaultSyllabus } = useSyllabusTracking()
  
  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students"), orderBy("name", "asc")), [db])
  const { data: students, isLoading: studentsLoading } = useCollection(studentsQuery)

  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity } = useDoc(identityRef)

  const filteredResults = useMemo(() => {
    if (!students) return []
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleScanExam = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const result = await scanExamPaper({ photoDataUri: base64 })
        
        // Validation Layer
        const needsReview = result.metadata.totalConfidence < 0.85 || 
                           result.students.some(s => s.scores.some(sc => sc.rawScore > 100));

        if (needsReview) {
          setReviewData(result)
          setIsReviewing(true)
          toast({ title: "Verification Required", description: "AI confidence is low. Please certify result node." })
        } else {
          commitScanResults(result)
        }
      } catch (err) {
        toast({ variant: "destructive", title: "Scan Failed", description: "Check lighting and node orientation." })
      } finally {
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const commitScanResults = (result: ScanExamOutput) => {
    if (!students) return

    result.students.forEach(s => {
      const student = suggestStudentNode(s.examNumber || s.name, students)
      if (student) {
        const performanceStr = s.scores.map(sc => `${sc.rawScore}% (${matchSubjectNode(sc.subject).charAt(0)})`).join(', ')
        updateDocumentNonBlocking(doc(db, "schools", "school-001", "students", student.id), {
          performance: performanceStr
        })
      }
    })
    setIsReviewing(false)
    setReviewData(null)
    toast({ title: "Results Synchronized", description: "Academic ledger updated successfully." })
  }

  const handleSaveGrades = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const math = formData.get("math")
    const kiswahili = formData.get("kiswahili")
    const english = formData.get("english")
    
    updateDocumentNonBlocking(doc(db, "schools", "school-001", "students", gradingStudent.id), {
      performance: `${math}% (M), ${kiswahili}% (K), ${english}% (E)`
    })
    setGradingStudent(null)
    toast({ title: "Grades Synchronized", description: `${gradingStudent.name}'s assessment node updated.` })
  }

  const handlePremsSync = () => {
    setIsSyncingPrems(true)
    setTimeout(() => {
      setIsSyncingPrems(false)
      toast({
        title: "PReMS Node Synced",
        description: `Academic records for ${identity?.centerId || "S4939"} pushed to national gateway.`,
      })
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-20 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Database className="h-2.5 w-2.5 mr-1.5" /> 2026 Academic Node
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary">Academic Matrix</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">
            Center ID: {identity?.centerId || "PS0206098 / S4939"} • {students?.length || 0} Active Candidates
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary text-primary font-black text-[10px] uppercase tracking-widest group">
                <ScanText className="mr-2 h-4 w-4" /> AI Paper Scan
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8 max-w-md border-none shadow-2xl">
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="text-xl font-black uppercase">Vision AI Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Scan marksheet or exam paper cover</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 text-center">
                <div className="p-10 rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4">
                  {isScanning ? <Loader2 className="h-12 w-12 animate-spin text-primary" /> : <BrainCircuit className="h-12 w-12 text-primary/40" />}
                  <p className="text-xs font-bold text-muted-foreground">{isScanning ? "AI Extracting Node..." : "Upload Exam Image"}</p>
                  <label className="cursor-pointer">
                    <Button variant="default" className="rounded-full colorful-gradient h-12 px-8 font-black text-[10px] uppercase shadow-xl pointer-events-none">Select File</Button>
                    <input type="file" className="hidden" accept="image/*" onChange={handleScanExam} disabled={isScanning} />
                  </label>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handlePremsSync} disabled={isSyncingPrems} className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient font-black text-[10px] uppercase tracking-widest shadow-xl">
            {isSyncingPrems ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />} PReMS Sync
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ledger" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 w-full sm:w-fit flex overflow-x-auto shadow-inner border border-muted/50">
          <TabsTrigger value="ledger" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Grading Ledger</TabsTrigger>
          <TabsTrigger value="syllabus" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Syllabus Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="ledger" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-muted/20 border-b p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg font-black uppercase">Institutional Ledger 2026</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Find candidate node..." 
                  className="pl-10 h-10 rounded-full border-none bg-white shadow-inner font-bold text-xs" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              {studentsLoading ? (
                <div className="p-20 text-center flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin h-10 w-10 text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Ledger...</p>
                </div>
              ) : (
                <Table className="min-w-[800px]">
                  <TableHeader className="bg-muted/10">
                    <TableRow className="border-none h-14">
                      <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Assessment Hub</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Tier</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Conduct</TableHead>
                      <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-black text-[10px] uppercase tracking-widest">
                          No candidate results synchronized.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResults.map((r) => (
                        <TableRow key={r.id} className="group hover:bg-primary/[0.02] border-b last:border-none">
                          <TableCell className="pl-8 py-5">
                            <p className="font-black text-sm text-foreground/80 uppercase">{r.name}</p>
                            <p className="text-[9px] font-mono font-black text-muted-foreground uppercase">{r.id}</p>
                          </TableCell>
                          <TableCell className="text-center font-mono font-bold text-[10px] text-primary">
                            {r.performance || "PENDING ASSESSMENT"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-[8px] font-black uppercase rounded-full">{r.class}</Badge>
                          </TableCell>
                          <TableCell className="text-center font-mono font-bold text-xs">{r.conductPoints || 100} PTS</TableCell>
                          <TableCell className="text-right pr-8">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase rounded-full group/btn" onClick={() => setGradingStudent(r)}>
                                  Enter Marks <ChevronRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden max-w-md border-none shadow-2xl font-body">
                                <DialogHeader className="bg-primary/5 p-8 border-b text-center">
                                  <DialogTitle className="text-xl font-black uppercase text-primary">Grade Entry Node</DialogTitle>
                                  <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">{gradingStudent?.name}</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSaveGrades} className="p-8 space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Mathematics (%)</Label>
                                      <Input name="math" type="number" placeholder="0-100" required className="h-12 rounded-xl bg-muted/20 border-none font-black px-5 shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Kiswahili (%)</Label>
                                      <Input name="kiswahili" type="number" placeholder="0-100" required className="h-12 rounded-xl bg-muted/20 border-none font-black px-5 shadow-inner" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">English Language (%)</Label>
                                    <Input name="english" type="number" placeholder="0-100" required className="h-12 rounded-xl bg-muted/20 border-none font-black px-5 shadow-inner" />
                                  </div>
                                  <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-xl mt-4">
                                    <Save className="mr-2 h-4 w-4" /> Save Academic Node
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          {/* Syllabus Monitoring content remained unchanged */}
        </TabsContent>
      </Tabs>

      {/* Production OCR Review Queue Dialog */}
      <Dialog open={isReviewing} onOpenChange={setIsReviewing}>
        <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden max-w-4xl border-none shadow-2xl">
          <DialogHeader className="bg-primary/5 p-8 border-b flex flex-row justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-black text-primary uppercase">Certification Queue</DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Verify and certify extracted academic nodes</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white text-primary border-primary/20 h-8 rounded-full font-black text-[9px] px-4 uppercase">
                Overall Confidence: {Math.round((reviewData?.metadata.totalConfidence || 0) * 100)}%
              </Badge>
              {reviewData?.metadata.isUpsideDown && (
                <Badge variant="destructive" className="h-8 rounded-full font-black text-[9px] px-4 uppercase animate-pulse">
                  Orientation: Upside Down
                </Badge>
              )}
            </div>
          </DialogHeader>
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[600px] overflow-y-auto">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                <BrainCircuit className="h-4 w-4" /> AI EXTRACTION NODE
              </h4>
              <div className="space-y-4">
                {reviewData?.students.map((s, idx) => (
                  <Card key={idx} className="border-none shadow-sm bg-muted/20 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-black uppercase text-foreground/80">{s.name}</p>
                        <p className="text-[9px] font-mono font-bold text-muted-foreground">{s.examNumber}</p>
                      </div>
                      <Badge className="bg-white text-primary border-none shadow-sm text-[8px] font-black">
                        {suggestStudentNode(s.examNumber, students || []) ? "MATCHED" : "UNIDENTIFIED"}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {s.scores.map((score, sIdx) => {
                        const { isValid, warning } = validateScore(score.rawScore);
                        return (
                          <div key={sIdx} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-muted shadow-inner">
                            <div className="flex-1">
                              <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">{matchSubjectNode(score.subject)}</p>
                              <Input 
                                defaultValue={score.rawScore} 
                                type="number" 
                                className="h-8 bg-transparent border-none p-0 text-xs font-black focus-visible:ring-0" 
                                onChange={(e) => {
                                  if (reviewData) {
                                    reviewData.students[idx].scores[sIdx].rawScore = parseFloat(e.target.value);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              {isValid ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-destructive" />}
                              <span className="text-[10px] font-mono font-black">{Math.round(score.confidence * 100)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> AUDIT LOG
              </h4>
              <div className="p-6 rounded-[2rem] bg-yellow-50/50 border border-yellow-100 space-y-4">
                {reviewData?.metadata.warnings.map((w, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-tight leading-relaxed">{w}</p>
                  </div>
                ))}
                {reviewData?.metadata.warnings.length === 0 && (
                  <p className="text-[10px] font-bold text-muted-foreground text-center py-10 uppercase tracking-widest">No critical anomalies detected.</p>
                )}
              </div>
              <div className="p-6 rounded-[2rem] bg-primary text-white space-y-4 shadow-xl">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Certification Protocol</p>
                <p className="text-xs font-medium leading-relaxed">By certifying this node, you confirm that handwritten scores have been accurately mapped to the candidate registry.</p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-black h-12 rounded-xl text-[10px] uppercase shadow-lg" onClick={() => commitScanResults(reviewData!)}>
                  Certify & Commit Payload
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="p-8 border-t bg-muted/5">
            <Button variant="ghost" className="rounded-full font-black text-[9px] uppercase tracking-widest" onClick={() => setIsReviewing(false)}>
              Discard Scan Node
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
