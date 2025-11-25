import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/core/hooks/use-toast";
import { FormPageHeader, ImageUploadSingle, FormActions } from "@/components/shared";
import { ROUTES } from "@/core/config/routes";
import DashboardLayout from "@/layouts/DashboardLayout";

type CategoryFormData = {
  category_name: string;
  category_logo: string;
};

export default function CategoryEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const { toast } = useToast();

  const [formData, setFormData] = useState<CategoryFormData>({
    category_name: "",
    category_logo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category_name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    });
    
    navigate(ROUTES.DASHBOARD.CATEGORIES);
  };

  return (
    <DashboardLayout>
    <div className="space-y-6">
      <FormPageHeader
        title="Edit Category"
        description="Update category information"
        backPath={ROUTES.DASHBOARD.CATEGORIES}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Category Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category_name">Category Name *</Label>
              <Input
                id="category_name"
                value={formData.category_name}
                onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                placeholder="e.g., Electronics"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadSingle
              label="Category Logo"
              value={formData.category_logo}
              onChange={(value) => setFormData({ ...formData, category_logo: value })}
              alt="Category logo"
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath={ROUTES.DASHBOARD.CATEGORIES}
          submitLabel="Update Category"
        />
      </form>
    </div>
    </DashboardLayout>
  );
}
