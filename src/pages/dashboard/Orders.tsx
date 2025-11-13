import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage customer orders
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the orders page. Here you can view order history, process new orders, and manage order statuses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
