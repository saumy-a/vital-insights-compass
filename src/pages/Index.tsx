
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { PatientCard } from "@/components/dashboard/PatientCard"
import { VitalSignsChart } from "@/components/dashboard/VitalSignsChart"
import { AppointmentsList } from "@/components/dashboard/AppointmentsList"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { Users, Calendar, Activity, AlertTriangle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 34,
    condition: 'Hypertension',
    lastVisit: '2024-01-15',
    status: 'stable' as const
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 67,
    condition: 'Diabetes Type 2',
    lastVisit: '2024-01-12',
    status: 'improving' as const
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 45,
    condition: 'Post-Surgery',
    lastVisit: '2024-01-10',
    status: 'critical' as const
  }
]

const Index = () => {
  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Healthcare Dashboard</h1>
                  <p className="text-gray-600">Welcome back, Dr. Smith</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  DS
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Patients"
                value={1234}
                icon={Users}
                trend={{ value: 12, isPositive: true }}
                description="Active patients under care"
              />
              <StatsCard
                title="Today's Appointments"
                value={24}
                icon={Calendar}
                trend={{ value: 8, isPositive: true }}
                description="Scheduled for today"
              />
              <StatsCard
                title="Critical Patients"
                value={3}
                icon={AlertTriangle}
                trend={{ value: -2, isPositive: false }}
                description="Requiring immediate attention"
              />
              <StatsCard
                title="Avg Wait Time"
                value="12 min"
                icon={Activity}
                trend={{ value: -15, isPositive: true }}
                description="Patient wait time"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Vital Signs Chart */}
              <div className="lg:col-span-2">
                <VitalSignsChart />
              </div>
              
              {/* Quick Actions */}
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Patients */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {mockPatients.map((patient) => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Appointments */}
              <div>
                <AppointmentsList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
