import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/core/hooks/use-toast";
import { FormPageHeader, ImageUploadSingle, FormActions } from "@/components/shared";

type BrandFormData = {
  brand_name: string;
  logo: string;
};

export default function BrandAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<BrandFormData>({
    brand_name: "",
    logo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.brand_name.trim()) {
      toast({
        title: "Error",
        description: "Brand name is required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Brand added",
      description: "The new brand has been added successfully.",
    });
    
    navigate("/dashboard/brand");
  };

  return (
    <div className="space-y-6">
      <FormPageHeader
        title="Add New Brand"
        description="Fill in the details to add a new brand"
        backPath="/dashboard/brand"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Brand Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand_name">Brand Name *</Label>
              <Input
                id="brand_name"
                value={formData.brand_name}
                onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                placeholder="e.g., Apple"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadSingle
              label="Brand Logo"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
              alt="Brand logo"
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath="/dashboard/brand"
          submitLabel="Add Brand"
        />
      </form>
    </div>
  );
}
