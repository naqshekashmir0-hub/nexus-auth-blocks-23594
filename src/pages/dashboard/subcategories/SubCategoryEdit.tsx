import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/core/hooks/use-toast";
import { FormPageHeader, ImageUploadSingle, FormActions } from "@/components/shared";

type SubCategoryFormData = {
  sub_category_name: string;
  category: string;
  logo: string;
};

export default function SubCategoryEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subCategoryId = searchParams.get("id");
  const { toast } = useToast();

  const [formData, setFormData] = useState<SubCategoryFormData>({
    sub_category_name: "",
    category: "",
    logo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sub_category_name.trim()) {
      toast({
        title: "Error",
        description: "SubCategory name is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Error",
        description: "Category is required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "SubCategory updated",
      description: "The subcategory has been updated successfully.",
    });
    
    navigate("/dashboard/subcategories");
  };

  return (
    <div className="space-y-6">
      <FormPageHeader
        title="Edit SubCategory"
        description="Update subcategory information"
        backPath="/dashboard/subcategories"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic SubCategory Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sub_category_name">SubCategory Name *</Label>
              <Input
                id="sub_category_name"
                value={formData.sub_category_name}
                onChange={(e) => setFormData({ ...formData, sub_category_name: e.target.value })}
                placeholder="e.g., Smartphones"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SubCategory Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadSingle
              label="SubCategory Logo"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
              alt="SubCategory logo"
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath="/dashboard/subcategories"
          submitLabel="Update SubCategory"
        />
      </form>
    </div>
  );
}
