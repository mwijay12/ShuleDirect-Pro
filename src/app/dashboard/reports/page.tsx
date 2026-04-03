"use client"

import * as React from "react"
import { useState } from "react"
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  BarChart, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Loader2,
  Copy,
  ExternalLink,
  Globe,
  History,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  Database,
  Link as LinkIcon,
  BookOpen,
  FileText,
  Zap
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { createLearningResource } from "@/ai/flows/create-learning-resource-flow"

// Official NECTA Portal Mapping Logic
const getNectaUrl = (level: string, year: string) => {
  if (level === "CSEE") {
    if (year === "2024") return "https://onlinesys.necta.go.tz/results/2024/csee/index.htm"
    if (year === "2025") return "https://matokeo.necta.go.tz/results/2025/csee/index.html"
    if (year === "2023") return "https://onlinesys.necta.go.tz/results/2023/csee/index.htm"
  }
  if (level === "FTNA") {
    return `https://onlinesys.necta.go.tz/results/${year}/ftna/ftna.html`
  }
  if (level === "ACSEE") {
    return `https://onlinesys.necta.go.tz/results/${year}/acsee/index.html`
  }
  return "https://www.necta.go.tz/results/"
}

const nectaMockResultsByLevel: Record<string, any> = {
  "CSEE": {
    summary: { gpa: "2.1", divisionI: 42, divisionII: 38, divisionIII: 25, divisionIV: 12, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Amani Mwamba", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Careen Mushi", points: 8, division: "I", grades: "A,A,A,A,A,A,B" },
      { name: "Emanuel Lema", points: 9, division: "I", grades: "A,A,A,A,A,B,B" },
      { name: "Baraka Juma", points: 11, division: "I", grades: "A,A,B,B,B,B,B" },
      { name: "Sarah Neema", points: 12, division: "I", grades: "A,B,B,B,B,B,B" },
      { name: "John Peter", points: 14, division: "I", grades: "B,B,B,B,B,B,B" },
      { name: "Faith Mushi", points: 15, division: "I", grades: "B,B,B,B,B,C,C" },
      { name: "Kelvin Masawe", points: 17, division: "I", grades: "C,C,C,C,C,C,C" },
    ]
  },
  "FTNA": {
    summary: { gpa: "1.8", divisionI: 55, divisionII: 25, divisionIII: 10, divisionIV: 5, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Neema Peter", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Said Bakari", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Jane Doe", points: 9, division: "I", grades: "A,A,A,A,A,B,B" },
      { name: "Richard Mrema", points: 10, division: "I", grades: "A,A,A,B,B,B,B" },
    ]
  },
  "ACSEE": {
    summary: { gpa: "2.4", divisionI: 12, divisionII: 18, divisionIII: 20, divisionIV: 4, division0: 1, passRate: "98.2%" },
    topStudents: [
      { name: "Richard Mrema", points: 3, division: "I", grades: "A,A,A" },
      { name: "Sarah John", points: 4, division: "I", grades: "A,A,B" },
      { name: "Kelvin Peter", points: 6, division: "I", grades: "A,B,B" },
      { name: "Aisha Bakari", points: 7, division: "I", grades: "B,B,B" },
    ]
  }
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [nectaResults, setNectaResults] = useState<any>(null)
  const [centerNo, setCenterNo] = useState("S.1234")
  const [examYear, setExamYear] = useState("2024")
  const [examLevel, setExamLevel] = useState("CSEE")

  // AI Lab State
  const [isGeneratingLab, setIsGeneratingLab] = useState(false)
  const [labContent, setLabContent] = useState<string | null>(null)

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    setNectaResults(null)
    setTimeout(() => {
      setNectaResults(nectaMockResultsByLevel[examLevel] || nectaMockResultsByLevel["CSEE"])
      setFetchingNecta(false)
      toast({ title: "Sync Successful", description: `Official records retrieved for ${examLevel} ${examYear}.` })
    }, 2000)
  }

  const handleGenerateAiResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGeneratingLab(true)
    const formData = new FormData(e.currentTarget)
    try {
      const result = await createLearningResource({
        subject: formData.get("subject") as string,
        nectaCurriculumTopic: formData.get("topic") as string,
        studentAcademicLevel: formData.get("level") as string,
        resourceType: formData.get("type") as any,
      })
      setLabContent(result.resourceContent)
      toast({ title: "Resource Generated", description: "AI has successfully prepared your teaching node." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Generation Failed", description: "Could not initialize AI Content Node." })
    } finally {
      setIsGeneratingLab(false)
    }
  }

  const officialUrl = getNectaUrl(examLevel, examYear)

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Globe className="h-2.5 w-2.5 mr-1.5" /> Tanzanian National Hub
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight uppercase">Official NECTA Hub</h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">Sync center numbers and initiate AI study gen.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm text-[10px] font-black uppercase tracking-widest" asChild>
            <a href={officialUrl} target="_blank" rel="noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Official Portal
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1 shadow-inner">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">Results Retrieval</TabsTrigger>
          <TabsTrigger value="ai-lab" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">AI Content Lab</TabsTrigger>
          <TabsTrigger value="portals" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black uppercase">Online Results Inquiry</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-primary/60">Official PReMS Node Synchronization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Center ID</Label>
                  <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-mono font-black px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Season</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2025">2025 (Official)</SelectItem>
                      <SelectItem value="2024">2024 (Official)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Level</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="FTNA">Form Two (FTNA)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                      <SelectItem value="ACSEE">Form Six (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleFetchNectaResults} disabled={fetchingNecta} className="h-12 rounded-xl colorful-gradient font-black shadow-lg text-[10px] uppercase tracking-widest">
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} Sync Matrix
                </Button>
              </div>

              {nectaResults && (
                <div className="space-y-8 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Pass Rate", value: nectaResults.summary.passRate, color: "text-primary", bg: "bg-primary/5" },
                      { label: "Division I", value: nectaResults.summary.divisionI, color: "text-green-600", bg: "bg-green-50" },
                      { label: "Total Node", value: "142", color: "text-foreground/80", bg: "bg-muted/30" },
                      { label: "Matrix GPA", value: nectaResults.summary.gpa, color: "text-orange-600", bg: "bg-orange-50" },
                    ].map((s) => (
                      <div key={s.label} className={cn("p-6 rounded-[2rem] border border-transparent flex flex-col items-center text-center", s.bg)}>
                        <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest mb-1">{s.label}</p>
                        <p className={cn("text-2xl font-black", s.color)}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-[2rem] border bg-white shadow-xl">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow className="border-none h-14">
                          <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Candidate Payload</TableHead>
                          <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Points</TableHead>
                          <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Division</TableHead>
                          <TableHead className="hidden md:table-cell text-[9px] font-black uppercase tracking-widest">Official Sequence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {nectaResults.topStudents.map((student: any, i: number) => (
                          <TableRow key={i} className="group transition-colors border-b last:border-none">
                            <TableCell className="pl-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-black text-[10px]">{i + 1}</div>
                                <span className="font-black text-sm text-foreground/80">{student.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-mono font-black text-xs">{student.points}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn("px-4 py-1 rounded-full text-[9px] font-black border-none shadow-sm", student.division === "I" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground")}>DIV {student.division}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-[10px] font-mono text-muted-foreground italic">{student.grades}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-lab" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-4 border-none shadow-xl bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden h-fit">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-8">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <Zap className="h-6 w-6 text-accent fill-accent" /> AI CONTENT LAB
                </CardTitle>
                <CardDescription className="text-[10px] font-black uppercase tracking-widest text-accent/60">Generate Official Learning Nodes</CardDescription>
              </CardHeader>
              <form onSubmit={handleGenerateAiResource} className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Area</Label>
                  <Input name="subject" placeholder="e.g. Mathematics" required className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">NECTA Topic</Label>
                  <Input name="topic" placeholder="e.g. Algebra Node" required className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Academic Tier</Label>
                    <Select name="level" defaultValue="Form 2">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Form 2">Form 2</SelectItem>
                        <SelectItem value="Form 4">Form 4</SelectItem>
                        <SelectItem value="Form 6">Form 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Resource Node</Label>
                    <Select name="type" defaultValue="practice questions">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="practice questions">Quiz Node</SelectItem>
                        <SelectItem value="topic summary">Summary Node</SelectItem>
                        <SelectItem value="short explanation">Lesson Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isGeneratingLab} className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-2xl group">
                  {isGeneratingLab ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                  Generate Node
                </Button>
              </form>
            </Card>

            <Card className="lg:col-span-8 border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden min-h-[500px]">
              <CardHeader className="bg-muted/30 border-b p-8 flex flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase">Generated Lab Payload</CardTitle>
                </div>
                {labContent && (
                  <Button variant="outline" size="sm" className="rounded-full font-black text-[9px] uppercase px-6 h-9" onClick={() => { navigator.clipboard.writeText(labContent); toast({title: "Copied", description: "Content node saved to clipboard."}) }}>
                    <Copy className="mr-2 h-3 w-3" /> Copy Node
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-10">
                {!labContent && !isGeneratingLab && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 text-muted-foreground">
                    <BookOpen className="h-16 w-16 opacity-10" />
                    <p className="text-xs font-bold uppercase tracking-widest">Initialize AI Lab Node to begin content synthesis.</p>
                  </div>
                )}
                {isGeneratingLab && (
                  <div className="space-y-6">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </div>
                )}
                {labContent && (
                  <div className="prose prose-sm max-w-none font-medium text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {labContent}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portals" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "CSEE 2024 Archive", url: "https://onlinesys.necta.go.tz/results/2024/csee/index.htm", level: "Form 4" },
            { name: "CSEE 2025 Portal", url: "https://matokeo.necta.go.tz/results/2025/csee/index.html", level: "Form 4" },
            { name: "FTNA 2025 Hub", url: "https://onlinesys.necta.go.tz/results/2025/ftna/ftna.html", level: "Form 2" },
          ].map((portal, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md">
               <div className="h-1.5 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
               <CardHeader className="pb-4 pt-6">
                 <CardTitle className="text-sm font-black flex items-center justify-between uppercase">
                   {portal.name}
                   <ExternalLink className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                 </CardTitle>
                 <CardDescription className="text-[9px] uppercase font-black tracking-widest text-muted-foreground/60">{portal.level} Node</CardDescription>
               </CardHeader>
               <CardContent className="pb-6">
                 <Button variant="outline" size="sm" className="w-full rounded-full text-[9px] font-black uppercase h-10 border-primary/10 hover:bg-primary/5 text-primary" asChild>
                   <a href={portal.url} target="_blank" rel="noreferrer">Open Gov Node</a>
                 </Button>
               </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
