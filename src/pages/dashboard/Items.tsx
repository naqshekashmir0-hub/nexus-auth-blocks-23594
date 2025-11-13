import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Items() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Items</h1>
        <p className="text-muted-foreground mt-2">
          Manage individual items and inventory
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the items page. Here you can view and manage individual items in your inventory system.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
