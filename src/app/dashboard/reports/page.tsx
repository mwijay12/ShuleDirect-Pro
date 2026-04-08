
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
  ShieldCheck,
  Zap,
  Database,
  BookOpen,
  FileText,
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

// Centennial Christian Seminary (S4939) - FTNA 2020 Data Node
const centennialMockResults = {
  center: "CENTENNIAL CHRISTIAN SEMINARY - S4939",
  stats: {
    total: 200,
    average: "7.0000",
    districtRank: "1 / 45",
    regionalRank: "1 / 120",
    nationalRank: "15 / 4500"
  },
  candidates: [
    { id: "S4939-0001", name: "AGNES FRED KILIMA", subjects: "Civ-A, Hist-A, Geo-B, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0002", name: "AGNES NKUNDWE MWAMBALASWA", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0003", name: "AIDA HAGGAI MWAKASENDO", subjects: "Civ-A, Hist-A, Geo-B, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0004", name: "AMANDA JAMES KILABUKO", subjects: "Civ-A, Hist-A, Geo-B, Kisw-A, Eng-B, Phy-B, Chem-A", avg: "A", pts: 8, div: "I" },
    { id: "S4939-0005", name: "ANEL ANDREW TEMU", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0007", name: "ANGEL ALPHA MTAKWA", subjects: "Civ-A, Hist-A, Geo-B, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0140", name: "IAN RICHARD CYIZA", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0161", name: "KENNEDY DISMAS RWIHULA", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "S4939-0200", name: "WILBERT RWECHUNGURA MUNYAGA", subjects: "Civ-A, Hist-A, Geo-A, Kisw-B, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
  ]
}

// Doris Primary (PS0206098) Data Node
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
    { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A" },
  ]
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [activeResults, setActiveResults] = useState<any>(null)
  
  const [centerNo, setCenterNo] = useState("S4939")
  const [examYear, setExamYear] = useState("2020")
  const [examLevel, setExamLevel] = useState("FTNA")

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
      if (centerNo === "S4939" && examYear === "2020") {
        setActiveResults(centennialMockResults)
        toast({ title: "FTNA Matrix Synced", description: "Linked 200 candidates to Centennial Christian Registry." })
      } else if (centerNo === "PS0206098") {
        setActiveResults(dorisMockResults)
        toast({ title: "PSLE Matrix Synced", description: "Linked 67 candidates to Doris Primary Registry." })
      } else {
        toast({ variant: "destructive", title: "Center Node Not Found", description: "Standard fetch failed. Use S4939 (2020) for Demo." })
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
      toast({ title: "AI Generation Ready", description: "High-fidelity node synthesized." })
    } catch (err) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Check Genkit API configuration." })
    } finally {
      setIsGeneratingLab(false)
    }
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Globe className="h-2.5 w-2.5 mr-1.5" /> NECTA GLOBAL HUB
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary tracking-tight uppercase">Sovereign Reports</h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">High-fidelity mapping of national result nodes.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm text-[10px] font-black uppercase tracking-widest">
            <Download className="mr-2 h-4 w-4" /> Download Global Ledger
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Center", value: centerNo, sub: "Verified Node", icon: ShieldCheck, color: "text-primary" },
          { label: "Matrix Link", value: "Enabled", sub: "Mapping Active", icon: UserCheck, color: "text-green-600" },
          { label: "AI Synth", value: "Optimal", sub: "Engine Ready", icon: Zap, color: "text-accent" },
          { label: "Sync Path", value: "Online", sub: "Tetea/NECTA", icon: Globe, color: "text-orange-600" },
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
          <TabsTrigger value="necta-explorer" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">Official Inquiry</TabsTrigger>
          <TabsTrigger value="ai-lab" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase tracking-widest">AI Lab Node</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner border border-primary/5">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">Matrix Synchronization</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-primary/60 leading-none">Map national candidate IDs to institutional student identities.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Center ID</Label>
                  <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-mono font-black px-5" placeholder="e.g. S4939" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Season</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2024">2024 (Live)</SelectItem>
                      <SelectItem value="2020">2020 (Seminary Demo)</SelectItem>
                      <SelectItem value="2018">2018 (Primary Demo)</SelectItem>
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
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleFetchNectaResults} disabled={fetchingNecta} className="h-12 rounded-xl colorful-gradient font-black shadow-lg text-[10px] uppercase tracking-widest transition-transform active:scale-95">
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} Sync Matrix Node
                </Button>
              </div>

              {activeResults && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-8 rounded-[2rem] bg-muted/20 border-2 border-dashed border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left space-y-1">
                      <h3 className="font-black text-xl text-primary">{activeResults.center}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Official {examLevel} {examYear} Institutional Performance Node</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="text-center p-4 bg-white rounded-2xl shadow-sm min-w-[100px]">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">GPA/Avg</p>
                        <p className="text-lg font-black text-primary">{activeResults.stats.average}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-2xl shadow-sm min-w-[100px]">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Regional Rank</p>
                        <p className="text-lg font-black text-accent">{activeResults.stats.regionalRank}</p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow className="border-none h-14">
                          <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest">Candidate ID</TableHead>
                          <TableHead className="text-[9px] font-black uppercase tracking-widest">Sovereign Identity (Name)</TableHead>
                          <TableHead className="text-[9px] font-black uppercase tracking-widest">Subject Payload</TableHead>
                          <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Division</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeResults.candidates.map((c: any, i: number) => (
                          <TableRow key={i} className="group transition-colors border-b last:border-none hover:bg-primary/[0.02]">
                            <TableCell className="pl-10 py-6">
                              <code className="text-[10px] font-mono font-black text-primary/60 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/5">{c.id}</code>
                            </TableCell>
                            <TableCell>
                              <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{c.name}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1.5">
                                {c.subjects.split(', ').map((s: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-[8px] px-2 py-0.5 h-5 font-black uppercase border-primary/10 bg-primary/[0.02]">{s}</Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn(
                                "px-5 py-1 rounded-full text-[10px] font-black border-none shadow-sm", 
                                c.div === "I" ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-600"
                              )}>DIV {c.div || c.avg}</Badge>
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
                  <Zap className="h-6 w-6 text-accent fill-accent" /> CONTENT SYNTHESIS
                </CardTitle>
                <CardDescription className="text-[10px] font-black uppercase tracking-widest text-accent/60 leading-none">Generate Official Academic Material</CardDescription>
              </CardHeader>
              <form onSubmit={handleGenerateAiResource} className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Node</Label>
                  <Input name="subject" placeholder="e.g. Mathematics" required className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">NECTA Curriculum Topic</Label>
                  <Input name="topic" placeholder="e.g. Set Theory" required className="h-12 rounded-xl bg-muted/20 border-none shadow-inner font-bold" />
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
                        <SelectItem value="practice questions">Exam Node</SelectItem>
                        <SelectItem value="topic summary">Summary Node</SelectItem>
                        <SelectItem value="short explanation">Lesson Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isGeneratingLab} className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                  {isGeneratingLab ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Synthesize Node
                </Button>
              </form>
            </Card>

            <Card className="lg:col-span-8 border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden min-h-[500px]">
              <CardHeader className="bg-muted/30 border-b p-8 flex flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-primary border border-primary/5">
                    <FileText className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Academic Payload</CardTitle>
                </div>
                {labContent && (
                  <Button variant="outline" size="sm" className="rounded-full font-black text-[9px] uppercase px-6 h-9 hover:bg-primary hover:text-white transition-all" onClick={() => { navigator.clipboard.writeText(labContent); toast({title: "Payload Copied", description: "Academic node saved to institutional clipboard."}) }}>
                    <Copy className="mr-2 h-3 w-3" /> Copy Payload
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-10">
                {!labContent && !isGeneratingLab && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 text-muted-foreground">
                    <BookOpen className="h-16 w-16 opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Initialize Academic Lab Node to begin synthesis</p>
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
      </Tabs>
    </div>
  )
}
