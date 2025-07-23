import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Activity,
  Globe,
  DollarSign
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function MetricCard({ title, value, change, icon: Icon, type = "default" }: {
  title: string
  value: string
  change: string
  icon: any
  type?: "default" | "success" | "warning" | "error"
}) {
  const colors = {
    default: "text-primary",
    success: "text-emerald-600",
    warning: "text-orange-600", 
    error: "text-red-600"
  }

  return (
    <Card className="shadow-medium bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className={`text-xs mt-1 ${colors[type]}`}>{change}</p>
          </div>
          <Icon className={`w-8 h-8 ${colors[type]}`} />
        </div>
      </CardContent>
    </Card>
  )
}

function PendingApproval({ name, type, date, status }: {
  name: string
  type: string 
  date: string
  status: "pending" | "approved" | "rejected"
}) {
  const statusColors = {
    pending: "bg-orange-100 text-orange-800",
    approved: "bg-green-100 text-green-800", 
    rejected: "bg-red-100 text-red-800"
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Building2 className="w-5 h-5 text-muted-foreground" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{type} • {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={statusColors[status]}>{status}</Badge>
        {status === "pending" && (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <XCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function SuperAdminContent() {
  const pendingApprovals = [
    { name: "HealthPlus Pharmacy", type: "Chain Registration", date: "2 hours ago", status: "pending" as const },
    { name: "MediCare Corner", type: "Single Store", date: "1 day ago", status: "pending" as const },
    { name: "Wellness Pharmacy", type: "License Renewal", date: "3 days ago", status: "approved" as const },
  ]

  const topPharmacies = [
    { name: "HealthPlus Chain", revenue: "$45,230", orders: 1245, rating: 4.8 },
    { name: "MediCare Network", revenue: "$38,920", orders: 987, rating: 4.7 },
    { name: "Wellness Group", revenue: "$32,150", orders: 876, rating: 4.6 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-lg p-6 shadow-medium text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Super Admin Dashboard</h1>
            <p className="text-white/80">System-wide overview and management</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Platform Status</p>
            <p className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              All Systems Operational
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Pharmacies"
          value="1,247"
          change="+12% this month"
          icon={Building2}
          type="success"
        />
        <MetricCard
          title="Active Users"
          value="8,456"
          change="+8% this month"
          icon={Users}
          type="success"
        />
        <MetricCard
          title="Platform Revenue"
          value="$234K"
          change="+15% this month"
          icon={DollarSign}
          type="success"
        />
        <MetricCard
          title="Pending Approvals"
          value="23"
          change="Review required"
          icon={AlertTriangle}
          type="warning"
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Approvals
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <PendingApproval key={index} {...approval} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Platform Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                View System Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage User Roles
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                Review Pharmacy Applications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Pharmacies */}
      <Card className="shadow-medium bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Performing Pharmacies
          </CardTitle>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pharmacy Name</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPharmacies.map((pharmacy, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>{pharmacy.revenue}</TableCell>
                  <TableCell>{pharmacy.orders}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{pharmacy.rating} ⭐</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <SuperAdminContent />
    </DashboardLayout>
  )
}