
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
  Link as LinkIcon
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
import { createLearningResource } from "@/ai/flows/create-learning-resource-flow"
import { cn } from "@/lib/utils"

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
    summary: { gpa: "2.1", divisionI: 18, divisionII: 22, divisionIII: 10, divisionIV: 5, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Amani Mwamba", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Careen Mushi", points: 8, division: "I", grades: "A,A,A,A,A,A,B" },
      { name: "Emanuel Lema", points: 9, division: "I", grades: "A,A,A,A,A,B,B" },
      { name: "Baraka Juma", points: 11, division: "I", grades: "A,A,B,B,B,B,B" },
    ]
  },
  "FTNA": {
    summary: { gpa: "1.8", divisionI: 25, divisionII: 15, divisionIII: 5, divisionIV: 2, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Neema Peter", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Said Bakari", points: 7, division: "I", grades: "A,A,A,A,A,A,A" },
      { name: "Jane Doe", points: 9, division: "I", grades: "A,A,A,A,A,B,B" },
    ]
  },
  "ACSEE": {
    summary: { gpa: "2.4", divisionI: 12, divisionII: 18, divisionIII: 20, divisionIV: 4, division0: 1, passRate: "98.2%" },
    topStudents: [
      { name: "Richard Mrema", points: 3, division: "I", grades: "A,A,A" },
      { name: "Sarah John", points: 4, division: "I", grades: "A,A,B" },
      { name: "Kelvin Peter", points: 6, division: "I", grades: "A,B,B" },
    ]
  }
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [nectaResults, setNectaResults] = useState<any>(null)
  const [centerNo, setCenterNo] = useState("S.1234")
  const [examYear, setExamYear] = useState("2024")
  const [examLevel, setExamLevel] = useState("CSEE")

  // AI Tool states
  const [subject, setSubject] = useState("Mathematics")
  const [topic, setTopic] = useState("Calculus")
  const [level, setLevel] = useState("O-Level Form 3")
  const [type, setType] = useState<"practice questions" | "topic summary" | "short explanation">("practice questions")
  const [resourceOutput, setResourceOutput] = useState("")

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    setNectaResults(null)
    
    setTimeout(() => {
      const resultData = nectaMockResultsByLevel[examLevel] || nectaMockResultsByLevel["CSEE"]
      setNectaResults(resultData)
      setFetchingNecta(false)
      toast({
        title: "Sync Successful",
        description: `Official records retrieved for ${examLevel} ${examYear}.`,
      })
    }, 1500)
  }

  const handleCreateResource = async () => {
    setLoading(true)
    try {
      const result = await createLearningResource({
        subject,
        nectaCurriculumTopic: topic,
        studentAcademicLevel: level,
        resourceType: type
      })
      setResourceOutput(result.resourceContent)
      toast({ title: "Resource Generated", description: "Content ready for review." })
    } catch (err) {
      toast({ title: "AI Error", description: "Service temporarily busy.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const officialUrl = getNectaUrl(examLevel, examYear)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight">Compliance & Reports</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">NECTA sync, Exam Portals & AI Content Lab.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-10 border-primary/20 text-primary bg-white shadow-sm text-xs" asChild>
            <a href={officialUrl} target="_blank" rel="noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Official Portal
            </a>
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-10 colorful-gradient shadow-lg text-xs">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-bold py-2 px-4 sm:px-6 text-xs sm:text-sm">Results Hub</TabsTrigger>
          <TabsTrigger value="ai-generator" className="rounded-xl font-bold py-2 px-4 sm:px-6 text-xs sm:text-sm gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> AI Lab
          </TabsTrigger>
          <TabsTrigger value="portals" className="rounded-xl font-bold py-2 px-4 sm:px-6 text-xs sm:text-sm">NECTA Portals</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10 py-4 sm:py-6 px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <Database className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-black">NECTA Data Retrieval</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Access official national examination scores</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="font-bold border-green-200 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[9px] sm:text-[10px]">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" /> DATABASE LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Center ID</Label>
                  <Input 
                    value={centerNo} 
                    onChange={(e) => setCenterNo(e.target.value)} 
                    placeholder="S.1234" 
                    className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-mono font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cycle Year</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-bold text-sm">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Examination</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-bold text-sm">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="FTNA">Form Two (FTNA)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                      <SelectItem value="ACSEE">Form Six (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleFetchNectaResults} 
                  disabled={fetchingNecta} 
                  className="h-11 rounded-xl colorful-gradient font-black shadow-lg text-sm group"
                >
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />}
                  Retrieve Results
                </Button>
              </div>

              {nectaResults && (
                <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 sm:p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center">
                      <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest mb-1">Pass Rate</p>
                      <p className="text-xl sm:text-2xl font-black text-primary">{nectaResults.summary.passRate}</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center text-center">
                      <p className="text-[8px] uppercase font-black text-green-700 tracking-widest mb-1">Division I</p>
                      <p className="text-xl sm:text-2xl font-black text-green-800">{nectaResults.summary.divisionI}</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/20 border border-transparent flex flex-col items-center text-center">
                      <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest mb-1">Division II</p>
                      <p className="text-xl sm:text-2xl font-black text-foreground/80">{nectaResults.summary.divisionII}</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                      <p className="text-[8px] uppercase font-black text-orange-700 tracking-widest mb-1">Center GPA</p>
                      <p className="text-xl sm:text-2xl font-black text-orange-800">{nectaResults.summary.gpa}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-primary/20 p-4 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                           <LinkIcon className="h-4 w-4" />
                        </div>
                        <div className="text-center sm:text-left">
                           <p className="text-xs font-bold text-primary">Live NECTA Link Generated</p>
                           <p className="text-[10px] text-muted-foreground">Access full list on official government server.</p>
                        </div>
                     </div>
                     <Button variant="default" size="sm" className="rounded-full px-6 font-bold text-[11px] h-9" asChild>
                       <a href={officialUrl} target="_blank" rel="noreferrer">Open Official Portal <ExternalLink className="ml-2 h-3 w-3" /></a>
                     </Button>
                  </div>

                  <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-none">
                          <TableHead className="pl-4 sm:pl-6 text-[10px] uppercase font-black tracking-widest">Candidate</TableHead>
                          <TableHead className="text-center text-[10px] uppercase font-black tracking-widest">Pts</TableHead>
                          <TableHead className="text-center text-[10px] uppercase font-black tracking-widest">Div</TableHead>
                          <TableHead className="hidden md:table-cell text-[10px] uppercase font-black tracking-widest">Grades</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {nectaResults.topStudents.map((student: any, i: number) => (
                          <TableRow key={i} className="group transition-colors border-b last:border-none">
                            <TableCell className="pl-4 sm:pl-6">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-black text-[10px]">
                                  {i + 1}
                                </div>
                                <span className="font-bold text-xs sm:text-sm whitespace-nowrap">{student.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-mono font-bold text-xs sm:text-sm">{student.points}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn(
                                "px-2 py-0 h-5 rounded-full text-[9px] font-black border-none",
                                student.division === "I" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                              )}>
                                DIV {student.division}
                              </Badge>
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

        <TabsContent value="ai-generator" className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="py-4 px-6 sm:py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl font-black">AI Content Lab</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Generate NECTA-aligned study materials</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Subject Area</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-none font-bold text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Topic</Label>
                  <Input value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-xl h-11 bg-muted/20 border-none font-bold text-xs" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-none font-bold text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="O-Level Form 3">Form 3</SelectItem>
                    <SelectItem value="O-Level Form 4">Form 4</SelectItem>
                    <SelectItem value="A-Level Form 6">Form 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Resource Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-none font-bold text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="practice questions">Practice Questions</SelectItem>
                    <SelectItem value="topic summary">Topic Summary</SelectItem>
                    <SelectItem value="short explanation">Short Explanation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full rounded-xl h-12 colorful-gradient font-black shadow-lg group">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />}
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm min-h-[400px] flex flex-col bg-muted/10 border-2 border-dashed border-muted-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6 bg-muted/20">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">AI Intelligence Preview</CardTitle>
              {resourceOutput && (
                <div className="flex gap-1">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white shadow-sm"><Copy className="h-3.5 w-3.5" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white shadow-sm"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-4 sm:p-8">
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 h-full min-h-[300px] whitespace-pre-wrap text-xs sm:text-sm leading-relaxed shadow-inner border border-muted/50 font-medium text-foreground/90 italic">
                {resourceOutput || "Configure parameters to generate high-quality, NECTA-aligned learning materials using Gemini 2.5."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portals" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              name: "CSEE 2024 Results", 
              url: "https://onlinesys.necta.go.tz/results/2024/csee/index.htm", 
              desc: "Official Certificate of Secondary Education results for 2024.",
              color: "text-blue-600",
              bg: "bg-blue-50"
            },
            { 
              name: "CSEE 2025 Portal", 
              url: "https://matokeo.necta.go.tz/results/2025/csee/index.html", 
              desc: "Primary results gateway for the 2025 CSEE cycle.",
              color: "text-green-600",
              bg: "bg-green-50"
            },
            { 
              name: "FTNA 2025 Results", 
              url: "https://onlinesys.necta.go.tz/results/2025/ftna/ftna.html", 
              desc: "Form Two National Assessment official results portal.",
              color: "text-purple-600",
              bg: "bg-purple-50"
            },
            { 
              name: "ACSEE 2025 Results", 
              url: "https://onlinesys.necta.go.tz/results/2025/acsee/index.html", 
              desc: "Advanced Certificate results for Form Six candidates.",
              color: "text-orange-600",
              bg: "bg-orange-50"
            },
            { 
              name: "NECTA Archive 2023", 
              url: "https://onlinesys.necta.go.tz/results/2023/csee/index.htm", 
              desc: "Historical records for the 2023 examination cycle.",
              color: "text-muted-foreground",
              bg: "bg-muted/50"
            },
          ].map((portal) => (
            <Card key={portal.name} className="border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer overflow-hidden" onClick={() => window.open(portal.url, '_blank')}>
              <div className={cn("h-1 w-full", portal.bg.replace('50', '500').replace('muted/50', 'muted-foreground'))} />
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-black flex items-center justify-between">
                  {portal.name}
                  <ExternalLink className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-[10px] leading-relaxed">{portal.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge variant="secondary" className="text-[8px] font-black uppercase bg-muted/30">Official Portal</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
