import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { 
  Shield, 
  Users, 
  ShoppingCart,
  Crown,
  Briefcase,
  User
} from "lucide-react"

const roles = [
  {
    id: "super-admin",
    title: "Super Admin",
    description: "Platform-wide oversight, pharmacy approvals, system analytics",
    icon: Crown,
    badge: "System Admin",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    path: "/super-admin"
  },
  {
    id: "admin",
    title: "Pharmacy Admin",
    description: "Manage inventory, staff, prescriptions, and e-commerce",
    icon: Shield,
    badge: "Full Access",
    color: "text-blue-600", 
    bgColor: "bg-blue-50",
    path: "/dashboard"
  },
  {
    id: "staff",
    title: "Pharmacy Staff",
    description: "POS system, prescription handling, inventory management",
    icon: Briefcase,
    badge: "Staff Access",
    color: "text-green-600",
    bgColor: "bg-green-50", 
    path: "/staff"
  },
  {
    id: "customer",
    title: "Customer",
    description: "Browse products, place orders, track deliveries",
    icon: User,
    badge: "Customer",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    path: "/customer"
  }
]

export function RoleSwitcher() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Choose Your Role</h1>
        <p className="text-muted-foreground">
          Select a role to explore the Farma Pharmacy Management System
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <Card 
              key={role.id} 
              className="shadow-medium hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(role.path)}
            >
              <CardHeader className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto ${role.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${role.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{role.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {role.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {role.description}
                </p>
                <Button className="w-full" variant="outline">
                  Enter Dashboard
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}