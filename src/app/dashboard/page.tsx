
"use client"

import * as React from "react"
import { 
  Users, 
  GraduationCap, 
  Banknote, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    title: "Total Students",
    value: "1,284",
    description: "+12% from last term",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Exam Completion",
    value: "84%",
    description: "Form 4 NECTA Prep",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Fee Collection",
    value: "TZS 42.5M",
    description: "78% of total revenue",
    icon: Banknote,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Attendance",
    value: "96.2%",
    description: "Historical average: 92%",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Academic Overview</h1>
        <p className="text-muted-foreground">Welcome back, Administrator. Here's what's happening today at Mlimani Academy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.description.includes('+') ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <Calendar className="h-3 w-3" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Fee Collection Trends</CardTitle>
            <CardDescription>Monthly revenue tracking via ClickPesa Gateway</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F5BA6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1F5BA6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="fees" stroke="#1F5BA6" strokeWidth={3} fillOpacity={1} fill="url(#colorFees)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Recent Alerts</CardTitle>
              <CardDescription>Urgent notifications for staff</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "NECTA Registration Deadline", tag: "Exam", time: "2h ago", color: "destructive" },
                { title: "M-Pesa Reconciliation Error", tag: "Finance", time: "4h ago", color: "secondary" },
                { title: "New Resource Generated", tag: "AI", time: "5h ago", color: "outline" },
                { title: "Bus Route #4 Delay", tag: "Transport", time: "6h ago", color: "secondary" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">{alert.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.color as any} className="text-[10px] px-1.5 py-0">
                        {alert.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
