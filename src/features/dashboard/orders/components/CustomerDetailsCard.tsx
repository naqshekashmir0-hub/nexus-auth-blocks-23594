import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import type { OrderCustomer } from "../types";

interface CustomerDetailsCardProps {
  customer: OrderCustomer;
}

export function CustomerDetailsCard({ customer }: CustomerDetailsCardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          Customer Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Name:</p>
          <p className="font-medium">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone:</p>
          <p className="font-medium">{customer.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
