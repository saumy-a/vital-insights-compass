
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TestTube, Upload, Clock, FileText, ArrowLeft, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const LabDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [patientId, setPatientId] = useState("")

  const mockUploadHistory = [
    { id: 1, patient: "John Doe", test: "Blood Test", date: "2024-01-15", status: "Completed" },
    { id: 2, patient: "Jane Smith", test: "X-Ray", date: "2024-01-14", status: "Uploaded" },
    { id: 3, patient: "Bob Johnson", test: "MRI Scan", date: "2024-01-13", status: "Processing" },
    { id: 4, patient: "Alice Brown", test: "CT Scan", date: "2024-01-12", status: "Completed" }
  ]

  const mockAccessRequests = [
    { patient: "John Doe", requestDate: "2024-01-15", purpose: "Follow-up consultation" },
    { patient: "Jane Smith", requestDate: "2024-01-14", purpose: "Second opinion review" }
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
                <h1 className="text-2xl font-bold text-gray-900">Lab Technician Dashboard</h1>
                <p className="text-gray-600">Welcome back, Lab Tech Sarah</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              ST
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Test Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Test Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Patient ID</label>
                      <Input 
                        placeholder="Enter patient ID" 
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Type</label>
                      <Input placeholder="e.g., Blood Test, X-Ray" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Report File</label>
                    <Input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    {selectedFile && (
                      <p className="text-sm text-gray-600 mt-1">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Test Date" type="date" />
                    <Input placeholder="Lab Reference Number" />
                  </div>
                  <Button className="w-full">Upload Report</Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upload History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUploadHistory.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <TestTube className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{upload.patient}</p>
                          <p className="text-sm text-gray-600">{upload.test} - {upload.date}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={upload.status === "Completed" ? "default" : 
                                upload.status === "Processing" ? "secondary" : "outline"}
                      >
                        {upload.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Request Patient Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Request Patient Record Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Patient ID" />
                    <Input placeholder="Patient Name" />
                  </div>
                  <Input placeholder="Purpose of access request" />
                  <Button className="w-full">Submit Access Request</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Blood Tests - 5 pending</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">X-Ray Reports - 3 ready</span>
                    <Badge variant="default">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">MRI Scans - 2 processing</span>
                    <Badge variant="secondary">Processing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Access Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Access Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAccessRequests.map((request, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{request.patient}</div>
                      <div className="text-sm text-gray-600">{request.requestDate}</div>
                      <div className="text-sm text-gray-500 mt-1">{request.purpose}</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Approve</Button>
                        <Button size="sm" variant="outline">Deny</Button>
                      </div>
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
                    <span className="text-gray-600">Reports Uploaded Today</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Tests</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access Requests</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Today</span>
                    <span className="font-semibold">15</span>
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

export default LabDashboard
