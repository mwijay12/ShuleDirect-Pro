"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Bed, 
  Home, 
  Users, 
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Thermometer,
  Stethoscope,
  ClipboardList,
  Lightbulb,
  Droplets,
  MoreVertical,
  Activity,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Settings,
  ShieldAlert,
  MapPin,
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
  SheetDescription, 
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

const initialHostels = [
  { id: "W-01", name: "Mt. Kilimanjaro Wing", type: "Boys", capacity: 200, occupied: 185, warden: "Mwl. Juma", rooms: 50, safetyScore: 98, block: "Block A" },
  { id: "W-02", name: "Lake Victoria Wing", type: "Girls", capacity: 200, occupied: 198, warden: "Mwl. Neema", rooms: 50, safetyScore: 100, block: "Block B" },
  { id: "W-03", name: "Serengeti Annex", type: "Boys", capacity: 100, occupied: 45, warden: "Mwl. Peter", rooms: 25, safetyScore: 94, block: "Block C" },
]

export default function HostelPage() {
  const { toast } = useToast()
  const [hostels, setHostels] = useState(initialHostels)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedWing, setSelectedWing] = useState<typeof hostels[0] | null>(null)
  const [utilityStatus, setUtilityStatus] = useState({
    luku: "Healthy",
    water: "Normal Flow",
    hygiene: "Verified Today"
  })

  const handleAddWing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newWing = {
      id: `W-${Math.floor(Math.random() * 1000)}`,
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      capacity: parseInt(formData.get("capacity") as string),
      occupied: 0,
      warden: formData.get("warden") as string,
      rooms: parseInt(formData.get("rooms") as string),
      safetyScore: 100,
      block: formData.get("block") as string,
    }
    setHostels([...hostels, newWing])
    setIsAdding(false)
    toast({ title: "Wing Initialized", description: `${newWing.name} added to 2026 Housing Node.` })
  }

  const handleDeleteWing = (id: string) => {
    setHostels(hostels.filter(h => h.id !== id))
    toast({ title: "Node Terminated", description: "Hostel wing removed from institutional registry." })
  }

  const handleVerifyUtility = (key: keyof typeof utilityStatus, status: string) => {
    setUtilityStatus(prev => ({ ...prev, [key]: status }))
    toast({ title: "Audit Synchronized", description: "Manual verification logged in 2026 Ledger." })
  }

  return (
    <div className="space-y-6 max-w-full mx-auto pb-24 px-1">
      {/* Header Node */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Home className="h-2.5 w-2.5 mr-1.5" /> Institutional Housing 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Boarding & Logistics</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none">Manage residential wings, blocks, and guardian nodes.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
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
      </div>

      {/* Manual Verification Ledger */}
      <Card className="border-none shadow-xl rounded-[2rem] bg-slate-900 text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <ShieldCheck className="h-48 w-48 rotate-12" />
        </div>
        <CardHeader className="p-8 pb-4 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-black uppercase">Institutional Utility Pulse</CardTitle>
              <CardDescription className="text-white/40 text-[10px] font-black uppercase tracking-widest">Manual Supply Verification Node</CardDescription>
            </div>
            <Badge className="bg-accent text-white border-none font-black text-[9px] px-4 py-1 rounded-full">AUDIT MODE</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 grid gap-6 md:grid-cols-3 relative z-10">
          {[
            { id: "luku", label: "Electricity (LUKU)", val: utilityStatus.luku, icon: Zap, color: "text-yellow-400" },
            { id: "water", label: "Water Infrastructure", val: utilityStatus.water, icon: Droplets, color: "text-blue-400" },
            { id: "hygiene", label: "Hygiene Compliance", val: utilityStatus.hygiene, icon: ShieldCheck, color: "text-green-400" },
          ].map((util) => (
            <div key={util.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <util.icon className={cn("h-5 w-5", util.color)} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{util.label}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-black">{util.val}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs rounded-3xl border-none shadow-2xl p-8">
                    <DialogHeader className="text-center mb-4">
                      <DialogTitle className="text-lg font-black uppercase">Verify {util.label}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Button onClick={() => handleVerifyUtility(util.id as any, "Healthy / Normal")} className="w-full h-12 rounded-2xl bg-green-100 text-green-700 font-black text-[10px] uppercase border-none hover:bg-green-200">Mark Healthy</Button>
                      <Button onClick={() => handleVerifyUtility(util.id as any, "Action Required")} className="w-full h-12 rounded-2xl bg-destructive/10 text-destructive font-black text-[10px] uppercase border-none hover:bg-destructive/20">Mark Faulty</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Main Hostel Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hostels.map((hostel) => (
          <Card key={hostel.id} className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden group">
            <div className={cn("h-2 w-full", hostel.type === "Boys" ? "bg-primary" : "bg-accent")} />
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="font-black text-[8px] uppercase tracking-widest">{hostel.block}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive" onClick={() => handleDeleteWing(hostel.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg font-black text-primary uppercase leading-tight">{hostel.name}</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase">{hostel.type} Accommodation • {hostel.rooms} Room Hubs</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  <span>Capacity Load</span>
                  <span className="text-primary">{Math.round((hostel.occupied / hostel.capacity) * 100)}%</span>
                </div>
                <Progress value={(hostel.occupied / hostel.capacity) * 100} className="h-2 bg-muted/50" />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-muted/50">
                <div>
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Guardian Node</p>
                  <p className="text-xs font-bold text-foreground/70">{hostel.warden}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Safety Index</p>
                  <p className="text-xs font-black text-green-600">{hostel.safetyScore}%</p>
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full text-[9px] font-black uppercase h-11 rounded-full border-primary/10 hover:bg-primary/5 text-primary group" onClick={() => setSelectedWing(hostel)}>
                    Inspect Node <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-0 shadow-2xl p-0 font-body">
                  <div className="bg-primary/5 p-8 sm:p-10 border-b relative overflow-hidden">
                    <Home className="absolute top-0 right-0 p-10 opacity-5 h-64 w-64 rotate-12" />
                    <SheetHeader className="text-left relative z-10">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                          <Home className="h-8 w-8" />
                        </div>
                        <div>
                          <SheetTitle className="text-2xl sm:text-3xl font-black text-primary tracking-tight uppercase leading-none">{selectedWing?.name}</SheetTitle>
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
                        <TabsTrigger value="health" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Sickbay</TabsTrigger>
                        <TabsTrigger value="management" className="rounded-xl text-[10px] font-black uppercase tracking-widest">Management</TabsTrigger>
                      </TabsList>

                      <TabsContent value="audit" className="space-y-8">
                        <div className="flex items-center justify-between px-2">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-primary shrink-0" /> Safety Checklist
                          </h3>
                          <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-4 py-1 rounded-full uppercase">Weekly node</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { task: "Room Hygiene Audit", icon: ShieldCheck, status: "Verified" },
                            { task: "Electrical & Lighting", icon: Lightbulb, status: "Inspected" },
                            { task: "Plumbing Integrity", icon: Droplets, status: "Done" },
                            { task: "Evening Roll Call", icon: Users, status: "Pending" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-muted/50 hover:border-primary/20 transition-all">
                              <div className="flex items-center gap-4">
                                <item.icon className="h-5 w-5 text-muted-foreground" />
                                <span className="text-xs font-bold text-foreground/80">{item.task}</span>
                              </div>
                              <Badge variant={item.status === "Pending" ? "outline" : "secondary"} className={cn("text-[9px] font-black uppercase tracking-widest px-3 h-6 rounded-full border-none", item.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>{item.status}</Badge>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full h-14 rounded-2xl colorful-gradient font-black uppercase text-xs tracking-widest shadow-xl group">
                          Confirm Wing Audit <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </TabsContent>

                      <TabsContent value="health" className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-destructive/5 border border-destructive/10 text-center space-y-4">
                          <Stethoscope className="h-10 w-10 text-destructive mx-auto animate-float" />
                          <div className="space-y-1">
                            <p className="text-lg font-black text-destructive tracking-tight uppercase">Medical Sickbay Node</p>
                            <p className="text-[10px] font-bold text-destructive/70 uppercase tracking-widest">3 Active health logs currently tracked in this wing.</p>
                          </div>
                          <Button variant="outline" className="w-full rounded-full border-destructive/20 text-destructive font-black text-[9px] uppercase tracking-widest h-11">
                            View Sickbay Registry
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="management" className="space-y-6">
                         <div className="p-8 rounded-[2.5rem] bg-muted/20 border-2 border-dashed border-primary/10 text-center space-y-4">
                            <Users className="h-8 w-8 text-primary/40 mx-auto" />
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Manage Wing Occupants</p>
                            <Button className="w-full h-12 rounded-2xl bg-white text-primary border-primary/10 border font-black text-[9px] uppercase tracking-widest shadow-md">Allocation Map</Button>
                         </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4 mx-1">
         <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary border border-primary/10">
           <AlertCircle className="h-7 w-7" />
         </div>
         <div className="space-y-1">
           <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">Institutional Safety Protocol</p>
           <p className="text-[10px] text-muted-foreground leading-relaxed max-w-sm font-medium">
             Hostel monitoring is a manual verification process. Wardens must check utility nodes every 6 hours to ensure "Normal Flow" and log any maintenance infractions immediately to the 2026 Sovereign Hub.
           </p>
         </div>
      </div>
    </div>
  )
}
