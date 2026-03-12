
"use client"

import * as React from "react"
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  BarChart, 
  PieChart, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentReports = [
  { id: "REP-01", name: "Form 4 NECTA Registration (CSEE)", date: "2024-05-10", type: "XML/CSV", status: "Verified" },
  { id: "REP-02", name: "Mock Examination Statistics - Term 1", date: "2024-05-08", type: "PDF", status: "Generated" },
  { id: "REP-03", name: "Student Attendance Quarterly Summary", date: "2024-05-05", type: "Excel", status: "Verified" },
  { id: "REP-04", name: "Fee Reconciliation Report (ClickPesa)", date: "2024-05-01", type: "Excel", status: "Pending Audit" },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Compliance Reports</h1>
          <p className="text-muted-foreground">Generate and export NECTA-compliant data and internal analytics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Custom Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-primary">
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">CSEE (O-Level) NECTA</CardTitle>
            <CardDescription>Official XML export for Form 4 exam registration.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" size="sm" className="w-full">Prepare Export</Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-accent">
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-accent/10 mb-2">
              <PieChart className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-lg">ACSEE (A-Level) NECTA</CardTitle>
            <CardDescription>Advanced secondary education results and profiling.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" size="sm" className="w-full">View ACSEE Matrix</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-orange-500">
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-orange-100 mb-2">
              <FileSpreadsheet className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">ClickPesa Financials</CardTitle>
            <CardDescription>Aggregated payment logs for tax and school audits.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" size="sm" className="w-full">Financial Audit</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Generated Files</CardTitle>
              <CardDescription>History of recent exports and reports</CardDescription>
            </div>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-9 h-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-semibold">{report.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{report.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {report.status === "Verified" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
                      )}
                      <span className="text-xs font-medium">{report.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
