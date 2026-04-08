
"use client"

import * as React from "react"
import { useState, useMemo, useRef } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus,
  Download,
  Loader2,
  FileText,
  Save,
  Trash2,
  Upload,
  Home,
  Bus,
  Zap,
  MessageCircle,
  Star,
  MinusCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc, query, writeBatch } from "firebase/firestore"
import { updateDocumentNonBlocking, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import * as XLSX from 'xlsx'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const studentsQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "students")), [db])
  const { data: students, isLoading } = useCollection(studentsQuery)

  const filteredStudents = useMemo(() => {
    if (!students) return []
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleUpdateStudent = (id: string, updates: any) => {
    updateDocumentNonBlocking(doc(db, "schools", "school-001", "students", id), updates)
    if (selectedStudent?.id === id) {
      setSelectedStudent({...selectedStudent, ...updates})
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (evt) => {
      const bstr = evt.target?.result
      const wb = XLSX.read(bstr, { type: 'binary' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(ws)
      
      const batch = writeBatch(db)
      data.forEach((item: any) => {
        const id = item.id || `NEW-${Math.random().toString(36).substr(2, 9)}`
        const ref = doc(db, "schools", "school-001", "students", id)
        batch.set(ref, {
          id,
          name: item.name || "Unknown",
          class: item.class || "Standard 7",
          status: "Active",
          type: item.type || "Day",
          contact: item.contact || "",
          conductPoints: 100,
          attendanceStatus: "Present"
        })
      })
      
      await batch.commit()
      toast({ title: "Ledger Synced", description: `${data.length} students synchronized to cloud database.` })
    }
    reader.readAsBinaryString(file)
  }

  return (
    <div className="space-y-6 pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase rounded-full">
            Institutional Registry Node 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Student Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Management of 267 active candidates.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".xlsx, .xls, .csv" />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase">
            <Upload className="mr-2 h-4 w-4" /> Import Excel
          </Button>
          <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Node
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8">
          <div className="relative max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto h-10 w-10 text-primary" /></div>
          ) : (
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none h-14">
                  <TableHead className="pl-8 text-[9px] font-black uppercase">Student Payload</TableHead>
                  <TableHead className="text-[9px] font-black uppercase">Tier</TableHead>
                  <TableHead className="text-[9px] font-black uppercase">Logistic</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-center">Conduct</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase">Hub</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-primary/[0.02] border-b last:border-none">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 rounded-2xl shadow-lg shrink-0">
                          <AvatarFallback className="font-black text-primary bg-primary/5">{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80">{student.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono font-black">{student.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[8px] font-black uppercase">{student.class}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.type === "Boarder" ? <Home className="h-3 w-3 text-primary/40" /> : <Bus className="h-3 w-3 text-primary/40" />}
                        <span className="text-[10px] font-black uppercase text-muted-foreground">{student.type === "Boarder" ? student.hostel : student.route}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-[10px]">{student.conductPoints || 100} PTS</TableCell>
                    <TableCell className="text-right pr-8">
                      <Sheet onOpenChange={(open) => { if (open) setSelectedStudent(student); }}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" className="text-[10px] font-black text-primary uppercase rounded-full">Access Hub</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l-0 shadow-2xl">
                          <div className="bg-primary/5 p-10 border-b">
                            <SheetHeader className="text-left flex-row items-center gap-8">
                              <Avatar className="h-24 w-24 rounded-[2rem] shadow-2xl border-4 border-white">
                                <AvatarFallback className="text-3xl font-black">{selectedStudent?.name?.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <Input 
                                  value={selectedStudent?.name || ""} 
                                  onChange={(e) => handleUpdateStudent(selectedStudent.id, { name: e.target.value })}
                                  className="text-2xl font-black text-primary uppercase bg-transparent border-none p-0 focus-visible:ring-0 h-auto"
                                />
                                <div className="flex gap-2">
                                  <Badge className="rounded-full bg-white text-primary border-none shadow-md px-4 py-1 text-[9px] uppercase">{selectedStudent?.class}</Badge>
                                  <span className="text-[9px] font-mono font-black text-muted-foreground px-3 py-1 bg-white rounded-lg shadow-inner">{selectedStudent?.id}</span>
                                </div>
                              </div>
                            </SheetHeader>
                          </div>

                          <div className="p-10 space-y-10">
                            <div className="space-y-4">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground">Logistic Hub Type</Label>
                              <div className="grid grid-cols-2 gap-4">
                                <Button 
                                  variant="outline" 
                                  className={cn("h-14 rounded-2xl font-black uppercase text-[10px]", selectedStudent?.type === "Boarder" ? "border-primary bg-primary/5 text-primary" : "opacity-50")}
                                  onClick={() => handleUpdateStudent(selectedStudent.id, { type: "Boarder" })}
                                >
                                  Boarder Node
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className={cn("h-14 rounded-2xl font-black uppercase text-[10px]", selectedStudent?.type === "Day" ? "border-primary bg-primary/5 text-primary" : "opacity-50")}
                                  onClick={() => handleUpdateStudent(selectedStudent.id, { type: "Day" })}
                                >
                                  Day Node
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground">Parent Contact node</Label>
                              <div className="flex gap-2">
                                <Input 
                                  value={selectedStudent?.contact || ""} 
                                  onChange={(e) => handleUpdateStudent(selectedStudent.id, { contact: e.target.value })}
                                  className="h-14 bg-muted/20 border-none font-bold rounded-2xl px-6 shadow-inner" 
                                />
                                <Button variant="outline" className="h-14 w-14 rounded-2xl border-primary/20 text-primary">
                                  <MessageCircle className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <Button className="h-20 rounded-[2rem] bg-green-50 text-green-700 hover:bg-green-100 border-none flex flex-col gap-1" onClick={() => handleUpdateStudent(selectedStudent.id, { conductPoints: (selectedStudent.conductPoints || 100) + 5 })}>
                                <Star className="h-5 w-5" />
                                <span className="text-[9px] font-black uppercase">Award Merit</span>
                              </Button>
                              <Button className="h-20 rounded-[2rem] bg-destructive/5 text-destructive hover:bg-destructive/10 border-none flex flex-col gap-1" onClick={() => handleUpdateStudent(selectedStudent.id, { conductPoints: (selectedStudent.conductPoints || 100) - 5 })}>
                                <MinusCircle className="h-5 w-5" />
                                <span className="text-[9px] font-black uppercase">Log Infraction</span>
                              </Button>
                            </div>
                          </div>
                          <SheetFooter className="p-8 border-t bg-muted/10">
                            <p className="text-[8px] font-bold text-muted-foreground text-center w-full uppercase">Sovereign Node Identity Verified 2026</p>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
