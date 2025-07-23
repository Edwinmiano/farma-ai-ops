import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ShoppingCart,
  Calculator,
  Scan,
  Receipt,
  Search,
  Plus,
  Minus,
  Trash2,
  Clock,
  User,
  Package,
  CreditCard,
  FileText
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function POSItem({ name, price, quantity, onQuantityChange, onRemove }: {
  name: string
  price: number
  quantity: number
  onQuantityChange: (qty: number) => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">${price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0"
          onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 text-red-600"
          onClick={onRemove}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

function ProductCard({ name, price, stock, onAdd }: {
  name: string
  price: number
  stock: number
  onAdd: () => void
}) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer" onClick={onAdd}>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{name}</h3>
          <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
          <div className="flex items-center justify-between">
            <Badge variant={stock > 10 ? "secondary" : "destructive"}>
              {stock} in stock
            </Badge>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StaffContent() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Paracetamol 500mg", price: 5.99, quantity: 2 },
    { id: 2, name: "Vitamin C Tablets", price: 12.50, quantity: 1 }
  ])
  
  const [searchQuery, setSearchQuery] = useState("")

  const quickProducts = [
    { id: 1, name: "Aspirin 100mg", price: 3.50, stock: 45 },
    { id: 2, name: "Ibuprofen 400mg", price: 7.25, stock: 32 },
    { id: 3, name: "Cough Syrup", price: 8.99, stock: 18 },
    { id: 4, name: "Hand Sanitizer", price: 4.75, stock: 67 },
    { id: 5, name: "Face Masks", price: 12.00, stock: 23 },
    { id: 6, name: "Thermometer", price: 15.50, stock: 8 }
  ]

  const recentTransactions = [
    { id: "#T001", customer: "John Doe", amount: 45.50, time: "10:30 AM", items: 3 },
    { id: "#T002", customer: "Jane Smith", amount: 23.75, time: "10:15 AM", items: 2 },
    { id: "#T003", customer: "Mike Wilson", amount: 67.20, time: "09:45 AM", items: 5 }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-lg p-6 shadow-medium text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Staff Dashboard - POS System</h1>
            <p className="text-white/80 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Shift: 9:00 AM - 6:00 PM
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Today's Sales</p>
            <p className="text-xl font-semibold">$1,247.50</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="pos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="inventory">Quick Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Product Search & Selection */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="shadow-medium bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products by name or scan barcode..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Scan className="w-4 h-4 mr-2" />
                      Scan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {quickProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAdd={() => addToCart(product)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shopping Cart & Checkout */}
            <div>
              <Card className="shadow-medium bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Current Sale
                  </CardTitle>
                  <Badge variant="secondary">{cartItems.length} items</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No items in cart</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                          <POSItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                            onRemove={() => removeFromCart(item.id)}
                          />
                        ))}
                      </div>
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax (8%):</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full" size="lg">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Process Payment
                        </Button>
                        <Button variant="outline" className="w-full">
                          <User className="w-4 h-4 mr-2" />
                          Add Customer
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>{transaction.items} items</TableCell>
                      <TableCell>{transaction.time}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" />
                Quick Inventory Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={product.stock > 20 ? "secondary" : product.stock > 10 ? "default" : "destructive"}
                        >
                          {product.stock} in stock
                        </Badge>
                        <p className="text-sm text-muted-foreground">${product.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function StaffDashboard() {
  return (
    <DashboardLayout>
      <StaffContent />
    </DashboardLayout>
  )
}