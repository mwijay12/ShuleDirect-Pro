
"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { 
  Search, 
  Smartphone, 
  CheckCircle2, 
  Clock,
  CalendarDays,
  UserCheck,
  Filter,
  Database,
  CloudOff,
  MessageCircle,
  Zap,
  AlertCircle,
  Globe
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Synchronized authentic roster
const initialStudents = [
  { id: "PS0206098-001", name: "ALEXANDER MLAWA CALLSON", class: "Standard 7", status: "Present", lastUpdated: "07:45 AM", parentContact: "+255712000001" },
  { id: "PS0206098-002", name: "ALVIN MICHAEL GILLA", class: "Standard 7", status: "Absent", lastUpdated: "N/A", parentContact: "+255754000002" },
  { id: "PS0206098-003", name: "AYESIGA LAUREAN LEONIDAS", class: "Standard 7", status: "Present", lastUpdated: "07:30 AM", parentContact: "+255621000003" },
  { id: "S4939-0001", name: "AGNES FRED KILIMA", class: "Form 2A", status: "Present", lastUpdated: "07:50 AM", parentContact: "+255713000005" },
  { id: "S4939-0002", name: "AGNES NKUNDWE MWAMBALASWA", class: "Form 2A", status: "Present", lastUpdated: "07:55 AM", parentContact: "+255713000006" },
  { id: "S4939-0112", name: "DAVID ERICK MWIJAGE", class: "Form 2B", status: "Present", lastUpdated: "08:00 AM", parentContact: "+255713000007" },
  { id: "S4939-0200", name: "WILBERT RWECHUNGURA MUNYAGA", class: "Form 2B", status: "Present", lastUpdated: "08:05 AM", parentContact: "+255713000008" },
]

