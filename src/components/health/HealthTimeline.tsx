
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Pill, Calendar, Upload, Stethoscope } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    type: "report",
    title: "Blood Test Report Uploaded",
    description: "Complete blood count and lipid profile",
    date: "2024-01-20",
    time: "10:30 AM",
    icon: FileText,
    color: "bg-blue-500"
  },
  {
    id: 2,
    type: "prescription",
    title: "Prescription Added",
    description: "Dr. Smith prescribed Metformin 500mg",
    date: "2024-01-18",
    time: "2:15 PM",
    icon: Pill,
    color: "bg-green-500"
  },
  {
    id: 3,
    type: "appointment",
    title: "Appointment Scheduled",
    description: "Follow-up consultation with Dr. Johnson",
    date: "2024-01-15",
    time: "11:00 AM",
    icon: Calendar,
    color: "bg-purple-500"
  },
  {
    id: 4,
    type: "upload",
    title: "X-Ray Report Uploaded",
    description: "Chest X-Ray from City Hospital",
    date: "2024-01-12",
    time: "9:45 AM",
    icon: Upload,
    color: "bg-orange-500"
  },
  {
    id: 5,
    type: "checkup",
    title: "Health Checkup Completed",
    description: "Annual physical examination",
    date: "2024-01-10",
    time: "8:30 AM",
    icon: Stethoscope,
    color: "bg-red-500"
  }
]

export function HealthTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Health Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${event.color} text-white shadow-lg`}>
                  <event.icon className="h-5 w-5" />
                </div>
                
                {/* Event content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
