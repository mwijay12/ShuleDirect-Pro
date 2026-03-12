
"use client"

import * as React from "react"
import { useState } from "react"
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  BarChart, 
  PieChart, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Sparkles,
  BookOpen,
  UserCheck,
  Loader2,
  Copy,
  Check,
  BrainCircuit,
  Globe,
  History,
  TrendingUp,
  GraduationCap,
  Filter
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

// Enhanced Mock Data for 2024-2026 Results Simulation
const nectaMockResultsByLevel: Record<string, any> = {
  "CSEE": {
    summary: { gpa: "2.1", divisionI: 18, divisionII: 22, divisionIII: 10, divisionIV: 5, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Amani Mwamba", points: 7, division: "I" },
      { name: "Careen Mushi", points: 8, division: "I" },
      { name: "Emanuel Lema", points: 9, division: "I" },
      { name: "Baraka Juma", points: 11, division: "I" },
    ]
  },
  "FTSEE": {
    summary: { gpa: "1.8", divisionI: 25, divisionII: 15, divisionIII: 5, divisionIV: 2, division0: 0, passRate: "100%" },
    topStudents: [
      { name: "Neema Peter", points: 7, division: "I" },
      { name: "Said Bakari", points: 7, division: "I" },
      { name: "Jane Doe", points: 9, division: "I" },
    ]
  },
  "ACSEE": {
    summary: { gpa: "2.4", divisionI: 12, divisionII: 18, divisionIII: 20, divisionIV: 4, division0: 1, passRate: "98.2%" },
    topStudents: [
      { name: "Richard Mrema", points: 3, division: "I" },
      { name: "Sarah John", points: 4, division: "I" },
      { name: "Kelvin Peter", points: 6, division: "I" },
    ]
  }
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [nectaResults, setNectaResults] = useState<any>(null)
  const [centerNo, setCenterNo] = useState("S.1234")
  const [examYear, setExamYear] = useState("2026")
  const [examLevel, setExamLevel] = useState("CSEE")

  // AI Tool states
  const [subject, setSubject] = useState("Mathematics")
  const [topic, setTopic] = useState("Algebraic Expressions")
  const [level, setLevel] = useState("O-Level Form 3")
  const [type, setType] = useState<"practice questions" | "topic summary" | "short explanation">("practice questions")
  const [resourceOutput, setResourceOutput] = useState("")

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    setNectaResults(null)
    
    // Simulate API call to official NECTA PReMS database
    setTimeout(() => {
      const resultData = nectaMockResultsByLevel[examLevel] || nectaMockResultsByLevel["CSEE"]
      setNectaResults(resultData)
      setFetchingNecta(false)
      toast({
        title: "NECTA Data Synchronized",
        description: `Retrieved ${examLevel} results for Center ${centerNo} (${examYear}).`,
      })
    }, 2000)
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
      toast({ title: "Resource Generated!", description: "AI content is ready for review." })
    } catch (err) {
      toast({ title: "Generation Failed", description: "Something went wrong.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Insights & Reports</h1>
          <p className="text-muted-foreground text-sm font-medium">Official NECTA data retrieval & Gemini AI analysis hub.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm hover:bg-primary/5">
            <Globe className="mr-2 h-4 w-4" /> Portal Sync
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient shadow-lg">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export XML
          </Button>
        </div>
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1.5 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-bold py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">NECTA Explorer</TabsTrigger>
          <TabsTrigger value="ai-generator" className="rounded-xl font-bold py-2.5 px-6 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" /> AI Lab
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-xl font-bold py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Online Result Retrieval</CardTitle>
                    <CardDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">SECURE LINK TO NECTA PReMS DATABASE</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="font-bold border-green-200 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] animate-pulse">
                  <TrendingUp className="mr-1.5 h-3 w-3" /> DATABASE LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Center Number</Label>
                  <Input 
                    value={centerNo} 
                    onChange={(e) => setCenterNo(e.target.value)} 
                    placeholder="e.g. S.1234" 
                    className="h-12 rounded-2xl bg-muted/20 border-none shadow-inner font-mono font-bold text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Exam Year</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-none shadow-inner font-bold text-base">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="2026">2026 (Current)</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Exam Level</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-none shadow-inner font-bold text-base">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="FTSEE">Form Two (FTSEE)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                      <SelectItem value="ACSEE">Form Six (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleFetchNectaResults} 
                  disabled={fetchingNecta} 
                  className="h-12 rounded-2xl colorful-gradient font-black shadow-xl text-base group"
                >
                  {fetchingNecta ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                  Fetch NECTA Results
                </Button>
              </div>

              {nectaResults && (
                <div className="space-y-8 pt-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">Pass Rate</p>
                      <p className="text-4xl font-black text-primary">{nectaResults.summary.passRate}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-green-50 border border-green-100 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-green-700 tracking-widest mb-2">Div I Count</p>
                      <p className="text-4xl font-black text-green-800">{nectaResults.summary.divisionI}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">Div II Count</p>
                      <p className="text-4xl font-black text-foreground/80">{nectaResults.summary.divisionII}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-orange-700 tracking-widest mb-2">Avg GPA</p>
                      <p className="text-4xl font-black text-orange-800">{nectaResults.summary.gpa}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-7">
                      <Card className="border-none shadow-sm bg-white/50 h-full">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" /> Top Performers Matrix
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {nectaResults.topStudents.map((student: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white border border-muted hover:border-primary/20 transition-all group">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm shadow-inner group-hover:scale-110 transition-transform">
                                  {i + 1}
                                </div>
                                <span className="font-bold text-base text-foreground">{student.name}</span>
                              </div>
                              <Badge className="bg-green-100 text-green-700 border-none font-black text-xs px-4 py-1.5 rounded-full">
                                {student.points} PTS • DIV {student.division}
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="md:col-span-5">
                      <Card className="border-none shadow-sm bg-primary text-primary-foreground h-full flex flex-col items-center justify-center p-10 text-center relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                          <TrendingUp className="h-48 w-48" />
                        </div>
                        <div className="h-20 w-20 rounded-[2.5rem] bg-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center mb-6">
                          <BarChart className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">Academic Momentum</h3>
                        <p className="text-sm text-white/70 font-medium mt-3 max-w-[240px] leading-relaxed">
                          Overall institutional performance has surged by 6.5% since the {parseInt(examYear) - 1} cycle.
                        </p>
                        <Button size="lg" variant="secondary" className="mt-8 rounded-full font-black h-12 px-8 bg-white text-primary hover:bg-white/90 shadow-xl">
                          Full Analytics Hub
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generator" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="py-6 px-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Gemini Resource Lab</CardTitle>
                  <CardDescription className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI-POWERED NECTA MATERIAL GENERATOR</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Topic</Label>
                  <Input value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Academic Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="O-Level Form 3">Form 3</SelectItem>
                    <SelectItem value="O-Level Form 4">Form 4</SelectItem>
                    <SelectItem value="A-Level Form 5">Form 5</SelectItem>
                    <SelectItem value="A-Level Form 6">Form 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Resource Intent</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="practice questions">Practice Questions</SelectItem>
                    <SelectItem value="topic summary">Topic Summary</SelectItem>
                    <SelectItem value="short explanation">Short Explanation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full rounded-2xl h-14 colorful-gradient font-black shadow-xl text-lg group">
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />}
                Generate Learning Resource
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col bg-muted/10 border-2 border-dashed border-muted-foreground/10 min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/20 py-4 px-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">AI Output Preview</CardTitle>
              {resourceOutput && (
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white shadow-sm"><Copy className="h-4 w-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white shadow-sm"><Download className="h-4 w-4" /></Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6 md:p-10">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 h-full min-h-[400px] whitespace-pre-wrap text-base leading-relaxed shadow-inner border border-muted/50 font-medium text-foreground/90">
                {resourceOutput || "Select subject parameters to generate official NECTA-aligned study materials using Gemini 2.5 Intelligence."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {[
              { title: "CSEE NECTA", desc: "Form 4 PReMS Registration", icon: FileText, color: "text-primary", bg: "bg-primary/5" },
              { title: "ACSEE NECTA", desc: "Form 6 Performance Data", icon: PieChart, color: "text-accent", bg: "bg-accent/5" },
              { title: "Audit Log", desc: "Financial Reconciliation", icon: BrainCircuit, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-2xl transition-all group overflow-hidden rounded-[2rem]">
                <div className={cn("h-2 w-full", item.color.replace('text', 'bg'))} />
                <CardHeader className="p-8">
                  <div className={cn("p-4 w-fit rounded-[1.5rem] mb-4 group-hover:scale-110 transition-transform", item.bg)}>
                    <item.icon className={cn("h-7 w-7", item.color)} />
                  </div>
                  <CardTitle className="text-xl font-black">{item.title}</CardTitle>
                  <CardDescription className="text-xs font-bold text-muted-foreground mt-2">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="secondary" size="lg" className="w-full rounded-2xl font-black h-12 bg-muted/50 hover:bg-muted">Configure CSV Export</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
