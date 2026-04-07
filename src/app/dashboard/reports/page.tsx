
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
  Zap,
  LayoutGrid,
  Trophy,
  PieChart,
  UserCheck
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

// Official Doris Primary Data Population (PSLE 2018)
const dorisMockResults = {
  center: "DORIS PRIMARY SCHOOL - PS0206098",
  stats: {
    total: 67,
    average: "199.2537",
    districtRank: "5 / 91",
    regionalRank: "50 / 448",
    nationalRank: "221 / 10090"
  },
  candidates: [
    { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", subjects: "Ksw-B, Eng-A, Maa-B, His-B, Sci-B", avg: "B" },
    { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", subjects: "Ksw-A, Eng-A, Maa-C, His-B, Sci-B", avg: "B" },
    { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-004", name: "BILL EDMUND TARABA", subjects: "Ksw-B, Eng-A, Maa-B, His-A, Sci-B", avg: "A" },
    { id: "PS0206098-005", name: "BRIAN JULIUS KISOMBE", subjects: "Ksw-C, Eng-B, Maa-C, His-C, Sci-C", avg: "C" },
    { id: "PS0206098-006", name: "BRYAN NICOLAUS SHIRIMA", subjects: "Ksw-A, Eng-A, Maa-B, His-A, Sci-B", avg: "A" },
    { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-008", name: "DERICK HAGAI SAMSON", subjects: "Ksw-A, Eng-A, Maa-B, His-A, Sci-B", avg: "A" },
    { id: "PS0206098-009", name: "ELIA MICHAEL MWALONGO", subjects: "Ksw-B, Eng-A, Maa-B, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-010", name: "ELTON SIMON MMBAGA", subjects: "Ksw-B, Eng-A, Maa-B, His-A, Sci-B", avg: "A" },
    { id: "PS0206098-013", name: "GERALD KENETH KANDIMBA", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-017", name: "IKUTWAGA BURTON MWAKAMBONJA", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-022", name: "LEONARD FRANCIS MANONI", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-034", name: "ZINDA BENARD JOHN", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-037", name: "DEBORA DAMAS RUGANGIRA", subjects: "Ksw-A, Eng-A, Maa-B, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-043", name: "FAIDHA ABDUL MBWANA", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-B", avg: "A" },
    { id: "PS0206098-048", name: "JOYCE IRENE SEMAHIMBO", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-051", name: "LILIAN STANFORD MUHIDIN", subjects: "Ksw-A, Eng-A, Maa-B, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-065", name: "VALERIA IGNAS ACHINAMPATE", subjects: "Ksw-A, Eng-A, Maa-B, His-A, Sci-A", avg: "A" },
    { id: "PS0206098-067", name: "YUZLA ALLY MSHAM", subjects: "Ksw-A, Eng-A, Maa-C, His-A, Sci-B", avg: "A" },
  ]
}

const getNectaUrl = (level: string, year: string, centerId: string) => {
  const cleanId = centerId.replace('.', '').toLowerCase();
  if (level === "PSLE") {
    return `https://maktaba.tetea.org/exam-results/PSLE${year}/shl_${cleanId}.htm`;
  }
  return `https://matokeo.necta.go.tz/results/${year}/${level.toLowerCase()}/results/${cleanId}.htm`;
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [activeResults, setActiveResults] = useState<any>(null)
  
  const [centerNo, setCenterNo] = useState("PS0206098")
  const [examYear, setExamYear] = useState("2018")
  const [examLevel, setExamLevel] = useState("PSLE")

  const [isGeneratingLab, setIsGeneratingLab] = useState(false)
  const [labContent, setLabContent] = useState<string | null>(null)

  useEffect(() => {
    const savedId = localStorage.getItem("shule_center_id")
    if (savedId) setCenterNo(savedId)
  }, [])

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    setActiveResults(null)
    
    setTimeout(() => {
      if (centerNo === "PS0206098" && examYear === "2018") {
        setActiveResults(dorisMockResults)
        toast({ title: "Official Sync Successful", description: "Linked 67 candidates to Doris Primary Registry." })
      } else {
        toast({ variant: "destructive", title: "Center Not Verified", description: "Standard fetch failed. Demo is locked to PS0206098." })
      }
      setFetchingNecta(false)
    }, 1500)
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
      toast({ title: "Resource Generated", description: "AI has prepared your teaching node." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Generation Failed", description: "Check Genkit connection." })
    } finally {
      setIsGeneratingLab(false)
    }
  }

  const officialUrl = getNectaUrl(examLevel, examYear, centerNo)

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Globe className="h-2.5 w-2.5 mr-1.5" /> NECTA NATIONAL HUB
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary tracking-tight uppercase">Sovereign Results Hub</h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">Automated Candidate-to-Name Mapping Node.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm text-[10px] font-black uppercase tracking-widest" asChild>
            <a href={officialUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Official Portal
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Center ID", value: centerNo, sub: "Verified Node", icon: ShieldCheck, color: "text-primary" },
          { label: "Matrix Mapping", value: "Active", sub: "Names Linked", icon: UserCheck, color: "text-green-600" },
          { label: "AI Synth", value: "Operational", sub: "Analysis Ready", icon: Zap, color: "text-accent" },
          { label: "Sync Status", value: "Online", sub: "NECTA Gateway", icon: Globe, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden group">
             <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                  <p className={cn("text-lg font-black mt-1", stat.color)}>{stat.value}</p>
                  <p className="text-[8px] text-muted-foreground font-bold mt-0.5 uppercase">{stat.sub}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                  <stat.icon className="h-5 w-5" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1 shadow-inner border border-muted/50">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">Online Inquiry</TabsTrigger>
          <TabsTrigger value="ai-lab" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">AI Content Lab</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">National Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner border border-primary/5">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">Institutional Matrix Retrieval</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-primary/60 leading-none">Map NECTA numbers to registered students automatically.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Center Number</Label>
                  <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-mono font-black px-5" placeholder="e.g. PS0206098" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Season</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2024">2024 (Current)</SelectItem>
                      <SelectItem value="2018">2018 (Archive Demo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Academic Tier</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="PSLE">Primary (PSLE)</SelectItem>
                      <SelectItem value="FTNA">Form Two (FTNA)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                      <SelectItem value="ACSEE">Form Six (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleFetchNectaResults} disabled={fetchingNecta} className="h-12 rounded-xl colorful-gradient font-black shadow-lg text-[10px] uppercase tracking-widest transition-transform active:scale-95">
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} Sync Matrix
                </Button>
              </div>

              {activeResults && (
                <div className="space-y-8 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-6 rounded-[2rem] bg-muted/20 border-2 border-dashed border-primary/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="font-black text-lg text-primary">{activeResults.center}</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Official PSLE {examYear} Audit Node</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-2xl shadow-sm">
                          <p className="text-[8px] font-black text-muted-foreground">GPA</p>
                          <p className="text-sm font-black text-primary">{activeResults.stats.average}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-2xl shadow-sm">
                          <p className="text-[8px] font-black text-muted-foreground">REGIONAL</p>
                          <p className="text-sm font-black text-accent">{activeResults.stats.regionalRank}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-2xl shadow-sm">
                          <p className="text-[8px] font-black text-muted-foreground">NATIONAL</p>
                          <p className="text-sm font-black text-orange-600">{activeResults.stats.nationalRank}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2rem] border bg-white shadow-xl">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow className="border-none h-14">
                          <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Candidate ID</TableHead>
                          <TableHead className="text-[9px] font-black uppercase tracking-widest">Linked Student Name</TableHead>
                          <TableHead className="text-[9px] font-black uppercase tracking-widest">Subject Matrix</TableHead>
                          <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeResults.candidates.map((c: any, i: number) => (
                          <TableRow key={i} className="group transition-colors border-b last:border-none hover:bg-primary/[0.02]">
                            <TableCell className="pl-8 py-5">
                              <code className="text-[10px] font-mono font-black text-primary/60 bg-primary/5 px-2 py-1 rounded">{c.id}</code>
                            </TableCell>
                            <TableCell>
                              <span className="font-black text-sm text-foreground/80">{c.name}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {c.subjects.split(', ').map((s: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-[8px] px-2 py-0 h-5 font-bold uppercase border-muted-foreground/20">{s}</Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn("px-4 py-1 rounded-full text-[9px] font-black border-none", c.avg === "A" ? "bg-green-100 text-green-700" : c.avg === "B" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600")}>{c.avg}</Badge>
                            </TableCell>
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
                <CardDescription className="text-[10px] font-black uppercase tracking-widest text-accent/60 leading-none">Generate Official Learning Nodes</CardDescription>
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
                <Button type="submit" disabled={isGeneratingLab} className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-2xl group transition-all active:scale-95">
                  {isGeneratingLab ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Node
                </Button>
              </form>
            </Card>

            <Card className="lg:col-span-8 border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden min-h-[500px]">
              <CardHeader className="bg-muted/30 border-b p-8 flex flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-primary border border-primary/5">
                    <FileText className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Generated Lab Payload</CardTitle>
                </div>
                {labContent && (
                  <Button variant="outline" size="sm" className="rounded-full font-black text-[9px] uppercase px-6 h-9 hover:bg-primary hover:text-white transition-all" onClick={() => { navigator.clipboard.writeText(labContent); toast({title: "Copied", description: "Content node saved to clipboard."}) }}>
                    <Copy className="mr-2 h-3 w-3" /> Copy Node
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-10">
                {!labContent && !isGeneratingLab && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 text-muted-foreground">
                    <BookOpen className="h-16 w-16 opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Initialize AI Lab Node to begin synthesis</p>
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
                  <div className="prose prose-sm max-w-none font-medium text-foreground/80 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-700">
                    {labContent}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
           <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Institutional Benchmarking</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Comparison against national NECTA averages</p>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                 <div className="space-y-6 p-8 rounded-[2rem] bg-muted/20 border border-muted/50">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Regional Ranking Node</h4>
                    <div className="space-y-4">
                       {[
                         { school: "Our Institution", score: 94, isMain: true },
                         { school: "Mbezi Beach Pri", score: 92, isMain: false },
                         { school: "Feza Primary", score: 89, isMain: false },
                         { school: "St. Mary's", score: 85, isMain: false },
                       ].map((item, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                               <span className={cn("text-xs font-black", item.isMain ? "text-primary" : "text-muted-foreground")}>{item.school}</span>
                               <span className="text-[10px] font-mono font-black">{item.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                               <div className={cn("h-full transition-all duration-1000", item.isMain ? "colorful-gradient" : "bg-muted-foreground/30")} style={{ width: `${item.score}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6 p-8 rounded-[2rem] bg-accent/5 border border-accent/10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Subject Proficiency Node</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { subject: "English", level: "High", color: "text-green-600", bg: "bg-green-100" },
                         { subject: "Hisabati", level: "Optimal", color: "text-blue-600", bg: "bg-blue-100" },
                         { subject: "Science", level: "Steady", color: "text-orange-600", bg: "bg-orange-100" },
                         { subject: "Kiswahili", level: "Peak", color: "text-purple-600", bg: "bg-purple-100" },
                       ].map((item, i) => (
                         <div key={i} className="p-4 rounded-2xl bg-white shadow-sm border border-accent/10 flex flex-col gap-1 items-center text-center">
                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">{item.subject}</p>
                            <Badge variant="outline" className={cn("rounded-full border-none font-black text-[8px] uppercase px-3", item.bg, item.color)}>{item.level}</Badge>
                         </div>
                       ))}
                    </div>
                    <Button variant="outline" className="w-full rounded-xl h-11 border-accent/20 text-accent font-black text-[9px] uppercase tracking-widest hover:bg-accent/5">
                      Export Analysis Node
                    </Button>
                 </div>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
