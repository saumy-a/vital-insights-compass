
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Pill, Calendar, QrCode, BarChart3, ArrowLeft, Download } from "lucide-react"
import { Link } from "react-router-dom"

const PatientDashboard = () => {
  const [qrVisible, setQrVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const mockReports = [
    { id: 1, name: "Blood Test Report", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "X-Ray Scan", date: "2024-01-10", type: "Image" },
    { id: 3, name: "MRI Report", date: "2024-01-05", type: "PDF" }
  ]

  const mockMedications = [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", nextDose: "2:00 PM" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", nextDose: "8:00 AM" }
  ]

  const mockAppointments = [
    { doctor: "Dr. Smith", date: "2024-01-20", time: "10:00 AM", type: "Follow-up" },
    { doctor: "Dr. Johnson", date: "2024-01-25", time: "2:30 PM", type: "Check-up" }
  ]

  const generateQRCode = () => {
    setQrVisible(!qrVisible)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/role-selection" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
                <p className="text-gray-600">Welcome back, John Doe</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Uploaded Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Uploaded Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.date}</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                  )}
                  <Button className="w-full">Upload Report</Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Normal</div>
                    <div className="text-sm text-gray-600">Blood Pressure</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">Monitor</div>
                    <div className="text-sm text-gray-600">Cholesterol</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Good</div>
                    <div className="text-sm text-gray-600">Overall Health</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medication Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Medication Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMedications.map((med, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-gray-600">{med.dosage} - {med.frequency}</div>
                      <div className="text-sm text-blue-600">Next: {med.nextDose}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments.map((apt, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{apt.doctor}</div>
                      <div className="text-sm text-gray-600">{apt.date} at {apt.time}</div>
                      <Badge variant="outline" className="mt-1">{apt.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QR Code Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Share Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={generateQRCode} className="w-full mb-3">
                  Generate QR Code
                </Button>
                {qrVisible && (
                  <div className="text-center p-4 border-2 border-dashed rounded-lg">
                    <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">QR Code for secure access sharing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
