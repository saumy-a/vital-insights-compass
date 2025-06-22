
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { TestTube, Upload, FileText, Clock, ArrowLeft, Settings, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { QRCodeAccess } from "@/components/health/QRCodeAccess"
import { HealthTimeline } from "@/components/health/HealthTimeline"
import { PDFExport } from "@/components/health/PDFExport"
import { AccessibilityPanel } from "@/components/health/AccessibilityPanel"

const LabDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAccessibility, setShowAccessibility] = useState(false)

  const mockTests = [
    { id: 1, patient: "John Doe", test: "Blood Test", status: "Completed", date: "2024-01-20" },
    { id: 2, patient: "Jane Smith", test: "X-Ray", status: "In Progress", date: "2024-01-19" },
    { id: 3, patient: "Bob Johnson", test: "MRI Scan", status: "Pending", date: "2024-01-18" }
  ]

  const mockReports = [
    { id: 1, test: "Complete Blood Count", patient: "John Doe", urgent: true },
    { id: 2, test: "Lipid Profile", patient: "Jane Smith", urgent: false },
    { id: 3, test: "Thyroid Function", patient: "Bob Johnson", urgent: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/role-selection" className="text-purple-600 hover:text-purple-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Lab Technician Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back, Lab Tech</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAccessibility(!showAccessibility)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                LT
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Tests Today", value: "24", color: "purple" },
                { label: "Pending Reports", value: "8", color: "orange" },
                { label: "Completed", value: "16", color: "green" },
                { label: "Urgent Tests", value: "3", color: "red" }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Test Queue Management */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-purple-600" />
                  Test Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <TestTube className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{test.patient}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{test.test} - {test.date}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={test.status === "Completed" ? "default" : test.status === "In Progress" ? "secondary" : "outline"}
                      >
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Test Report */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-purple-600" />
                  Upload Test Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Patient ID</label>
                      <Input placeholder="Enter patient ID" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Type</label>
                      <Input placeholder="e.g., Blood Test, X-Ray" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Report Notes</label>
                    <Textarea placeholder="Enter test results and observations..." rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Report File</label>
                    <Input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    {selectedFile && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    Upload Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Timeline */}
            <HealthTimeline />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accessibility Panel */}
            {showAccessibility && <AccessibilityPanel />}
            
            {/* QR Code Access */}
            <QRCodeAccess patientId="LAB-12345" />

            {/* PDF Export */}
            <PDFExport patientName="Lab Tech" patientId="LAB-12345" />

            {/* Urgent Reports */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  Urgent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="p-3 border dark:border-gray-700 rounded-lg">
                      <div className="font-medium">{report.test}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{report.patient}</div>
                      {report.urgent && (
                        <Badge variant="destructive" className="mt-1">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabDashboard
