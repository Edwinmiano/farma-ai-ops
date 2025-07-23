import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Package,
  Users,
  DollarSign
} from "lucide-react"

function AlertCard({ title, message, type = "warning" }: { 
  title: string
  message: string
  type?: "warning" | "info" | "error"
}) {
  const colors = {
    warning: "border-warning bg-warning-light text-warning-foreground",
    info: "border-primary bg-primary-light text-primary-foreground", 
    error: "border-destructive bg-destructive/10 text-destructive"
  }

  return (
    <div className={`p-4 rounded-md border ${colors[type]} shadow-soft`}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm mt-1 opacity-90">{message}</p>
    </div>
  )
}

function DashboardContent() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-lg p-6 shadow-medium text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, Dr. Ahmed Ali
            </h1>
            <p className="text-white/80 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {currentDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">HealthCare Plus Pharmacy</p>
            <p className="text-xl font-semibold">All Systems Operational</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <DashboardStats />

      {/* Alerts & Notifications */}
      <div className="grid gap-4 lg:grid-cols-3">
        <AlertCard 
          title="Low Stock Alert"
          message="12 medicines are running low. Check inventory to reorder."
          type="warning"
        />
        <AlertCard 
          title="Pending Prescriptions"
          message="3 prescriptions awaiting pharmacist review."
          type="info"
        />
        <AlertCard 
          title="License Renewal"
          message="Pharmacy license expires in 45 days."
          type="error"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Sales Overview Chart Placeholder */}
      <Card className="shadow-medium bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Sales Overview
          </CardTitle>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Sales chart coming soon</p>
              <p className="text-sm text-muted-foreground">Integration with analytics module</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}