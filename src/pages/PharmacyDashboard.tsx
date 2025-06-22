
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Pill, Package, ShoppingCart, ArrowLeft, Settings, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import { QRCodeAccess } from "@/components/health/QRCodeAccess"
import { PDFExport } from "@/components/health/PDFExport"
import { AccessibilityPanel } from "@/components/health/AccessibilityPanel"
import { MedicationReminders } from "@/components/health/MedicationReminders"

const PharmacyDashboard = () => {
  const [showAccessibility, setShowAccessibility] = useState(false)

  const mockPrescriptions = [
    { id: 1, patient: "John Doe", medicine: "Metformin 500mg", doctor: "Dr. Smith", status: "Ready", urgent: false },
    { id: 2, patient: "Jane Smith", medicine: "Lisinopril 10mg", doctor: "Dr. Johnson", status: "Processing", urgent: true },
    { id: 3, patient: "Bob Johnson", medicine: "Aspirin 75mg", doctor: "Dr. Brown", status: "Dispensed", urgent: false }
  ]

  const mockInventory = [
    { medicine: "Paracetamol 500mg", stock: 150, minStock: 50, price: 25 },
    { medicine: "Amoxicillin 250mg", stock: 20, minStock: 30, price: 180 },
    { medicine: "Metformin 500mg", stock: 80, minStock: 40, price: 120 }
  ]

  const mockMedicineComparison = [
    { 
      name: "Paracetamol", 
      brands: [
        { brand: "Crocin", price: 25, stock: "In Stock", rating: 4.5 },
        { brand: "Dolo", price: 22, stock: "Low Stock", rating: 4.2 },
        { brand: "Calpol", price: 28, stock: "In Stock", rating: 4.7 }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/role-selection" className="text-orange-600 hover:text-orange-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Pharmacy Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back, Pharmacist</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                PH
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
                { label: "Prescriptions Today", value: "32", color: "orange" },
                { label: "Ready for Pickup", value: "12", color: "green" },
                { label: "Low Stock Items", value: "5", color: "red" },
                { label: "Revenue Today", value: "₹8,450", color: "blue" }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Prescription Management */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-orange-600" />
                  Prescription Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                          <Pill className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{prescription.patient}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {prescription.medicine} - Prescribed by {prescription.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {prescription.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        <Badge 
                          variant={prescription.status === "Ready" ? "default" : 
                                  prescription.status === "Processing" ? "secondary" : "outline"}
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medicine Price Comparison */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                  Medicine Price Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockMedicineComparison.map((medicine, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-medium text-lg">{medicine.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {medicine.brands.map((brand, brandIndex) => (
                        <div key={brandIndex} className="p-3 border dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{brand.brand}</div>
                            <div className="text-lg font-bold text-orange-600">₹{brand.price}</div>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant={brand.stock === "In Stock" ? "default" : "secondary"}>
                              {brand.stock}
                            </Badge>
                            <div className="text-sm text-gray-500">⭐ {brand.rating}</div>
                          </div>
                          <Button size="sm" className="w-full">Order</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Inventory Management */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  Inventory Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInventory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">{item.medicine}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Price: ₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium">{item.stock} units</div>
                          <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                        </div>
                        {item.stock <= item.minStock && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accessibility Panel */}
            {showAccessibility && <AccessibilityPanel />}
            
            {/* Medication Reminders */}
            <MedicationReminders />

            {/* QR Code Access */}
            <QRCodeAccess patientId="PHARM-12345" />

            {/* PDF Export */}
            <PDFExport patientName="Pharmacist" patientId="PHARM-12345" />

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Reorder Stock
                </Button>
                <Button className="w-full" variant="outline">
                  <Pill className="h-4 w-4 mr-2" />
                  New Prescription
                </Button>
                <Button className="w-full" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PharmacyDashboard
