
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles, Loader2, AlertCircle, Building2, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth as useFirebaseId } from "@/firebase"
import { signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged } from "firebase/auth"

export default function LoginPage() {
  const auth = useFirebaseId()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [systemName] = useState("Shule Altra")
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [demoRole, setDemoRole] = useState("ADMIN")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard")
      }
    })
    return () => unsubscribe()
  }, [auth, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setError("Vitambulisho siyo sahihi. Hakiki Email na Password.")
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setDemoLoading(true)
    setError(null)
    try {
      await signInAnonymously(auth)
    } catch (err) {
      setError("Demo access is currently unavailable.")
      setDemoLoading(false)
    }
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
          <div className="h-20 w-20 rounded-[2rem] colorful-gradient flex items-center justify-center text-white mx-auto shadow-2xl mb-6 animate-float border-4 border-white/20">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <div className="space-y-2 px-4">
            <h1 className="text-2xl sm:text-4xl font-headline font-black text-primary tracking-tighter uppercase truncate">{systemName}</h1>
            <p className="text-muted-foreground font-black text-[9px] uppercase tracking-[0.4em]">Sovereign Verification Gateway 2026</p>
          </div>
        </div>

        <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white/90 backdrop-blur-xl">
          <CardHeader className="bg-primary/5 pb-10 pt-12 border-b text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <Building2 className="h-64 w-64 -right-10 -top-10 absolute rotate-12" />
            </div>
            <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-3 text-primary font-black uppercase tracking-tight">
              <Lock className="h-5 w-5" /> Secure Hub Access
            </CardTitle>
            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Authorized Personnel Required</CardDescription>
          </CardHeader>
          <CardContent className="p-8 sm:p-12 space-y-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Official Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="e.g. admin@shulealtra.tech" 
                    className="pl-14 h-14 rounded-2xl border-none bg-muted/30 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-bold shadow-inner"
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
                    className="pl-14 h-14 rounded-2xl border-none bg-muted/30 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-bold shadow-inner"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="rounded-2xl border-none bg-destructive/10 text-destructive animate-in zoom-in-95">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-[10px] font-black uppercase tracking-tight ml-2">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 mt-6">
                <Button 
                  type="submit"
                  disabled={loading || demoLoading} 
                  className="w-full h-14 rounded-2xl font-black colorful-gradient shadow-2xl text-sm group hover:scale-[1.02] transition-transform uppercase tracking-[0.2em]"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Initialize Hub <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="pt-6 border-t border-dashed">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleDemoLogin}
                    disabled={loading || demoLoading}
                    className="w-full h-14 rounded-2xl font-black border-primary/20 text-primary bg-white shadow-lg text-sm group hover:bg-primary/5 transition-all uppercase tracking-[0.2em]"
                  >
                    {demoLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <UserCircle className="mr-3 h-5 w-5" /> Quick Demo Access
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="pt-8 border-t border-dashed flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-[0.3em]">
                <Sparkles className="h-4 w-4" /> SECURE SESSION READY
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Design: Altra Node Technology</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
