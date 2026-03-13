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
    { label: "Support Hub", link: "/dashboard/help" },
  ]

  const socialItems = [
    { label: "Instagram", link: "https://instagram.com/mwijay.davie" },
    { label: "LinkedIn", link: "https://linkedin.com/in/davie-mwijage" },
    { label: "WhatsApp", link: "https://wa.me/255620641695" },
  ]

  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20 overflow-x-hidden w-full relative">
      {/* High-End Staggered Navigation */}
      <StaggeredMenu items={navItems} socialItems={socialItems} />

      {/* Hero Section - Editorial Tanzanian Layout */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 relative w-full overflow-hidden">
        <div className="absolute top-40 right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-pulse-soft" />
        <div className="absolute top-20 left-[-5%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-primary/5 rounded-full blur-[60px] sm:blur-[100px] -z-10 animate-float" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] border border-primary/10 w-fit">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 fill-primary" /> 2026 Season Official
            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-headline font-black leading-[0.9] text-primary tracking-tighter transition-all break-words">
              Shule <br /> 
              <span className="text-gradient">Performance.</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
              Elevating Tanzanian institutions with a high-fidelity ecosystem. Unified management for thousands of students, NECTA-compliant, and engineered for national-scale excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full h-14 sm:h-20 px-8 sm:px-14 font-black colorful-gradient group shadow-[0_25px_60px_rgba(31,91,166,0.3)] hover:scale-105 transition-all text-sm sm:text-lg">
                  Enter Portal <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-muted bg-white/50 backdrop-blur-sm shadow-sm group cursor-default transition-all hover:border-primary/20 w-fit sm:w-auto">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-accent" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recognition</p>
                  <p className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">Awwwards Pro Hub</p>
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
            <div className="absolute -bottom-12 -left-12 bg-white p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-muted/50 flex items-center gap-6 animate-float">
               <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner shrink-0">
                 <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12" />
               </div>
               <div>
                 <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Compliance</p>
                 <p className="text-2xl sm:text-3xl font-black text-primary tracking-tighter">NECTA READY</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Active Nodes", val: "1,200+", sub: "Tanzania Wide", icon: Globe },
              { label: "Total Students", val: "850k+", sub: "System Capacity", icon: Users },
              { label: "Daily Logs", val: "2.4M", sub: "Edge Synced", icon: Zap },
              { label: "Success Rate", val: "100%", sub: "NECTA Sync", icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary/40 group-hover:text-primary transition-colors" />
                <p className="text-2xl sm:text-4xl font-black text-primary tracking-tighter">{stat.val}</p>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 bg-primary text-white overflow-hidden relative w-full">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 sm:grid-cols-12 h-full gap-1">
            {Array.from({length: 72}).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-20 items-end">
            <div className="space-y-4 sm:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <Badge className="bg-white/10 text-white border-none font-black text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase px-6 sm:px-8 py-2 w-fit">Full Infrastructure</Badge>
              <h2 className="text-4xl sm:text-6xl font-headline font-black tracking-tight leading-[1] sm:leading-[0.9]">Built for <br className="hidden sm:block"/>Scale & Speed.</h2>
            </div>
            <p className="text-base sm:text-xl text-primary-foreground/70 font-medium max-w-md leading-relaxed">
              Every module is re-engineered for the 2026 academic season, focusing on data integrity for schools with hundreds to thousands of students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[2rem] sm:rounded-[4rem] overflow-hidden">
            {[
              { icon: Calculator, title: "NECTA Matrix", desc: "Official CSEE & FTNA point aggregation for all levels." },
              { icon: Banknote, title: "Revenue Hub", desc: "Automated ClickPesa reconciliation for institutional scale." },
              { icon: Shield, title: "Data Security", desc: "Institutional sovereignty compliant with PDPA 2022." },
              { icon: Users, title: "Level Hubs", desc: "Tailored environments for Primary, O-Level, and A-Level." },
              { icon: Smartphone, title: "Omnichannel", desc: "Integrated Beem SMS gateways for thousands of parents." },
              { icon: PieChart, title: "AI Analytics", desc: "Narrative progress summaries for massive student bodies." },
            ].map((feature, i) => (
              <div key={i} className="bg-primary p-10 sm:p-16 space-y-6 sm:space-y-8 hover:bg-white/5 transition-all group cursor-default">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shrink-0">
                  <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Signature */}
      <footer className="py-16 sm:py-32 px-4 sm:px-6 bg-card relative overflow-hidden border-t w-full">
        <div className="absolute -bottom-40 right-[-10%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/5 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Branding Column */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-12 duration-500 shrink-0">
                  <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <span className="font-headline font-black text-2xl sm:text-4xl text-primary tracking-tighter">ShuleDirect Pro</span>
              </div>
              <p className="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-sm">
                The high-fidelity institutional ecosystem for the modern East African landscape.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                  <div key={i} className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm group shrink-0">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform & Credits Columns */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-10 sm:gap-12 w-full">
              <div className="space-y-6 sm:space-y-10">
                <h4 className="font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary">Institutional Portals</h4>
                <ul className="space-y-4 sm:space-y-6 text-sm font-bold text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 shrink-0" /> 
                    NECTA Hub Sync
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 shrink-0" /> 
                    Financial Node
                  </li>
                  <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group">
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 shrink-0" /> 
                    Multi-Tier Academics
                  </li>
                </ul>
              </div>

              {/* Redesigned Balanced Maker Credits */}
              <div className="space-y-6 sm:space-y-10">
                <h4 className="font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent">System Architect</h4>
                <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-primary/10 space-y-4 sm:space-y-6 shadow-inner hover:border-primary/30 transition-all group w-full relative overflow-hidden">
                  <div className="flex items-center gap-2 sm:gap-3 text-primary font-black text-[10px] uppercase tracking-widest relative z-10">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary animate-pulse" /> Maker Credits
                  </div>
                  <div className="space-y-3 sm:space-y-4 relative z-10">
                    <div className="space-y-1">
                      <p className="text-xl sm:text-2xl font-black leading-tight text-foreground/80 group-hover:text-primary transition-colors">Davie Mwijage</p>
                      <p className="text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">Lead Engineer & Architect</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 pt-2 border-t border-muted-foreground/10">
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-black text-primary/80">
                        <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0" /> +255 620 641 695
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-black text-accent">
                        <Instagram className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> @mwijay.davie
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 sm:pt-16 border-t flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 text-center md:text-left">
            <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] sm:tracking-[0.5em]">
              © 2026 ShuleDirect Pro • Tanzanian Excellence
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[8px] sm:text-[10px] font-black text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em]">
               <span className="hover:underline cursor-pointer">Privacy</span>
               <Link href="/dashboard/help" className="hover:underline">Support Hub</Link>
               <span className="text-accent">V2.0.26</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}