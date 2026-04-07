
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Settings as SettingsIcon, 
  School, 
  Save,
  Plus,
  Trash2,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Zap,
  Terminal,
  Activity,
  Layout,
  UserPlus,
  RefreshCw,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import AnimatedContent from "@/components/ui/animated-content"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const { toast } = useToast()
  const [schoolName, setSchoolName] = useState("ShuleDirect Pro")
  const [systemName, setSystemName] = useState("ShuleDirect")
  const [systemVersion, setSystemVersion] = useState("2.0.26")
  const [centerNo, setCenterNo] = useState("PS0206098")
  const [region, setRegion] = useState("Dar es Salaam")
  const [district, setDistrict] = useState("Kinondoni")
  const [n8nUrl, setN8nUrl] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)
  
  // Personnel State
  const [staff, setStaff] = useState([
    { id: "STAFF-001", name: "Davie Mwijage", email: "admin@shule.pro", role: "ADMIN", status: "Active" },
    { id: "STAFF-002", name: "Sarah Neema", email: "bursar@shule.pro", role: "BURSAR", status: "Active" },
    { id: "STAFF-003", name: "John Peter", email: "teacher@shule.pro", role: "TEACHER", status: "Active" },
  ])

  useEffect(() => {
    const savedName = localStorage.getItem("shule_name")
    const savedSystemName = localStorage.getItem("shule_system_name")
    const savedVersion = localStorage.getItem("shule_version")
    const savedN8n = localStorage.getItem("shule_n8n_url")
    const savedLogo = localStorage.getItem("shule_logo")
    const savedCenter = localStorage.getItem("shule_center_id")
    const savedRegion = localStorage.getItem("shule_region")
    const savedDistrict = localStorage.getItem("shule_district")
    
    if (savedName) setSchoolName(savedName)
    if (savedSystemName) setSystemName(savedSystemName)
    if (savedVersion) setSystemVersion(savedVersion)
    if (savedN8n) setN8nUrl(savedN8n)
    if (savedLogo) setLogoPreview(savedLogo)
    if (savedCenter) setCenterNo(savedCenter)
    if (savedRegion) setRegion(savedRegion)
    if (savedDistrict) setDistrict(savedDistrict)
  }, [])

  const handleSave = () => {
    localStorage.setItem("shule_name", schoolName)
    localStorage.setItem("shule_system_name", systemName)
    localStorage.setItem("shule_version", systemVersion)
    localStorage.setItem("shule_center_id", centerNo)
    localStorage.setItem("shule_region", region)
    localStorage.setItem("shule_district", district)
    localStorage.setItem("shule_n8n_url", n8nUrl)
    toast({ title: "System Node Synced", description: "Institutional configurations updated." })
    setTimeout(() => window.location.reload(), 800)
  }

  const handleResetSystem = () => {
    setIsResetting(true)
    setTimeout(() => {
      localStorage.clear()
      toast({ title: "Fresh Start Initialized", description: "Demo nodes cleared. Logging out..." })
      setTimeout(() => window.location.href = "/", 1500)
    }, 2000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        localStorage.setItem("shule_logo", base64);
        toast({ title: "Logo Uploaded", description: "Institutional branding refreshed." });
      };
      reader.readAsDataURL(file);
    }
  }

  const handleAddStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newStaff = {
      id: `STAFF-${Math.floor(Math.random() * 1000)}`,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      status: "Active"
    }
    setStaff(prev => [...prev, newStaff])
    toast({ title: "Personnel Enrolled", description: `${newStaff.name} added to 2026 Staff Registry.` })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary">System Control Node</h1>
          <p className="text-muted-foreground font-medium text-[9px] uppercase tracking-widest">Global Administrative Hub 2026</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full h-11 px-6 border-destructive/20 text-destructive hover:bg-destructive/5 font-black text-[9px] uppercase">
                <RefreshCw className="mr-2 h-3.5 w-3.5" /> Fresh Start
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] max-w-md border-none shadow-2xl">
              <DialogHeader className="text-center">
                <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-4">
                  <AlertCircle className="h-7 w-7" />
                </div>
                <DialogTitle className="text-xl font-black uppercase">Initialize Fresh Start?</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">This will clear all demo data and reset institutional nodes.</DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-4">
                <p className="text-xs font-medium text-muted-foreground text-center">Are you sure you want to purge the current session? This action is irreversible for the current client node.</p>
                <Button onClick={handleResetSystem} disabled={isResetting} variant="destructive" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase">
                  {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Purge Node"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave} className="flex-1 sm:flex-none font-black rounded-full colorful-gradient h-11 px-8 shadow-lg text-[9px] uppercase">
            <Save className="mr-2 h-4 w-4" /> Sync Institutional Node
          </Button>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-xl overflow-x-auto w-full flex h-auto gap-1 shadow-inner border border-muted">
          <TabsTrigger value="school" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">IDENTITY</TabsTrigger>
          <TabsTrigger value="staff" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">PERSONNEL</TabsTrigger>
          <TabsTrigger value="automation" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">AUTOMATION</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">VISUALS</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <AnimatedContent distance={20}>
            <Card className="border-none shadow-sm overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-primary/5 border-b border-primary/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-primary">
                    <School className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-black uppercase">Institutional Identity</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Official School Name</Label>
                    <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Center ID</Label>
                    <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner" />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Center Region</Label>
                    <Input value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Center District</Label>
                    <Input value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>

          <AnimatedContent distance={20} delay={0.1}>
            <Card className="border-none shadow-sm overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center text-accent">
                    <Layout className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-black uppercase">System Controls</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Product Name</Label>
                    <Input value={systemName} onChange={(e) => setSystemName(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">System Version Node</Label>
                    <Input value={systemVersion} onChange={(e) => setSystemVersion(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-muted/20 border-b p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <CardTitle className="text-lg font-black uppercase">Staff Registry</CardTitle>
                <CardDescription className="text-[9px] font-black uppercase tracking-widest">Manage institutional access keys for 2026</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full h-12 px-8 colorful-gradient font-black text-[10px] uppercase shadow-xl">
                    <UserPlus className="mr-2 h-4 w-4" /> Enroll Personnel
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] max-w-md">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-black text-primary uppercase">New Staff Node</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddStaff} className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground">Legal Name</Label>
                      <Input name="name" required className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground">Institutional Email</Label>
                      <Input name="email" type="email" required className="h-12 rounded-xl bg-muted/20 border-none font-bold" />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">Authorize Access</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-none h-14">
                    <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Full Name</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest">Role Hub</TableHead>
                    <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((s) => (
                    <TableRow key={s.id} className="border-b last:border-none">
                      <TableCell className="pl-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80">{s.name}</span>
                          <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{s.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary">
                          {s.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden rounded-[2rem] bg-slate-950 text-white">
            <CardHeader className="border-b border-white/10 p-6 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-white">
                  <Terminal className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-black uppercase">n8n Workflow Hub</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4 max-w-2xl">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/60">Webhook Base URL</Label>
                <div className="flex gap-2">
                  <Input value={n8nUrl} onChange={(e) => setN8nUrl(e.target.value)} className="h-12 bg-white/10 border-white/20 rounded-xl font-mono text-xs text-accent" />
                  <Button onClick={handleSave} className="h-12 bg-accent hover:bg-accent/80 text-white font-black text-[9px] uppercase px-6 rounded-xl">Set Node</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-sm overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-6">
                <CardTitle className="text-base font-black uppercase">Visual Architecture</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Primary Hub</Label>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary shadow-lg" />
                      <Input defaultValue="#1F5BA6" className="rounded-xl h-10 font-mono font-black text-xs text-center border-none bg-muted/20 shadow-inner" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-muted/30 border-b p-6">
                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Institutional Seal</CardTitle>
              </CardHeader>
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-6">
                <div className="h-32 w-32 rounded-[2rem] colorful-gradient flex items-center justify-center text-white shadow-xl group relative overflow-hidden transition-all hover:scale-105 border-4 border-white">
                  {logoPreview ? <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" /> : <ShieldCheck className="h-12 w-12" />}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-[8px] font-black uppercase">Replace</span>
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
