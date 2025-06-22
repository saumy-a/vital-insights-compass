
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Pill, Clock, CheckCircle, X } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
}

interface Appointment {
  id: string
  doctor: string
  time: string
  date: string
  reminded: boolean
}

export function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Metformin", dosage: "500mg", time: "08:00", taken: false },
    { id: "2", name: "Lisinopril", dosage: "10mg", time: "20:00", taken: false }
  ])

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "1", doctor: "Dr. Smith", time: "10:00 AM", date: "Tomorrow", reminded: false }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeReminders, setActiveReminders] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

    medications.forEach(med => {
      if (med.time === currentTimeString && !med.taken && !activeReminders.includes(med.id)) {
        setActiveReminders(prev => [...prev, med.id])
        
        // Show browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification(`Medication Reminder`, {
            body: `Time to take ${med.name} ${med.dosage}`,
            icon: '/favicon.ico'
          })
        }
      }
    })
  }, [currentTime, medications, activeReminders])

  const markAsTaken = (medicationId: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === medicationId ? { ...med, taken: true } : med
      )
    )
    setActiveReminders(prev => prev.filter(id => id !== medicationId))
  }

  const dismissReminder = (medicationId: string) => {
    setActiveReminders(prev => prev.filter(id => id !== medicationId))
  }

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Reminders & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notification Permission */}
        {Notification.permission === 'default' && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable notifications for medication reminders</span>
                <Button size="sm" onClick={requestNotificationPermission}>
                  Enable
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Active Reminders */}
        {activeReminders.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600">Active Reminders</h4>
            {activeReminders.map(reminderId => {
              const med = medications.find(m => m.id === reminderId)
              if (!med) return null
              
              return (
                <Alert key={reminderId} variant="destructive" className="border-red-200 bg-red-50">
                  <Pill className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Time to take {med.name}</div>
                        <div className="text-sm">{med.dosage} - Scheduled for {med.time}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => markAsTaken(med.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Taken
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => dismissReminder(med.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )
            })}
          </div>
        )}

        {/* Today's Medications */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Today's Medications</h4>
          {medications.map(med => (
            <div key={med.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${med.taken ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {med.taken ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Pill className="h-4 w-4 text-gray-600" />}
                </div>
                <div>
                  <div className="font-medium text-sm">{med.name} {med.dosage}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {med.time}
                  </div>
                </div>
              </div>
              <Badge variant={med.taken ? "secondary" : "outline"}>
                {med.taken ? "Taken" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Upcoming Appointments</h4>
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">{apt.doctor}</div>
                <div className="text-xs text-gray-500">{apt.date} at {apt.time}</div>
              </div>
              <Badge variant="outline">
                {apt.date}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
