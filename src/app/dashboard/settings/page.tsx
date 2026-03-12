
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
  Palette,
  Upload,
  Image as ImageIcon,
  HelpCircle,
  BookOpen,
  Mail,
  Video
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
  { name: "Mwl. Juma", role: "Math Teacher", key: "MATH101", status: "Active" },
  { name: "Mwl. Neema", role: "English Teacher", key: "ENG202", status: "Active" },
  { name: "Bursar Keshia", role: "Bursar", key: "BURSAR789", status: "Active" },
  { name: "Mwl. Peter", role: "Physics Teacher", key: "PHY404", status: "Active" },
]

export default function SettingsPage() {
  const { toast } = useToast()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "School metadata and branding saved successfully.",
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
      toast({
        title: "Logo Uploaded",
        description: "Institutional branding updated.",
      })
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Admin Control Panel</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage institutional identity, security keys, and compliance.</p>
        </div>
        <Button onClick={handleSave} className="font-bold rounded-full colorful-gradient h-11 px-8 shadow-lg w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> Save Configuration
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl overflow-x-auto w-full flex h-auto gap-1">
          <TabsTrigger value="school" className="gap-2 rounded-lg font-bold flex-1 py-2">School Info</TabsTrigger>
          <TabsTrigger value="branding" className="gap-2 rounded-lg font-bold flex-1 py-2 text-accent">Branding</TabsTrigger>
          <TabsTrigger value="staff" className="gap-2 rounded-lg font-bold flex-1 py-2">Personnel</TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 rounded-lg font-bold flex-1 py-2">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg">Institutional Identity</CardTitle>
              <CardDescription>Primary metadata used for official NECTA and PReMS reporting.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Official School Name</Label>
                  <Input defaultValue="Mlimani Academy Secondary School" className="rounded-xl h-12 bg-muted/20 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">NECTA Center Number</Label>
                  <Input defaultValue="S.1234" className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Official Website URL</Label>
                  <Input defaultValue="https://www.mlimani.ac.tz" className="rounded-xl h-12 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Physical Address</Label>
                  <Input defaultValue="Mlimani St, Dar Es Salaam" className="rounded-xl h-12 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Principal's Office Contact</Label>
                  <Input defaultValue="+255 22 2410 500" className="rounded-xl h-12 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Default Currency</Label>
                  <Select defaultValue="TZS">
                    <SelectTrigger className="rounded-xl h-12 bg-muted/20 border-none font-bold"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="TZS">Tanzanian Shilling (TZS)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-accent/5 border-b border-accent/10">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" /> Visual Theme
                </CardTitle>
                <CardDescription>Customize colors used across dashboards and generated reports.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Brand Color</Label>
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary shadow-lg ring-4 ring-white" />
                      <Input defaultValue="#1F5BA6" className="rounded-xl h-12 font-mono font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Accent Color</Label>
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded-xl bg-accent shadow-lg ring-4 ring-white" />
                      <Input defaultValue="#945CE6" className="rounded-xl h-12 font-mono font-bold" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Font Families</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select defaultValue="space-grotesk">
                      <SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Headline Font" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="space-grotesk">Space Grotesk (Modern)</SelectItem>
                        <SelectItem value="inter">Inter (Professional)</SelectItem>
                        <SelectItem value="lexend">Lexend (Accessible)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="inter">
                      <SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Body Font" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="open-sans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden flex flex-col">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">School Logo</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="h-32 w-32 rounded-[2rem] colorful-gradient flex items-center justify-center text-white shadow-xl group relative overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <ShieldCheck className="h-16 w-16" />
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="h-8 w-8 text-white" />
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold">Official Seal</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Recommended: 512x512 PNG</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl h-11 border-dashed text-xs font-bold" asChild>
                  <label className="cursor-pointer">
                    <ImageIcon className="h-4 w-4 mr-2" /> Upload New Seal
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/20 border-b">
              <div>
                <CardTitle className="text-lg">Personnel Access Hub</CardTitle>
                <CardDescription>Manage teacher subject keys and career roles.</CardDescription>
              </div>
              <Button size="sm" className="rounded-full h-9 font-bold colorful-gradient px-6 shadow-md">
                <Plus className="mr-2 h-4 w-4" /> Issue Key
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/5 border-none">
                    <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Personnel Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned Role</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Key</TableHead>
                    <TableHead className="text-right pr-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Management</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffKeys.map((staff) => (
                    <TableRow key={staff.key} className="hover:bg-muted/10 border-none transition-colors">
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{staff.name}</p>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none py-0 h-4 text-[8px] font-black tracking-widest">ACTIVE</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{staff.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px] font-black tracking-[0.2em] bg-white border-muted shadow-sm px-3 py-1">{staff.key}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/5 rounded-full">
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

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">Data Protection (PDPA)</CardTitle>
                  </div>
                  <Badge className="bg-green-600 text-white hover:bg-green-600 border-none font-black text-[9px]">VERIFIED</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Data Protection Officer (DPO)</Label>
                    <Input defaultValue="Mwl. Richard Mrema" className="rounded-xl h-11 bg-muted/20 border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">PDPC Registration No.</Label>
                    <Input defaultValue="PDPC-REG-2024-00451" className="rounded-xl h-11 bg-muted/20 border-none font-mono font-bold" />
                  </div>
                </div>
                <Separator />
                <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/20 space-y-3">
                  <div className="flex items-center gap-2 font-black text-xs text-primary uppercase tracking-widest">
                    <LockKeyhole className="h-4 w-4" /> Sovereignty Audit
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    Strict isolation of minor records enabled. All staff access is logged per Tanzania Act No. 11 of 2022.
                  </p>
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch id="audit-log" defaultChecked />
                    <Label htmlFor="audit-log" className="text-[10px] font-black uppercase tracking-widest">Enhanced Logging</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-accent/5 overflow-hidden">
              <CardHeader className="border-b border-accent/10">
                <CardTitle className="text-lg">System Health & Latency</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-accent/10 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Primary Node</p>
                    <p className="text-sm font-bold">South Africa (Johannesburg)</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-700 border-none text-[10px] font-black">12ms</Badge>
                </div>
                
                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Security Policies</h4>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border">
                    <span className="text-xs font-bold">Multi-Factor Auth (MFA)</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border">
                    <span className="text-xs font-bold">Auto-Session Timeout (15m)</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border">
                    <span className="text-xs font-bold">Block VPN Access</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
