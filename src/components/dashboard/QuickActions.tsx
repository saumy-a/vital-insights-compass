
import { Plus, Calendar, FileText, Bell, Users, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const actions = [
  { icon: Plus, label: 'Add Patient', color: 'bg-blue-500 hover:bg-blue-600' },
  { icon: Calendar, label: 'Schedule', color: 'bg-green-500 hover:bg-green-600' },
  { icon: FileText, label: 'New Record', color: 'bg-purple-500 hover:bg-purple-600' },
  { icon: Bell, label: 'Alerts', color: 'bg-orange-500 hover:bg-orange-600' },
  { icon: Users, label: 'Patients', color: 'bg-indigo-500 hover:bg-indigo-600' },
  { icon: Activity, label: 'Vitals', color: 'bg-red-500 hover:bg-red-600' },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-16 flex flex-col items-center justify-center gap-2 border-2 hover:border-transparent transition-all duration-200 ${action.color} hover:text-white group`}
            >
              <action.icon className="h-5 w-5 group-hover:text-white" />
              <span className="text-xs font-medium group-hover:text-white">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
