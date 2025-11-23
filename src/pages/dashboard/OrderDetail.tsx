import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, User, MapPin, ShoppingCart, DollarSign, Clock, Printer, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
export default function OrderDetail() {
  const navigate = useNavigate();
  const {
    orderId
  } = useParams();

  // Mock order data
  const orderData = {
    id: orderId || "ORD-001",
    currentStatus: "Processing",
    placedOn: "Jun 9, 2025, 02:50 PM",
    lastUpdated: "Jun 9, 2025, 02:55 PM",
    customer: {
      name: "Developers Tariq",
      phone: "7889396003"
    },
    shipping: {
      recipient: "Developer Tariq",
      address: "Baba Pora Budgam, Jammu and Kashmir - 191111",
      mobile: "7889396003",
      type: "Home"
    },
    items: [{
      id: 1,
      product: "abc",
      image: "/placeholder.svg",
      qty: 1,
      unitPrice: 100.00,
      total: 100.00
    }],
    pricing: {
      subtotal: 100.00,
      discount: -0.00,
      shipping: 0.00,
      tax: 12.00,
      grandTotal: 112.00
    },
    history: [{
      id: 1,
      status: "Pending",
      description: "Order created",
      previousStatus: "Pending",
      timestamp: "Jun 9, 2025, 02:50 PM"
    }, {
      id: 2,
      status: "Processing",
      description: "Order is being processed",
      previousStatus: "Pending",
      timestamp: "Jun 9, 2025, 02:55 PM"
    }, {
      id: 3,
      status: "Confirmed",
      description: "Order confirmed",
      previousStatus: "Processing",
      timestamp: "Jun 9, 2025, 03:00 PM"
    }]
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Pending": "bg-yellow-500 hover:bg-yellow-500",
      "Processing": "bg-blue-500 hover:bg-blue-500",
      "Confirmed": "bg-green-500 hover:bg-green-500",
      "Shipped": "bg-purple-500 hover:bg-purple-500",
      "Out for Delivery": "bg-orange-500 hover:bg-orange-500",
      "Delivered": "bg-green-600 hover:bg-green-600",
      "Cancelled": "bg-red-500 hover:bg-red-500"
    };
    return colors[status] || "bg-gray-500 hover:bg-gray-500";
  };

  const handlePrintInvoice = () => {
    toast({
      title: "Printing Invoice",
      description: "Invoice is being prepared for printing..."
    });
  };
  const handleStatusChange = (status: string) => {
    toast({
      title: "Status Updated",
      description: `Order status changed to: ${status}`
    });
  };
  return <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => navigate("/dashboard/orders")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders List
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-primary">Order #{orderData.id}</h1>
              <Badge className={`${getStatusColor(orderData.currentStatus)} text-white`}>
                {orderData.currentStatus}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Update Status
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleStatusChange("Pending")}>
                  Change to Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Processing")}>
                  Change to Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Confirmed")}>
                  Change to Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Shipped")}>
                  Change to Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Out for Delivery")}>
                  Change to Out for Delivery
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Delivered")}>
                  Change to Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Cancelled")} className="text-destructive">
                  Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name:</p>
                <p className="font-medium">{orderData.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone:</p>
                <p className="font-medium">{orderData.customer.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Recipient:</p>
                <p className="font-medium">{orderData.shipping.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address:</p>
                <p className="font-medium">{orderData.shipping.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile:</p>
                <p className="font-medium">{orderData.shipping.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type:</p>
                <p className="font-medium">{orderData.shipping.type}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-primary" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.items.map(item => <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.product} className="h-10 w-10 rounded object-cover" />
                          <span className="font-medium">{item.product}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">x{item.qty}</TableCell>
                      <TableCell className="text-right">₹{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹{item.total.toFixed(2)}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Price Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">₹{orderData.pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-medium">₹{orderData.pricing.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium">₹{orderData.pricing.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (GST):</span>
                <span className="font-medium">₹{orderData.pricing.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Grand Total:</span>
                <span className="font-bold text-lg text-primary">₹{orderData.pricing.grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.history.map((event, index) => <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {index < orderData.history.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{event.status}</span>
                        <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}