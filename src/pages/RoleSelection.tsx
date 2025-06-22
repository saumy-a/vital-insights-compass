
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, TestTube, Pill, ArrowLeft, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const roles = [
  {
    icon: User,
    title: "Patient Login",
    description: "Access your medical records and health insights",
    path: "/patient-dashboard",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    stats: "10K+ Active Users"
  },
  {
    icon: Stethoscope,
    title: "Doctor Login",
    description: "View patient records and upload prescriptions",
    path: "/doctor-dashboard",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    stats: "500+ Certified Doctors"
  },
  {
    icon: TestTube,
    title: "Lab Technician Login",
    description: "Upload test reports and manage lab data",
    path: "/lab-dashboard",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    stats: "200+ Partner Labs"
  },
  {
    icon: Pill,
    title: "Pharmacy Login",
    description: "Manage prescriptions and medicine inventory",
    path: "/pharmacy-dashboard",
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    stats: "300+ Pharmacies"
  }
]

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Secure Healthcare Access
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Select Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Role</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Choose your role to access the appropriate dashboard and start your healthcare journey
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roles.map((role, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 animate-fade-in overflow-hidden">
                <Link to={role.path}>
                  <div className={`h-2 w-full bg-gradient-to-r ${role.gradient}`}></div>
                  
                  <CardHeader className="text-center pb-4 relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <role.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl text-gray-900 mb-2">{role.title}</CardTitle>
                    <div className="text-sm text-gray-500 font-medium">{role.stats}</div>
                  </CardHeader>
                  
                  <CardContent className="text-center px-8 pb-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                    
                    <Button className={`w-full bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-base font-medium`}>
                      Continue as {role.title.split(' ')[0]}
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-16 animate-fade-in">
            <p className="text-gray-500 mb-4">Need help choosing the right role?</p>
            <Button variant="outline" className="border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
