
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles, Loader2, AlertCircle, Info, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [schoolName, setSchoolName] = useState("Institutional Node")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("shule_name")
    if (saved) setSchoolName(saved)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Secure Prototype Auth
    setTimeout(() => {
      if (email === "admin@shule.pro" && password === "admin123") {
        localStorage.setItem("shule_role", "ADMIN")
        localStorage.setItem("shule_user", email)
        router.push("/dashboard")
      } else if (email === "bursar@shule.pro" && password === "bursar123") {
        localStorage.setItem("shule_role", "BURSAR")
        localStorage.setItem("shule_user", email)
        router.push("/dashboard")
      } else {
        setError("Invalid institutional credentials. Please contact your System Administrator.")
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-6 font-body selection:bg-primary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 sm:grid-cols-12 h-full gap-px">
          {Array.from({length: 144}).map((_, i) => (
            <div key={i} className="border-r border-b border-primary/20" />
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4">
          <div className="h-24 w-24 rounded-[2.5rem] colorful-gradient flex items-center justify-center text-white mx-auto shadow-2xl mb-6 animate-float">
            <ShieldCheck className="h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-headline font-black text-primary tracking-tighter uppercase">{schoolName}</h1>
            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.4em] px-4">Staff Verification Gateway 2026</p>
          </div>
        </div>

        <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white/90 backdrop-blur-xl">
          <CardHeader className="bg-primary/5 pb-10 pt-12 border-b text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <Building2 className="h-64 w-64 -right-10 -top-10 absolute rotate-12" />
            </div>
            <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-3 text-primary font-black uppercase tracking-tight">
              <Lock className="h-6 w-6" /> Secure Access
            </CardTitle>
            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Enter institutional credentials to initialize session</CardDescription>
          </CardHeader>
          <CardContent className="p-10 sm:p-14 space-y-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Institutional Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="admin@shule.pro" 
                    className="pl-14 h-16 rounded-2xl border-none bg-muted/30 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-black shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="pass" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Secure Passkey</Label>
                <div className="relative group">
                  <Key className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="pass"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-14 h-16 rounded-2xl border-none bg-muted/30 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-black shadow-inner"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="rounded-2xl border-none bg-destructive/10 text-destructive animate-in zoom-in-95">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-[11px] font-black uppercase tracking-tight ml-2">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                disabled={loading} 
                className="w-full h-16 rounded-2xl font-black colorful-gradient shadow-2xl text-lg group mt-6 hover:scale-[1.02] transition-transform uppercase tracking-[0.2em]"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Enter Hub <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="p-6 rounded-[2rem] bg-primary/5 border-2 border-dashed border-primary/10 space-y-4 shadow-inner">
              <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.3em]">
                <Info className="h-4 w-4" /> System Architect Demo
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-foreground/60 flex justify-between uppercase tracking-tighter">
                  <span>Administrator:</span> 
                  <span className="font-mono text-primary bg-white px-2 py-0.5 rounded shadow-sm">admin@shule.pro / admin123</span>
                </p>
                <p className="text-[10px] font-black text-foreground/60 flex justify-between uppercase tracking-tighter">
                  <span>Bursar Node:</span> 
                  <span className="font-mono text-accent bg-white px-2 py-0.5 rounded shadow-sm">bursar@shule.pro / bursar123</span>
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-dashed flex items-center justify-center">
              <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-[0.3em]">
                <Sparkles className="h-4 w-4" /> 2026 AUDIT COMPLIANT
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6 pt-4">
           <div className="flex justify-center gap-8 text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">
             <span className="cursor-pointer hover:opacity-100 transition-opacity border-b border-primary/20 pb-1">Technical Support</span>
             <span className="cursor-pointer hover:opacity-100 transition-opacity border-b border-primary/20 pb-1">Request Account</span>
           </div>
           <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-40">ShuleDirect Pro • Tanzanian Excellence</p>
        </div>
      </div>
    </div>
  )
}
