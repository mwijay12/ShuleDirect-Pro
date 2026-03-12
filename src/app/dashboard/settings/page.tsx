
"use client"

import * as React from "react"
import { 
  Settings, 
  School, 
  Calendar, 
  Users, 
  Shield, 
  Smartphone,
  Globe,
  Save,
  FileLock,
  LockKeyhole,
  Key,
  Plus,
  Trash2,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

const staffKeys = [
  { name: "Mwl. Juma", role: "Math Teacher", key: "MATH101", status: "Active" },
  { name: "Mwl. Neema", role: "English Teacher", key: "ENG202", status: "Active" },
  { name: "Bursar Keshia", role: "Bursar", key: "BURSAR789", status: "Active" },
  { name: "Mwl. Peter", role: "Physics Teacher", key: "PHY404", status: "Active" },
]

export default function SettingsPage() {
  const { toast } = useToast()
  
  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "School metadata and center info saved successfully.",
    })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Admin Control Panel</h1>
          <p className="text-muted-foreground">Manage school metadata, center IDs, and staff career access keys.</p>
        </div>
        <Button onClick={handleSave} className="font-bold rounded-full colorful-gradient h-11 px-8 shadow-lg">
          <Save className="mr-2 h-4 w-4" /> Save Configuration
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl overflow-x-auto w-full sm:w-fit flex h-auto">
          <TabsTrigger value="school" className="gap-2 rounded-lg font-bold">School Info</TabsTrigger>
          <TabsTrigger value="staff" className="gap-2 rounded-lg font-bold">Personnel Keys</TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 rounded-lg font-bold">Compliance</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-lg font-bold">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Institutional Identity</CardTitle>
              <CardDescription>Primary metadata used for official NECTA and PReMS reporting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Official School Name</Label>
                  <Input defaultValue="Mlimani Academy Secondary School" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>NECTA Center Number</Label>
                  <Input defaultValue="S.1234" className="rounded-xl h-11 font-mono font-bold" />
                </div>
                <div className="space-y-2">
                  <Label>Official Website URL</Label>
                  <Input defaultValue="https://www.mlimani.ac.tz" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Physical Address</Label>
                  <Input defaultValue="Mlimani St, Dar Es Salaam" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Principal's Office Contact</Label>
                  <Input defaultValue="+255 22 2410 500" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Local Currency (Invoicing)</Label>
                  <Select defaultValue="TZS">
                    <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TZS">Tanzanian Shilling (TZS)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Personnel Access Hub</CardTitle>
                <CardDescription>Manage teacher subject keys and career roles.</CardDescription>
              </div>
              <Button size="sm" className="rounded-full h-9 font-bold">
                <Plus className="mr-2 h-4 w-4" /> Issue New Key
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/20 border-none">
                    <TableHead className="pl-6"> Personnel Name</TableHead>
                    <TableHead>Assigned Career Role</TableHead>
                    <TableHead>Secure Access Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Management</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffKeys.map((staff) => (
                    <TableRow key={staff.key} className="hover:bg-muted/10 border-none">
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {staff.name.charAt(0)}
                          </div>
                          <span className="font-bold text-sm">{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{staff.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px] font-black tracking-[0.2em]">{staff.key}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600">
                          <CheckCircle2 className="h-3 w-3" /> {staff.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/5 rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Data Sovereignty (PDPA)
                  </CardTitle>
                  <CardDescription>Privacy settings for Tanzanian student records.</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                  PDPC REGISTERED
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Data Protection Officer (DPO)</Label>
                  <Input defaultValue="Mwl. Richard Mrema" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Official Registration No.</Label>
                  <Input defaultValue="PDPC-REG-2024-00451" className="rounded-xl h-11" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <LockKeyhole className="h-4 w-4" /> Student Data Subject Rights
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Strict isolation of minor records. All staff access is logged per Act No. 11 of 2022.
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="data-export" defaultChecked />
                    <Label htmlFor="data-export" className="text-xs">Self-Service Export</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>System Sovereignty</CardTitle>
              <CardDescription>Data residency and cloud access control.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10">
                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                  <Globe className="h-4 w-4 text-primary" /> Data Region: South Africa (Johannesburg)
                </div>
                <p className="text-xs text-muted-foreground">Local residency for compliance and low latency.</p>
              </div>
              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Multi-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Required for all Administrator accounts.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
