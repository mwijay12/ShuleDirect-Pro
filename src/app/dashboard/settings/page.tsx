"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Settings, 
  School, 
  Users, 
  Shield, 
  Smartphone,
  Save,
  Plus,
  Trash2,
  ShieldCheck,
  Palette,
  Upload,
  Image as ImageIcon,
  Zap,
  Star,
  Instagram,
  Terminal,
  Webhook,
  Activity,
  Bot,
  Layout,
  UserPlus,
  ShieldAlert
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
  const [n8nUrl, setN8nUrl] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
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
    
    if (savedName) setSchoolName(savedName)
    if (savedSystemName) setSystemName(savedSystemName)
    if (savedVersion) setSystemVersion(savedVersion)
    if (savedN8n) setN8nUrl(savedN8n)
    if (savedLogo) setLogoPreview(savedLogo)
  }, [])

  const handleSave = () => {
    localStorage.setItem("shule_name", schoolName)
    localStorage.setItem("shule_system_name", systemName)
    localStorage.setItem("shule_version", systemVersion)
    localStorage.setItem("shule_n8n_url", n8nUrl)
    toast({
      title: "System Node Synced",
      description: `Institutional configurations updated successfully.`,
    })
    setTimeout(() => window.location.reload(), 1000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        localStorage.setItem("shule_logo", base64);
        toast({
          title: "Logo Uploaded",
          description: "Institutional branding refreshed.",
        });
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
    <div className="space-y-6 max-w-6xl mx-auto pb-24 font-body animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-headline font-black text-primary tracking-tight uppercase">System Control Node</h1>
          <p className="text-muted-foreground font-medium text-[9px] uppercase tracking-widest">Global Administrative Hub 2026</p>
        </div>
        <Button onClick={handleSave} className="font-black rounded-full colorful-gradient h-11 px-8 shadow-lg w-full sm:w-auto text-[9px] uppercase tracking-widest group">
          <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Sync Institutional Node
        </Button>
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
                  <div>
                    <CardTitle className="text-base font-black">Institutional Identity</CardTitle>
                    <CardDescription className="text-[9px] font-black uppercase tracking-widest text-primary/60">Official school credentials for the 2026 season</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">Official School Name</Label>
                    <Input 
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="rounded-xl h-12 bg-muted/20 border-none font-black text-sm px-5 shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">NECTA Center Number</Label>
                    <Input defaultValue="S.1234" className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary px-5 shadow-inner" />
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
                  <div>
                    <CardTitle className="text-base font-black">White-label Controls</CardTitle>
                    <CardDescription className="text-[9px] font-black uppercase tracking-widest text-accent/60">Customize system-wide product branding</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">Product/System Name</Label>
                    <Input 
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                      placeholder="e.g. ShuleDirect"
                      className="rounded-xl h-12 bg-muted/20 border-none font-black text-sm px-5 shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">System Version Node</Label>
                    <Input 
                      value={systemVersion}
                      onChange={(e) => setSystemVersion(e.target.value)}
                      className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary px-5 shadow-inner" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <AnimatedContent distance={20}>
            <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-muted/20 border-b p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <CardTitle className="text-xl font-black">Staff Personnel Registry</CardTitle>
                  <CardDescription className="text-[9px] font-black uppercase tracking-widest">Manage institutional access keys for 2026</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-full h-12 px-8 colorful-gradient font-black text-[10px] uppercase tracking-widest shadow-xl group">
                      <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Enroll Personnel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-w-md">
                    <DialogHeader className="bg-primary/5 p-8 border-b">
                      <DialogTitle className="text-xl font-black text-primary uppercase">New Staff Node</DialogTitle>
                      <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">Register institutional staff member</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddStaff} className="p-8 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground">Full Legal Name</Label>
                        <Input name="name" placeholder="e.g. Bakari Said" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground">Institutional Email</Label>
                        <Input name="email" type="email" placeholder="staff@shule.pro" required className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground">Assigned Node/Role</Label>
                        <Select name="role" defaultValue="TEACHER">
                          <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold shadow-inner">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="ADMIN">Administrator</SelectItem>
                            <SelectItem value="BURSAR">Bursar/Accounts</SelectItem>
                            <SelectItem value="TEACHER">Teaching Staff</SelectItem>
                            <SelectItem value="WARDEN">Hostel Warden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full h-14 rounded-2xl colorful-gradient font-black text-xs uppercase shadow-2xl">
                          Authorize Staff Access
                        </Button>
                      </DialogFooter>
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
                      <TableHead className="text-[9px] font-black uppercase tracking-widest">Credential</TableHead>
                      <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Control</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((s) => (
                      <TableRow key={s.id} className="group hover:bg-primary/[0.02] border-b last:border-none transition-colors">
                        <TableCell className="pl-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-sm text-foreground/80">{s.name}</span>
                            <span className="text-[9px] text-muted-foreground font-mono font-black uppercase">{s.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full font-black text-[8px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary px-3 py-0.5">
                            {s.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-medium text-muted-foreground">{s.email}</TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AnimatedContent>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <AnimatedContent distance={20}>
            <Card className="border-none shadow-sm overflow-hidden rounded-[2rem] bg-slate-950 text-white">
              <CardHeader className="border-b border-white/10 p-6 bg-white/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                      <Terminal className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-black">n8n Workflow Hub</CardTitle>
                      <CardDescription className="text-[9px] font-black uppercase tracking-widest text-white/40">Real Webhook Integration — Mwijay Edition</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-none font-black text-[9px] px-3 h-6 rounded-full animate-pulse-soft">FIREBASE SYNC</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4 max-w-2xl">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/60">Webhook Base URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={n8nUrl}
                      onChange={(e) => setN8nUrl(e.target.value)}
                      placeholder="https://n8n.yourdomain.com/webhook" 
                      className="h-12 bg-white/10 border-white/20 rounded-xl font-mono text-xs text-accent"
                    />
                    <Button onClick={handleSave} className="h-12 bg-accent hover:bg-accent/80 text-white font-black text-[9px] uppercase px-6 rounded-xl">Set Node</Button>
                  </div>
                  <p className="text-[9px] text-white/40 font-medium italic">Your institutional n8n production webhook URL. Firebase functions will trigger these nodes automatically.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: "Student Entry", icon: Webhook, status: "Ready", hook: "student-registered" },
                    { label: "Results Audit", icon: Zap, status: "Ready", hook: "grades-uploaded" },
                    { label: "Staff Login", icon: Activity, status: "Ready", hook: "staff-login" },
                  ].map((node, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <node.icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{node.label}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <code className="text-[9px] font-mono text-white/40 truncate mr-2">/{node.hook}</code>
                        <Badge variant="outline" className="text-[8px] font-black border-white/20 text-green-400 h-4">{node.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-sm overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-6">
                <CardTitle className="text-base font-black">Visual System Architecture</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Brand Primary Hub</Label>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary shadow-lg ring-2 ring-white" />
                      <Input defaultValue="#1F5BA6" className="rounded-xl h-10 font-mono font-black text-xs text-center border-none bg-muted/20 shadow-inner" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Brand Accent Node</Label>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent shadow-lg ring-2 ring-white" />
                      <Input defaultValue="#945CE6" className="rounded-xl h-10 font-mono font-black text-xs text-center border-none bg-muted/20 shadow-inner" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden flex flex-col rounded-[2rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-muted/30 border-b p-6">
                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Institutional Seal</CardTitle>
              </CardHeader>
              <CardContent className="p-8 flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="h-32 w-32 rounded-[2rem] colorful-gradient flex items-center justify-center text-white shadow-xl group relative overflow-hidden transition-all hover:scale-105 border-4 border-white">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <ShieldCheck className="h-12 w-12" />
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Replace</span>
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
                <Button variant="outline" className="w-full rounded-full h-10 border-dashed border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary h-10" asChild>
                  <label className="cursor-pointer">
                    <ImageIcon className="h-4 w-4 mr-2" /> Upload Seal Node
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
