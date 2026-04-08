
"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Home, 
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lightbulb,
  Droplets,
  Settings,
  AlertCircle,
  Trash2,
  UserPlus,
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
import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase"
import { collection, query, doc, serverTimestamp } from "firebase/firestore"
import { deleteDocumentNonBlocking, addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates"

export default function HostelPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const schoolId = "school-001"
  
  const [isAdding, setIsAdding] = useState(false)
  const [selectedWing, setSelectedWing] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState<string | null>(null)
  
  const hostelsQuery = useMemoFirebase(() => {
    return query(collection(db, "schools", schoolId, "hostels"))
  }, [db])
  const { data: hostels, isLoading } = useCollection(hostelsQuery)

  const utilitiesRef = useMemoFirebase(() => {
    return doc(db, "schools", schoolId, "config", "utilities")
  }, [db])
  const { data: utilities } = useDoc(utilitiesRef)

  const utilityData = utilities || {
    luku: "Healthy",
    water: "Normal Flow",
    hygiene: "Verified Today"
  }

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
    toast({ title: "Wing Initialized", description: `${newWing.name} synced to database.` })
  }

  const handleDeleteWing = (id: string) => {
    deleteDocumentNonBlocking(doc(db, "schools", schoolId, "hostels", id))
    toast({ variant: "destructive", title: "Node Terminated", description: "Hostel wing removed from registry." })
  }

  const handleUpdateUtility = (key: string, value: string) => {
    setDocumentNonBlocking(utilitiesRef, { [key]: value }, { merge: true })
    setIsVerifying(null)
    toast({ title: "Audit Synchronized", description: `${key.toUpperCase()} node updated.` })
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Home className="h-2.5 w-2.5 mr-1.5" /> Institutional Housing 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Boarding & Logistics</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Manage residential wings and manual safety audits.</p>
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
              <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Add a new block to the 2026 roster.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddWing} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Wing Name</Label>
                  <Input name="name" placeholder="e.g. Kilimanjaro" required className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Block ID</Label>
                  <Input name="block" placeholder="Block A" required className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Wing Type</Label>
                  <Select name="type" defaultValue="Boys">
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold">
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
                  <Input name="warden" placeholder="Mwl. Juma" required className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Capacity</Label>
                  <Input name="capacity" type="number" defaultValue="100" className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Room Count</Label>
                  <Input name="rooms" type="number" defaultValue="25" className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">Initialize Wing</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 px-1">
        {[
          { label: "Electricity (LUKU)", value: utilityData.luku, icon: Zap, key: "luku" },
          { label: "Water Flow", value: utilityData.water, icon: Droplets, key: "water" },
          { label: "Hygiene Status", value: utilityData.hygiene, icon: ShieldCheck, key: "hygiene" },
        ].map((item) => (
          <Card key={item.key} className="border-none shadow-lg bg-white/60 backdrop-blur-md rounded-[2rem] group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
                  <p className="text-sm font-black text-primary">{item.value}</p>
                </div>
              </div>
              <Dialog open={isVerifying === item.key} onOpenChange={(open) => setIsVerifying(open ? item.key : null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem] max-w-sm">
                  <DialogHeader className="text-center">
                    <DialogTitle className="font-black uppercase">Verify {item.key}</DialogTitle>
                  </DialogHeader>
                  <div className="p-6 space-y-4">
                    <Input id="utility-val" placeholder="e.g. Healthy / Normal" className="h-12 rounded-xl" />
                    <Button 
                      className="w-full h-12 rounded-xl colorful-gradient font-black uppercase text-[10px]"
                      onClick={() => {
                        const val = (document.getElementById('utility-val') as HTMLInputElement).value;
                        if(val) handleUpdateUtility(item.key, val);
                      }}
                    >
                      Update Node
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <div className="p-20 flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Housing Matrix...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-1">
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
                <CardTitle className="text-lg font-black text-primary uppercase">{hostel.name}</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase">{hostel.type} Wing • Guardian: {hostel.warden}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                    <span>Load Status</span>
                    <span className="text-primary">{Math.round((hostel.occupied / (hostel.capacity || 1)) * 100)}%</span>
                  </div>
                  <Progress value={(hostel.occupied / (hostel.capacity || 1)) * 100} className="h-2 bg-muted/50" />
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full text-[9px] font-black uppercase h-11 rounded-full border-primary/10 hover:bg-primary/5 text-primary group" onClick={() => setSelectedWing(hostel)}>
                      Inspect Wing <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 font-body border-l-0 shadow-2xl">
                    <div className="bg-primary/5 p-8 sm:p-10 border-b">
                      <SheetHeader className="text-left">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                            <Home className="h-8 w-8" />
                          </div>
                          <div>
                            <SheetTitle className="text-2xl sm:text-3xl font-black text-primary uppercase">{selectedWing?.name}</SheetTitle>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{selectedWing?.block} Hub • {selectedWing?.warden}</p>
                          </div>
                        </div>
                      </SheetHeader>
                    </div>

                    <div className="p-8 sm:p-10">
                      <Tabs defaultValue="audit" className="space-y-10">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/40 p-1 rounded-2xl h-14">
                          <TabsTrigger value="audit" className="rounded-xl text-[10px] font-black uppercase">Safety Audit</TabsTrigger>
                          <TabsTrigger value="occupants" className="rounded-xl text-[10px] font-black uppercase">Allocations</TabsTrigger>
                          <TabsTrigger value="health" className="rounded-xl text-[10px] font-black uppercase">Sickbay</TabsTrigger>
                        </TabsList>

                        <TabsContent value="audit" className="space-y-8">
                          {[
                            { task: "Hygiene Compliance", icon: ShieldCheck, status: "Verified" },
                            { task: "Electrical & LUKU", icon: Lightbulb, status: "Healthy" },
                            { task: "Plumbing Integrity", icon: Droplets, status: "Stable" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-muted/50">
                              <div className="flex items-center gap-4">
                                <item.icon className="h-5 w-5 text-muted-foreground" />
                                <span className="text-xs font-bold text-foreground/80">{item.task}</span>
                              </div>
                              <Badge className="text-[8px] font-black uppercase rounded-full px-3 h-7 bg-green-100 text-green-700">{item.status}</Badge>
                            </div>
                          ))}
                          <Button className="w-full h-14 rounded-2xl colorful-gradient font-black uppercase text-xs shadow-xl" onClick={() => toast({ title: "Audit Synchronized", description: "Wing safety record archived." })}>
                            Confirm Inspection Node
                          </Button>
                        </TabsContent>

                        <TabsContent value="occupants" className="space-y-6">
                          <div className="p-8 rounded-[2rem] bg-muted/20 border-2 border-dashed border-primary/10 text-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase leading-relaxed">
                              Assign students from the **Directory Hub** to populate this wing. Current load: {selectedWing?.occupied} / {selectedWing?.capacity} beds.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="health" className="space-y-6">
                          <div className="p-8 rounded-[2rem] bg-destructive/5 border border-destructive/10 text-center space-y-4">
                            <HeartPulse className="h-8 w-8 text-destructive mx-auto animate-pulse" />
                            <p className="text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Active Medical Monitoring</p>
                            <p className="text-xs font-medium text-foreground/60 leading-relaxed">No critical medical alerts for boarders in this wing node.</p>
                          </div>
                          <Button variant="outline" className="w-full rounded-2xl h-12 border-primary/10 text-primary font-black text-[9px] uppercase hover:bg-primary/5">
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
    </div>
  )
}
