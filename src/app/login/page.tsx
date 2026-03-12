
"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles, Loader2, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Professional Simulation
    setTimeout(() => {
      // Demo logic for standard roles
      if (email === "admin@shule.pro" && password === "admin123") {
        localStorage.setItem("shule_role", "ADMIN")
        localStorage.setItem("shule_user", email)
        router.push("/dashboard")
      } else if (email.startsWith("teacher") && password === "teacher123") {
        localStorage.setItem("shule_role", "TEACHER")
        localStorage.setItem("shule_user", email)
        router.push("/dashboard")
      } else if (email === "bursar@shule.pro" && password === "bursar123") {
        localStorage.setItem("shule_role", "BURSAR")
        localStorage.setItem("shule_user", email)
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Please verify your email and password or contact the System Admin.")
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6 font-body selection:bg-primary/20">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center text-white mx-auto shadow-2xl mb-4 animate-float">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Staff Gateway</h1>
          <p className="text-muted-foreground font-medium text-sm">Enter your institutional credentials to continue.</p>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-md">
          <CardHeader className="bg-primary/5 pb-8 pt-10 border-b">
            <CardTitle className="text-center text-lg flex items-center justify-center gap-2 text-primary font-black">
              <Lock className="h-5 w-5" /> Secure Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="admin@shule.pro" 
                    className="pl-12 h-14 rounded-2xl border-none bg-muted/20 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-bold shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pass" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Secure Password</Label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="pass"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-12 h-14 rounded-2xl border-none bg-muted/20 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:bg-white text-sm font-bold shadow-inner"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="rounded-2xl border-none bg-destructive/10 text-destructive animate-in zoom-in-95">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs font-bold leading-tight ml-2">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                disabled={loading} 
                className="w-full h-14 rounded-2xl font-black colorful-gradient shadow-xl text-lg group mt-4 hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Enter System <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="p-4 rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 space-y-3">
              <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                <Info className="h-3 w-3" /> System Architect Demo
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/60 flex justify-between">
                  <span>Admin:</span> 
                  <span className="font-mono text-primary">admin@shule.pro / admin123</span>
                </p>
                <p className="text-[10px] font-bold text-foreground/60 flex justify-between">
                  <span>Bursar:</span> 
                  <span className="font-mono text-accent">bursar@shule.pro / bursar123</span>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3" /> NECTA & PReMS COMPLIANT
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4 pt-4">
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Institutional Node: Mlimani Academy</p>
           <div className="flex justify-center gap-6 text-[10px] font-black text-primary uppercase tracking-widest opacity-60">
             <span className="cursor-pointer hover:opacity-100 transition-opacity">Staff Support</span>
             <span className="cursor-pointer hover:opacity-100 transition-opacity">Request Account</span>
           </div>
        </div>
      </div>
    </div>
  )
}
