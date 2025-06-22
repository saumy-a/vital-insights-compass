
import { Calendar, Users, Activity, Bell, Settings, Home, FileText, Heart } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Medical Records", url: "/records", icon: FileText },
  { title: "Vital Signs", url: "/vitals", icon: Activity },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const isExpanded = navigationItems.some((item) => isActive(item.url))

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <div className="flex items-center gap-2 p-4 border-b">
        <Heart className="h-8 w-8 text-blue-600" />
        {!collapsed && (
          <span className="font-semibold text-lg text-gray-800">HealthCare Pro</span>
        )}
      </div>
      
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup open={isExpanded}>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-blue-100 text-blue-700 font-medium" 
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
