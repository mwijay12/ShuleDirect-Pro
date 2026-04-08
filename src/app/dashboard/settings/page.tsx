
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
  AlertCircle,
  Building2,
  Database
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
  const [schoolName, setSchoolName] = useState("Doris Primary School")
  const [systemName, setSystemName] = useState("ShuleDirect")
  const [systemVersion, setSystemVersion] = useState("2.0.26")
  const [centerNo, setCenterNo] = useState("PS0206098")
  const [region, setRegion] = useState("Dar es Salaam")
  const [district, setDistrict] = useState("Kinondoni")
  const [n8nUrl, setN8nUrl] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)
  
  const [staff, setStaff] = useState([
    { id: "STAFF-001", name: "Institutional Administrator", email: "admin@shule.pro", role: "ADMIN", status: "Active" },
    { id: "STAFF-002", name: "Lead Bursar Hub", email: "bursar@shule.pro", role: "BURSAR", status: "Active" },
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
    toast({ title: "Sovereign Node Synced", description: "Institutional configurations updated for 2026 Season." })
    setTimeout(() => window.location.reload(), 1000)
  }

  const handleResetSystem = () => {
    setIsResetting(true)
    setTimeout(() => {
      localStorage.clear()
      toast({ title: "Fresh Start Node Activated", description: "All demo data cleared. Initializing global reset..." })
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
        toast({ title: "Institutional Branding Node Refreshed", description: "Logo synchronized across 2026 Hub." });
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
    toast({ title: "Personnel Authorized", description: `${newStaff.name} access key enabled.` })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">System Control Node</h1>
          <p className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">Global Administrative Hub 2026 • Sovereign Architecture</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full h-11 px-6 border-destructive/20 text-destructive hover:bg-destructive/5 font-black text-[9px] uppercase shadow-sm">
                <RefreshCw className="mr-2 h-3.5 w-3.5" /> Fresh Start
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] max-w-md border-none shadow-2xl">
              <DialogHeader className="text-center">
                <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-4 shadow-inner">
                  <AlertCircle className="h-7 w-7" />
                </div>
                <DialogTitle className="text-xl font-black uppercase">Initialize Global Reset?</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-destructive/60">This will purge all demo data and reset institutional nodes.</DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-4 px-2">
                <p className="text-xs font-bold text-muted-foreground text-center leading-relaxed uppercase tracking-tighter">Are you sure you want to purge the current session? This action is irreversible for the current sovereign client node.</p>
                <Button onClick={handleResetSystem} disabled={isResetting} variant="destructive" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase shadow-xl group">
                  {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Purge Node"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave} className="flex-1 sm:flex-none font-black rounded-full colorful-gradient h-11 px-8 shadow-xl text-[9px] uppercase tracking-widest group">
            <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Sync Institutional Node
          </Button>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl overflow-x-auto w-full flex h-auto gap-1 shadow-inner border border-muted/50 px-1">
          <TabsTrigger value="school" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">IDENTITY HUB</TabsTrigger>
          <TabsTrigger value="staff" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">PERSONNEL HUB</TabsTrigger>
          <TabsTrigger value="automation" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">WORKFLOW HUB</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">BRANDING NODE</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <AnimatedContent distance={20}>
            <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-primary/5">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base font-black uppercase tracking-tight">Institutional Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Legal School Name</Label>
                    <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Center ID</Label>
                    <Input value={centerNo} onChange={(e) => setCenterNo(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner px-5" />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Administrative Region</Label>
                    <Input value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Administrative District</Label>
                    <Input value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>

          <AnimatedContent distance={20} delay={0.1}>
            <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-accent border border-accent/5">
                    <Layout className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base font-black uppercase tracking-tight">Software Node Matrix</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Product ID</Label>
                    <Input value={systemName} onChange={(e) => setSystemName(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Sovereign Version</Label>
                    <Input value={systemVersion} onChange={(e) => setSystemVersion(e.target.value)} className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner px-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-muted/20 border-b p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Personnel Ledger</CardTitle>
                <CardDescription className="text-[9px] font-black uppercase tracking-widest text-primary/60">Manage institutional access keys for the 2026 cycle</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full h-12 px-8 colorful-gradient font-black text-[10px] uppercase shadow-xl group">
                    <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Enroll Personnel
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] max-w-md border-none shadow-2xl">
                  <DialogHeader className="bg-primary/5 p-8 border-b">
                    <DialogTitle className="text-xl font-black text-primary uppercase">Staff Node Registry</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddStaff} className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Full Legal Name</Label>
                      <Input name="name" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Institutional Email</Label>
                      <Input name="email" type="email" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Role Hub</Label>
                      <Select name="role" defaultValue="TEACHER">
                        <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner px-5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="ADMIN">ADMINISTRATOR</SelectItem>
                          <SelectItem value="TEACHER">TEACHER NODE</SelectItem>
                          <SelectItem value="BURSAR">BURSAR HUB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">Authorize Access Hub</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-none h-14">
                    <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest">Full Name Node</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest">Authorization Hub</TableHead>
                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((s) => (
                    <TableRow key={s.id} className="border-b last:border-none group hover:bg-primary/[0.02] transition-colors">
                      <TableCell className="pl-10 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground/80 group-hover:text-primary transition-colors">{s.name}</span>
                          <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">{s.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary px-4 py-1">
                          {s.role} NODE
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
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
          <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem] bg-slate-950 text-white">
            <CardHeader className="border-b border-white/10 p-10 bg-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Database className="h-40 w-40 rotate-12" />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center text-white shadow-[0_0_30px_rgba(148,92,230,0.3)]">
                  <Terminal className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">n8n Sovereign Workflow Hub</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">Institutional Automated Dispatch Node</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-4 max-w-2xl">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Webhook Sovereign URL</Label>
                <div className="flex gap-3">
                  <Input value={n8nUrl} onChange={(e) => setN8nUrl(e.target.value)} className="h-14 bg-white/10 border-white/20 rounded-2xl font-mono text-xs text-accent px-6 shadow-inner focus-visible:ring-accent/30" placeholder="https://n8n.yourdomain.com/webhook/..." />
                  <Button onClick={handleSave} className="h-14 bg-accent hover:bg-accent/80 text-white font-black text-[10px] uppercase px-10 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">Set Node</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Fee Trigger", path: "/fee-payment", icon: Banknote },
                  { label: "Attendance Node", path: "/attendance-sync", icon: ShieldCheck },
                  { label: "Transport Dispatch", path: "/fleet-dispatch", icon: Bus },
                ].map((hook) => (
                  <div key={hook.label} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center gap-4 group hover:bg-white/10 transition-all cursor-pointer shadow-inner">
                    <hook.icon className="h-6 w-6 text-accent/60 group-hover:text-accent group-hover:scale-110 transition-all" />
                    <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{hook.label}</p>
                      <code className="text-[8px] font-mono text-accent/80">{hook.path}</code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-8">
                <CardTitle className="text-base font-black uppercase tracking-tight">Visual Architecture</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">Primary Sovereign Hue</Label>
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-2xl bg-primary shadow-2xl border-4 border-white" />
                      <Input defaultValue="#1F5BA6" className="rounded-xl h-12 font-mono font-black text-xs text-center border-none bg-muted/20 shadow-inner px-5" />
                    </div>
                  </div>
                  <div className="p-6 bg-muted/10 rounded-[2rem] border-2 border-dashed border-accent/10 flex items-center justify-center text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-tighter">Colors are rigidly synchronized across all institutional matrices.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-muted/30 border-b p-8">
                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Institutional Hub Seal</CardTitle>
              </CardHeader>
              <CardContent className="p-10 flex flex-col items-center justify-center space-y-8">
                <div className="h-40 w-40 rounded-[3rem] colorful-gradient flex items-center justify-center text-white shadow-2xl group relative overflow-hidden transition-all hover:scale-105 border-8 border-white">
                  {logoPreview ? <img src={logoPreview} alt="Sovereign Seal" className="h-full w-full object-cover" /> : <ShieldCheck className="h-16 w-16" />}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white backdrop-blur-sm">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Replace Node</span>
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">Official Audit Seal</p>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">High-Fidelity Rendering Active</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
