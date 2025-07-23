import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Store, 
  BarChart3, 
  Receipt, 
  Users, 
  PenTool, 
  Brain,
  Shield,
  Bell,
  Home,
  Activity
} from "lucide-react"
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
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    badge: null
  },
  { 
    title: "Inventory", 
    url: "/inventory", 
    icon: Package,
    badge: "12"
  },
  { 
    title: "Orders & Sales", 
    url: "/orders", 
    icon: ShoppingCart,
    badge: "5"
  },
  { 
    title: "Prescriptions", 
    url: "/prescriptions", 
    icon: FileText,
    badge: "3"
  },
  { 
    title: "E-commerce", 
    url: "/ecommerce", 
    icon: Store,
    badge: null
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    badge: null
  },
  { 
    title: "Billing", 
    url: "/billing", 
    icon: Receipt,
    badge: null
  },
  { 
    title: "Staff Management", 
    url: "/staff", 
    icon: Users,
    badge: null
  },
  { 
    title: "Blog Dashboard", 
    url: "/blog", 
    icon: PenTool,
    badge: null
  },
  { 
    title: "AI Insights", 
    url: "/ai-insights", 
    icon: Brain,
    badge: "New"
  },
  { 
    title: "Access Control", 
    url: "/access", 
    icon: Shield,
    badge: null
  },
  { 
    title: "Notifications", 
    url: "/notifications", 
    icon: Bell,
    badge: "8"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  const isCollapsed = state === "collapsed"
  const userRole = "admin"
  const menuItems = navigationItems

  const isActive = (path: string) => currentPath === path

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full text-left transition-smooth rounded-md ${
      isActive 
        ? "bg-primary-light text-primary font-medium shadow-soft" 
        : "hover:bg-accent hover:text-accent-foreground"
    }`

  return (
    <Sidebar className="bg-gradient-card border-r border-border shadow-soft">
      <SidebarContent>
        {/* Pharmacy Logo/Brand */}
        <div className="p-4 border-b border-border bg-gradient-hero">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">Farma</h2>
                <p className="text-xs text-white/80">Pharmacy Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="px-4 py-2 text-muted-foreground font-medium">
            {!isCollapsed && "Main Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={getNavClasses}
                    >
                      <item.icon className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} flex-shrink-0`} />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badge === "New" ? "default" : "secondary"}
                              className="ml-auto text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Role Indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {userRole === "admin" ? "A" : "S"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground capitalize">
                  {userRole} User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === "admin" ? "Full Access" : "Limited Access"}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}