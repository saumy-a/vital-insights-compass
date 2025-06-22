
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, TestTube, Pill, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const roles = [
  {
    icon: User,
    title: "Patient Login",
    description: "Access your medical records and health insights",
    path: "/patient-dashboard",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    icon: Stethoscope,
    title: "Doctor Login",
    description: "View patient records and upload prescriptions",
    path: "/doctor-dashboard",
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    icon: TestTube,
    title: "Lab Technician Login",
    description: "Upload test reports and manage lab data",
    path: "/lab-dashboard",
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    icon: Pill,
    title: "Pharmacy Login",
    description: "Manage prescriptions and medicine inventory",
    path: "/pharmacy-dashboard",
    color: "bg-orange-500 hover:bg-orange-600"
  }
]

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose your role to access the appropriate dashboard</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <Link to={role.path}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <Button className={`w-full ${role.color} text-white`}>
                    Continue as {role.title.split(' ')[0]}
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
