
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
  Save
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">System Settings</h1>
          <p className="text-muted-foreground">Configure school preferences, academic terms, and security.</p>
        </div>
        <Button className="font-bold">
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="school" className="gap-2"><School className="h-4 w-4" /> School Info</TabsTrigger>
          <TabsTrigger value="academic" className="gap-2"><Calendar className="h-4 w-4" /> Academic Terms</TabsTrigger>
          <TabsTrigger value="integration" className="gap-2"><Smartphone className="h-4 w-4" /> Integrations</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Core details used in official NECTA reports and invoices.</CardDescription>
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
                  <Label>Contact Phone</Label>
                  <Input defaultValue="+255 22 2410 500" />
                </div>
                <div className="space-y-2">
                  <Label>Official Email</Label>
                  <Input defaultValue="admin@mlimani.ac.tz" />
                </div>
                <div className="space-y-2">
                  <Label>Primary Currency</Label>
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

        <TabsContent value="integration" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Financial & Communication Gateways</CardTitle>
              <CardDescription>Manage third-party service connections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">ClickPesa Payment Gateway</p>
                  <p className="text-xs text-muted-foreground">Automate fee collection via Mobile Money & Banks.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">SMS Alert System (Nguvu)</p>
                  <p className="text-xs text-muted-foreground">Notify parents of absences and results via SMS.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Gemini AI Academic Assistant</p>
                  <p className="text-xs text-muted-foreground">Enable AI tools for resource generation and summaries.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage staff roles and password policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center gap-4 mt-1">
                  <Button variant="outline" size="sm">Enable for Admins</Button>
                  <p className="text-xs text-muted-foreground italic">Recommended for users with financial access.</p>
                </div>
              </div>
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-bold">Staff Roles Matrix</p>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Administrator</span>
                    <span>Full Access</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Academic Master</span>
                    <span>Grades, Attendance, Reports</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="font-semibold">Bursar</span>
                    <span>Finance, Invoices, Fees</span>
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
