"use client"

import * as React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search, 
  Calculator,
  FileUp,
  Loader2,
  ChevronRight,
  Database,
  RefreshCw,
  Globe,
  ScanText,
  Camera,
  BrainCircuit
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { scanExamPaper } from "@/ai/flows/scan-exam-flow"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const initialResults = [
  { id: "S001", name: "Amani Mwamba", math: 82, eng: 74, kisw: 91, phy: 68, chem: 77, geo: 85, civ: 70, division: "I", points: 9 },
  { id: "S002", name: "Baraka Juma", math: 42, eng: 51, kisw: 64, phy: 38, chem: 45, geo: 50, civ: 55, division: "III", points: 24 },
  { id: "S003", name: "Careen Mushi", math: 75, eng: 88, kisw: 92, phy: 80, chem: 84, geo: 88, civ: 81, division: "I", points: 7 },
]

export default function AcademicsPage() {
  const { toast } = useToast()
  const [results, setResults] = useState(initialResults)
  const [isSyncingPrems, setIsSyncingPrems] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  const handleScanExam = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const result = await scanExamPaper({ photoDataUri: base64 })
        toast({
          title: "AI Scan Success",
          description: `Extracted: ${result.examNumber} | Score: ${result.score}%`,
        })
        // Update mock data locally for visual confirmation
        setResults(prev => [...prev, {
          id: result.examNumber,
          name: "Unknown Node",
          math: result.score,
          eng: 0, kisw: 0, phy: 0, chem: 0, geo: 0, civ: 0,
          division: "TBD",
          points: 0
        }])
      } catch (err) {
        toast({ variant: "destructive", title: "Scan Failed", description: "Could not read exam paper." })
      } finally {
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handlePremsSync = () => {
    setIsSyncingPrems(true)
    setTimeout(() => {
      setIsSyncingPrems(false)
      toast({
        title: "PReMS Node Synced",
        description: "Institutional records successfully pushed to national gateway.",
      })
    }, 3000)
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 h-5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Database className="h-2.5 w-2.5 mr-1.5" /> 2026 Academic Node
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tight uppercase">Academic Matrix</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">NECTA-aligned grading and AI-powered result scanning.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary text-primary hover:bg-primary/5 font-black text-[10px] uppercase tracking-widest group">
                <ScanText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                AI Exam Scanner
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8 max-w-md border-none shadow-2xl">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-xl font-black text-primary uppercase">Scan Result Node</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Identify exam number and marks via AI</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 text-center">
                <div className="p-10 rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4">
                  {isScanning ? (
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  ) : (
                    <BrainCircuit className="h-12 w-12 text-primary/40 animate-pulse-soft" />
                  )}
                  <p className="text-xs font-bold text-muted-foreground">{isScanning ? "AI Analyzing Exam Data..." : "Upload or Take a Photo of the Exam Cover"}</p>
                  <label className="cursor-pointer">
                    <Button variant="default" className="rounded-full colorful-gradient h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl pointer-events-none">
                      Select Exam Node
                    </Button>
                    <input type="file" className="hidden" accept="image/*" onChange={handleScanExam} disabled={isScanning} />
                  </label>
                </div>
                <p className="text-[9px] font-medium text-muted-foreground italic leading-relaxed">
                  The AI identifies NECTA-formatted numbers (e.g. S0101/0001) and circled final scores for automatic Firestore sync.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handlePremsSync} disabled={isSyncingPrems} className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient font-black text-[10px] uppercase tracking-widest shadow-xl group">
            {isSyncingPrems ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />}
            PReMS Sync
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Grading Model", value: "NECTA Matrix", sub: "Standard CSEE/FTNA", color: "text-primary" },
          { label: "Mean Points", value: "14.2", sub: "Institutional Avg", color: "text-green-600" },
          { label: "AI Scans", value: "482", sub: "This Term", color: "text-accent" },
          { label: "PReMS Sync", value: "100%", sub: "Audit Ready", color: "text-orange-600" },
        ].map((item) => (
          <Card key={item.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
              <p className={cn("text-xl font-black mt-1", item.color)}>{item.value}</p>
              <p className="text-[8px] font-bold text-muted-foreground/60 uppercase mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl overflow-hidden bg-card/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="pb-3 px-8 pt-8 bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-black uppercase">2026 Academic Ledger</CardTitle>
            <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary z-10" />
              <Input placeholder="Search ledger..." className="pl-10 h-10 rounded-full bg-white border-none shadow-inner text-xs font-bold" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/10">
              <TableRow className="border-none">
                <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Student Node</TableHead>
                <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Math</TableHead>
                <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Eng</TableHead>
                <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Kisw</TableHead>
                <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Points</TableHead>
                <TableHead className="text-center text-[9px] font-black uppercase tracking-widest">Division</TableHead>
                <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                  <TableCell className="pl-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-foreground/80">{result.name}</span>
                      <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{result.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-mono font-bold text-xs">{result.math}</TableCell>
                  <TableCell className="text-center font-mono font-bold text-xs">{result.eng}</TableCell>
                  <TableCell className="text-center font-mono font-bold text-xs">{result.kisw}</TableCell>
                  <TableCell className="text-center">
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full">{result.points}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn(
                      "text-[9px] py-0.5 px-3 border-none font-black rounded-full shadow-sm",
                      result.division === "I" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    )}>
                      DIV {result.division}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase rounded-full px-4">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
