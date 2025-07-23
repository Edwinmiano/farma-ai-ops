import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ShoppingCart,
  Search,
  Heart,
  Star,
  MapPin,
  Clock,
  Truck,
  Package,
  CreditCard,
  FileText,
  Filter,
  Plus,
  Minus
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ProductCard({ name, price, rating, pharmacy, distance, inStock, isOTC, onAddToCart }: {
  name: string
  price: number
  rating: number
  pharmacy: string
  distance: string
  inStock: boolean
  isOTC: boolean
  onAddToCart: () => void
}) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-sm">{name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{rating}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{pharmacy} • {distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={inStock ? "secondary" : "destructive"} className="text-xs">
                  {inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                {isOTC && <Badge variant="outline" className="text-xs">OTC</Badge>}
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="sm" 
            disabled={!inStock}
            onClick={onAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CartItem({ name, pharmacy, price, quantity, onQuantityChange, onRemove }: {
  name: string
  pharmacy: string
  price: number
  quantity: number
  onQuantityChange: (qty: number) => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{pharmacy}</p>
        <p className="text-sm font-medium text-primary">${price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
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
          className="h-8 w-8 p-0 text-red-600 ml-2"
          onClick={onRemove}
        >
          <Package className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

function CustomerContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Paracetamol 500mg", pharmacy: "HealthPlus Pharmacy", price: 5.99, quantity: 2 },
    { id: 2, name: "Vitamin D3", pharmacy: "MediCare Corner", price: 12.50, quantity: 1 }
  ])

  const products = [
    { id: 1, name: "Paracetamol 500mg", price: 5.99, rating: 4.5, pharmacy: "HealthPlus", distance: "0.5km", inStock: true, isOTC: true },
    { id: 2, name: "Vitamin C Tablets", price: 12.50, rating: 4.8, pharmacy: "MediCare", distance: "1.2km", inStock: true, isOTC: true },
    { id: 3, name: "Ibuprofen 400mg", price: 7.25, rating: 4.3, pharmacy: "Wellness", distance: "0.8km", inStock: false, isOTC: true },
    { id: 4, name: "Omega-3 Fish Oil", price: 18.99, rating: 4.7, pharmacy: "HealthPlus", distance: "0.5km", inStock: true, isOTC: true },
    { id: 5, name: "Probiotics", price: 24.99, rating: 4.6, pharmacy: "MediCare", distance: "1.2km", inStock: true, isOTC: true },
    { id: 6, name: "Multivitamin", price: 15.75, rating: 4.4, pharmacy: "Wellness", distance: "0.8km", inStock: true, isOTC: true }
  ]

  const orders = [
    { id: "#O001", date: "2024-01-15", status: "Delivered", total: 45.50, items: 3 },
    { id: "#O002", date: "2024-01-10", status: "In Transit", total: 23.75, items: 2 },
    { id: "#O003", date: "2024-01-05", status: "Processing", total: 67.20, items: 5 }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 3.99
  const total = subtotal + deliveryFee

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      setCartItems([...cartItems, { ...product, pharmacy: product.pharmacy + " Pharmacy", quantity: 1 }])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-lg p-6 shadow-medium text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-white/80">Find medicines and health products near you</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Next Delivery</p>
            <p className="text-xl font-semibold flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Today, 2:00 PM
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Products</TabsTrigger>
          <TabsTrigger value="cart">My Cart ({cartItems.length})</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-medium bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for medicines, vitamins, or health products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Near Me
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="shadow-medium bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Shopping Cart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your cart is empty</p>
                      <p className="text-sm">Browse products to add items to your cart</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          name={item.name}
                          pharmacy={item.pharmacy}
                          price={item.price}
                          quantity={item.quantity}
                          onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                          onRemove={() => removeFromCart(item.id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {cartItems.length > 0 && (
              <div>
                <Card className="shadow-medium bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({cartItems.length} items):</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee:</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Estimated delivery: 30-45 mins</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="w-4 h-4" />
                        <span>Free delivery on orders over $50</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Order History
              </CardTitle>
              <Button variant="outline" size="sm">
                Download All
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            order.status === "Delivered" ? "secondary" :
                            order.status === "In Transit" ? "default" : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {order.status === "Delivered" && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function CustomerDashboard() {
  return (
    <DashboardLayout>
      <CustomerContent />
    </DashboardLayout>
  )
}