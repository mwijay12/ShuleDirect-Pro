
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

const staffKeys = [
  { name: "Mwl. Juma", role: "Math Teacher", key: "MATH101", status: "Active" },
  { name: "Mwl. Neema", role: "English Teacher", key: "ENG202", status: "Active" },
  { name: "Bursar Keshia", role: "Bursar", key: "BURSAR789", status: "Active" },
  { name: "Mwl. Peter", role: "Physics Teacher", key: "PHY404", status: "Active" },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">System Settings</h1>
          <p className="text-muted-foreground">Configure school preferences, NECTA center info, and PDPA compliance.</p>
        </div>
        <Button className="font-bold rounded-full colorful-gradient h-11 px-8 shadow-lg">
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl overflow-x-auto w-full sm:w-fit flex h-auto">
          <TabsTrigger value="school" className="gap-2 rounded-lg font-bold"><School className="h-4 w-4" /> Info</TabsTrigger>
          <TabsTrigger value="staff" className="gap-2 rounded-lg font-bold"><Key className="h-4 w-4" /> Staff Keys</TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 rounded-lg font-bold"><FileLock className="h-4 w-4" /> PDPA</TabsTrigger>
          <TabsTrigger value="integration" className="gap-2 rounded-lg font-bold"><Smartphone className="h-4 w-4" /> Apps</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-lg font-bold"><Shield className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Core details used in official NECTA PReM/PReMS reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Official School Name</Label>
                  <Input defaultValue="Mlimani Academy Secondary School" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>NECTA Center Number</Label>
                  <Input defaultValue="S.1234" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>School Address</Label>
                  <Input defaultValue="Mlimani, Dar Es Salaam" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone (Principal)</Label>
                  <Input defaultValue="+255 22 2410 500" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Official Email</Label>
                  <Input defaultValue="admin@mlimani.ac.tz" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Local Currency</Label>
                  <Select defaultValue="TZS">
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
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
                <CardTitle>Staff Access Keys</CardTitle>
                <CardDescription>Generate unique keys for teacher subject access.</CardDescription>
              </div>
              <Button size="sm" className="rounded-full h-9 font-bold">
                <Plus className="mr-2 h-4 w-4" /> New Key
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/20 border-none">
                    <TableHead className="pl-6">Personnel</TableHead>
                    <TableHead>Assigned Role</TableHead>
                    <TableHead>Access Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffKeys.map((staff) => (
                    <TableRow key={staff.key} className="hover:bg-muted/10 border-none">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {staff.name.charAt(0)}
                          </div>
                          <span className="font-bold text-sm">{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground">{staff.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px] font-bold tracking-widest">{staff.key}</Badge>
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
                    PDPA Compliance
                  </CardTitle>
                  <CardDescription>Tanzania Data Protection Commission (PDPC) settings.</CardDescription>
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
                  <Input defaultValue="Mwl. Richard Mrema" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>PDPC Registration Number</Label>
                  <Input defaultValue="PDPC-REG-2024-00451" className="rounded-xl" />
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <LockKeyhole className="h-4 w-4" />
                  Data Subject Rights
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The system is currently configured to enforce strict data isolation for minor records. 
                  Audit logs are maintained for all staff access in accordance with Act No. 11 of 2022.
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="data-export" defaultChecked />
                    <Label htmlFor="data-export" className="text-xs">Self-Service Data Export</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="soft-delete" defaultChecked />
                    <Label htmlFor="soft-delete" className="text-xs">Enforce Soft-Delete Policy</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Financial & Communication Gateways</CardTitle>
              <CardDescription>Local East African ecosystem integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">ClickPesa (Mobile Money & Banks)</p>
                  <p className="text-xs text-muted-foreground">Collection via M-Pesa, Tigo Pesa, Airtel Money.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">ACTIVE</Badge>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Beem Africa (Bulk SMS Gateway)</p>
                  <p className="text-xs text-muted-foreground">Automated fee reminders and attendance alerts.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">CONNECTED</Badge>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Gemini AI Academic Assistant</p>
                  <p className="text-xs text-muted-foreground">Enable AI tools for NECTA resource generation.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Access Control & Cloud Sovereignty</CardTitle>
              <CardDescription>Manage staff roles and data residency.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10">
                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                  <Globe className="h-4 w-4" />
                  Data Residency (Johannesburg)
                </div>
                <p className="text-xs text-muted-foreground">
                  Your data is hosted in the South Africa region for low latency and compliance.
                </p>
              </div>

              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-bold">Staff Roles Matrix</p>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                    <span className="font-semibold">Administrator</span>
                    <span>Full Access</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                    <span className="font-semibold">Subject Teacher</span>
                    <span>Class Specific + Grading</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
