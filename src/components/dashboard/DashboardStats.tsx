import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

function StatCard({ title, value, change, trend, icon: Icon, description }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown
  const trendColor = trend === "up" ? "text-success" : "text-destructive"
  const bgColor = trend === "up" ? "bg-success-light" : "bg-warning-light"

  return (
    <Card className="shadow-soft hover:shadow-medium transition-smooth bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-md ${bgColor}`}>
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{change}</span>
          </div>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Active Inventory",
      value: "1,247",
      change: "-2.3%",
      trend: "down" as const,
      icon: Package,
      description: "items in stock"
    },
    {
      title: "Daily Customers",
      value: "89",
      change: "+8.1%",
      trend: "up" as const,
      icon: Users,
      description: "today"
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "+5.4%",
      trend: "up" as const,
      icon: ShoppingCart,
      description: "awaiting fulfillment"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}