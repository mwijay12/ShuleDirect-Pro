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
  Globe,
  Database,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useMemoFirebase, useDoc } from "@/firebase"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useSyllabusTracking } from "@/hooks/use-syllabus"
import { calculateCseeGrade, classifyCseeDivision } from "@/lib/necta-logic"
import { cn } from "@/lib/utils"

export default function AcademicsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [gradingStudent, setGradingStudent] = useState<any>(null)

  const { syllabus, isLoading: syllabusLoading } = useSyllabusTracking()
  
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

  const handleSaveGrades = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const math = parseFloat(formData.get("math") as string)
    const kisw = parseFloat(formData.get("kiswahili") as string)
    const eng = parseFloat(formData.get("english") as string)
    
    const g1 = calculateCseeGrade(math)
    const g2 = calculateCseeGrade(kisw)
    const g3 = calculateCseeGrade(eng)
    
    const totalPoints = g1.points + g2.points + g3.points
    const subjects = [
      { subject: "Mathematics", score: math, grade: g1.grade, points: g1.points },
      { subject: "Kiswahili", score: kisw, grade: g2.grade, points: g2.points },
      { subject: "English", score: eng, grade: g3.grade, points: g3.points }
    ]
    const divResult = classifyCseeDivision(subjects as any)

    updateDocumentNonBlocking(doc(db, "schools", "school-001", "students", gradingStudent.id), {
      performance: `${math}% (${g1.grade}), ${kisw}% (${g2.grade}), ${eng}% (${g3.grade})`,
      points: totalPoints,
      division: divResult.division
    })
    setGradingStudent(null)
    toast({ title: "Assessment Node Certified", description: `Division ${divResult.division} registered for ${gradingStudent.name}.` })
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-20 px-1 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Database className="h-2.5 w-2.5 mr-1.5" /> NECTA Compliance Hub
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">Academic Matrix</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">
            Center ID: {identity?.centerId || "S4939"} • {students?.length || 0} Active Candidates
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient font-black text-[10px] uppercase tracking-widest shadow-xl">
            <Globe className="mr-2 h-4 w-4" /> PReMS Sync Node
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ledger" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 w-full sm:w-fit flex shadow-inner border border-muted/50 px-1">
          <TabsTrigger value="ledger" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Grading Ledger</TabsTrigger>
          <TabsTrigger value="syllabus" className="rounded-xl font-black px-8 text-[9px] uppercase tracking-widest">Curriculum Pulse</TabsTrigger>
        </TabsList>

        <TabsContent value="ledger" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-muted/20 border-b p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Institutional Ledger 2026</CardTitle>
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
                <div className="p-20 text-center flex flex-col items-center gap-4"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
              ) : (
                <Table className="min-w-[1000px]">
                  <TableHeader className="bg-muted/10">
                    <TableRow className="border-none h-14">
                      <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Candidate Payload</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Assessment Node</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Points</TableHead>
                      <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Division</TableHead>
                      <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((r) => (
                      <TableRow key={r.id} className="group hover:bg-primary/[0.02] border-b last:border-none">
                        <TableCell className="pl-8 py-5">
                          <p className="font-black text-sm text-foreground/80 uppercase">{r.name}</p>
                          <p className="text-[9px] font-mono font-black text-muted-foreground uppercase">{r.id} • {r.class}</p>
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-[10px] text-primary">
                          {r.performance || "PENDING AUDIT"}
                        </TableCell>
                        <TableCell className="text-center font-black text-xs">{r.points || "-"}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            "px-4 py-1 rounded-full text-[9px] font-black border-none shadow-sm",
                            r.division === 'I' ? "bg-green-100 text-green-700" :
                            r.division === '0' ? "bg-destructive/10 text-destructive animate-pulse" : "bg-blue-50 text-blue-600"
                          )}>DIV {r.division || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase rounded-full" onClick={() => setGradingStudent(r)}>
                            Edit Marks <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!gradingStudent} onOpenChange={(open) => !open && setGradingStudent(null)}>
        <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden max-w-md border-none shadow-2xl">
          <DialogHeader className="bg-primary/5 p-8 border-b text-center">
            <DialogTitle className="text-xl font-black uppercase text-primary">Assessment Entry</DialogTitle>
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
              Certify Grade Node
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}