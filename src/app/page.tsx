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
  Smartphone,
  Zap,
  MessageCircle,
  Globe,
  Star,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  ChevronRight,
  Calculator,
  BookOpen,
  PieChart,
  Shield,
  Layout
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "school-hero")
  
  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation - Minimal & High End */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-headline font-black text-2xl text-primary tracking-tighter">ShuleDirect <span className="text-accent">Pro</span></span>
          </div>
          <div className="flex items-center gap-8 text-xs font-black uppercase tracking-widest">
            <Link href="/login">
              <Button className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all h-11">
                Enter Staff Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Editorial Layout */}
      <section className="pt-40 pb-32 px-6 relative">
        <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse-soft" />
        <div className="absolute top-20 left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/10">
              <Zap className="h-4 w-4 fill-primary" /> 2026 Academic Season
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[10rem] font-headline font-black leading-[0.85] text-primary tracking-tighter">
              Pure <br /> 
              <span className="text-gradient">Performance.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
              Elevating Tanzanian institutions with a high-fidelity ERP. NECTA-compliant, PReMS integrated, and engineered for operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full h-20 px-14 font-black colorful-gradient group shadow-[0_25px_60px_rgba(31,91,166,0.3)] hover:scale-105 transition-all text-lg">
                  Access Portal <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 px-8 py-4 rounded-full border-2 border-muted bg-white/50 backdrop-blur-sm shadow-sm group cursor-default transition-all hover:border-primary/20">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Star className="h-5 w-5 fill-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recognition</p>
                  <p className="text-sm font-bold text-primary">Awwwards Quality Std.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white bg-muted transition-all duration-1000 animate-slow-zoom">
              {heroImage?.imageUrl ? (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="School Hero" 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Floating Visual Elements */}
            <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[3rem] shadow-2xl border border-muted/50 hidden sm:flex items-center gap-6 animate-float">
               <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                 <CheckCircle2 className="h-12 w-12" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Compliance</p>
                 <p className="text-3xl font-black text-primary tracking-tighter">PDPA Ready</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Contrast Feature Grid */}
      <section className="py-40 px-6 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full gap-1">
            {Array.from({length: 144}).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-end animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="space-y-8">
              <Badge className="bg-white/10 text-white border-none font-black text-[10px] tracking-[0.4em] uppercase px-8 py-2">Infrastructure</Badge>
              <h2 className="text-6xl font-headline font-black tracking-tight leading-[0.9]">Built for <br/>Scale & Speed.</h2>
            </div>
            <p className="text-xl text-primary-foreground/70 font-medium max-w-md leading-relaxed pb-2">
              Every module is re-engineered for the 2026 academic season, focusing on data integrity and user productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[4rem] overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-200">
            {[
              { icon: Calculator, title: "NECTA Matrix", desc: "Official CSEE & FTNA point aggregation system." },
              { icon: Banknote, title: "Revenue Flow", desc: "Automated ClickPesa reconciliation and audit logs." },
              { icon: Shield, title: "Data Security", desc: "Institutional sovereignty compliant with PDPA 2022." },
              { icon: Users, title: "Personnel Hubs", desc: "Tailored environments for every staff career role." },
              { icon: Smartphone, title: "Omnichannel", desc: "Integrated Beem SMS and WhatsApp notification nodes." },
              { icon: PieChart, title: "AI Insights", desc: "Narrative progress summaries for parent reporting." },
            ].map((feature, i) => (
              <div key={i} className="bg-primary p-16 space-y-8 hover:bg-white/5 transition-all group cursor-default">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black">{feature.title}</h3>
                  <p className="text-sm text-primary-foreground/60 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architect Signature & Footer */}
      <footer className="py-32 px-6 bg-card relative overflow-hidden border-t">
        <div className="absolute -bottom-40 right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          
          <div className="grid md:grid-cols-12 gap-16 items-start">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-12 duration-500">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <span className="font-headline font-black text-4xl text-primary tracking-tighter">ShuleDirect Pro</span>
              </div>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-sm">
                The high-fidelity institutional ecosystem for the modern East African landscape.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                  <div key={i} className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm group">
                    <Icon className="h-6 w-6 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform & Credits Columns */}
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="space-y-10">
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Institutional Hub</h4>
                <ul className="space-y-6 text-sm font-bold text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    NECTA Portal Sync
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    Financial Hub
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    2026 Season Hubs
                  </li>
                </ul>
              </div>

              <div className="space-y-10">
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-accent">System Architect</h4>
                <div className="p-8 rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-primary/10 space-y-6 shadow-inner hover:border-primary/30 transition-all group max-w-sm">
                  <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                    <Star className="h-5 w-5 fill-primary animate-pulse" /> Maker Credits
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-black leading-tight text-foreground/80 group-hover:text-primary transition-colors">Davie Mwijage</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">Lead Engineer & Architect</p>
                    </div>
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="flex items-center gap-3 text-[11px] font-black text-primary/80">
                        <Smartphone className="h-4 w-4 text-primary" /> +255 620 641 695
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-black text-accent">
                        <Instagram className="h-4 w-4" /> @mwijay.davie
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
              © 2026 ShuleDirect Pro • Engineered for Excellence
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
               <Dialog>
                 <DialogTrigger className="hover:underline cursor-pointer">Privacy Policy</DialogTrigger>
                 <DialogContent className="rounded-[3rem] max-w-2xl border-none shadow-2xl p-12">
                   <DialogHeader className="space-y-6">
                     <DialogTitle className="text-4xl font-black tracking-tighter">Institutional Privacy</DialogTitle>
                     <DialogDescription className="font-medium text-lg leading-relaxed text-muted-foreground">
                       ShuleDirect Pro operates under a strict data sovereignty model. We ensure all minor records and personnel data are protected according to the Tanzania Data Protection Act 2022 (PDPA).
                     </DialogDescription>
                   </DialogHeader>
                 </DialogContent>
               </Dialog>
               <Link href="/dashboard/help" className="hover:underline">Staff Support</Link>
               <span className="text-muted-foreground opacity-30 hidden sm:inline">|</span>
               <span className="text-accent">Official Release v2.0.26</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
