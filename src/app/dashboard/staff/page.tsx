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
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Power,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  UserCircle
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { updateDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export default function StaffPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [isAddingStaff, setIsAddingStaff] = useState(false)
  const [isEditingStaff, setIsEditingStaff] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  
  const staffQuery = useMemoFirebase(() => query(collection(db, "schools", "school-001", "staff"), orderBy("fullName", "asc")), [db])
  const { data: staff, isLoading } = useCollection(staffQuery)

  const filteredStaff = useMemo(() => {
    if (!staff) return []
    return staff.filter(s => {
      const matchesSearch = 
        s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.staffNo?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = roleFilter === "all" || s.role === roleFilter
      const matchesStatus = statusFilter === "all" || s.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [searchTerm, roleFilter, statusFilter, staff])

  const stats = useMemo(() => {
    if (!staff) return { total: 0, teachers: 0, admins: 0, onLeave: 0 }
    return {
      total: staff.length,
      teachers: staff.filter(s => s.role === 'teacher').length,
      admins: staff.filter(s => s.role === 'admin').length,
      onLeave: staff.filter(s => s.status === 'on-leave').length
    }
  }, [staff])

  const handleEnrollStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const role = formData.get("role") as string
    
    const staffNo = `SD-STAFF-${Math.floor(100 + Math.random() * 900)}`
    
    const newStaff = {
      staffNo,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`.toUpperCase(),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: role as any,
      employmentType: formData.get("employmentType") as string,
      status: formData.get("status") as any || 'active',
      joinDate: formData.get("joinDate") as string,
      subjects: role === 'teacher' ? (formData.get("subjects") as string).split(',').map(s => s.trim()) : [],
      classes: role === 'teacher' ? (formData.get("classes") as string).split(',').map(s => s.trim()) : [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    addDocumentNonBlocking(collection(db, "schools", "school-001", "staff"), newStaff)
    setIsAddingStaff(false)
    toast({ title: "Personnel Enrolled", description: `${newStaff.fullName} added to 2026 faculty matrix.` })
  }

  const handleUpdateStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    
    const updates = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`.toUpperCase(),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: formData.get("role") as any,
      employmentType: formData.get("employmentType") as string,
      status: formData.get("status") as any,
      joinDate: formData.get("joinDate") as string,
      subjects: formData.get("role") === 'teacher' ? (formData.get("subjects") as string).split(',').map(s => s.trim()) : [],
      classes: formData.get("role") === 'teacher' ? (formData.get("classes") as string).split(',').map(s => s.trim()) : [],
      updatedAt: serverTimestamp()
    }

    updateDocumentNonBlocking(doc(db, "schools", "school-001", "staff", selectedStaff.id), updates)
    setIsEditingStaff(false)
    toast({ title: "Profile Synchronized", description: `${updates.fullName}'s records updated.` })
  }

  const handleChangeStatus = () => {
    updateDocumentNonBlocking(doc(db, "schools", "school-001", "staff", selectedStaff.id), {
      status: newStatus,
      updatedAt: serverTimestamp()
    })
    setIsStatusDialogOpen(false)
    toast({ title: "Status Updated", description: `${selectedStaff.fullName} is now ${newStatus.toUpperCase()}.` })
  }

  const handleExport = () => {
    if (!staff) return
    const worksheet = XLSX.utils.json_to_sheet(staff.map(s => ({
      "Staff No": s.staffNo,
      "Full Name": s.fullName,
      "Role": s.role,
      "Email": s.email,
      "Phone": s.phone,
      "Status": s.status,
      "Join Date": s.joinDate
    })))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Faculty")
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
    saveAs(data, `Institutional_Staff_Directory_2026.xlsx`)
    toast({ title: "Ledger Exported", description: "Excel directory saved to local node." })
  }

  return (
    <div className="space-y-6 pb-24 px-1 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            Institutional Faculty Hub 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-headline font-black text-primary uppercase tracking-tight">Staff Directory</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Management of {stats.total} institutional personnel nodes.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleExport} className="flex-1 sm:flex-none rounded-full h-11 border-primary/20 text-primary bg-white shadow-sm font-black text-[9px] uppercase tracking-widest">
            <Download className="mr-2 h-4 w-4" /> Export Ledger
          </Button>

          <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none rounded-full colorful-gradient h-11 shadow-xl font-black text-[9px] uppercase tracking-widest px-8 group">
                <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Enroll Personnel
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-lg">
              <DialogHeader className="bg-primary/5 p-8 border-b">
                <DialogTitle className="text-xl font-headline font-black uppercase text-primary">New Personnel Enrollment</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Register a new institutional staff node</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEnrollStaff} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">First Name</Label>
                    <Input name="firstName" placeholder="e.g. AMOS" required className="h-12 rounded-xl bg-muted/20 border-none font-bold uppercase px-5 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Last Name</Label>
                    <Input name="lastName" placeholder="e.g. MWIJAGE" required className="h-12 rounded-xl bg-muted/20 border-none font-bold uppercase px-5 shadow-inner" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Official Email</Label>
                    <Input name="email" type="email" placeholder="amos@shule.pro" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Phone Node</Label>
                    <Input name="phone" placeholder="+255..." required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Institutional Role</Label>
                    <Select name="role" defaultValue="teacher">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="teacher">Teaching Faculty</SelectItem>
                        <SelectItem value="accountant">Bursar/Accountant</SelectItem>
                        <SelectItem value="staff">Operational Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Employment</Label>
                    <Select name="employmentType" defaultValue="full-time">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contractual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Join Date</Label>
                  <Input name="joinDate" type="date" required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-xl mt-4">
                  Initialize Personnel Node
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Personnel Node", value: stats.total, sub: "Institutional Count", icon: Users, color: "text-primary", bg: "bg-primary/5" },
          { title: "Teaching Faculty", value: stats.teachers, sub: "Academic Nodes", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-100/50" },
          { title: "Administration", value: stats.admins, sub: "Control Nodes", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-100/50" },
          { title: "Dormant/Leave", value: stats.onLeave, sub: "Action Required", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100/50" },
        ].map((stat, i) => (
          <Card key={i} className="group border-none shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/60 backdrop-blur-md rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn(stat.bg, "p-2.5 rounded-2xl group-hover:scale-110 transition-transform")}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-headline font-black tracking-tight">{stat.value}</div>
              <p className="text-[8px] font-black text-muted-foreground/60 uppercase mt-2 tracking-tighter">
                {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-white/60 rounded-[2.5rem]">
        <CardHeader className="bg-muted/20 border-b p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-6">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input 
              placeholder="Find personnel by name, email or ID..." 
              className="pl-12 bg-white border-none rounded-full h-12 shadow-inner font-bold text-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-12 w-[160px] rounded-full border-none bg-white shadow-sm font-black text-[9px] uppercase px-6">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="accountant">Finance</SelectItem>
                <SelectItem value="staff">General</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 w-[160px] rounded-full border-none bg-white shadow-sm font-black text-[9px] uppercase px-6">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-primary" />
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Synchronizing Faculty Matrix...</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="p-32 text-center flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center">
                <Users className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-headline font-black text-primary uppercase">No Personnel Nodes</h3>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest max-w-sm">The 2026 Institutional Ledger has no matching staff records.</p>
              </div>
              <Button variant="outline" className="rounded-full px-8 h-12 font-black uppercase text-[10px] border-primary/20 text-primary" onClick={() => setIsAddingStaff(true)}>
                Enroll Faculty
              </Button>
            </div>
          ) : (
            <Table className="min-w-[1000px]">
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none h-14">
                  <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Personnel Node</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Role Hub</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Contact Node</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest">Teaching Load</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Status</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((person) => (
                  <TableRow key={person.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl shadow-lg shrink-0 border-2 border-white transition-transform group-hover:scale-110 overflow-hidden">
                          <AvatarImage src={person.photoUrl} className="object-cover" />
                          <AvatarFallback className="font-black text-primary bg-primary/5 uppercase">{person.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors uppercase truncate max-w-[200px]">{person.fullName}</span>
                          <span className="text-[9px] text-muted-foreground font-mono font-black">{person.staffNo}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border-none shadow-sm",
                        person.role === 'admin' ? "bg-green-100 text-green-700" :
                        person.role === 'teacher' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {person.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-foreground/70 flex items-center gap-1.5"><Mail className="h-2.5 w-2.5 text-primary" /> {person.email}</span>
                        <span className="text-[10px] font-bold text-foreground/70 flex items-center gap-1.5"><Phone className="h-2.5 w-2.5 text-primary" /> {person.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {person.role === 'teacher' ? (
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {person.subjects?.map((sub: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-[7px] font-black uppercase px-2 py-0 border-muted-foreground/20 text-muted-foreground">{sub}</Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest italic">Non-Academic</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-full border-none shadow-sm",
                        person.status === 'active' ? "bg-green-500 text-white" :
                        person.status === 'on-leave' ? "bg-orange-500 text-white" : "bg-destructive text-white"
                      )}>
                        {person.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-primary/5">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl w-48 font-body">
                          <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground px-4">Management Node</DropdownMenuLabel>
                          <DropdownMenuItem className="px-4 py-3 cursor-pointer group" onClick={() => { setSelectedStaff(person); }}>
                            <Sheet>
                              <SheetTrigger asChild>
                                <div className="flex items-center w-full">
                                  <Eye className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                  <span className="font-bold text-xs">View Profile</span>
                                </div>
                              </SheetTrigger>
                              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l-0 shadow-2xl">
                                <div className="bg-primary/5 p-10 border-b relative overflow-hidden">
                                  <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                                    <ShieldCheck className="h-48 w-48" />
                                  </div>
                                  <SheetHeader className="text-left flex-row items-center gap-8 relative z-10">
                                    <Avatar className="h-28 w-24 rounded-[2rem] shadow-2xl border-4 border-white">
                                      <AvatarImage src={person.photoUrl} className="object-cover" />
                                      <AvatarFallback className="text-3xl font-black text-primary bg-white">{person.fullName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-3">
                                      <h3 className="text-2xl font-headline font-black text-primary uppercase tracking-tighter">{person.fullName}</h3>
                                      <div className="flex flex-wrap gap-2">
                                        <Badge className="rounded-full bg-white text-primary border-none shadow-md px-4 py-1 text-[9px] uppercase tracking-widest font-black">{person.role}</Badge>
                                        <span className="text-[9px] font-mono font-black text-muted-foreground px-3 py-1 bg-white rounded-lg shadow-inner">{person.staffNo}</span>
                                      </div>
                                    </div>
                                  </SheetHeader>
                                </div>

                                <div className="p-10 space-y-10">
                                  <Tabs defaultValue="profile" className="space-y-8">
                                    <TabsList className="bg-muted/40 p-1 rounded-2xl h-12 grid w-full grid-cols-3 shadow-inner">
                                      <TabsTrigger value="profile" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Profile Hub</TabsTrigger>
                                      <TabsTrigger value="teaching" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Faculty Load</TabsTrigger>
                                      <TabsTrigger value="access" className="rounded-xl text-[9px] font-black uppercase tracking-widest">Security Access</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                      <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Email Address</p>
                                          <p className="text-sm font-bold text-foreground/80">{person.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Phone Node</p>
                                          <p className="text-sm font-bold text-foreground/80">{person.phone}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Employment Mode</p>
                                          <p className="text-sm font-bold text-foreground/80 uppercase tracking-tighter">{person.employmentType}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Enrollment Date</p>
                                          <p className="text-sm font-bold text-foreground/80">{person.joinDate}</p>
                                        </div>
                                      </div>

                                      <div className="p-8 rounded-[2rem] bg-muted/20 border border-muted/50 shadow-inner flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-primary">
                                            <Calendar className="h-5 w-5" />
                                          </div>
                                          <div className="space-y-0.5">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Audit Status</p>
                                            <p className="text-xs font-black uppercase text-primary">Verified Node</p>
                                          </div>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700 font-black text-[8px] uppercase px-4 py-1 rounded-full border-none">Active Ledger</Badge>
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="teaching" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                      {person.role === 'teacher' ? (
                                        <>
                                          <div className="space-y-4">
                                            <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Subject Specialization</Label>
                                            <div className="flex flex-wrap gap-2">
                                              {person.subjects?.map((s: string) => <Badge key={s} className="bg-primary/5 text-primary border-primary/10 rounded-xl px-4 py-2 font-black text-[10px] uppercase">{s}</Badge>)}
                                            </div>
                                          </div>
                                          <div className="space-y-4">
                                            <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Allocated Tiers</Label>
                                            <div className="flex flex-wrap gap-2">
                                              {person.classes?.map((c: string) => <Badge key={c} variant="outline" className="border-muted-foreground/20 rounded-xl px-4 py-2 font-black text-[10px] uppercase">{c}</Badge>)}
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <div className="p-20 text-center space-y-4">
                                          <Briefcase className="h-12 w-12 text-muted-foreground/20 mx-auto" />
                                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Administrative Role: No Teaching Load</p>
                                        </div>
                                      )}
                                    </TabsContent>

                                    <TabsContent value="access" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                      <div className="p-10 rounded-[2.5rem] bg-accent/5 border-2 border-dashed border-accent/10 text-center space-y-6">
                                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-xl text-accent">
                                          <ShieldCheck className="h-8 w-8" />
                                        </div>
                                        <div className="space-y-2">
                                          <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Institutional Access Active</p>
                                          <p className="text-xs font-medium text-foreground/60 leading-relaxed max-w-[300px] mx-auto uppercase tracking-tighter">This node has authorization to modify {person.role === 'admin' ? 'global configurations' : 'academic records'}.</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full border-accent/20 text-accent font-black text-[9px] uppercase tracking-widest px-8">Revoke Keys</Button>
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                </div>
                                <SheetFooter className="p-8 border-t bg-muted/10">
                                  <p className="text-[8px] font-bold text-muted-foreground text-center w-full uppercase tracking-[0.4em]">Sovereign Faculty Node Verified • 2026 Season</p>
                                </SheetFooter>
                              </SheetContent>
                            </Sheet>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem className="px-4 py-3 cursor-pointer group" onClick={() => { setSelectedStaff(person); setIsEditingStaff(true); }}>
                            <Edit className="mr-3 h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-xs">Edit Node</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator className="bg-muted/50" />
                          
                          <DropdownMenuItem className="px-4 py-3 cursor-pointer group text-orange-600" onClick={() => { setSelectedStaff(person); setIsStatusDialogOpen(true); }}>
                            <Power className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-xs">Change Status</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditingStaff} onOpenChange={setIsEditingStaff}>
        <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-lg">
          <DialogHeader className="bg-primary/5 p-8 border-b">
            <DialogTitle className="text-xl font-headline font-black uppercase text-primary">Edit Personnel Records</DialogTitle>
            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Update institutional data for {selectedStaff?.fullName}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateStaff} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">First Name</Label>
                <Input name="firstName" defaultValue={selectedStaff?.firstName} required className="h-12 rounded-xl bg-muted/20 border-none font-bold uppercase px-5 shadow-inner" />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Last Name</Label>
                <Input name="lastName" defaultValue={selectedStaff?.lastName} required className="h-12 rounded-xl bg-muted/20 border-none font-bold uppercase px-5 shadow-inner" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Role Hub</Label>
                <Select name="role" defaultValue={selectedStaff?.role}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teaching Faculty</SelectItem>
                    <SelectItem value="accountant">Bursar/Accountant</SelectItem>
                    <SelectItem value="staff">Operational Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Status Node</Label>
                <Select name="status" defaultValue={selectedStaff?.status}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Contact Email</Label>
              <Input name="email" defaultValue={selectedStaff?.email} required className="h-12 rounded-xl bg-muted/20 border-none font-bold px-5 shadow-inner" />
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-xl mt-4">
              Sync Data Node
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Status Change Confirmation */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent className="rounded-[2.5rem] p-8 border-none shadow-2xl">
          <AlertDialogHeader className="space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="h-8 w-8" />
            </div>
            <AlertDialogTitle className="text-xl font-headline font-black uppercase text-center">Update Personnel Status?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-xs font-medium text-muted-foreground leading-relaxed">
              Select the new status for <span className="text-primary font-black">{selectedStaff?.fullName}</span>. This change will be logged in the 2026 Audit Vault.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-6 space-y-3">
             <Select onValueChange={setNewStatus}>
                <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-black text-xs px-5 shadow-inner">
                  <SelectValue placeholder="Select target status..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="active">ACTIVE</SelectItem>
                  <SelectItem value="on-leave">ON LEAVE</SelectItem>
                  <SelectItem value="suspended">SUSPENDED</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-full h-12 font-black uppercase text-[10px] tracking-widest border-muted/50">Abort Change</AlertDialogCancel>
            <AlertDialogAction onClick={handleChangeStatus} className="rounded-full h-12 colorful-gradient font-black uppercase text-[10px] tracking-widest px-8 shadow-xl">Apply Status Node</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
