
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Star,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Calculator,
  Shield,
  Smartphone,
  PieChart,
  CheckCircle2,
  Globe,
  GraduationCap,
  Users,
  Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import { StaggeredMenu } from "@/components/ui/staggered-menu"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "school-hero")
  
  const navItems = [
    { label: "Staff Portal", link: "/login" },
    { label: "Academic Hub", link: "/dashboard/academics" },
    { label: "Financial Node", link: "/dashboard/finance" },
    { label: "Official Support", link: "/dashboard/help" },
  ]

  const socialItems = [
    { label: "Instagram", link: "https://instagram.com/mwijay.davie" },
    { label: "LinkedIn", link: "https://linkedin.com/in/davie-mwijage" },
    { label: "WhatsApp", link: "https://wa.me/255620641695" },
  ]

  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20 overflow-x-hidden">
      {/* High-End Staggered Navigation */}
      <StaggeredMenu items={navItems} socialItems={socialItems} />

      {/* Hero Section - Editorial Tanzanian Layout */}
      <section className="pt-40 pb-32 px-6 relative">
        <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse-soft" />
        <div className="absolute top-20 left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] border border-primary/10">
              <Zap className="h-4 w-4 fill-primary" /> 2026 Institutional Season
            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-headline font-black leading-[0.85] text-primary tracking-tighter transition-all">
              Shule <br /> 
              <span className="text-gradient">Performance.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
              Elevating Tanzanian institutions with a high-fidelity ERP. Unified management for thousands of students, NECTA-compliant, and engineered for national-scale excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full h-16 sm:h-20 px-14 font-black colorful-gradient group shadow-[0_25px_60px_rgba(31,91,166,0.3)] hover:scale-105 transition-all text-base sm:text-lg">
                  Staff Gateway <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 px-8 py-4 rounded-full border-2 border-muted bg-white/50 backdrop-blur-sm shadow-sm group cursor-default transition-all hover:border-primary/20">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Star className="h-5 w-5 fill-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recognition</p>
                  <p className="text-sm font-bold text-primary">Awwwards Pro Standard</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group animate-in fade-in zoom-in-95 duration-1000 delay-300 hidden lg:block">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white bg-muted transition-all duration-1000 animate-slow-zoom">
              {heroImage?.imageUrl ? (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="Tanzanian Institutional Hub" 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Floating Compliance Badge */}
            <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[3rem] shadow-2xl border border-muted/50 flex items-center gap-6 animate-float">
               <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                 <ShieldCheck className="h-12 w-12" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Compliance</p>
                 <p className="text-3xl font-black text-primary tracking-tighter">NECTA READY</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Statistics Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Nodes", val: "1,200+", sub: "Tanzania Wide", icon: Globe },
              { label: "Total Students", val: "850k+", sub: "System Capacity", icon: Users },
              { label: "Daily Logs", val: "2.4M", sub: "Edge Synced", icon: Zap },
              { label: "Success Rate", val: "100%", sub: "NECTA Sync", icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className="h-6 w-6 text-primary/40 group-hover:text-primary transition-colors" />
                <p className="text-3xl sm:text-4xl font-black text-primary tracking-tighter">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
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
          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <Badge className="bg-white/10 text-white border-none font-black text-[10px] tracking-[0.4em] uppercase px-8 py-2">Full Infrastructure</Badge>
              <h2 className="text-5xl sm:text-6xl font-headline font-black tracking-tight leading-[0.9]">Built for <br/>Scale & Speed.</h2>
            </div>
            <p className="text-xl text-primary-foreground/70 font-medium max-w-md leading-relaxed pb-2">
              Every module is re-engineered for the 2026 academic season, focusing on data integrity for schools with hundreds to thousands of students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[2rem] sm:rounded-[4rem] overflow-hidden">
            {[
              { icon: Calculator, title: "NECTA Matrix", desc: "Official CSEE & FTNA point aggregation for all levels." },
              { icon: Banknote, title: "Revenue Hub", desc: "Automated ClickPesa reconciliation for institutional scale." },
              { icon: Shield, title: "Data Security", desc: "Institutional sovereignty compliant with PDPA 2022." },
              { icon: Users, title: "Level Hubs", desc: "Tailored environments for Primary, O-Level, and A-Level." },
              { icon: Smartphone, title: "Omnichannel", desc: "Integrated Beem SMS gateways for thousands of parents." },
              { icon: PieChart, title: "AI Analytics", desc: "Narrative progress summaries for massive student bodies." },
            ].map((feature, i) => (
              <div key={i} className="bg-primary p-10 sm:p-16 space-y-8 hover:bg-white/5 transition-all group cursor-default">
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
      <footer className="py-24 sm:py-32 px-6 bg-card relative overflow-hidden border-t">
        <div className="absolute -bottom-40 right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          
          <div className="grid md:grid-cols-12 gap-16 items-start">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-12 duration-500">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <span className="font-headline font-black text-3xl sm:text-4xl text-primary tracking-tighter">ShuleDirect Pro</span>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-sm">
                The high-fidelity institutional ecosystem for the modern East African landscape.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                  <div key={i} className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm group">
                    <Icon className="h-6 w-6 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform & Credits Columns */}
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-12">
              <div className="space-y-10">
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Institutional Portal</h4>
                <ul className="space-y-6 text-sm font-bold text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    NECTA Cloud Sync
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    Financial Assurance
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" /> 
                    Multi-Level Hubs
                  </li>
                </ul>
              </div>

              <div className="space-y-10">
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-accent">System Architect</h4>
                <div className="p-8 rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-primary/10 space-y-6 shadow-inner hover:border-primary/30 transition-all group w-full">
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
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] text-center">
              © 2026 ShuleDirect Pro • Engineered for Tanzanian Excellence
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
               <span className="hover:underline cursor-pointer">Privacy Policy</span>
               <Link href="/dashboard/help" className="hover:underline">Institutional Support</Link>
               <span className="text-accent">Official Release v2.0.26</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
