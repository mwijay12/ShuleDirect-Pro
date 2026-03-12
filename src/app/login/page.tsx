
"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Key, ArrowRight, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

const KEYS = {
  ADMIN: "ADMIN123",
  TEACHER: "TEACHER456",
  BURSAR: "BURSAR789"
}

export default function LoginPage() {
  const [accessKey, setAccessKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simulate key validation
    setTimeout(() => {
      let role = ""
      if (accessKey === KEYS.ADMIN) role = "ADMIN"
      else if (accessKey === KEYS.TEACHER) role = "TEACHER"
      else if (accessKey === KEYS.BURSAR) role = "BURSAR"

      if (role) {
        localStorage.setItem("shule_role", role)
        localStorage.setItem("shule_key", accessKey)
        router.push("/dashboard")
      } else {
        setError("Invalid Access Key. Please check with your School IT Administrator.")
        setLoading(false)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center text-white mx-auto shadow-2xl mb-4">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-headline font-black text-primary tracking-tight">Staff Portal</h1>
          <p className="text-muted-foreground font-medium">Enter your assigned Access Key to enter the system.</p>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> Secure Gateway
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="key" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Career Access Key</Label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="key"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-12 h-14 rounded-2xl border-muted bg-muted/20 focus-visible:ring-primary focus-visible:bg-white text-lg font-mono tracking-widest"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
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
                className="w-full h-14 rounded-2xl font-black colorful-gradient shadow-xl text-lg group"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Enter Hub <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-6 border-t border-dashed flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3" /> NECTA Compliance Active
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4 pt-4">
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Mlimani Academy Hub</p>
           <div className="flex justify-center gap-4 text-xs font-bold text-primary opacity-60">
             <span className="cursor-pointer hover:opacity-100">Help Desk</span>
             <span className="cursor-pointer hover:opacity-100">Reset Key</span>
           </div>
        </div>
      </div>
    </div>
  )
}
