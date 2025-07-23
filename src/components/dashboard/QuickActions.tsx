import { Plus, FileText, Package, ShoppingCart, Users, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickActionProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  variant?: "default" | "secondary" | "success" | "warning"
}

function QuickActionCard({ title, description, icon: Icon, onClick, variant = "default" }: QuickActionProps) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer bg-gradient-card" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary-light">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button size="sm" variant={variant}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickActions() {
  const actions = [
    {
      title: "Add New Medicine",
      description: "Add inventory item to stock",
      icon: Pill,
      onClick: () => console.log("Add medicine"),
      variant: "default" as const
    },
    {
      title: "Process Prescription",
      description: "Handle new prescription order",
      icon: FileText,
      onClick: () => console.log("Process prescription"),
      variant: "secondary" as const
    },
    {
      title: "Create Sale",
      description: "Start new POS transaction",
      icon: ShoppingCart,
      onClick: () => console.log("Create sale"),
      variant: "success" as const
    },
    {
      title: "Add Customer",
      description: "Register new customer",
      icon: Users,
      onClick: () => console.log("Add customer"),
      variant: "default" as const
    }
  ]

  return (
    <Card className="shadow-medium bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </CardContent>
    </Card>
  )
}