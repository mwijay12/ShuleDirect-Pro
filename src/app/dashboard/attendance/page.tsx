
"use client"

import * as React from "react"
import { useState } from "react"
import { 
  ClipboardCheck, 
  Search, 
  Smartphone, 
  CheckCircle2, 
  XCircle,
  Clock,
  CalendarDays,
  UserCheck,
  Filter,
  Check,
  Database,
  CloudOff
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const initialStudents = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", status: "Present", lastUpdated: "07:45 AM" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4A", status: "Absent", lastUpdated: "N/A" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 4A", status: "Present", lastUpdated: "07:30 AM" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 4A", status: "Late", lastUpdated: "08:15 AM" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", status: "Present", lastUpdated: "07:50 AM" },
]

export default function AttendancePage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
  const [activeDate, setActiveDate] = useState(new Date().toLocaleDateString('en-GB'))

  const handleStatusChange = (id: string, newStatus: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, lastUpdated: time } : s))
  }

  const handleMarkAllPresent = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStudents(prev => prev.map(s => ({ ...s, status: "Present", lastUpdated: time })))
    toast({
      title: "Batch Completion",
      description: "Class register updated successfully in local cache.",
    })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 px-2 py-0 h-5 text-[9px] font-bold">
               <Database className="h-3 w-3 mr-1" /> SYNCING
             </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-primary">Daily Register</h1>
          <p className="text-muted-foreground text-sm">Offline-ready tracking for classroom attendance.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-11">
            <Smartphone className="mr-2 h-4 w-4" /> Notify Parents
          </Button>
          <Button onClick={handleMarkAllPresent} className="flex-1 sm:flex-none rounded-full h-11 colorful-gradient">
            <UserCheck className="mr-2 h-4 w-4" /> Mark All Present
          </Button>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Attendance", value: "96.2%", sub: "High Performance", color: "text-green-600" },
          { label: "Absentees", value: "12", sub: "Action Logged", color: "text-destructive" },
          { label: "Sync Status", value: "Active", sub: "Local Cache Ready", color: "text-blue-600" },
          { label: "Network", value: "Online", sub: "Johannesburg Node", color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-card/50">
             <CardContent className="p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-2xl font-black mt-1", stat.color)}>{stat.value}</p>
                <p className="text-[9px] text-muted-foreground font-medium mt-1">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-card/60">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Class Register • {activeDate}</CardTitle>
                <CardDescription className="text-xs uppercase font-bold tracking-tighter">Form 4A • General Stream</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 sm:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Find student..." className="pl-10 h-10 rounded-full border-none bg-white shadow-sm" />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white border-none shadow-sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {students.map((student) => (
              <div key={student.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg",
                    student.status === "Present" ? "bg-green-500 shadow-green-100" :
                    student.status === "Absent" ? "bg-destructive shadow-destructive/10" : "bg-orange-500 shadow-orange-100"
                  )}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{student.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">{student.id}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {student.lastUpdated === "N/A" ? "No Entry Yet" : student.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <Button 
                    variant={student.status === "Present" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-10 flex-1 sm:flex-none text-xs font-bold px-6",
                      student.status === "Present" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 text-green-600 border-green-200"
                    )}
                    onClick={() => handleStatusChange(student.id, "Present")}
                   >
                     Present
                   </Button>
                   <Button 
                    variant={student.status === "Late" ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-10 flex-1 sm:flex-none text-xs font-bold px-6",
                      student.status === "Late" ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "hover:bg-orange-50 text-orange-600 border-orange-100"
                    )}
                    onClick={() => handleStatusChange(student.id, "Late")}
                   >
                     Late
                   </Button>
                   <Button 
                    variant={student.status === "Absent" ? "destructive" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-10 flex-1 sm:flex-none text-xs font-bold px-6",
                      student.status === "Absent" ? "bg-destructive hover:bg-destructive/90" : "hover:bg-destructive/5 text-destructive border-destructive/20"
                    )}
                    onClick={() => handleStatusChange(student.id, "Absent")}
                   >
                     {student.status === "Absent" ? "ABSENT" : "Mark Absent"}
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/20 flex flex-col items-center text-center">
         <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
           <CloudOff className="h-5 w-5 text-primary" />
         </div>
         <p className="text-xs font-bold text-primary mb-1">Operational Resilience Enabled</p>
         <p className="text-[10px] text-muted-foreground leading-relaxed max-w-sm">
           Data is saved locally when network fluctuates and synchronized automatically when the connection stabilizes.
         </p>
      </div>
    </div>
  )
}
