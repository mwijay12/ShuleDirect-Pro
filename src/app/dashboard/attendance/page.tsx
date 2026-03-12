"use client"

import * as React from "react"
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  XCircle,
  Clock,
  Smartphone
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const students = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", status: "Present", lastUpdated: "07:45 AM" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4A", status: "Absent", lastUpdated: "N/A" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 4A", status: "Present", lastUpdated: "07:30 AM" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 4A", status: "Late", lastUpdated: "08:15 AM" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", status: "Present", lastUpdated: "07:50 AM" },
]

export default function AttendancePage() {
  const { toast } = useToast()

  const handleNotifyParents = () => {
    toast({
      title: "SMS Notifications Sent",
      description: "Beem Africa: Attendance alerts dispatched to 1 absent student's parent.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Mahudhurio (Attendance)</h1>
          <p className="text-muted-foreground">Real-time digital registers with automated SMS alerts for parents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleNotifyParents}>
            <Smartphone className="mr-2 h-4 w-4" /> Notify Absentees
          </Button>
          <Button>
            <ClipboardCheck className="mr-2 h-4 w-4" /> Open Register
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider">Present Today</CardDescription>
            <CardTitle className="text-2xl text-green-600">96.2%</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider">Total Absentees</CardDescription>
            <CardTitle className="text-2xl text-destructive">12</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider">Late Arrivals</CardDescription>
            <CardTitle className="text-2xl text-orange-500">5</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider">Sync Status</CardDescription>
            <CardTitle className="text-sm font-mono text-blue-600">Delta Sync Active</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Daily Register</CardTitle>
              <CardDescription>Date: {new Date().toLocaleDateString('en-GB')}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="Form 4A">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Form 4A">Form 4A</SelectItem>
                  <SelectItem value="Form 4B">Form 4B</SelectItem>
                  <SelectItem value="Form 3A">Form 3A</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search student..." className="pl-9 h-10 w-[200px]" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{student.name}</span>
                      <span className="text-[10px] text-muted-foreground">{student.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {student.lastUpdated}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === "Present" ? "default" : student.status === "Absent" ? "destructive" : "secondary"}
                      className="text-[10px] h-5"
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
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