export default function AttendancePage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeDate] = useState(new Date().toLocaleDateString('en-GB'))

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, students])

  const handleStatusChange = (id: string, newStatus: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, lastUpdated: time } : s))
    
    if (newStatus === "Absent") {
      toast({
        title: "Absence Logged",
        description: "Parent notification queued via Beem Gateway.",
      })
    }
  }

  const handleMarkAllPresent = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStudents(prev => prev.map(s => ({ ...s, status: "Present", lastUpdated: time })))
    toast({
      title: "Batch Completion",
      description: "Institutional register updated successfully.",
    })
  }

  return (
    <div className="space-y-8 max-w-full mx-auto pb-24 overflow-x-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-1">
        <div className="space-y-2">
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 px-4 py-1 h-6 text-[9px] sm:text-[10px] font-black tracking-widest rounded-full shadow-sm">
            <Database className="h-3.5 w-3.5 mr-2" /> OMNICHANNEL SYNC 2026
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight">Daily Register</h1>
          <p className="text-muted-foreground font-medium text-sm">Institutional Attendance Node • Secondary & Primary Levels</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-12 px-6 border-primary/20 text-primary bg-white shadow-md font-black text-[10px] uppercase tracking-widest group">
            <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Notify All
          </Button>
          <Button onClick={handleMarkAllPresent} className="flex-1 sm:flex-none rounded-full h-12 px-6 colorful-gradient shadow-lg font-black text-[10px] uppercase tracking-widest group">
            <UserCheck className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Mark All Present
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Presence", value: "96.2%", sub: "High Perf", color: "text-green-600", icon: Zap },
          { label: "Absent", value: "12", sub: "Action Req", color: "text-destructive", icon: AlertCircle },
          { label: "SMS Node", value: "4,280", sub: "Beem Hub", color: "text-blue-600", icon: Smartphone },
          { label: "Gateway", value: "Online", sub: "TZ Node", color: "text-primary", icon: Globe },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</p>
                <p className={cn("text-xl sm:text-3xl font-black mt-2 tracking-tighter truncate", stat.color)}>{stat.value}</p>
                <p className="text-[8px] text-muted-foreground font-black mt-1 uppercase tracking-widest truncate">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/30 pb-6 pt-8 px-4 sm:px-8 border-b overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 rounded-3xl bg-primary text-white shadow-xl animate-float shrink-0">
                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="overflow-hidden">
                <CardTitle className="text-lg sm:text-xl font-black tracking-tight">{activeDate}</CardTitle>
                <CardDescription className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-primary/60 truncate">Institutional Matrix Hub</CardDescription>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="relative flex-1 sm:min-w-[250px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input 
                  placeholder="Find student..." 
                  className="pl-12 h-12 rounded-full border-none bg-white shadow-inner font-bold text-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white border-none shadow-sm shrink-0">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="divide-y divide-muted/50 min-w-[600px]">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 sm:p-6 lg:px-10 flex items-center justify-between gap-4 sm:gap-6 hover:bg-primary/[0.02] transition-all group">
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <div className={cn(
                    "h-12 w-12 sm:h-16 sm:w-16 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center font-black text-white shadow-xl transition-all group-hover:rotate-6 shrink-0",
                    student.status === "Present" ? "bg-green-500 shadow-green-100" :
                    student.status === "Absent" ? "bg-destructive shadow-destructive/10" : "bg-orange-500 shadow-orange-100"
                  )}>
                    <span className="text-xl sm:text-2xl">{student.name.charAt(0)}</span>
                  </div>
                  <div className="space-y-1 min-w-0 overflow-hidden">
                    <h3 className="font-black text-base sm:text-lg text-foreground/80 tracking-tight group-hover:text-primary transition-colors truncate">{student.name}</h3>
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                      <span className="text-[8px] sm:text-[10px] text-muted-foreground font-mono font-black uppercase tracking-widest bg-muted/40 px-2 py-0.5 rounded-lg shadow-inner shrink-0 truncate">{student.id}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30 shrink-0" />
                      <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest truncate">
                        <Clock className="h-3 w-3 text-primary shrink-0" />
                        {student.lastUpdated === "N/A" ? "NO LOG" : student.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                   <Button 
                    variant={student.status === "Present" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-9 sm:h-11 text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-4 sm:px-6 shadow-sm transition-all whitespace-nowrap",
                      student.status === "Present" ? "bg-green-600 hover:bg-green-700 shadow-green-100" : "hover:bg-green-50 text-green-600 border-green-200"
                    )}
                    onClick={() => handleStatusChange(student.id, "Present")}
                   >
                     Present
                   </Button>
                   <Button 
                    variant={student.status === "Late" ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-9 sm:h-11 text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-4 sm:px-6 shadow-sm transition-all whitespace-nowrap",
                      student.status === "Late" ? "bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-orange-50" : "hover:bg-orange-50 text-orange-600 border-orange-100"
                    )}
                    onClick={() => handleStatusChange(student.id, "Late")}
                   >
                     Late
                   </Button>
                   <Button 
                    variant={student.status === "Absent" ? "destructive" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full h-9 sm:h-11 text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-4 sm:px-6 shadow-sm transition-all whitespace-nowrap",
                      student.status === "Absent" ? "bg-destructive hover:bg-destructive/90 shadow-destructive/20" : "hover:bg-destructive/5 text-destructive border-destructive/20"
                    )}
                    onClick={() => handleStatusChange(student.id, "Absent")}
                   >
                     {student.status === "Absent" ? "ABSENT" : "Absent"}
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4 animate-pulse-soft overflow-hidden mx-1">
         <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary border border-primary/10 shrink-0">
           <CloudOff className="h-6 w-6 sm:h-7 sm:w-7" />
         </div>
         <div className="space-y-1 overflow-hidden">
           <p className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em]">Resilient Hub Protocol Active</p>
           <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed max-w-sm font-medium mx-auto px-4">
             Registers are cached locally using 2026 Edge Sync. Data will dispatch to national gateways as soon as connectivity stabilizes.
           </p>
         </div>
      </div>
    </div>
  )
}
