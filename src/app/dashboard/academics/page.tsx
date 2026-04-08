
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
  Database
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { scanExamPaper } from "@/ai/flows/scan-exam-flow"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

const initialResults = [
  { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", math: 82, sci: 74, eng: 91, avg: "B" },
  { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", math: 78, sci: 82, eng: 88, avg: "B" },
  { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", math: 95, sci: 98, eng: 92, avg: "A" },
  { id: "PS0206098-004", name: "BILL EDMUND TARABA", math: 88, sci: 85, eng: 90, avg: "A" },
  { id: "PS0206098-005", name: "BRIAN JULIUS KISOMBE", math: 65, sci: 68, eng: 72, avg: "C" },
  { id: "PS0206098-006", name: "BRYAN NICOLAUS SHIRIMA", math: 92, sci: 88, eng: 94, avg: "A" },
  { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE", math: 96, sci: 94, eng: 98, avg: "A" },
  { id: "PS0206098-008", name: "DERICK HAGAI SAMSON", math: 88, sci: 82, eng: 90, avg: "A" },
  { id: "PS0206098-009", name: "ELIA MICHAEL MWALONGO", math: 94, sci: 92, eng: 96, avg: "A" },
  { id: "PS0206098-010", name: "ELTON SIMON MMBAGA", math: 85, sci: 80, eng: 88, avg: "A" },
  { id: "PS0206098-011", name: "ERICK IBRAHIM MAKUHI", math: 74, sci: 70, eng: 78, avg: "B" },
  { id: "PS0206098-012", name: "FRANCIS GELIANO MBILINYI", math: 91, sci: 88, eng: 93, avg: "A" },
  { id: "PS0206098-013", name: "GERALD KENETH KANDIMBA", math: 98, sci: 96, eng: 99, avg: "A" },
]

const initialSyllabus = [
  { id: 1, subject: "Mathematics", level: "Primary Std 7", covered: 78, status: "On Track" },
  { id: 2, subject: "Science", level: "Primary Std 7", covered: 62, status: "Delayed" },
  { id: 3, subject: "Kiswahili", level: "Primary Std 7", covered: 94, status: "Peak" },
  { id: 4, subject: "English", level: "Primary Std 7", covered: 78, status: "On Track" },
]

export default function AcademicsPage() {
  const { toast } = useToast()
  const [results, setResults] = useState(initialResults)
  const [syllabus, setSyllabus] = useState(initialSyllabus)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSyncingPrems, setIsSyncingPrems] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)

  const filteredResults = useMemo(() => {
    return results.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, results])

  const handleScanExam = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const result = await scanExamPaper({ photoDataUri: base64 })
        toast({
          title: "AI Scan Success",
          description: `Extracted: ${result.examNumber} | Score: ${result.score}%`,
        })
        setResults(prev => [...prev, {
          id: result.examNumber,
          name: "Matched from Registry",
          math: result.score,
          sci: 0, eng: 0,
          avg: "TBD"
        }])
      } catch (err) {
        toast({ variant: "destructive", title: "Scan Failed", description: "Could not read exam paper." })
      } finally {
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const updateCoverage = (id: number, val: number) => {
    setSyllabus(prev => prev.map(s => s.id === id ? { ...s, covered: val } : s))
    toast({ title: "Coverage Synced", description: "Standard 7 progress recorded." })
  }

  const handlePremsSync = () => {
    setIsSyncingPrems(true)
    setTimeout(() => {
      setIsSyncingPrems(false)
      toast({
        title: "PReMS Node Synced",
        description: "Standard 7 records successfully pushed to national gateway.",
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
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Institutional Grading & Syllabus Hub • 267 Candidates</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary text-primary font-black text-[10px] uppercase tracking-widest group">
                <ScanText className="mr-2 h-4 w-4" /> AI Scanner
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8 max-w-md">
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="text-xl font-black uppercase">Scan Result Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Identify exam number and marks via AI</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 text-center">
                <div className="p-10 rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4">
                  {isScanning ? <Loader2 className="h-12 w-12 animate-spin text-primary" /> : <BrainCircuit className="h-12 w-12 text-primary/40" />}
                  <p className="text-xs font-bold text-muted-foreground">{isScanning ? "AI Analyzing..." : "Upload Exam Cover Photo"}</p>
                  <label className="cursor-pointer">
                    <Button variant="default" className="rounded-full colorful-gradient h-12 px-8 font-black text-[10px] uppercase pointer-events-none">Select Exam Node</Button>
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
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 w-full sm:w-fit flex overflow-x-auto shadow-inner">
          <TabsTrigger value="ledger" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Grading Ledger</TabsTrigger>
          <TabsTrigger value="syllabus" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Syllabus Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="ledger" className="space-y-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Grading Model", value: "PSLE Matrix", color: "text-primary" },
              { label: "Mean Points", value: "199.2", color: "text-green-600" },
              { label: "Total Candidates", value: "267", color: "text-accent" },
              { label: "Audit Node", value: "Verified", color: "text-orange-600" },
            ].map((item) => (
              <Card key={item.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem]">
                <CardContent className="p-6">
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
                  <p className={cn("text-xl font-black mt-1", item.color)}>{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-muted/20 border-b p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg font-black uppercase">Standard 7 Ledger 2026</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Find candidate..." 
                  className="pl-10 h-10 rounded-full border-none bg-white shadow-inner font-bold text-xs" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-none">
                    <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Payload</TableHead>
                    <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Math</TableHead>
                    <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Science</TableHead>
                    <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">English</TableHead>
                    <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Grade</TableHead>
                    <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Hub</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground font-black text-[10px] uppercase tracking-widest">
                        No candidate results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((r) => (
                      <TableRow key={r.id} className="group hover:bg-primary/[0.02] border-b last:border-none">
                        <TableCell className="pl-8 py-5">
                          <p className="font-black text-sm text-foreground/80">{r.name}</p>
                          <p className="text-[9px] font-mono font-black text-muted-foreground uppercase">{r.id}</p>
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs">{r.math}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs">{r.sci}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs">{r.eng}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            "text-[9px] py-0.5 px-3 font-black rounded-full border-none",
                            r.avg === "A" ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-600"
                          )}>GRADE {r.avg}</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase rounded-full">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {syllabus.map((s) => (
              <Card key={s.id} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="font-black text-[8px] uppercase">{s.status}</Badge>
                    <Target className="h-4 w-4 text-primary/40 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-lg font-black text-primary uppercase">{s.subject}</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase">{s.level}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                      <span>Coverage</span>
                      <span className="text-primary">{s.covered}%</span>
                    </div>
                    <Progress value={s.covered} className="h-2 bg-muted/50" />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-[9px] font-black uppercase h-10 rounded-full border-primary/10" onClick={() => setSelectedSubject(s)}>
                        Update Node
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] max-w-sm">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-xl font-black">Sync Syllabus Progress</DialogTitle>
                        <DialogDescription className="text-[10px] font-black uppercase">{selectedSubject?.subject} Hub</DialogDescription>
                      </DialogHeader>
                      <div className="py-10 space-y-8">
                        <div className="space-y-4">
                          <div className="flex justify-between font-black text-xs uppercase text-primary">
                            <span>Completion Matrix</span>
                            <span>{selectedSubject?.covered}%</span>
                          </div>
                          <Slider 
                            defaultValue={[selectedSubject?.covered || 0]} 
                            max={100} 
                            step={1} 
                            onValueChange={(val) => updateCoverage(selectedSubject?.id, val[0])}
                          />
                        </div>
                        <p className="text-[9px] font-medium text-center text-muted-foreground italic">Updating this node synchronizes institutional logs.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
