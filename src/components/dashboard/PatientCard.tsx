
import { User, Calendar, Activity } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
  status: 'stable' | 'critical' | 'improving'
  avatar?: string
}

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800'
      case 'critical': return 'bg-red-100 text-red-800'
      case 'improving': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">Age {patient.age}</p>
          </div>
          <Badge className={getStatusColor(patient.status)}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Activity className="h-4 w-4" />
            <span>{patient.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last visit: {patient.lastVisit}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1">View Details</Button>
          <Button size="sm" variant="outline">Schedule</Button>
        </div>
      </CardContent>
    </Card>
  )
}
