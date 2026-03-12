
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Users, 
  GraduationCap, 
  Banknote, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  Sparkles,
  StickyNote,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const data = [
  { name: "Jan", attendance: 92, fees: 4500 },
  { name: "Feb", attendance: 95, fees: 5200 },
  { name: "Mar", attendance: 91, fees: 4800 },
  { name: "Apr", attendance: 98, fees: 6100 },
  { name: "May", attendance: 94, fees: 5500 },
  { name: "Jun", attendance: 96, fees: 7200 },
]

const stats = [
  {
    title: "Students",
    value: "1,284",
    description: "+12% this term",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100/50",
  },
  {
    title: "Exam Completion",
    value: "84%",
    description: "NECTA Prep Active",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-100/50",
  },
  {
    title: "Revenue",
    value: "TZS 42.5M",
    description: "Fees & Extras",
    icon: Banknote,
    color: "text-green-600",
    bg: "bg-green-100/50",
  },
  {
    title: "Attendance",
    value: "96.2%",
    description: "Peak Performance",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-100/50",
  },
]

export default function DashboardPage() {
  const [note, setNote] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={cn("space-y-8 transition-all duration-700", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Academic Overview
          </h1>
          <p className="text-muted-foreground font-medium">Insights and actions for Mlimani Academy today.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-full shadow-sm">
            <Calendar className="mr-2 h-4 w-4" /> Weekly Schedule
          </Button>
          <Button size="sm" className="rounded-full shadow-md colorful-gradient">
            <Sparkles className="mr-2 h-4 w-4" /> AI Insights
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} className="group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn(stat.bg, "p-2.5 rounded-2xl group-hover:scale-110 transition-transform")}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-2 flex items-center gap-1">
                {stat.description.includes('+') ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-primary" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-none shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Revenue Trends</CardTitle>
              <CardDescription>Fee collection & Stationery sales via ClickPesa</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
              TZS millions
            </Badge>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F5BA6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1F5BA6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="fees" stroke="#1F5BA6" strokeWidth={4} fillOpacity={1} fill="url(#colorFees)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-yellow-50/50 border-yellow-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
              <StickyNote className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                <StickyNote className="h-5 w-5" /> Later Entry
              </CardTitle>
              <CardDescription className="text-yellow-700/60">Quick notes for later today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Buy lab reagents, call parent of S002..." 
                className="bg-white/50 border-yellow-200 focus-visible:ring-yellow-400 min-h-[100px] resize-none text-sm placeholder:text-yellow-900/30"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-full">
                <Send className="mr-2 h-4 w-4" /> Save Quick Note
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Staff Pulse</CardTitle>
              <CardDescription>Recent academic actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { user: "Mwl. Juma", action: "Uploaded Results", time: "12m ago", icon: CheckCircle2, color: "text-green-500" },
                  { user: "Bursar", action: "Verified Batch #09", time: "45m ago", icon: Clock, color: "text-primary" },
                  { user: "System", action: "Sync Completed", time: "1h ago", icon: CheckCircle2, color: "text-accent" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className={cn("p-2 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors", item.color)}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item.user}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{item.action}</p>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full">
                  View Full Audit Log <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
