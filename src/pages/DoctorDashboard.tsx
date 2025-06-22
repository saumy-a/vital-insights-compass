
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Stethoscope, Users, FileText, Calendar, Upload, ArrowLeft, Eye } from "lucide-react"
import { Link } from "react-router-dom"

const DoctorDashboard = () => {
  const [accessGranted, setAccessGranted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
                <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. Smith</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              DS
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Access Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
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
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.condition}</p>
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
                  <div className="text-center py-8 text-gray-500">
                    Enable access to view patient records
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Prescription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Prescription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Patient ID</label>
                    <Input placeholder="Enter patient ID" />
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
                      <p className="text-sm text-gray-600 mt-1">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <Button className="w-full">Upload Prescription</Button>
                </div>
              </CardContent>
            </Card>

            {/* Follow-up Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Follow-up Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Patient Name" />
                    <Input placeholder="Follow-up Date" type="date" />
                  </div>
                  <Textarea placeholder="Enter follow-up notes..." rows={4} />
                  <Button className="w-full">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments.map((apt, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{apt.patient}</div>
                      <div className="text-sm text-gray-600">{apt.time} - {apt.type}</div>
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

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Patients</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today's Appointments</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Reviews</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prescriptions Written</span>
                    <span className="font-semibold">12</span>
                  </div>
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
