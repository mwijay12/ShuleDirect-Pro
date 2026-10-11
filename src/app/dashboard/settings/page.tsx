
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Building2, 
  Save,
  Upload,
  ShieldCheck,
  Loader2,
  Zap,
  Network
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useIntegrations } from "@/hooks/use-integrations"
import { cn } from "@/lib/utils"

const AVAILABLE_TIERS = [
  "Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6", "Standard 7",
  "Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"
]

export default function SettingsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { config, updateConfig, loading: integrationsLoading } = useIntegrations()
  
  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity, isLoading } = useDoc(identityRef)

  const [formState, setFormState] = useState({
    name: "",
    systemName: "Shule Altra",
    centerId: "",
    region: "Dar es Salaam",
    district: "Kinondoni",
    address: "",
    contactPhone: "",
    contactEmail: "",
    tiers: [] as string[],
    logo: "",
    demoMode: false,
  })

  const [n8nUrl, setN8nUrl] = useState("")
  const [n8nEnabled, setN8nEnabled] = useState(false)

  useEffect(() => {
    if (identity) {
      setFormState({
        name: identity.name || "",
        systemName: identity.systemName || "Shule Altra",
        centerId: identity.centerId || "",
        region: identity.region || "Dar es Salaam",
        district: identity.district || "Kinondoni",
        address: identity.address || "",
        contactPhone: identity.contactPhone || "",
        contactEmail: identity.contactEmail || "",
        tiers: identity.tiers || ["Standard 7", "Form 2"],
        logo: identity.logo || "",
        demoMode: identity.demoMode || false,
      })
    }
  }, [identity])

  useEffect(() => {
    if (config) {
      setN8nUrl(config.n8nWebhookUrl)
      setN8nEnabled(config.n8nEnabled)
    }
  }, [config])

  const handleSaveIdentity = () => {
    try {
      setDocumentNonBlocking(identityRef, formState, { merge: true })
      toast({ 
        title: "Identity Hub Synchronized", 
        description: "Global institutional configurations updated permanently." 
      })
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed", description: "Could not save identity changes." })
    }
  }

  const handleSaveIntegrations = async () => {
    try {
      await updateConfig({
        n8nWebhookUrl: n8nUrl,
        n8nEnabled: n8nEnabled
      });
      toast({ title: "Automation Node Secure", description: "Integrations updated in the secure vault." })
    } catch (e: any) {
      toast({ variant: "destructive", title: "Vault Error", description: e.message })
    }
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

  if (isLoading || integrationsLoading) {
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Configuration Node...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 px-1 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full">
            <Zap className="h-2.5 w-2.5 mr-1.5" /> Institutional Hub 2026
          </Badge>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">System Control Node</h1>
          <p className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">Manage institutional identity and orchestration mode.</p>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full flex h-auto gap-1 border border-muted/50 px-1 overflow-x-auto shadow-inner">
          <TabsTrigger value="identity" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">Identity Hub</TabsTrigger>
          <TabsTrigger value="academic" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">Tier Config</TabsTrigger>
          <TabsTrigger value="automation" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">Automation</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase tracking-widest">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-black uppercase tracking-widest">Legal Profile</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase">Institutional metadata for national assessments</CardDescription>
                </div>
                <Button onClick={handleSaveIdentity} className="rounded-full colorful-gradient h-10 px-6 text-[9px] uppercase font-black shadow-lg">Sync Identity</Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Official Institution Name</Label>
                  <Input 
                    value={formState.name} 
                    onChange={(e) => setFormState({...formState, name: e.target.value.toUpperCase()})} 
                    placeholder="e.g. CENTENNIAL CHRISTIAN SEMINARY"
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5 uppercase" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Center Number</Label>
                  <Input 
                    value={formState.centerId} 
                    onChange={(e) => setFormState({...formState, centerId: e.target.value.toUpperCase()})} 
                    placeholder="e.g. S4939"
                    className="rounded-xl h-12 bg-muted/20 border-none font-mono font-black text-primary shadow-inner px-5" 
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">National Region</Label>
                  <Input 
                    value={formState.region} 
                    onChange={(e) => setFormState({...formState, region: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Administrative District</Label>
                  <Input 
                    value={formState.district} 
                    onChange={(e) => setFormState({...formState, district: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-muted/20 border-b p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest">Tier Architecture</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase">Activate academic levels for the 2026 season</CardDescription>
                </div>
                <Button onClick={handleSaveIdentity} className="rounded-full colorful-gradient h-10 px-6 text-[9px] uppercase font-black shadow-lg">Save Tiers</Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {AVAILABLE_TIERS.map((tier) => (
                  <div key={tier} className={cn(
                    "flex items-center space-x-3 p-4 rounded-2xl transition-all border-2 group cursor-pointer",
                    formState.tiers.includes(tier) ? "border-primary bg-primary/5 shadow-sm" : "border-transparent bg-muted/20 hover:bg-muted/30"
                  )} onClick={() => toggleTier(tier)}>
                    <Checkbox 
                      id={`tier-${tier}`} 
                      checked={formState.tiers.includes(tier)}
                      onCheckedChange={() => toggleTier(tier)}
                      className="border-primary/20"
                    />
                    <Label htmlFor={`tier-${tier}`} className="text-[10px] font-black uppercase tracking-tighter cursor-pointer">{tier}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-accent/5 border-b p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                    <Network className="h-5 w-5 text-accent" /> Automation Node
                  </CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase">Secure vault for Evolution API & WhatsApp automation</CardDescription>
                </div>
                <Button onClick={handleSaveIntegrations} className="rounded-full colorful-gradient h-10 px-6 text-[9px] uppercase font-black shadow-lg">Sync Vault</Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-[2rem] border border-muted/50 mb-4 shadow-inner">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase text-primary">Master Orchestration</p>
                  <p className="text-xs font-bold text-muted-foreground">Enable or disable all outbound institutional alerts.</p>
                </div>
                <Switch checked={n8nEnabled} onCheckedChange={setN8nEnabled} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">n8n Webhook Node URL</Label>
                  <Input 
                    value={n8nUrl} 
                    onChange={(e) => setN8nUrl(e.target.value)} 
                    placeholder="https://n8n.your-domain.com/webhook/..."
                    className="rounded-xl h-12 bg-muted/20 border-none font-mono text-xs shadow-inner px-5" 
                  />
                  <p className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest mt-2 px-1">
                    Institutional dispatches (Attendance, Finance, Transport) are encrypted and routed to this node.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-accent/5 border-b p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest">Visual Sovereignty</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase">Institutional seal & dashboard identity</CardDescription>
                </div>
                <Button onClick={handleSaveIdentity} className="rounded-full colorful-gradient h-10 px-6 text-[9px] uppercase font-black shadow-lg">Sync Visuals</Button>
              </div>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
