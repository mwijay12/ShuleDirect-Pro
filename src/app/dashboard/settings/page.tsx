
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
  LockKeyhole
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">System Settings</h1>
          <p className="text-muted-foreground">Configure school preferences, NECTA center info, and PDPA compliance.</p>
        </div>
        <Button className="font-bold">
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="school" className="gap-2"><School className="h-4 w-4" /> School Info</TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2"><FileLock className="h-4 w-4" /> PDPA Compliance</TabsTrigger>
          <TabsTrigger value="integration" className="gap-2"><Smartphone className="h-4 w-4" /> Integrations</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
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
                  <Input defaultValue="Mlimani Academy Secondary School" />
                </div>
                <div className="space-y-2">
                  <Label>NECTA Center Number</Label>
                  <Input defaultValue="S.1234" />
                </div>
                <div className="space-y-2">
                  <Label>School Address</Label>
                  <Input defaultValue="Mlimani, Dar Es Salaam" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone (Principal)</Label>
                  <Input defaultValue="+255 22 2410 500" />
                </div>
                <div className="space-y-2">
                  <Label>Official Email</Label>
                  <Input defaultValue="admin@mlimani.ac.tz" />
                </div>
                <div className="space-y-2">
                  <Label>Local Currency</Label>
                  <Select defaultValue="TZS">
                    <SelectTrigger><SelectValue /></SelectTrigger>
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

        <TabsContent value="compliance" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Personal Data Protection Act (PDPA)
                  </CardTitle>
                  <CardDescription>Tanzania Data Protection Commission (PDPC) compliance settings.</CardDescription>
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
                  <Input defaultValue="Mwl. Richard Mrema" />
                </div>
                <div className="space-y-2">
                  <Label>PDPC Registration Number</Label>
                  <Input defaultValue="PDPC-REG-2024-00451" />
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <LockKeyhole className="h-4 w-4" />
                  Data Subject Rights (Parents/Students)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The system is currently configured to enforce strict data isolation for minor records. 
                  Audit logs are maintained for all staff access to academic and financial history 
                  in accordance with Act No. 11 of 2022.
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
                  Data Residency (Cloud Sovereignity)
                </div>
                <p className="text-xs text-muted-foreground">
                  Your data is currently hosted in the <strong>South Africa (Johannesburg)</strong> region 
                  to ensure low latency and compliance with regional data flow regulations.
                </p>
              </div>

              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-bold">Staff Roles Matrix</p>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Administrator</span>
                    <span>Full Access (ClickPesa Dashboard)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Academic Master</span>
                    <span>Grades, Attendance, NECTA Matrix</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Bursar (Keshia)</span>
                    <span>Finance, Invoices, Control Numbers</span>
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
