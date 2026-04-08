
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
  UserCheck,
  TrendingUp
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

const institutionalMockResults = {
  center: "CENTENNIAL DORIS ACADEMY - S4939 / PS0206098",
  stats: {
    total: 267,
    average: "199.25 (PSLE) / 7.0 (FTNA)",
    districtRank: "1 / 45",
    regionalRank: "15 / 120",
    nationalRank: "221 / 10090"
  },
  candidates: [
    { id: "S4939-0001", name: "AGNES FRED KILIMA", subjects: "Civ-A, Hist-A, Geo-B, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", subjects: "Ksw-B, Eng-A, Maa-B, His-B, Sci-B", avg: "B", pts: 12, div: "B" },
    { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", subjects: "Civ-A, Hist-A, Geo-A, Kisw-A, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
    { id: "PS0206098-007", name: "DAVID ERICK MWIJAGE (STD 7)", subjects: "Ksw-A, Eng-A, Maa-A, His-A, Sci-A", avg: "A", pts: 5, div: "A" },
    { id: "S4939-0200", name: "WILBERT RWECHUNGURA MUNYAGA", subjects: "Civ-A, Hist-A, Geo-A, Kisw-B, Eng-A, Phy-A, Chem-A", avg: "A", pts: 7, div: "I" },
  ]
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [activeResults, setActiveResults] = useState<any>(null)
  
  const [centerNo, setCenterNo] = useState("S4939")
  const [examYear, setExamYear] = useState("2024")
  const [examLevel, setExamLevel] = useState("FTNA")

  const [isGeneratingLab, setIsGeneratingLab] = useState(false)
  const [labContent, setLabContent] = useState<string | null>(null)

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    setTimeout(() => {
      setActiveResults(institutionalMockResults)
      toast({ title: "Matrix Synchronized", description: "Fetched 267 institutional records." })
      setFetchingNecta(false)
    }, 1200)
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
      toast({ title: "Synthesis Ready", description: "Educational node generated." })
    } catch (err) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Check Genkit node." })
    } finally {
      setIsGeneratingLab(false)
    }
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Globe className="h-2.5 w-2.5 mr-1.5" /> NECTA GLOBAL HUB
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Sovereign Reports</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">High-fidelity mapping of national result nodes.</p>
        </div>
        <Button variant="outline" className="rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm text-[10px] font-black uppercase">
          <Download className="mr-2 h-4 w-4" /> Download Sovereign Ledger
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 px-1">
        {[
          { label: "Active Center", value: "S4939 / PS0206098", sub: "Unified Node", icon: ShieldCheck, color: "text-primary" },
          { label: "Regional Rank", value: "15 / 120", sub: "Top Tier", icon: TrendingUp, color: "text-green-600" },
          { label: "AI Prediction", value: "Optimal", sub: "DIV I Trend", icon: Zap, color: "text-accent" },
          { label: "Sync Status", value: "Online", sub: "National Grid", icon: Globe, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden group">
             <CardContent className="p-5 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest truncate">{stat.label}</p>
                  <p className={cn("text-lg font-black mt-1 truncate", stat.color)}>{stat.value}</p>
                  <p className="text-[8px] text-muted-foreground font-bold uppercase">{stat.sub}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform shrink-0 ml-2">
                  <stat.icon className="h-5 w-5" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1 border border-muted/50 px-1">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase">Online Inquiry</TabsTrigger>
          <TabsTrigger value="ai-lab" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase">AI Content Lab</TabsTrigger>
          <TabsTrigger value="archives" className="rounded-xl font-black py-2.5 px-6 text-[10px] uppercase">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6 px-1">
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/5 shadow-inner">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black uppercase">Matrix Synchronization</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase text-primary/60">Map national candidates to active student identities.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Center ID</Label>
                  <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="h-12 rounded-xl bg-muted/20 border-none font-mono font-black" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Academic Tier</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="PSLE">Primary (PSLE)</SelectItem>
                      <SelectItem value="FTNA">Form Two (FTNA)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Exam Season</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2024">2024 Cycle</SelectItem>
                      <SelectItem value="2020">2020 Archive</SelectItem>
                      <SelectItem value="2018">2018 Archive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleFetchNectaResults} disabled={fetchingNecta} className="h-12 rounded-xl colorful-gradient font-black shadow-lg text-[10px] uppercase">
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} Sync Matrix Node
                </Button>
              </div>

              {activeResults && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-8 rounded-[2rem] bg-muted/20 border-2 border-dashed border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="font-black text-xl text-primary uppercase">{activeResults.center}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-widest">Unified Academic Performance Node</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center p-4 bg-white rounded-2xl shadow-sm min-w-[100px]">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">GPA/Avg</p>
                        <p className="text-lg font-black text-primary">{activeResults.stats.average}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-2xl shadow-sm min-w-[100px]">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">National Rank</p>
                        <p className="text-lg font-black text-accent">{activeResults.stats.nationalRank}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border-none shadow-2xl bg-white overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow className="border-none h-14">
                          <TableHead className="pl-10 text-[9px] font-black uppercase">Candidate Node</TableHead>
                          <TableHead className="text-[9px] font-black uppercase">Sovereign Identity</TableHead>
                          <TableHead className="text-[9px] font-black uppercase">Matrix Result</TableHead>
                          <TableHead className="text-center text-[9px] font-black uppercase">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeResults.candidates.map((c: any, i: number) => (
                          <TableRow key={i} className="group border-b last:border-none hover:bg-primary/[0.02]">
                            <TableCell className="pl-10 py-6">
                              <code className="text-[10px] font-mono font-black text-primary/60 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/5">{c.id}</code>
                            </TableCell>
                            <TableCell>
                              <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{c.name}</span>
                            </TableCell>
                            <TableCell className="max-w-[300px]">
                              <span className="text-[10px] font-bold text-muted-foreground truncate block uppercase">{c.subjects}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn(
                                "px-5 py-1 rounded-full text-[10px] font-black border-none",
                                c.div === "I" || c.div === "A" ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-600"
                              )}>DIV {c.div}</Badge>
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

        <TabsContent value="ai-lab" className="space-y-6 px-1">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-4 border-none shadow-xl bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden h-fit">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-8">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <Zap className="h-6 w-6 text-accent fill-accent" /> CONTENT LAB
                </CardTitle>
                <CardDescription className="text-[10px] font-black uppercase text-accent/60">Generate Academic Materials</CardDescription>
              </CardHeader>
              <form onSubmit={handleGenerateAiResource} className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Subject Node</Label>
                  <Input name="subject" placeholder="e.g. Mathematics" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Topic</Label>
                  <Input name="topic" placeholder="e.g. Photosynthesis" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Level</Label>
                    <Select name="level" defaultValue="Form 2">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Standard 7">Standard 7</SelectItem>
                        <SelectItem value="Form 2">Form 2</SelectItem>
                        <SelectItem value="Form 4">Form 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Resource</Label>
                    <Select name="type" defaultValue="topic summary">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="topic summary">Summary</SelectItem>
                        <SelectItem value="practice questions">Quiz</SelectItem>
                        <SelectItem value="short explanation">Lesson Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isGeneratingLab} className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">
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
                  <CardTitle className="text-lg font-black uppercase">Academic Payload</CardTitle>
                </div>
                {labContent && (
                  <Button variant="outline" size="sm" className="rounded-full font-black text-[9px] uppercase px-6 h-9 hover:bg-primary hover:text-white transition-all" onClick={() => { navigator.clipboard.writeText(labContent); toast({title: "Payload Copied"}) }}>
                    <Copy className="mr-2 h-3 w-3" /> Copy Payload
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-10">
                {!labContent && !isGeneratingLab && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 text-muted-foreground">
                    <BookOpen className="h-16 w-16 opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Ready for Synthesis</p>
                  </div>
                )}
                {isGeneratingLab && (
                  <div className="space-y-6">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
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

        <TabsContent value="archives" className="px-1">
          <div className="p-20 text-center space-y-6 rounded-[3rem] bg-primary/5 border-2 border-dashed border-primary/10">
            <Database className="h-16 w-16 text-primary/20 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-black text-primary uppercase">Institutional Archive Node</h3>
              <p className="text-sm font-medium text-muted-foreground max-w-md mx-auto">Access legacy NECTA matrices from the 2018-2023 cycles for longitudinal benchmarking.</p>
            </div>
            <Button variant="outline" className="rounded-full h-12 border-primary/20 text-primary font-black uppercase px-8">Connect to National Archives</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
