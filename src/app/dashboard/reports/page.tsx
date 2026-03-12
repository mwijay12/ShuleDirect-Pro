
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
  BrainCircuit
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createLearningResource } from "@/ai/flows/create-learning-resource-flow"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"

const recentReports = [
  { id: "REP-01", name: "Form 4 NECTA Registration (CSEE)", date: "2024-05-10", type: "XML/CSV", status: "Verified" },
  { id: "REP-02", name: "Mock Examination Statistics - Term 1", date: "2024-05-08", type: "PDF", status: "Generated" },
  { id: "REP-03", name: "Student Attendance Quarterly Summary", date: "2024-05-05", type: "Excel", status: "Verified" },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [resourceOutput, setResourceOutput] = useState("")

  // AI Tool states
  const [subject, setSubject] = useState("Mathematics")
  const [topic, setTopic] = useState("Algebraic Expressions")
  const [level, setLevel] = useState("O-Level Form 3")
  const [type, setType] = useState<"practice questions" | "topic summary" | "short explanation">("practice questions")

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-primary">Insights & Reports</h1>
          <p className="text-muted-foreground">Compliance reporting merged with Gemini AI intelligence.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            <BarChart className="mr-2 h-4 w-4" /> Global Analytics
          </Button>
          <Button className="rounded-full colorful-gradient">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export NECTA XML
          </Button>
        </div>
      </div>

      <Tabs defaultValue="compliance" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="compliance" className="rounded-lg">Official Compliance</TabsTrigger>
          <TabsTrigger value="ai-generator" className="rounded-lg gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> AI Content Lab
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">Export History</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardHeader>
                <div className="p-3 w-fit rounded-2xl bg-primary/10 mb-2 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">CSEE NECTA</CardTitle>
                <CardDescription>Form 4 Registration Data</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="sm" className="w-full rounded-full">Prepare XML</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardHeader>
                <div className="p-3 w-fit rounded-2xl bg-accent/10 mb-2 group-hover:scale-110 transition-transform">
                  <PieChart className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">ACSEE NECTA</CardTitle>
                <CardDescription>Form 6 Performance Matrix</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="sm" className="w-full rounded-full">View ACSEE</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardHeader>
                <div className="p-3 w-fit rounded-2xl bg-orange-100 mb-2 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Financial Audit</CardTitle>
                <CardDescription>ClickPesa Reconciliation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="sm" className="w-full rounded-full">Audit Logs</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-generator" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Resource Generator
              </CardTitle>
              <CardDescription>AI-crafted NECTA materials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="rounded-lg"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Input value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-lg" />
                </div>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full rounded-full colorful-gradient">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">AI Draft Output</CardTitle>
              {resourceOutput && (
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(resourceOutput)}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="rounded-2xl bg-white p-6 h-full min-h-[300px] whitespace-pre-wrap text-sm border border-dashed border-muted-foreground/20 leading-relaxed shadow-inner">
                {resourceOutput || "Select criteria and generate to see AI magic..."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-bold">{report.name}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{report.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-bold rounded-full">{report.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
