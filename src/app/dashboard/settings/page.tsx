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
  Layout
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

export default function SettingsPage() {
  const { toast } = useToast()
  const [schoolName, setSchoolName] = useState("Mlimani Secondary School")
  const [systemName, setSystemName] = useState("ShuleDirect")
  const [systemVersion, setSystemVersion] = useState("2.0.26")
  const [n8nUrl, setN8nUrl] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
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
    // Reload to propagate changes globally (system name etc)
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 font-body animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-headline font-black text-primary tracking-tight">System Settings</h1>
          <p className="text-muted-foreground font-medium text-[9px] uppercase tracking-widest">Global Administrative Controls 2026</p>
        </div>
        <Button onClick={handleSave} className="font-black rounded-full colorful-gradient h-11 px-8 shadow-lg w-full sm:w-auto text-[9px] uppercase tracking-widest group">
          <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Sync Node
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-xl overflow-x-auto w-full flex h-auto gap-1 shadow-inner border border-muted">
          <TabsTrigger value="school" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">IDENTITY</TabsTrigger>
          <TabsTrigger value="automation" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest text-accent">AUTOMATION</TabsTrigger>
          <TabsTrigger value="staff" className="rounded-lg font-black text-[9px] flex-1 py-2.5 uppercase tracking-widest">PERSONNEL</TabsTrigger>
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
                      className="rounded-xl h-12 bg-muted/20 border-none font-black text-sm px-5" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">NECTA Center Number</Label>
                    <Input defaultValue="S.1234" className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary px-5" />
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
                      className="rounded-xl h-12 bg-muted/20 border-none font-black text-sm px-5" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">System Version Node</Label>
                    <Input 
                      value={systemVersion}
                      onChange={(e) => setSystemVersion(e.target.value)}
                      className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary px-5" 
                    />
                  </div>
                </div>
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
                  <Badge className="bg-green-500 text-white border-none font-black text-[9px] px-3 h-6 rounded-full animate-pulse-soft">REAL SYNC</Badge>
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
                  <p className="text-[9px] text-white/40 font-medium italic">Example: Your n8n production webhook URL (without the path). PATHS like 'student-registered' are appended automatically.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: "Student Registration", icon: Webhook, status: "Ready", hook: "student-registered" },
                    { label: "Grade Automation", icon: Zap, status: "Ready", hook: "grades-uploaded" },
                    { label: "Attendance Node", icon: Activity, status: "Ready", hook: "attendance-update" },
                    { label: "Dormitory Alerts", icon: Activity, status: "Ready", hook: "dormitory-alert" },
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
                <CardTitle className="text-base font-black">Visual System</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Brand Primary</Label>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary shadow-lg ring-2 ring-white" />
                      <Input defaultValue="#1F5BA6" className="rounded-xl h-10 font-mono font-black text-xs text-center border-none bg-muted/20" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Brand Accent</Label>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent shadow-lg ring-2 ring-white" />
                      <Input defaultValue="#945CE6" className="rounded-xl h-10 font-mono font-black text-xs text-center border-none bg-muted/20" />
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
                <div className="h-32 w-32 rounded-[2rem] colorful-gradient flex items-center justify-center text-white shadow-xl group relative overflow-hidden transition-all hover:scale-105">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <ShieldCheck className="h-12 w-12" />
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-[8px] font-black uppercase">Replace</span>
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
                <Button variant="outline" className="w-full rounded-full h-10 border-dashed border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary h-10" asChild>
                  <label className="cursor-pointer">
                    <ImageIcon className="h-4 w-4 mr-2" /> Upload File
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