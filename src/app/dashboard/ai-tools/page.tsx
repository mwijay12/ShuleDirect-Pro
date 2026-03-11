
"use client"

import * as React from "react"
import { useState } from "react"
import { createLearningResource } from "@/ai/flows/create-learning-resource-flow"
import { generateStudentProgressSummary } from "@/ai/flows/generate-student-progress-summary-flow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, BookOpen, UserCheck, Loader2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function AiToolsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [resourceOutput, setResourceOutput] = useState("")
  const [summaryOutput, setSummaryOutput] = useState("")

  // Form states for resource
  const [subject, setSubject] = useState("Mathematics")
  const [topic, setTopic] = useState("Algebraic Expressions")
  const [level, setLevel] = useState("O-Level Form 3")
  const [type, setType] = useState<"practice questions" | "topic summary" | "short explanation">("practice questions")

  // Form states for summary
  const [studentName, setStudentName] = useState("Amani Mwamba")
  const [performanceJson, setPerformanceJson] = useState(`[
  {"subject": "Mathematics", "grade": "A", "comment": "Excellent problem solver"},
  {"subject": "Physics", "grade": "B", "comment": "Improving in lab work"}
]`)
  const [attendance, setAttendance] = useState("98% Attendance, always punctual.")
  const [behavior, setBehavior] = useState("Highly disciplined, helps others.")

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
      toast({ title: "Resource Generated!", description: "AI has successfully created your learning material." })
    } catch (err) {
      toast({ title: "Generation Failed", description: "Something went wrong. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSummary = async () => {
    setLoading(true)
    try {
      const performance = JSON.parse(performanceJson)
      const result = await generateStudentProgressSummary({
        studentName,
        academicPerformance: performance,
        attendanceSummary: attendance,
        behavioralNotes: behavior
      })
      setSummaryOutput(result.summary)
      toast({ title: "Summary Ready!", description: "Student progress report has been compiled." })
    } catch (err) {
      toast({ title: "Error", description: "Invalid input or processing error.", variant: "destructive" })
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
          AI Academic Hub <Sparkles className="h-6 w-6 text-accent fill-accent/20" />
        </h1>
        <p className="text-muted-foreground">Utilize Gemini-powered tools for NECTA-compliant academic support.</p>
      </div>

      <Tabs defaultValue="resource" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="resource" className="gap-2">
            <BookOpen className="h-4 w-4" /> Learning Resources
          </TabsTrigger>
          <TabsTrigger value="summary" className="gap-2">
            <UserCheck className="h-4 w-4" /> Progress Summaries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resource" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Resource Generator</CardTitle>
              <CardDescription>Create tailored materials based on NECTA topics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Kiswahili">Kiswahili</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Curriculum Topic</Label>
                <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Academic Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O-Level Form 1">Form 1</SelectItem>
                      <SelectItem value="O-Level Form 3">Form 3</SelectItem>
                      <SelectItem value="O-Level Form 4">Form 4 (CSEE)</SelectItem>
                      <SelectItem value="A-Level Form 6">Form 6 (ACSEE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Resource Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="practice questions">Practice Questions</SelectItem>
                      <SelectItem value="topic summary">Topic Summary</SelectItem>
                      <SelectItem value="short explanation">Short Explanation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleCreateResource} disabled={loading} className="w-full font-bold">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>AI Output</CardTitle>
              {resourceOutput && (
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(resourceOutput)}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="rounded-xl bg-muted/30 p-4 h-full min-h-[400px] whitespace-pre-wrap text-sm border border-dashed border-muted-foreground/20">
                {resourceOutput || "Your generated resource will appear here..."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Report Summarizer</CardTitle>
              <CardDescription>Convert grades and notes into a natural language report.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Academic Data (JSON Array)</Label>
                <Textarea 
                  value={performanceJson} 
                  onChange={(e) => setPerformanceJson(e.target.value)}
                  className="font-mono text-xs h-24" 
                />
              </div>
              <div className="space-y-2">
                <Label>Attendance Summary</Label>
                <Input value={attendance} onChange={(e) => setAttendance(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Behavioral Notes</Label>
                <Input value={behavior} onChange={(e) => setBehavior(e.target.value)} />
              </div>
              <Button onClick={handleCreateSummary} disabled={loading} className="w-full font-bold" variant="secondary">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCheck className="mr-2 h-4 w-4" />}
                Generate Progress Summary
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Professional Summary</CardTitle>
              {summaryOutput && (
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(summaryOutput)}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="rounded-xl bg-muted/30 p-6 h-full min-h-[400px] text-sm leading-relaxed border border-dashed border-muted-foreground/20 italic">
                {summaryOutput || "Generated parent-teacher summary will appear here..."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
