
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
  Filter,
  ArrowRight
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

// Professional NECTA Result Mock Data (Realistic 2024-2026 Structure)
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
  "FTSEE": {
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
  const [examYear, setExamYear] = useState("2026")
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
    
    // Simulate real-time synchronization with NECTA PReMS
    setTimeout(() => {
      const resultData = nectaMockResultsByLevel[examLevel] || nectaMockResultsByLevel["CSEE"]
      setNectaResults(resultData)
      setFetchingNecta(false)
      toast({
        title: "PReMS Sync Successful",
        description: `Official ${examLevel} results for Center ${centerNo} (${examYear}) retrieved.`,
      })
    }, 2500)
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
      toast({ title: "Resource Generated", description: "The content is ready for review." })
    } catch (err) {
      toast({ title: "Generation Failed", description: "AI service is currently busy.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Institutional Insights</h1>
          <p className="text-muted-foreground text-sm font-medium">Official NECTA compliance & Gemini AI resource generation.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm hover:bg-primary/5">
            <Globe className="mr-2 h-4 w-4" /> Connect PReMS
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient shadow-lg">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export NECTA CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/40 p-1.5 rounded-2xl w-full sm:w-fit overflow-x-auto flex h-auto gap-1">
          <TabsTrigger value="necta-explorer" className="rounded-xl font-bold py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">NECTA Explorer</TabsTrigger>
          <TabsTrigger value="ai-generator" className="rounded-xl font-bold py-2.5 px-6 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" /> AI Lab
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl font-bold py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Archived Results</TabsTrigger>
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
                    <CardTitle className="text-xl">PReMS Result Retriever</CardTitle>
                    <CardDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Official link to NECTA Primary/Secondary Databases</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="font-bold border-green-200 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2" /> PReMS LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Center ID</Label>
                  <Input 
                    value={centerNo} 
                    onChange={(e) => setCenterNo(e.target.value)} 
                    placeholder="e.g. S.1234" 
                    className="h-12 rounded-2xl bg-muted/20 border-none shadow-inner font-mono font-bold text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Cycle Year</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-none shadow-inner font-bold text-base">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="2026">2026 (Active)</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Examination</Label>
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
                  Fetch NECTA Data
                </Button>
              </div>

              {nectaResults ? (
                <div className="space-y-8 pt-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">Overall Pass Rate</p>
                      <p className="text-4xl font-black text-primary">{nectaResults.summary.passRate}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-green-50 border border-green-100 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-green-700 tracking-widest mb-2">Division I Count</p>
                      <p className="text-4xl font-black text-green-800">{nectaResults.summary.divisionI}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-muted/20 border border-transparent flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">Division II Count</p>
                      <p className="text-4xl font-black text-foreground/80">{nectaResults.summary.divisionII}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                      <p className="text-[10px] uppercase font-black text-orange-700 tracking-widest mb-2">Institution GPA</p>
                      <p className="text-4xl font-black text-orange-800">{nectaResults.summary.gpa}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-12 lg:col-span-8">
                      <Card className="border-none shadow-sm bg-white/50 h-full overflow-hidden">
                        <CardHeader className="pb-4 bg-muted/20 border-b">
                          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" /> Top Candidates Matrix ({examLevel})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow className="hover:bg-transparent border-none bg-muted/5">
                                <TableHead className="pl-6">Candidate Name</TableHead>
                                <TableHead className="text-center">Points</TableHead>
                                <TableHead className="text-center">Division</TableHead>
                                <TableHead className="hidden md:table-cell">Subject Grades</TableHead>
                                <TableHead className="text-right pr-6">Portal View</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {nectaResults.topStudents.map((student: any, i: number) => (
                                <TableRow key={i} className="group hover:bg-white transition-colors">
                                  <TableCell className="pl-6">
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-black text-xs">
                                        {i + 1}
                                      </div>
                                      <span className="font-bold text-sm">{student.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center font-mono font-bold">{student.points}</TableCell>
                                  <TableCell className="text-center">
                                    <Badge className={cn(
                                      "px-3 py-1 rounded-full text-[10px] font-black border-none",
                                      student.division === "I" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                                    )}>
                                      DIV {student.division}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell text-xs font-mono text-muted-foreground">{student.grades}</TableCell>
                                  <TableCell className="text-right pr-6">
                                    <Button variant="ghost" size="sm" className="rounded-full h-8 text-[10px] font-bold text-primary hover:bg-primary/5">
                                      Full Script <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="md:col-span-12 lg:col-span-4">
                      <Card className="border-none shadow-sm bg-primary text-primary-foreground h-full flex flex-col items-center justify-center p-10 text-center relative overflow-hidden group min-h-[400px]">
                        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                          <TrendingUp className="h-48 w-48" />
                        </div>
                        <div className="h-20 w-20 rounded-[2.5rem] bg-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center mb-6">
                          <BarChart className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">Academic Momentum</h3>
                        <p className="text-sm text-white/70 font-medium mt-3 max-w-[240px] leading-relaxed">
                          Your institution has observed a 6.5% performance surge compared to the {parseInt(examYear) - 1} cycle. 
                        </p>
                        <Button size="lg" variant="secondary" className="mt-8 rounded-full font-black h-12 px-8 bg-white text-primary hover:bg-white/90 shadow-xl">
                          Full 2024-2026 Audit
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-[2.5rem] bg-muted/5 border-muted-foreground/10">
                   <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                     <AlertCircle className="h-8 w-8 text-muted-foreground" />
                   </div>
                   <h3 className="text-lg font-bold text-muted-foreground">No Result Data Retrieved</h3>
                   <p className="text-sm text-muted-foreground/60 max-w-sm mt-2 font-medium">
                     Enter your Center Number and choose an examination level to link with NECTA PReMS databases.
                   </p>
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
                  <CardTitle className="text-xl">Gemini AI Lab</CardTitle>
                  <CardDescription className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Official NECTA Resource Generator</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject Area</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Curriculum Topic</Label>
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
                    <SelectItem value="A-Level Form 6">Form 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Output Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger className="rounded-2xl h-12 bg-muted/20 border-none font-bold text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="practice questions">Practice Questions</SelectItem>
                    <SelectItem value="topic summary">Topic Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full rounded-2xl h-14 colorful-gradient font-black shadow-xl text-lg group">
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />}
                Generate Official Resource
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col bg-muted/10 border-2 border-dashed border-muted-foreground/10 min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/20 py-4 px-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">AI Intelligence Preview</CardTitle>
              {resourceOutput && (
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white shadow-sm"><Copy className="h-4 w-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white shadow-sm"><Download className="h-4 w-4" /></Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6 md:p-10">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 h-full min-h-[400px] whitespace-pre-wrap text-base leading-relaxed shadow-inner border border-muted/50 font-medium text-foreground/90 italic">
                {resourceOutput || "Configure curriculum parameters to generate NECTA-aligned study materials using Gemini 2.5 Intelligence."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
           <div className="p-20 text-center border-2 border-dashed rounded-[3rem] bg-muted/5 border-muted-foreground/10">
              <History className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Institutional History (Pre-2023)</h3>
              <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mt-2">
                Archives from previous NECTA cycles are currently being indexed from the physical ledger scans.
              </p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
