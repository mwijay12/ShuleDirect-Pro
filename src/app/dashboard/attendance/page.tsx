
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
  CloudOff,
  MessageCircle,
  Zap,
  Bell,
  AlertCircle,
  Globe
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const initialStudents = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", status: "Present", lastUpdated: "07:45 AM", parentContact: "+255712000001" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4A", status: "Absent", lastUpdated: "N/A", parentContact: "+255754000002" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 4A", status: "Present", lastUpdated: "07:30 AM", parentContact: "+255621000003" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 4A", status: "Late", lastUpdated: "08:15 AM", parentContact: "+255788000004" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", status: "Present", lastUpdated: "07:50 AM", parentContact: "+255713000005" },
]

export default function AttendancePage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(initialStudents)
  const [activeDate, setActiveDate] = useState(new Date().toLocaleDateString('en-GB'))

  const handleStatusChange = (id: string, newStatus: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, lastUpdated: time } : s))
    
    if (newStatus === "Absent") {
      toast({
        title: "Absence Logged",
        description: "Parent notification queued for dispatch.",
        action: <Button variant="outline" size="sm" onClick={() => handleNotifyParent(id)}>Send Now</Button>
      })
    }
  }

  const handleNotifyParent = (id: string) => {
    const student = students.find(s => s.id === id)
    if (!student) return
    
    toast({
      title: "Notification Sent",
      description: `SMS & WhatsApp alert dispatched to ${student.parentContact}`,
    })
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
    <div className="space-y-8 max-w-5xl mx-auto pb-24 px-4 font-body animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 px-4 py-1 h-6 text-[10px] font-black tracking-widest rounded-full shadow-sm animate-pulse-soft">
               <Database className="h-3.5 w-3.5 mr-2" /> OMNICHANNEL SYNCING
             </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight">Daily Register</h1>
          <p className="text-muted-foreground font-medium text-sm">2026 Academic Season • Form 4A • General Stream</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-14 px-8 border-primary/20 text-primary bg-white shadow-xl font-black text-xs uppercase tracking-widest group">
            <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Notify All
          </Button>
          <Button onClick={handleMarkAllPresent} className="flex-1 sm:flex-none rounded-full h-14 px-8 colorful-gradient shadow-[0_15px_30px_rgba(31,91,166,0.3)] font-black text-xs uppercase tracking-widest group">
            <UserCheck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Mark All Present
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Attendance", value: "96.2%", sub: "High Performance", color: "text-green-600", icon: Zap },
          { label: "Absentees", value: "12", sub: "Action Required", color: "text-destructive", icon: AlertCircle },
          { label: "SMS Credits", value: "4,280", sub: "Beem Africa", color: "text-blue-600", icon: Smartphone },
          { label: "Network", value: "Online", sub: "Johannesburg Node", color: "text-primary", icon: Globe },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
             <CardContent className="p-6 relative">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-20 w-20" />
                </div>
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">{stat.label}</p>
                <p className={cn("text-2xl sm:text-3xl font-black mt-2 tracking-tighter", stat.color)}>{stat.value}</p>
                <p className="text-[9px] text-muted-foreground font-black mt-2 uppercase tracking-widest">{stat.sub}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md rounded-[2.5rem]">
        <CardHeader className="bg-muted/30 pb-6 pt-8 px-8 border-b">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-3xl bg-primary text-white shadow-[0_10px_20px_rgba(31,91,166,0.3)] animate-float">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-black tracking-tight">{activeDate}</CardTitle>
                <CardDescription className="text-[10px] uppercase font-black tracking-[0.2em] text-primary/60">Class Record Matrix</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 sm:min-w-[250px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input placeholder="Search student name..." className="pl-12 h-12 rounded-full border-none bg-white shadow-inner font-bold text-sm" />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white border-none shadow-sm transition-all hover:bg-muted">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-muted/50">
            {students.map((student) => (
              <div key={student.id} className="p-6 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-primary/[0.02] transition-all group">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "h-16 w-16 rounded-[2rem] flex items-center justify-center font-black text-white shadow-2xl transition-all group-hover:rotate-6",
                    student.status === "Present" ? "bg-green-500 shadow-green-100" :
                    student.status === "Absent" ? "bg-destructive shadow-destructive/10" : "bg-orange-500 shadow-orange-100"
                  )}>
                    <span className="text-2xl">{student.name.charAt(0)}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-lg text-foreground/80 tracking-tight group-hover:text-primary transition-colors">{student.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground font-mono font-black uppercase tracking-widest bg-muted/40 px-2 py-0.5 rounded-lg shadow-inner">{student.id}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {student.lastUpdated === "N/A" ? "NO LOG" : student.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                   <Button 
                    variant={student.status === "Present" ? "default" : "outline"}
                    size="lg"
                    className={cn(
                      "rounded-full h-12 flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-8 shadow-sm transition-all",
                      student.status === "Present" ? "bg-green-600 hover:bg-green-700 shadow-green-100" : "hover:bg-green-50 text-green-600 border-green-200"
                    )}
                    onClick={() => handleStatusChange(student.id, "Present")}
                   >
                     Present
                   </Button>
                   <Button 
                    variant={student.status === "Late" ? "secondary" : "outline"}
                    size="lg"
                    className={cn(
                      "rounded-full h-12 flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-8 shadow-sm transition-all",
                      student.status === "Late" ? "bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-orange-50" : "hover:bg-orange-50 text-orange-600 border-orange-100"
                    )}
                    onClick={() => handleStatusChange(student.id, "Late")}
                   >
                     Late
                   </Button>
                   <Button 
                    variant={student.status === "Absent" ? "destructive" : "outline"}
                    size="lg"
                    className={cn(
                      "rounded-full h-12 flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-8 shadow-sm transition-all",
                      student.status === "Absent" ? "bg-destructive hover:bg-destructive/90 shadow-destructive/20" : "hover:bg-destructive/5 text-destructive border-destructive/20"
                    )}
                    onClick={() => handleStatusChange(student.id, "Absent")}
                   >
                     {student.status === "Absent" ? "LOGGED ABSENT" : "Mark Absent"}
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4 animate-pulse-soft">
         <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary border border-primary/10">
           <CloudOff className="h-7 w-7" />
         </div>
         <div className="space-y-1">
           <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">Operational Resilience Active</p>
           <p className="text-xs text-muted-foreground leading-relaxed max-w-sm font-medium">
             Class registers are cached locally using 2026 Edge Sync. Data will dispatch to Beem Africa gateways as soon as connectivity stabilizes.
           </p>
         </div>
      </div>
    </div>
  )
}
