
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Stethoscope, Users, FileText, Calendar, Upload, ArrowLeft, Eye, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { AIHealthInsights } from "@/components/health/AIHealthInsights"
import { QRCodeAccess } from "@/components/health/QRCodeAccess"
import { HealthTimeline } from "@/components/health/HealthTimeline"
import { PDFExport } from "@/components/health/PDFExport"
import { AccessibilityPanel } from "@/components/health/AccessibilityPanel"
import { MedicationReminders } from "@/components/health/MedicationReminders"

const DoctorDashboard = () => {
  const [accessGranted, setAccessGranted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAccessibility, setShowAccessibility] = useState(false)

  const mockPatients = [
    { id: 1, name: "John Doe", lastVisit: "2024-01-15", condition: "Diabetes", accessGranted: true },
    { id: 2, name: "Jane Smith", lastVisit: "2024-01-12", condition: "Hypertension", accessGranted: false },
    { id: 3, name: "Bob Johnson", lastVisit: "2024-01-10", condition: "Heart Disease", accessGranted: true }
  ]

  const mockAppointments = [
    { patient: "John Doe", time: "10:00 AM", type: "Follow-up", status: "Confirmed" },
    { patient: "Jane Smith", time: "11:30 AM", type: "Consultation", status: "Pending" },
    { patient: "Bob Johnson", time: "2:00 PM", type: "Check-up", status: "Confirmed" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/role-selection" className="text-green-600 hover:text-green-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Doctor Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back, Dr. Smith</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                DS
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
                { label: "Total Patients", value: "156", color: "green" },
                { label: "Today's Appointments", value: "8", color: "blue" },
                { label: "Pending Reviews", value: "3", color: "orange" },
                { label: "Prescriptions Written", value: "12", color: "purple" }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Health Insights for Doctor */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  Patient Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="font-medium text-red-800 dark:text-red-200">Critical Alert</div>
                    <div className="text-sm text-red-600 dark:text-red-300">Patient John Doe shows elevated blood pressure readings</div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="font-medium text-yellow-800 dark:text-yellow-200">Follow-up Required</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-300">3 patients need medication adjustments</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="font-medium text-green-800 dark:text-green-200">Positive Progress</div>
                    <div className="text-sm text-green-600 dark:text-green-300">5 patients showing improvement in recent tests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Access Control */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Patient Records Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">Access to patient records:</span>
                  <Switch checked={accessGranted} onCheckedChange={setAccessGranted} />
                  <span className="text-sm font-medium">
                    {accessGranted ? "Granted" : "Restricted"}
                  </span>
                </div>
                
                {accessGranted ? (
                  <div className="space-y-3">
                    {mockPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.condition}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={patient.accessGranted ? "default" : "secondary"}>
                            {patient.accessGranted ? "Access Granted" : "Pending"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Enable access to view patient records
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Prescription */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Upload Prescription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Patient ID</label>
                    <Input placeholder="Enter patient ID" className="hover:border-green-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Prescription Notes</label>
                    <Textarea placeholder="Enter prescription details..." rows={4} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload File</label>
                    <Input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    {selectedFile && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Upload Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accessibility Panel (Toggleable) */}
            {showAccessibility && <AccessibilityPanel />}
            
            {/* QR Code Access */}
            <QRCodeAccess patientId="DOC-12345" />

            {/* PDF Export */}
            <PDFExport patientName="Dr. Smith" patientId="DOC-12345" />

            {/* Today's Appointments */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments.map((apt, index) => (
                    <div key={index} className="p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="font-medium">{apt.patient}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{apt.time} - {apt.type}</div>
                      <Badge 
                        variant={apt.status === "Confirmed" ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {apt.status}
                      </Badge>
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

export default DoctorDashboard
