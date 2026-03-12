
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
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "school-hero")
  
  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-headline font-black text-2xl text-primary tracking-tighter">ShuleDirect <span className="text-accent">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#roles" className="hover:text-primary transition-colors">Career Hubs</a>
            <a href="#communication" className="hover:text-primary transition-colors">Omnichannel</a>
            <Link href="/login">
              <Button className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">Staff Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="absolute top-40 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse-soft" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
              <Zap className="h-4 w-4 fill-primary" /> 2026 Academic Season Active
            </div>
            <h1 className="text-6xl lg:text-8xl font-headline font-black leading-[1] text-primary tracking-tight">
              The Future of <br /> 
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Digital Schooling.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
              Experience the 2026 edition of ShuleDirect Pro. NECTA-compliant, PReMS integrated, and now with full Omnichannel communication for the modern Tanzanian institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full h-16 px-12 font-black colorful-gradient group shadow-[0_20px_50px_rgba(31,91,166,0.3)] hover:scale-105 transition-all">
                  Access 2026 Portal <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-12 font-bold border-2 hover:bg-muted/50">
                Explore Case Studies
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-muted-foreground font-bold text-sm">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-muted shadow-sm flex items-center justify-center text-[10px] font-black overflow-hidden">
                    <img src={`https://picsum.photos/seed/head-${i}/100`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="text-primary font-black">1,200+</span> Academic Leaders</p>
            </div>
          </div>
          
          <div className="relative group animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white bg-muted rotate-2 group-hover:rotate-0 transition-all duration-700">
              {heroImage?.imageUrl ? (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="School Hero" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint="modern school"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[2rem] shadow-2xl border flex items-center gap-4 animate-float">
               <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                 <CheckCircle2 className="h-8 w-8" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Compliance</p>
                 <p className="text-xl font-black text-primary">PDPA 2026 Certified</p>
               </div>
            </div>

            <div className="absolute top-10 -right-10 bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border flex items-center gap-4 animate-bounce duration-[3000ms]">
               <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                 <MessageCircle className="h-6 w-6" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Alert</p>
                 <p className="text-sm font-black text-foreground">WhatsApp Sync Active</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Omnichannel Section */}
      <section id="communication" className="py-24 px-6 bg-primary overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-10 h-full">
            {Array.from({length: 100}).map((_, i) => (
              <Globe key={i} className="h-full w-full" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8 text-white">
            <Badge className="bg-white/20 text-white border-none font-black text-xs px-6 py-1 tracking-[0.2em] uppercase">Omnichannel 2.0</Badge>
            <h2 className="text-5xl font-headline font-black leading-tight tracking-tight">Stay Connected. <br/> Everywhere.</h2>
            <p className="text-lg text-primary-foreground/80 font-medium leading-relaxed">
              We've integrated Beem Africa for SMS, Official WhatsApp API for notifications, and automated Email gateways. Direct calling is just a tap away.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: MessageCircle, label: "WhatsApp Bot", desc: "Automated Result Delivery" },
                { icon: Smartphone, label: "Beem SMS", desc: "Absence & Fee Alerts" },
                { icon: Globe, label: "Parent App", desc: "Real-time Progress Tracker" },
                { icon: Star, label: "AI Summaries", desc: "Natural Language Updates" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default">
                  <item.icon className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-black text-sm">{item.label}</p>
                    <p className="text-xs text-white/60 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="bg-white rounded-[3rem] p-1 shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden scale-105">
                <div className="bg-muted/30 p-8 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1 p-4 bg-white rounded-2xl rounded-tl-none shadow-sm border border-muted">
                        <p className="text-[10px] font-black text-green-600 uppercase mb-1">Mlimani Academy WhatsApp</p>
                        <p className="text-sm font-medium leading-relaxed">"Habari Juma! Result za Amani Form 4 Mock zimefika. Math: A, Phys: B. Hongera sana!"</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 justify-end">
                      <div className="flex-1 p-4 bg-primary text-white rounded-2xl rounded-tr-none shadow-sm text-right">
                        <p className="text-sm font-medium">"Asante sana Mwalimu. Nimezipokea!"</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary font-black overflow-hidden border-2 border-white">
                        <img src="https://picsum.photos/seed/p-1/100" alt="parent" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 pb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="font-headline font-black text-2xl text-primary tracking-tighter">ShuleDirect Pro</span>
              </div>
              <p className="text-muted-foreground font-medium max-w-sm">
                The most advanced school management ecosystem built specifically for the East African academic landscape. 
              </p>
              <div className="flex gap-4">
                {[MessageCircle, Smartphone, Globe].map((Icon, i) => (
                  <div key={i} className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Career Hubs</li>
                <li className="hover:text-primary cursor-pointer transition-colors">NECTA Portal</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Financial Hub</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest">Maker Credits</h4>
              <div className="p-6 rounded-[2rem] bg-muted/50 border border-dashed border-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase">
                  <Star className="h-4 w-4 fill-primary" /> System Architect
                </div>
                <p className="text-sm font-bold leading-tight">
                  Designed & Developed by <br/> 
                  <span className="text-accent underline cursor-pointer hover:text-primary transition-colors">ShulePro Maker Team</span>
                </p>
                <p className="text-[10px] text-muted-foreground font-medium italic">"Empowering the next generation of Tanzanian excellence."</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              © 2026 ShuleDirect Pro Ecosystem • All Rights Reserved
            </p>
            <div className="flex gap-8 text-[10px] font-black text-primary uppercase tracking-widest">
               <span className="cursor-pointer hover:underline">Privacy Policy</span>
               <span className="cursor-pointer hover:underline">Terms of Service</span>
               <span className="cursor-pointer hover:underline">Support Hub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
