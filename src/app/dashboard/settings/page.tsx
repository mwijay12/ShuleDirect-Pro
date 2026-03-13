"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Settings, 
  School, 
  Calendar, 
  Users, 
  Shield, 
  Smartphone,
  Globe,
  Save,
  FileLock,
  LockKeyhole,
  Key,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Upload,
  Image as ImageIcon,
  HelpCircle,
  BookOpen,
  Mail,
  Video,
  Zap,
  MessageCircle,
  Share2,
  Layout,
  Star,
  Instagram
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
import { Separator } from "@/components/ui/separator"

const staffKeys = [
  { name: "Admin Lead", role: "Administrator", key: "ADM-990", status: "Active", email: "admin@shule.pro" },
  { name: "Mwl. Juma", role: "Math Teacher", key: "MATH101", status: "Active", email: "teacher.juma@shule.pro" },
  { name: "Mwl. Neema", role: "English Teacher", key: "ENG202", status: "Active", email: "teacher.neema@shule.pro" },
  { name: "Bursar Keshia", role: "Bursar", key: "BURSAR789", status: "Active", email: "bursar@shule.pro" },
]

export default function SettingsPage() {
  const { toast } = useToast()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
  const handleSave = () => {
    toast({
      title: "System Synced",
      description: "Omnichannel configurations & branding updated for 2026.",
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
      toast({
        title: "Logo Uploaded",
        description: "Institutional branding refreshed.",
      })
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-24 font-body animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-primary tracking-tight">Admin Control Panel</h1>
          <p className="text-muted-foreground font-medium text-sm">Manage identity, 2026 compliance, and Omnichannel gateways.</p>
        </div>
        <Button onClick={handleSave} className="font-black rounded-full colorful-gradient h-14 px-10 shadow-[0_15px_30px_rgba(31,91,166,0.25)] w-full sm:w-auto text-xs uppercase tracking-widest group">
          <Save className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Save System Config
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-8">
        <TabsList className="bg-muted/40 p-1.5 rounded-2xl overflow-x-auto w-full flex h-auto gap-1 shadow-inner border border-muted">
          <TabsTrigger value="school" className="gap-2 rounded-xl font-black text-[10px] flex-1 py-3 uppercase tracking-widest">IDENTITY</TabsTrigger>
          <TabsTrigger value="branding" className="gap-2 rounded-xl font-black text-[10px] flex-1 py-3 uppercase tracking-widest text-accent">BRANDING</TabsTrigger>
          <TabsTrigger value="gateways" className="gap-2 rounded-xl font-black text-[10px] flex-1 py-3 uppercase tracking-widest text-orange-600">GATEWAYS</TabsTrigger>
          <TabsTrigger value="staff" className="gap-2 rounded-xl font-black text-[10px] flex-1 py-3 uppercase tracking-widest">STAFF</TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 rounded-xl font-black text-[10px] flex-1 py-3 uppercase tracking-widest">PDPA</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary">
                  <School className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Institutional Identity</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-primary/60">Official metadata for NECTA & PReMS 2026 reporting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3 px-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Official School Name</Label>
                  <Input defaultValue="Mlimani Academy Secondary School" className="rounded-2xl h-14 bg-muted/20 border-none font-black text-foreground/80 shadow-inner px-6" />
                </div>
                <div className="space-y-3 px-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">NECTA Center Number</Label>
                  <Input defaultValue="S.1234" className="rounded-2xl h-14 bg-muted/20 border-none font-mono font-black text-primary shadow-inner px-6" />
                </div>
                <div className="space-y-3 px-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Principal's Direct Line</Label>
                  <Input defaultValue="+255 22 2410 500" className="rounded-2xl h-14 bg-muted/20 border-none font-black shadow-inner px-6" />
                </div>
                <div className="space-y-3 px-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">System Currency</Label>
                  <Select defaultValue="TZS">
                    <SelectTrigger className="rounded-2xl h-14 bg-muted/20 border-none font-black shadow-inner px-6"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                      <SelectItem value="TZS">Tanzanian Shilling (TZS)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maker Credits - Redesigned Card */}
          <div className="pt-4">
            <Card className="p-10 rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-primary/20 shadow-inner group transition-all hover:border-primary/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Star className="h-48 w-48 rotate-12" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="space-y-6 max-w-md">
                  <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                    <Star className="h-5 w-5 fill-primary animate-pulse" /> System Architect Signature
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black leading-none text-foreground/80 group-hover:text-primary transition-colors">Davie Mwijage</p>
                    <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.3em]">Lead Engineer & Institutional Architect</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                    "Designing high-fidelity ecosystems that bridge the gap between Tanzanian institutional potential and digital excellence."
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-muted group-hover:border-primary/20 transition-all">
                    <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Mobile Node</span>
                      <span className="text-sm font-bold text-foreground/80">+255 620 641 695</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-muted group-hover:border-accent/20 transition-all">
                    <div className="h-10 w-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Global Identity</span>
                      <span className="text-sm font-bold text-foreground/80">@mwijay.davie</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-accent/5 border-b border-accent/10 p-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-accent">
                    <Palette className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black">Visual System</CardTitle>
                    <CardDescription className="text-[10px] font-black uppercase tracking-widest text-accent/60">Customize institutional presence across all hubs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Primary Brand HEX</Label>
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-primary shadow-2xl ring-4 ring-white animate-float" />
                      <Input defaultValue="#1F5BA6" className="rounded-2xl h-14 font-mono font-black shadow-inner bg-muted/20 border-none text-center" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Accent Brand HEX</Label>
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-accent shadow-2xl ring-4 ring-white animate-float delay-150" />
                      <Input defaultValue="#945CE6" className="rounded-2xl h-14 font-mono font-black shadow-inner bg-muted/20 border-none text-center" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Typography Stack</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select defaultValue="space-grotesk">
                      <SelectTrigger className="rounded-2xl h-14 bg-muted/20 border-none font-black shadow-inner px-6"><SelectValue placeholder="Headline Font" /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="space-grotesk">Space Grotesk (Modern)</SelectItem>
                        <SelectItem value="inter">Inter (Professional)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="inter">
                      <SelectTrigger className="rounded-2xl h-14 bg-muted/20 border-none font-black shadow-inner px-6"><SelectValue placeholder="Body Font" /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="inter">Inter Standard</SelectItem>
                        <SelectItem value="lexend">Lexend Accessible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl overflow-hidden flex flex-col rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-muted/30 border-b p-8">
                <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">System Seal</CardTitle>
              </CardHeader>
              <CardContent className="p-10 flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="h-44 w-44 rounded-[3rem] colorful-gradient flex items-center justify-center text-white shadow-[0_20px_50px_rgba(31,91,166,0.3)] group relative overflow-hidden transition-all hover:scale-105 duration-500">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <ShieldCheck className="h-20 w-20 animate-pulse-soft" />
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload className="h-10 w-10 mb-2" />
                    <span className="text-[10px] font-black uppercase">Replace Logo</span>
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-black text-foreground/80 uppercase tracking-widest">Institutional Seal</p>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">PNG • 512x512 Recommended</p>
                </div>
                <Button variant="outline" className="w-full rounded-[2rem] h-14 border-dashed border-primary/20 text-xs font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/5 shadow-sm" asChild>
                  <label className="cursor-pointer">
                    <ImageIcon className="h-5 w-5 mr-3" /> Select New File
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/20 border-b p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary">
                  <Layout className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Personnel Access Hub</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Manage role-based security keys & subject assignments</CardDescription>
                </div>
              </div>
              <Button size="sm" className="rounded-full h-12 font-black colorful-gradient px-8 shadow-xl text-[10px] uppercase tracking-widest group transition-all hover:scale-105">
                <Plus className="mr-2 h-5 w-5 group-hover:scale-110" /> Issue New Account
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/5 border-none h-14">
                    <TableHead className="pl-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Personnel Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Role</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Login Email</TableHead>
                    <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Management</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffKeys.map((staff) => (
                    <TableRow key={staff.key} className="hover:bg-primary/[0.02] border-none transition-all group">
                      <TableCell className="pl-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-[1.25rem] bg-white shadow-xl flex items-center justify-center text-primary font-black text-lg transition-transform group-hover:scale-110 border border-muted">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-sm text-foreground/80">{staff.name}</p>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none py-0.5 h-5 text-[8px] font-black tracking-widest mt-1">ACTIVE SESSION</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{staff.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px] font-bold text-muted-foreground lowercase">{staff.email}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/5">
                            <Zap className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive hover:bg-destructive/5 rounded-full">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md">
              <CardHeader className="bg-green-50 border-b border-green-100 p-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-green-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-black">Data Protection (PDPA)</CardTitle>
                  </div>
                  <Badge className="bg-green-600 text-white hover:bg-green-600 border-none font-black text-[9px] px-4 py-1 tracking-widest rounded-full shadow-lg">2026 AUDIT READY</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Data Protection Officer (DPO)</Label>
                    <Input defaultValue="Mwl. Richard Mrema" className="rounded-2xl h-14 bg-muted/20 border-none font-black shadow-inner px-6 text-foreground/80" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Official Registration No.</Label>
                    <Input defaultValue="PDPC-REG-2024-00451" className="rounded-2xl h-14 bg-muted/20 border-none font-mono font-black shadow-inner px-6 text-primary" />
                  </div>
                </div>
                <Separator className="bg-muted/50" />
                <div className="p-6 rounded-[2rem] bg-primary/5 border-2 border-dashed border-primary/20 space-y-4 shadow-inner">
                  <div className="flex items-center gap-3 font-black text-[10px] text-primary uppercase tracking-[0.2em]">
                    <LockKeyhole className="h-5 w-5 animate-pulse-soft" /> Data Sovereignty Compliance
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                    Strict isolation of minor records enabled. All staff actions are logged and archived per Tanzania Act No. 11 of 2022. Systems hosted on African Cloud Infrastructure.
                  </p>
                  <div className="flex items-center space-x-4 pt-2">
                    <Switch id="audit-log" defaultChecked />
                    <Label htmlFor="audit-log" className="text-[10px] font-black uppercase tracking-widest text-primary/80">Enhanced Forensic Logging</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-accent/5 overflow-hidden rounded-[2.5rem]">
              <CardHeader className="border-b border-accent/10 p-8">
                <CardTitle className="text-lg font-black text-accent uppercase tracking-widest">Network Health</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-10">
                <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white shadow-xl border border-accent/10">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-inner animate-float">
                    <Globe className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Primary Operation Node</p>
                    <p className="text-lg font-black text-foreground/80 tracking-tight">Dar Es Salaam (Main)</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none text-[10px] font-black px-4 py-1 rounded-full shadow-inner animate-pulse-soft">12ms</Badge>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Security Polices</h4>
                  {[
                    { label: "10m Auto-Logout Session", active: true },
                    { label: "Email/Password MFA", active: true },
                    { label: "SMS Verification for PReMS", active: true },
                    { label: "Block International VPNs", active: false },
                  ].map((policy, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/60 backdrop-blur-sm border shadow-sm group hover:border-accent/20 transition-all">
                      <span className="text-xs font-black text-foreground/70 uppercase tracking-widest">{policy.label}</span>
                      <Switch defaultChecked={policy.active} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
