
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

const nectaMockResults = {
  summary: {
    gpa: "2.4",
    divisionI: 12,
    divisionII: 24,
    divisionIII: 15,
    divisionIV: 8,
    division0: 1,
    passRate: "98.2%"
  },
  topStudents: [
    { name: "Amani Mwamba", points: 7, division: "I" },
    { name: "Careen Mushi", points: 8, division: "I" },
    { name: "Emanuel Lema", points: 9, division: "I" },
  ]
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fetchingNecta, setFetchingNecta] = useState(false)
  const [nectaResults, setNectaResults] = useState<any>(null)
  const [centerNo, setCenterNo] = useState("S.1234")
  const [examYear, setExamYear] = useState("2023")
  const [examLevel, setExamLevel] = useState("CSEE")

  // AI Tool states
  const [subject, setSubject] = useState("Mathematics")
  const [topic, setTopic] = useState("Algebraic Expressions")
  const [level, setLevel] = useState("O-Level Form 3")
  const [type, setType] = useState<"practice questions" | "topic summary" | "short explanation">("practice questions")
  const [resourceOutput, setResourceOutput] = useState("")

  const handleFetchNectaResults = () => {
    setFetchingNecta(true)
    // Simulate API call to NECTA servers
    setTimeout(() => {
      setNectaResults(nectaMockResults)
      setFetchingNecta(false)
      toast({
        title: "NECTA Data Synchronized",
        description: `Results for ${centerNo} (${examYear}) successfully retrieved.`,
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
      toast({ title: "Resource Generated!", description: "AI content is ready for review." })
    } catch (err) {
      toast({ title: "Generation Failed", description: "Something went wrong.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">Insights & Reports</h1>
          <p className="text-muted-foreground text-sm">Official NECTA compliance merged with Gemini AI intelligence.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary">
            <Globe className="mr-2 h-4 w-4" /> Portal Sync
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient shadow-lg">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export XML
          </Button>
        </div>
      </div>

      <Tabs defaultValue="necta-explorer" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full sm:w-fit overflow-x-auto flex h-auto">
          <TabsTrigger value="necta-explorer" className="rounded-lg font-bold py-2 flex-1 sm:flex-none">NECTA Explorer</TabsTrigger>
          <TabsTrigger value="ai-generator" className="rounded-lg font-bold py-2 flex-1 sm:flex-none gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> AI Lab
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-lg font-bold py-2 flex-1 sm:flex-none">Compliance</TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg font-bold py-2 flex-1 sm:flex-none">History</TabsTrigger>
        </TabsList>

        <TabsContent value="necta-explorer" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-card/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-inner">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">NECTA Result Retrieval</CardTitle>
                    <CardDescription className="text-xs">Fetch official historical results from NECTA database.</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="font-bold border-green-200 bg-green-50 text-green-700">
                  <TrendingUp className="mr-1 h-3 w-3" /> LIVE CONNECTION
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Center Number</Label>
                  <Input 
                    value={centerNo} 
                    onChange={(e) => setCenterNo(e.target.value)} 
                    placeholder="e.g. S.1234" 
                    className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-mono font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Exam Year</Label>
                  <Select value={examYear} onValueChange={setExamYear}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-bold">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Exam Level</Label>
                  <Select value={examLevel} onValueChange={setExamLevel}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-none shadow-inner font-bold">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FTSEE">Form Two (FTSEE)</SelectItem>
                      <SelectItem value="CSEE">Form Four (CSEE)</SelectItem>
                      <SelectItem value="ACSEE">Form Six (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleFetchNectaResults} 
                  disabled={fetchingNecta} 
                  className="h-11 rounded-xl colorful-gradient font-bold shadow-lg"
                >
                  {fetchingNecta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Search Results
                </Button>
              </div>

              {nectaResults && (
                <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 rounded-3xl bg-primary/5 text-center border border-primary/10">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Pass Rate</p>
                      <p className="text-2xl font-black text-primary">{nectaResults.summary.passRate}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-green-50 text-center border border-green-100">
                      <p className="text-[10px] uppercase font-bold text-green-700 tracking-widest mb-1">Div I</p>
                      <p className="text-2xl font-black text-green-800">{nectaResults.summary.divisionI}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-muted/20 text-center border border-transparent">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Div II</p>
                      <p className="text-2xl font-black text-muted-foreground">{nectaResults.summary.divisionII}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-orange-50 text-center border border-orange-100">
                      <p className="text-[10px] uppercase font-bold text-orange-700 tracking-widest mb-1">Avg GPA</p>
                      <p className="text-2xl font-black text-orange-800">{nectaResults.summary.gpa}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm bg-white/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" /> Top Performers ({examLevel})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {nectaResults.topStudents.map((student: any, i: number) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-white border border-muted hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
                                {i + 1}
                              </div>
                              <span className="font-bold text-sm">{student.name}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-none font-black text-[10px]">
                              {student.points} PTS • DIV {student.division}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-primary/5 flex flex-col items-center justify-center p-8 text-center border border-primary/10">
                      <div className="h-14 w-14 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-4">
                        <TrendingUp className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-black text-primary">Performance Trend</h3>
                      <p className="text-xs text-muted-foreground font-medium mt-2 max-w-[200px]">
                        Results improved by 4.2% compared to {parseInt(examYear) - 1}.
                      </p>
                      <Button size="sm" variant="outline" className="mt-6 rounded-full font-bold h-10 px-6 bg-white border-primary/10">
                        View Detailed Comparison
                      </Button>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generator" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-accent" /> Resource Generator
              </CardTitle>
              <CardDescription className="text-xs">AI-crafted materials aligned with NECTA standards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-none"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Topic</Label>
                  <Input value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-xl h-11 bg-muted/20 border-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-none"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O-Level Form 3">Form 3</SelectItem>
                    <SelectItem value="O-Level Form 4">Form 4</SelectItem>
                    <SelectItem value="A-Level Form 5">Form 5</SelectItem>
                    <SelectItem value="A-Level Form 6">Form 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full rounded-full h-12 colorful-gradient font-black shadow-lg">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col bg-muted/10 border-2 border-dashed border-muted-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/20">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">AI Draft Output</CardTitle>
              {resourceOutput && (
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Copy className="h-4 w-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Download className="h-4 w-4" /></Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6">
              <div className="bg-white rounded-2xl p-6 h-full min-h-[300px] whitespace-pre-wrap text-sm leading-relaxed shadow-inner">
                {resourceOutput || "Define your subject and topic above to generate official NECTA-ready learning resources."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "CSEE NECTA", desc: "Form 4 Registration Data", icon: FileText, color: "text-primary", bg: "bg-primary/5" },
              { title: "ACSEE NECTA", desc: "Form 6 Performance Matrix", icon: PieChart, color: "text-accent", bg: "bg-accent/5" },
              { title: "Audit Log", desc: "ClickPesa Reconciliation", icon: BrainCircuit, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                <div className={cn("h-1.5 w-full", item.color.replace('text', 'bg'))} />
                <CardHeader>
                  <div className={cn("p-3 w-fit rounded-2xl mb-2 group-hover:scale-110 transition-transform", item.bg)}>
                    <item.icon className={cn("h-6 w-6", item.color)} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-xs">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" size="sm" className="w-full rounded-full font-bold h-9">Configure Export</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Exports</CardTitle>
                <Button variant="ghost" size="sm" className="rounded-full text-primary font-bold"><History className="mr-2 h-4 w-4" /> Full Log</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-none">
                      <TableHead className="pl-6 font-bold text-xs">Report Name</TableHead>
                      <TableHead className="font-bold text-xs">Date</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right pr-6 font-bold text-xs">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Form 4 NECTA Registration", date: "2024-05-10", status: "Verified" },
                      { name: "Mock Examination Statistics", date: "2024-05-08", status: "Generated" },
                      { name: "Attendance Summary Q1", date: "2024-05-05", status: "Verified" },
                    ].map((report, i) => (
                      <TableRow key={i} className="hover:bg-muted/10 border-none group">
                        <TableCell className="pl-6 font-bold text-sm group-hover:text-primary transition-colors">{report.name}</TableCell>
                        <TableCell className="text-muted-foreground text-xs font-mono">{report.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[9px] font-black uppercase rounded-full border-green-200 text-green-700 bg-green-50">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/5"><Download className="h-4 w-4 text-primary" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
