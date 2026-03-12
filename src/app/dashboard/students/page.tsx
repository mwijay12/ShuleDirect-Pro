
"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  Download,
  GraduationCap,
  MapPin
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const students = [
  { id: "2024-001", name: "Amani Mwamba", class: "Form 4A", gender: "Male", status: "Active", parent: "Juma Mwamba", contact: "+255 712 000 001" },
  { id: "2024-002", name: "Careen Mushi", class: "Form 4B", gender: "Female", status: "Active", parent: "Sarah Mushi", contact: "+255 754 000 002" },
  { id: "2024-003", name: "Baraka Juma", class: "Form 3A", gender: "Male", status: "Active", parent: "Fatuma Juma", contact: "+255 621 000 003" },
  { id: "2024-004", name: "Doreen Peter", class: "Form 2C", gender: "Female", status: "Inactive", parent: "Peter John", contact: "+255 788 000 004" },
  { id: "2024-005", name: "Emanuel Lema", class: "Form 4A", gender: "Male", status: "Active", parent: "David Lema", contact: "+255 713 000 005" },
]

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Student Directory</h1>
          <p className="text-muted-foreground">Manage student enrollment, profiles, and parent records.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" /> Enroll Student
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">Total Enrolled</CardDescription>
            <CardTitle className="text-2xl">1,284</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">Active</CardDescription>
            <CardTitle className="text-2xl text-green-600">1,240</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">Girls</CardDescription>
            <CardTitle className="text-2xl text-accent">652</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">Boys</CardDescription>
            <CardTitle className="text-2xl text-primary">632</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or class..."
                className="pl-9 bg-muted/30 border-none"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Parent/Guardian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/40`} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium text-xs">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{student.gender}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{student.parent}</span>
                      <span className="text-[10px] text-muted-foreground">{student.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === "Active" ? "default" : "destructive"}
                      className="text-[10px] py-0 h-5"
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Academic History</DropdownMenuItem>
                        <DropdownMenuItem>Finance Records</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Archive Student</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
