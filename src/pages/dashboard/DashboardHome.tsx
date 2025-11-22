import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Tag, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Order = {
  id: string;
  customer: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  amount: number;
};

const mockRecentOrders: Order[] = [
  { id: "ORD-001", customer: "Developers Tariq", date: "Jun 9, 2025", status: "Pending", amount: 112.00 },
  { id: "ORD-002", customer: "John Smith", date: "Jun 8, 2025", status: "Processing", amount: 245.50 },
  { id: "ORD-003", customer: "Sarah Johnson", date: "Jun 8, 2025", status: "Shipped", amount: 89.99 },
  { id: "ORD-004", customer: "Mike Brown", date: "Jun 7, 2025", status: "Delivered", amount: 156.75 },
  { id: "ORD-005", customer: "Emily Davis", date: "Jun 7, 2025", status: "Pending", amount: 299.00 },
];

export default function DashboardHome() {
  const navigate = useNavigate();
  
  // Mock data - replace with actual data from backend
  const stats = {
    totalOrders: 2350,
    totalProducts: 456,
    totalBrands: 28,
    totalUsers: 1249
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "Processing": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Shipped": return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "Delivered": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Cancelled": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your dashboard overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBrands}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/orders")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">₹{order.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the dashboard page. Here you can see an overview of your application's key metrics and data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
