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
  Shield
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-headline font-black text-2xl text-primary tracking-tighter">ShuleDirect <span className="text-accent">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Platform</a>
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
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-soft" />
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-float" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 opacity-0 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10">
              <Zap className="h-4 w-4 fill-primary" /> 2026 Academic Season Active
            </div>
            <h1 className="text-6xl lg:text-8xl font-headline font-black leading-[0.95] text-primary tracking-tight">
              The Future of <br /> 
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Digital Excellence.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-lg leading-relaxed">
              Experience the 2026 edition of Tanzania's most advanced school ecosystem. NECTA-compliant, PReMS integrated, and now with full Omnichannel communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full h-16 px-12 font-black colorful-gradient group shadow-[0_20px_50px_rgba(31,91,166,0.3)] hover:scale-105 transition-all">
                  Access 2026 Portal <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-12 font-black text-xs uppercase tracking-widest border-2 hover:bg-muted/50 shadow-sm">
                Case Studies
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-muted-foreground font-bold text-xs">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-muted shadow-sm flex items-center justify-center text-[10px] font-black overflow-hidden ring-4 ring-primary/5">
                    <img src={`https://picsum.photos/seed/head-${i}/100`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="uppercase tracking-widest opacity-70">Trusted by <span className="text-primary font-black">1,200+</span> Academic Leaders</p>
            </div>
          </div>
          
          <div className="relative group opacity-0 animate-fade-in-up [animation-delay:200ms]">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white bg-muted rotate-2 group-hover:rotate-0 transition-all duration-1000 animate-slow-zoom">
              {heroImage?.imageUrl ? (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="School Hero" 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating Achievement Elements */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border flex items-center gap-5 animate-float">
               <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                 <CheckCircle2 className="h-10 w-10" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Compliance</p>
                 <p className="text-2xl font-black text-primary tracking-tighter">PDPA 2026 Ready</p>
               </div>
            </div>

            <div className="absolute top-10 -right-12 bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border flex items-center gap-4 animate-bounce duration-[4000ms]">
               <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                 <MessageCircle className="h-6 w-6" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Alert</p>
                 <p className="text-sm font-black text-foreground">WhatsApp Sync</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-[0.3em] uppercase px-6 py-1">Operational Power</Badge>
            <h2 className="text-4xl sm:text-5xl font-headline font-black text-primary tracking-tight">Built for Institutional Scale.</h2>
            <p className="text-muted-foreground font-medium text-lg">Every module is engineered to handle the complexities of Tanzanian school management with zero manual errors.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calculator, title: "NECTA Compliance", desc: "Automated aggregation of points and divisions per official CSEE & FTNA standards." },
              { icon: Banknote, title: "Revenue Assurance", desc: "Automated control numbers and real-time reconciliation via ClickPesa webhooks." },
              { icon: Shield, title: "Data Sovereignty", desc: "Compliant with Tanzania Data Protection Act 2022. All logs forensic-ready." },
              { icon: Users, title: "Career Hubs", desc: "Specialized workflows for Math, English, and Science teachers to boost productivity." },
              { icon: Smartphone, title: "Beem SMS Sync", desc: "Instant automated alerts for absence, fee balance, and academic milestones." },
              { icon: PieChart, title: "AI Analytics", desc: "High-fidelity summaries of student progress for parent-teacher conferences." },
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Hubs (Roles) */}
      <section id="roles" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="bg-primary rounded-[3rem] p-12 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-64 w-64" />
                </div>
                <div className="space-y-4 relative z-10">
                  <Badge className="bg-white/20 text-white border-none font-black text-[10px] tracking-[0.2em] uppercase">Teacher Productivity</Badge>
                  <h2 className="text-4xl font-headline font-black tracking-tight">Dedicated Subject <br/>Career Hubs.</h2>
                  <p className="text-primary-foreground/80 font-medium">Teachers log in directly to their departments. No clutter, just their subject grading, attendance, and AI-study generators.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                   {[
                     { label: "Math Dept", key: "MATH101" },
                     { label: "Science Dept", key: "PHY404" },
                     { label: "English Dept", key: "ENG202" },
                     { label: "History Dept", key: "HIST303" },
                   ].map((dept, i) => (
                     <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all">
                       <span className="text-sm font-bold">{dept.label}</span>
                       <Badge variant="outline" className="font-mono text-[9px] border-white/20 text-white">{dept.key}</Badge>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-headline font-black text-primary leading-[1.1] tracking-tight">Your Career, <br/> Your Workspace.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              We understand that a Math teacher needs different tools than a Headmaster. ShuleDirect Pro provides granular role-based interfaces that focus on what matters to you.
            </p>
            <ul className="space-y-4">
              {[
                "Role-specific security keys for instant access",
                "Automated subject-specific grade aggregation",
                "Mobile-first register marking for classroom use",
                "Direct parent communication via department gates"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-primary group">
                  <div className="h-6 w-6 rounded-full bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm uppercase tracking-widest text-[10px]">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="rounded-full h-14 px-10 font-black colorful-gradient shadow-xl">
              Explore User Roles <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Omnichannel Communication */}
      <section id="communication" className="py-32 px-6 bg-primary overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-10 h-full">
            {Array.from({length: 100}).map((_, i) => (
              <Globe key={i} className="h-full w-full" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8 text-white">
            <Badge className="bg-white/20 text-white border-none font-black text-[10px] tracking-[0.3em] uppercase px-6 py-1">Omnichannel 2.0</Badge>
            <h2 className="text-5xl font-headline font-black leading-tight tracking-tight">Stay Connected. <br/> Everywhere.</h2>
            <p className="text-lg text-primary-foreground/80 font-medium leading-relaxed">
              We've integrated Beem Africa for SMS, Official WhatsApp API for notifications, and automated Email gateways. Direct calling is just a tap away.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: MessageCircle, label: "WhatsApp Bot", desc: "Result Delivery" },
                { icon: Smartphone, label: "Beem SMS", desc: "Absence Alerts" },
                { icon: Globe, label: "Portal Hub", desc: "Real-time Tracking" },
                { icon: Star, label: "AI Progress", desc: "Narrative Updates" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default group">
                  <item.icon className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-black text-sm uppercase tracking-widest">{item.label}</p>
                    <p className="text-xs text-white/60 font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative opacity-0 animate-fade-in-up">
             <div className="bg-white rounded-[3.5rem] p-1 shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden scale-105 hover:scale-110 transition-transform duration-1000">
                <div className="bg-muted/30 p-10 space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1 p-5 bg-white rounded-3xl rounded-tl-none shadow-sm border border-muted">
                        <p className="text-[10px] font-black text-green-600 uppercase mb-1 tracking-widest">Mlimani Academy WhatsApp</p>
                        <p className="text-sm font-semibold leading-relaxed text-foreground/80">"Habari Juma! Matokeo ya Amani Form 4 Mock yamefika. Math: A, Phys: B. Hongera sana!"</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 justify-end">
                      <div className="flex-1 p-5 bg-primary text-white rounded-3xl rounded-tr-none shadow-sm text-right">
                        <p className="text-sm font-semibold leading-relaxed">"Asante sana Mwalimu. Nimezipokea kupitia ShulePro Hub!"</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary font-black overflow-hidden border-2 border-white ring-4 ring-primary/10">
                        <img src="https://picsum.photos/seed/parent-99/100" alt="parent" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t px-6 bg-card relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-16 pb-20">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl colorful-gradient flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <span className="font-headline font-black text-3xl text-primary tracking-tighter">ShuleDirect Pro</span>
              </div>
              <p className="text-muted-foreground font-medium max-w-sm text-lg leading-relaxed">
                The high-fidelity ecosystem built specifically for the East African academic landscape. 
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                  <div key={i} className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm group">
                    <Icon className="h-5 w-5 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary">Compliance & Hubs</h4>
              <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> NECTA Portal Sync</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> ClickPesa Gateway</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Beem SMS Engine</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Career Access</li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-accent">System Architect</h4>
              <div className="p-8 rounded-[2.5rem] bg-muted/50 border-2 border-dashed border-primary/10 space-y-4">
                <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                  <Star className="h-5 w-5 fill-primary" /> Maker Credits
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black leading-tight text-foreground/80">Davie Mwijage</p>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Lead Engineer @ ShulePro</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold text-primary flex items-center gap-2"><Smartphone className="h-3 w-3" /> +255 620 641 695</p>
                  <p className="text-[10px] font-bold text-accent flex items-center gap-2"><Instagram className="h-3 w-3" /> @mwijay.davie</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
              © 2026 ShuleDirect Pro Ecosystem • All Rights Reserved
            </p>
            <div className="flex gap-10 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
               <Dialog>
                 <DialogTrigger className="hover:underline">Privacy Policy</DialogTrigger>
                 <DialogContent className="rounded-[2.5rem] max-w-2xl">
                   <DialogHeader>
                     <DialogTitle className="text-2xl font-black">Institutional Privacy Policy</DialogTitle>
                     <DialogDescription className="font-medium pt-4 leading-relaxed">
                       At ShuleDirect Pro, we prioritize the protection of minor records and personnel data in alignment with the Tanzania Data Protection Act 2022 (PDPA). Our forensic logging and local-edge encryption ensure your data never leaves official nodes without authorization.
                     </DialogDescription>
                   </DialogHeader>
                 </DialogContent>
               </Dialog>
               <Dialog>
                 <DialogTrigger className="hover:underline">Terms of Service</DialogTrigger>
                 <DialogContent className="rounded-[2.5rem] max-w-2xl">
                   <DialogHeader>
                     <DialogTitle className="text-2xl font-black">2026 Season Terms</DialogTitle>
                     <DialogDescription className="font-medium pt-4 leading-relaxed">
                       Use of the ShuleDirect Pro ecosystem requires valid institutional credentials and center number verification. All PReMS synchronization activities are logged for national audit compliance.
                     </DialogDescription>
                   </DialogHeader>
                 </DialogContent>
               </Dialog>
               <Link href="/dashboard/help" className="hover:underline">Support Hub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}