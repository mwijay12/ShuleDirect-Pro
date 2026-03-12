
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Banknote,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "school-hero")
  
  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-headline font-black text-2xl text-primary tracking-tighter">ShuleDirect <span className="text-accent">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#roles" className="hover:text-primary transition-colors">Career Hubs</a>
            <Link href="/login">
              <Button className="rounded-full px-8 font-bold shadow-lg shadow-primary/20">Staff Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest animate-pulse">
              <Sparkles className="h-4 w-4" /> Trusted by 500+ Schools in Tanzania
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-black leading-[1.1] text-primary tracking-tight">
              Manage your school <br /> 
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">with total confidence.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-lg leading-relaxed">
              NECTA-compliant grading, ClickPesa financial reconciliation, and Beem SMS alerts. Everything your school needs, built for the East African reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full h-14 px-10 font-black colorful-gradient group shadow-2xl">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-10 font-bold border-2">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-muted">
              {heroImage?.imageUrl && (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="School Hero" 
                  fill 
                  className="object-cover"
                  data-ai-hint="modern school"
                  priority
                />
              )}
            </div>
            {/* Floating Achievement Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border flex items-center gap-4 animate-float">
               <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                 <CheckCircle2 className="h-6 w-6" />
               </div>
               <div>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Compliance</p>
                 <p className="text-lg font-black text-primary">PDPA Certified</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Sections */}
      <section id="roles" className="py-24 bg-muted/30 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-headline font-black text-primary">Specialized Career Hubs</h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto">Different roles get specialized tools. No more cluttered interfaces.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                role: "Administrators", 
                icon: ShieldCheck, 
                desc: "Total control over staff roles, system settings, and school-wide compliance reports.",
                color: "text-primary",
                bg: "bg-primary/5"
              },
              { 
                role: "Teachers", 
                icon: GraduationCap, 
                desc: "Focus on pedagogy. Mark attendance, upload grades via Excel, and track NECTA progress.",
                color: "text-accent",
                bg: "bg-accent/5"
              },
              { 
                role: "Bursars", 
                icon: Banknote, 
                desc: "Revenue assurance with ClickPesa. Track fees, generate control numbers, and manage payroll.",
                color: "text-orange-600",
                bg: "bg-orange-50"
              }
            ].map((item) => (
              <Card key={item.role} className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden group">
                <CardContent className="p-8 space-y-6">
                  <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform", item.bg, item.color)}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-primary">{item.role}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                  <ul className="space-y-3">
                    {["Role-Based Keys", "Secure Access", "Custom Dashboards"].map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-bold text-primary/70">
                        <CheckCircle2 className="h-4 w-4" /> {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="absolute -inset-10 bg-accent/10 rounded-full blur-3xl" />
             <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border rotate-3 group hover:rotate-0 transition-transform duration-700">
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Daily Register</p>
                       <h4 className="text-xl font-black text-primary">Class Form 4A</h4>
                     </div>
                     <Badge className="bg-green-100 text-green-700 font-bold px-4 py-1">96% Present</Badge>
                   </div>
                   <div className="space-y-3">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">S</div>
                            <span className="text-sm font-bold">Student {i}</span>
                         </div>
                         <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                           <Smartphone className="h-4 w-4" />
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-headline font-black text-primary">Powerful Mobile Experience</h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              Teachers can mark attendance and record grades directly from their smartphones. No more carrying heavy paper ledgers around the classroom.
            </p>
            <div className="space-y-4">
              {[
                "Instant Parent Notifications",
                "Offline Register Caching",
                "Fast Grade Entry Hub"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-dashed hover:border-primary transition-colors cursor-default">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl colorful-gradient flex items-center justify-center text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-headline font-black text-xl text-primary tracking-tighter">ShuleDirect Pro</span>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            © 2024 ShuleDirect Pro • Built for Tanzania
          </p>
          <div className="flex gap-6">
             <Link href="/login" className="text-sm font-bold text-primary hover:underline">Access Portal</Link>
             <span className="text-sm font-bold text-primary hover:underline cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </div>
  )
}
