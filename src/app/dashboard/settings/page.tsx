
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Building2, 
  Save,
  Upload,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Trash2,
  Globe,
  Settings as SettingsIcon,
  Layout,
  Palette
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { cn } from "@/lib/utils"

const AVAILABLE_TIERS = [
  "Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6", "Standard 7",
  "Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"
]

export default function SettingsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [isResetting, setIsResetting] = useState(false)
  
  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity, isLoading } = useDoc(identityRef)

  const [formState, setFormState] = useState({
    name: "",
    systemName: "ShuleDirect",
    centerId: "",
    region: "Dar es Salaam",
    district: "Kinondoni",
    address: "",
    contactPhone: "",
    contactEmail: "",
    tiers: [] as string[],
    logo: ""
  })

  useEffect(() => {
    if (identity) {
      setFormState({
        name: identity.name || "",
        systemName: identity.systemName || "ShuleDirect",
        centerId: identity.centerId || "",
        region: identity.region || "Dar es Salaam",
        district: identity.district || "Kinondoni",
        address: identity.address || "",
        contactPhone: identity.contactPhone || "",
        contactEmail: identity.contactEmail || "",
        tiers: identity.tiers || ["Standard 7", "Form 2"],
        logo: identity.logo || ""
      })
    }
  }, [identity])

  const handleSave = () => {
    setDocumentNonBlocking(identityRef, formState, { merge: true })
    toast({ title: "Institutional Node Synced", description: "Global configurations updated permanently." })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormState({ ...formState, logo: reader.result as string })
      toast({ title: "Visual Node Ready", description: "Logo captured. Click sync to finalize." })
    }
    reader.readAsDataURL(file)
  }

  const toggleTier = (tier: string) => {
    setFormState(prev => {
      const tiers = prev.tiers.includes(tier)
        ? prev.tiers.filter(t => t !== tier)
        : [...prev.tiers, tier]
      return { ...prev, tiers }
    })
  }

  if (isLoading) {
    return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto h-10 w-10 text-primary" /></div>
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">Institutional Control Node</h1>
          <p className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">Global Administrative Hub 2026</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleSave} className="flex-1 sm:flex-none font-black rounded-full colorful-gradient h-11 px-8 shadow-xl text-[9px] uppercase tracking-widest group">
            <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Sync Global Node
          </Button>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full flex h-auto gap-1 border border-muted/50 px-1 overflow-x-auto">
          <TabsTrigger value="identity" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Identity Hub</TabsTrigger>
          <TabsTrigger value="academic" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Tier Config</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b p-8">
              <CardTitle className="text-base font-black uppercase tracking-tight">Institutional Profile</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase">Legal metadata for official documentation</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Legal School Name</Label>
                  <Input 
                    value={formState.name} 
                    onChange={(e) => setFormState({...formState, name: e.target.value})} 
                    placeholder="e.g. Centennial Christian Seminary"
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5 uppercase" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Center ID</Label>
                  <Input 
                    value={formState.centerId} 
                    onChange={(e) => setFormState({...formState, centerId: e.target.value})} 
                    placeholder="e.g. S4939"
                    className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner px-5" 
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Administrative Region</Label>
                  <Input 
                    value={formState.region} 
                    onChange={(e) => setFormState({...formState, region: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">District</Label>
                  <Input 
                    value={formState.district} 
                    onChange={(e) => setFormState({...formState, district: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Physical Address</Label>
                  <Input 
                    value={formState.address} 
                    onChange={(e) => setFormState({...formState, address: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Official Contact</Label>
                  <Input 
                    value={formState.contactPhone} 
                    onChange={(e) => setFormState({...formState, contactPhone: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-muted/20 border-b p-8">
              <CardTitle className="text-lg font-black uppercase">Academic Tier Hub</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase">Define active levels for this institution</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {AVAILABLE_TIERS.map((tier) => (
                  <div key={tier} className={cn(
                    "flex items-center space-x-3 p-4 rounded-2xl transition-all border-2",
                    formState.tiers.includes(tier) ? "border-primary bg-primary/5" : "border-transparent bg-muted/20"
                  )}>
                    <Checkbox 
                      id={`tier-${tier}`} 
                      checked={formState.tiers.includes(tier)}
                      onCheckedChange={() => toggleTier(tier)}
                    />
                    <Label htmlFor={`tier-${tier}`} className="text-[10px] font-black uppercase tracking-tighter cursor-pointer">{tier}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-accent/5 border-b p-8">
              <CardTitle className="text-lg font-black uppercase">Visual Identity Hub</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase">Institutional logo & dashboard palette</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="h-40 w-40 rounded-[3rem] border-4 border-white shadow-2xl bg-muted/30 flex items-center justify-center overflow-hidden group relative">
                  {formState.logo ? (
                    <img src={formState.logo} alt="School Logo" className="h-full w-full object-cover" />
                  ) : (
                    <Building2 className="h-16 w-16 text-muted-foreground/20" />
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                    <Upload className="h-8 w-8 text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-black text-xl uppercase tracking-tighter">Institutional Seal</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed max-w-sm">
                      Upload a high-resolution seal. This will be used on all official transcripts, letters, and the dashboard loader.
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-full h-10 px-6 font-black text-[9px] uppercase border-primary/20 text-primary">
                    Verify Scalability
                  </Button>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-primary/5 border-2 border-dashed border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Palette className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase">System Branding Node</p>
                    <p className="text-xs font-bold text-primary/60">Inherits sovereign blue and violet by default.</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-white font-black text-[8px] px-4 py-1 rounded-full uppercase">Standard 2026</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
