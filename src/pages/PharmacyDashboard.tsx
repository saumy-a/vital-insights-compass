
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Pill, FileText, Package, TrendingUp, ArrowLeft, DollarSign } from "lucide-react"
import { Link } from "react-router-dom"

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Metformin", price: 25.99, stock: 150, available: true },
    { id: 2, name: "Lisinopril", price: 18.50, stock: 0, available: false },
    { id: 3, name: "Atorvastatin", price: 32.75, stock: 75, available: true },
    { id: 4, name: "Amlodipine", price: 22.30, stock: 200, available: true }
  ])

  const mockPrescriptions = [
    { id: 1, patient: "John Doe", medicine: "Metformin 500mg", quantity: 30, status: "Pending", date: "2024-01-15" },
    { id: 2, patient: "Jane Smith", medicine: "Lisinopril 10mg", quantity: 30, status: "Not Available", date: "2024-01-15" },
    { id: 3, patient: "Bob Johnson", medicine: "Atorvastatin 20mg", quantity: 30, status: "Processed", date: "2024-01-14" }
  ]

  const priceComparison = [
    { medicine: "Metformin", ourPrice: 25.99, competitor1: 28.50, competitor2: 24.75 },
    { medicine: "Lisinopril", ourPrice: 18.50, competitor1: 19.25, competitor2: 17.99 },
    { medicine: "Atorvastatin", ourPrice: 32.75, competitor1: 35.00, competitor2: 31.50 }
  ]

  const toggleAvailability = (id: number) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, available: !med.available } : med
    ))
  }

  const updateOrderStatus = (id: number, status: string) => {
    // This would update the prescription status in a real application
    console.log(`Updated prescription ${id} to ${status}`)
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
                <h1 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h1>
                <p className="text-gray-600">Welcome back, PharmaCare Store</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              PC
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prescription Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Prescription Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{prescription.patient}</div>
                        <div className="text-sm text-gray-600">{prescription.medicine}</div>
                        <div className="text-sm text-gray-500">Quantity: {prescription.quantity} - {prescription.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={prescription.status === "Processed" ? "default" : 
                                  prescription.status === "Not Available" ? "destructive" : "secondary"}
                        >
                          {prescription.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(prescription.id, "Processed")}
                            disabled={prescription.status === "Processed"}
                          >
                            Process
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateOrderStatus(prescription.id, "Not Available")}
                          >
                            Not Available
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medicine Inventory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Medicine Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medicines.map((medicine) => (
                    <div key={medicine.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-gray-600">Stock: {medicine.stock} units</div>
                        <div className="text-sm text-green-600">${medicine.price}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Input 
                            type="number" 
                            placeholder="Update stock" 
                            className="w-32 text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={medicine.available} 
                            onCheckedChange={() => toggleAvailability(medicine.id)}
                          />
                          <span className="text-sm">
                            {medicine.available ? "Available" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Price Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceComparison.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="font-medium mb-3">{item.medicine}</div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-gray-600">Our Price</div>
                          <div className="font-semibold text-blue-600">${item.ourPrice}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600">Competitor A</div>
                          <div className={`font-semibold ${item.ourPrice < item.competitor1 ? 'text-green-600' : 'text-red-600'}`}>
                            ${item.competitor1}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600">Competitor B</div>
                          <div className={`font-semibold ${item.ourPrice < item.competitor2 ? 'text-green-600' : 'text-red-600'}`}>
                            ${item.competitor2}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Today's Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orders Processed</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Orders</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Out of Stock</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-semibold text-green-600">$1,245</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span className="text-sm">Lisinopril</span>
                    <Badge variant="destructive">0 units</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm">Atorvastatin</span>
                    <Badge variant="secondary">75 units</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Reorder Supplies
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Pill className="h-4 w-4 mr-2" />
                    Add New Medicine
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Update Inventory
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PharmacyDashboard
