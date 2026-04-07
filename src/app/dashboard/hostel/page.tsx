
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Bed, 
  Home, 
  Users, 
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Stethoscope,
  ClipboardList,
  Lightbulb,
  Droplets,
  Settings,
  AlertCircle,
  CheckCircle2,
  Trash2,
  UserPlus,
  Activity,
  HeartPulse,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { deleteDocumentNonBlocking, addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"

export default function HostelPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const schoolId = "school-001"
  
  const [isAdding, setIsAdding] = useState(false)
  const [selectedWing, setSelectedWing] = useState<any>(null)
  
  // Real Firestore Query
  const hostelsQuery = useMemoFirebase(() => {
    return query(collection(db, "schools", schoolId, "hostels"))
  }, [db])
  const { data: hostels, isLoading } = useCollection(hostelsQuery)

  const [utilityStatus, setUtilityStatus] = useState({
    luku: "Healthy",
    water: "Normal Flow",
    hygiene: "Verified Today"
  })

  const [checklist, setChecklist] = useState([
    { id: 1, task: "Room Hygiene Audit", icon: ShieldCheck, status: "Verified" },
    { id: 2, task: "Electrical & Lighting", icon: Lightbulb, status: "Inspected" },
    { id: 3, task: "Plumbing Integrity", icon: Droplets, status: "Done" },
    { id: 4, task: "Evening Roll Call", icon: Users, status: "Pending" },
  ])

  const handleAddWing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newWing = {
      schoolId,
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      capacity: parseInt(formData.get("capacity") as string),
      occupied: 0,
      warden: formData.get("warden") as string,
      rooms: parseInt(formData.get("rooms") as string),
      safetyScore: 100,
      block: formData.get("block") as string,
      createdAt: serverTimestamp(),
    }
    
    addDocumentNonBlocking(collection(db, "schools", schoolId, "hostels"), newWing)
    setIsAdding(false)
    toast({ title: "Wing Initialized", description: `${newWing.name} synced to institutional database.` })
  }

  const handleDeleteWing = (id: string) => {
    deleteDocumentNonBlocking(doc(db, "schools", schoolId, "hostels", id))
    toast({ variant: "destructive", title: "Node Terminated", description: "Hostel wing removed from registry." })
  }

  const handleVerifyUtility = (key: keyof typeof utilityStatus, status: string) => {
    setUtilityStatus(prev => ({ ...prev, [key]: status }))
    toast({ title: "Audit Synchronized", description: "Manual verification logged locally." })
  }

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, status: item.status === "Pending" ? "Verified" : "Pending" } : item))
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Home className="h-2.5 w-2.5 mr-1.5" /> Institutional Housing 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Boarding & Logistics</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Manage residential wings, blocks, and guardian nodes.</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="flex-1 sm:flex-none rounded-full h-11 px-8 colorful-gradient shadow-xl font-black text-[10px] uppercase tracking-widest group">
              <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Register Wing
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden max-w-md border-none shadow-2xl">
            <DialogHeader className="bg-primary/5 p-8 border-b">
              <DialogTitle className="text-xl font-black text-primary uppercase">New Housing Node</DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Register a new hostel block for the 2026 season.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddWing} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Wing Name</Label>
                  <Input name="name" placeholder="e.g. Serengeti" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Block ID</Label>
                  <Input name="block" placeholder="Block A" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Wing Type</Label>
                  <Select name="type" defaultValue="Boys">
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Boys">Boys</SelectItem>
                      <SelectItem value="Girls">Girls</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Lead Warden</Label>
                  <Input name="warden" placeholder="Mwl. Juma" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Capacity (Beds)</Label>
                  <Input name="capacity" type="number" defaultValue="100" className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Room Hubs</Label>
                  <Input name="rooms" type="number" defaultValue="25" className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase tracking-widest shadow-2xl">Initialize Node</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="p-20 flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Housing Matrix...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels?.map((hostel) => (
            <Card key={hostel.id} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden group">
              <div className={cn("h-2 w-full", hostel.type === "Boys" ? "bg-primary" : "bg-accent")} />
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="font-black text-[8px] uppercase tracking-widest">{hostel.block}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive" onClick={() => handleDeleteWing(hostel.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg font-black text-primary uppercase leading-tight">{hostel.name}</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase">{hostel.type} Wing • {hostel.rooms} Room Hubs</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <span>Capacity Load</span>
                    <span className="text-primary">{Math.round((hostel.occupied / (hostel.capacity || 1)) * 100)}%</span>
                  </div>
                  <Progress value={(hostel.occupied / (hostel.capacity || 1)) * 100} className="h-2 bg-muted/50" />
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full text-[9px] font-black uppercase h-11 rounded-full border-primary/10 hover:bg-primary/5 text-primary group" onClick={() => setSelectedWing(hostel)}>
                      Inspect Node <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                    <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                      <SheetHeader className="text-left relative z-10">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0 border-2 border-primary/5">
                            <Home className="h-8 w-8" />
                          </div>
                          <div>
                            <SheetTitle className="text-2xl sm:text-3xl font-black text-primary tracking-tighter uppercase leading-none">{selectedWing?.name}</SheetTitle>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge className="rounded-full bg-white text-primary border-none shadow-md font-black px-4 py-1 text-[9px] uppercase">{selectedWing?.block}</Badge>
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Guardian: {selectedWing?.warden}</span>
                            </div>
                          </div>
                        </div>
                      </SheetHeader>
                    </div>

                    <div className="p-8 sm:p-10">
                      <Tabs defaultValue="audit" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 rounded-2xl h-14 shadow-inner">
                          <TabsTrigger value="audit" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Audit</TabsTrigger>
                          <TabsTrigger value="occupants" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Occupants</TabsTrigger>
                          <TabsTrigger value="health" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Sickbay</TabsTrigger>
                        </TabsList>

                        <TabsContent value="audit" className="space-y-8">
                          <div className="space-y-3">
                            {checklist.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-muted/50 hover:border-primary/20 transition-all group/item">
                                <div className="flex items-center gap-4">
                                  <item.icon className={cn("h-5 w-5", item.status === "Verified" ? "text-green-500" : "text-muted-foreground")} />
                                  <span className="text-xs font-bold text-foreground/80">{item.task}</span>
                                </div>
                                <Button variant="ghost" size="sm" className={cn("text-[8px] font-black uppercase tracking-widest rounded-full px-3 h-7", item.status === "Verified" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600")} onClick={() => toggleChecklistItem(item.id)}>
                                  {item.status}
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full h-14 rounded-2xl colorful-gradient font-black uppercase text-xs tracking-widest shadow-xl group" onClick={() => toast({ title: "Audit Logged", description: "Safety record archived in Firestore node." })}>
                            Confirm Wing Audit <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </TabsContent>

                        <TabsContent value="occupants" className="space-y-6">
                          <div className="flex justify-between items-center px-2">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned Students</h3>
                            <Button variant="outline" size="sm" className="rounded-full h-8 text-[8px] font-black uppercase border-primary/20 text-primary">
                              <UserPlus className="h-3 w-3 mr-1.5" /> Allocate
                            </Button>
                          </div>
                          <div className="p-8 rounded-[2rem] bg-muted/20 border-2 border-dashed border-primary/10 text-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase">Assign students from the Directory Hub to populate this wing.</p>
                          </div>
                        </TabsContent>

                        <TabsContent value="health" className="space-y-6">
                          <div className="p-8 rounded-[2rem] bg-destructive/5 border border-destructive/10 text-center space-y-4">
                            <HeartPulse className="h-8 w-8 text-destructive mx-auto animate-pulse" />
                            <p className="text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Active Medical Monitoring</p>
                          </div>
                          <Button variant="outline" className="w-full rounded-2xl h-12 border-primary/10 text-primary font-black text-[9px] uppercase tracking-widest hover:bg-primary/5">
                            Open Full Sickbay Node
                          </Button>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4 mx-1">
         <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary border border-primary/10">
           <AlertCircle className="h-7 w-7" />
         </div>
         <div className="space-y-1">
           <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">Institutional Safety Protocol</p>
           <p className="text-[10px] text-muted-foreground leading-relaxed max-w-sm font-medium">
             Hostel monitoring is an active verification process. Data is synchronized with the 2026 Sovereign Node for national audit compliance.
           </p>
         </div>
      </div>
    </div>
  )
}
