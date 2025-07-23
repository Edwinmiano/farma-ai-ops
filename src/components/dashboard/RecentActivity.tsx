import { Clock, CheckCircle, AlertCircle, Package, FileText, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  id: string
  type: "sale" | "prescription" | "inventory" | "order"
  title: string
  description: string
  time: string
  status: "completed" | "pending" | "warning"
  user?: string
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const icons = {
    sale: ShoppingCart,
    prescription: FileText,
    inventory: Package,
    order: CheckCircle
  }
  
  const Icon = icons[type] || CheckCircle
  return <Icon className="h-4 w-4" />
}

function StatusBadge({ status }: { status: ActivityItem["status"] }) {
  const variants = {
    completed: "default",
    pending: "secondary", 
    warning: "destructive"
  } as const

  const labels = {
    completed: "Completed",
    pending: "Pending",
    warning: "Attention"
  }

  return (
    <Badge variant={variants[status]} className="text-xs">
      {labels[status]}
    </Badge>
  )
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "sale",
      title: "Sale Transaction #2034",
      description: "Paracetamol 500mg - ₦2,400",
      time: "2 minutes ago",
      status: "completed",
      user: "Cashier A"
    },
    {
      id: "2", 
      type: "prescription",
      title: "New Prescription",
      description: "Dr. Johnson - Antibiotics prescription",
      time: "15 minutes ago",
      status: "pending",
      user: "Pharmacist B"
    },
    {
      id: "3",
      type: "inventory",
      title: "Low Stock Alert",
      description: "Vitamin C tablets below threshold",
      time: "1 hour ago", 
      status: "warning"
    },
    {
      id: "4",
      type: "order",
      title: "Online Order #1205",
      description: "Customer pickup scheduled",
      time: "2 hours ago",
      status: "pending",
      user: "System"
    },
    {
      id: "5",
      type: "sale",
      title: "Sale Transaction #2033",
      description: "Multiple items - ₦8,750", 
      time: "3 hours ago",
      status: "completed",
      user: "Cashier B"
    }
  ]

  return (
    <Card className="shadow-medium bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-accent/50 transition-smooth">
            <div className="p-2 rounded-md bg-primary-light">
              <ActivityIcon type={activity.type} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm text-foreground">{activity.title}</h4>
                <StatusBadge status={activity.status} />
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity.time}</span>
                {activity.user && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}