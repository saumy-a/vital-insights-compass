
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Pill, Calendar, BarChart3, ArrowLeft, Download, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { AIHealthInsights } from "@/components/health/AIHealthInsights"
import { QRCodeAccess } from "@/components/health/QRCodeAccess"
import { HealthTimeline } from "@/components/health/HealthTimeline"
import { PDFExport } from "@/components/health/PDFExport"
import { AccessibilityPanel } from "@/components/health/AccessibilityPanel"
import { MedicationReminders } from "@/components/health/MedicationReminders"
import { DoctorRatings } from "@/components/health/DoctorRatings"

const PatientDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAccessibility, setShowAccessibility] = useState(false)

  const mockReports = [
    { id: 1, name: "Blood Test Report", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "X-Ray Scan", date: "2024-01-10", type: "Image" },
    { id: 3, name: "MRI Report", date: "2024-01-05", type: "PDF" }
  ]

  const mockAppointments = [
    { doctor: "Dr. Smith", date: "2024-01-20", time: "10:00 AM", type: "Follow-up" },
    { doctor: "Dr. Johnson", date: "2024-01-25", time: "2:30 PM", type: "Check-up" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/role-selection" className="text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Patient Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back, John Doe</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                JD
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
                { label: "Reports", value: "12", color: "blue" },
                { label: "Medications", value: "2", color: "green" },
                { label: "Appointments", value: "3", color: "purple" },
                { label: "Health Score", value: "85%", color: "orange" }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Health Insights */}
            <AIHealthInsights />

            {/* Health Timeline */}
            <HealthTimeline />

            {/* Uploaded Reports */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Medical Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Report */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Upload New Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="hover:border-blue-400 transition-colors"
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Selected: {selectedFile.name}</p>
                  )}
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Upload Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accessibility Panel (Toggleable) */}
            {showAccessibility && <AccessibilityPanel />}
            
            {/* Medication Reminders */}
            <MedicationReminders />

            {/* Doctor Ratings */}
            <DoctorRatings />

            {/* QR Code Access */}
            <QRCodeAccess />

            {/* PDF Export */}
            <PDFExport />

            {/* Upcoming Appointments */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments.map((apt, index) => (
                    <div key={index} className="p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="font-medium">{apt.doctor}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{apt.date} at {apt.time}</div>
                      <Badge variant="outline" className="mt-1">{apt.type}</Badge>
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

export default PatientDashboard
