
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Building2, 
  Save,
  RefreshCw,
  AlertCircle,
  Layout,
  Upload,
  ShieldCheck,
  Loader2,
  Terminal,
  Zap,
  UserPlus,
  Trash2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DialogTrigger
} from "@/components/ui/dialog"
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"

export default function SettingsPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [isResetting, setIsResetting] = useState(false)
  
  const identityRef = useMemoFirebase(() => doc(db, "schools", "school-001", "config", "identity"), [db])
  const { data: identity, isLoading } = useDoc(identityRef)

  const [formState, setFormState] = useState({
    name: "",
    systemName: "ShuleDirect",
    centerId: "PS0206098",
    region: "Dar es Salaam",
    district: "Kinondoni",
    n8nUrl: ""
  })

  useEffect(() => {
    if (identity) {
      setFormState({
        name: identity.name || "",
        systemName: identity.systemName || "ShuleDirect",
        centerId: identity.centerId || "PS0206098",
        region: identity.region || "Dar es Salaam",
        district: identity.district || "Kinondoni",
        n8nUrl: identity.n8nUrl || ""
      })
    }
  }, [identity])

  const handleSave = () => {
    setDocumentNonBlocking(identityRef, formState, { merge: true })
    toast({ title: "Sovereign Node Synced", description: "Institutional configurations updated permanently." })
  }

  const handleResetSystem = () => {
    setIsResetting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  if (isLoading) {
    return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto h-10 w-10 text-primary" /></div>
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary uppercase">System Control Node</h1>
          <p className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">Global Administrative Hub 2026</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleSave} className="flex-1 sm:flex-none font-black rounded-full colorful-gradient h-11 px-8 shadow-xl text-[9px] uppercase tracking-widest group">
            <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Sync Institutional Node
          </Button>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 rounded-2xl w-full flex h-auto gap-1 border border-muted/50 px-1">
          <TabsTrigger value="school" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Identity Hub</TabsTrigger>
          <TabsTrigger value="staff" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Personnel</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl font-black text-[9px] flex-1 py-3 uppercase">Visuals</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-primary/5 border-b p-8">
              <CardTitle className="text-base font-black uppercase tracking-tight">Institutional Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Legal School Name</Label>
                  <Input 
                    value={formState.name} 
                    onChange={(e) => setFormState({...formState, name: e.target.value})} 
                    className="rounded-xl h-12 bg-muted/20 border-none font-black shadow-inner px-5" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground ml-1">NECTA Center ID</Label>
                  <Input 
                    value={formState.centerId} 
                    onChange={(e) => setFormState({...formState, centerId: e.target.value})} 
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white/60">
            <CardHeader className="bg-muted/20 border-b p-8">
              <CardTitle className="text-lg font-black uppercase">Personnel Ledger</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="p-10 text-center rounded-[2rem] bg-muted/10 border-2 border-dashed">
                <p className="text-xs font-black uppercase text-muted-foreground">Staff Node Synchronization Active</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
