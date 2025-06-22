
import { Clock, User, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const appointments = [
  {
    id: '1',
    patient: 'Sarah Johnson',
    time: '09:00 AM',
    type: 'Consultation',
    room: 'Room 201',
    status: 'confirmed'
  },
  {
    id: '2',
    patient: 'Michael Chen',
    time: '10:30 AM',
    type: 'Follow-up',
    room: 'Room 105',
    status: 'pending'
  },
  {
    id: '3',
    patient: 'Emily Davis',
    time: '02:00 PM',
    type: 'Surgery',
    room: 'OR 3',
    status: 'confirmed'
  },
  {
    id: '4',
    patient: 'Robert Wilson',
    time: '03:30 PM',
    type: 'Consultation',
    room: 'Room 202',
    status: 'confirmed'
  }
]

export function AppointmentsList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Today's Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {appointment.room}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View All Appointments
        </Button>
      </CardContent>
    </Card>
  )
}
