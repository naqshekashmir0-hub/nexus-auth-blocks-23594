import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CategoryFormData = {
  category_name: string;
  category_logo: string;
};

export default function CategoryForm() {
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
      title: categoryId ? "Category updated" : "Category added",
      description: categoryId ? "The category has been updated successfully." : "The new category has been added successfully.",
    });
    
    navigate("/dashboard/categories");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/categories")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {categoryId ? "Edit Category" : "Add New Category"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {categoryId ? "Update category information" : "Fill in the details to add a new category"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 - Basic Category Info */}
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

        {/* Section 2 - Media */}
        <Card>
          <CardHeader>
            <CardTitle>Category Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Category Logo</Label>
              <div className="flex items-center gap-4">
                {formData.category_logo ? (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img src={formData.category_logo} alt="Category logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category_logo: "" })}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-2">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData({ ...formData, category_logo: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/categories")}>
            Cancel
          </Button>
          <Button type="submit">
            {categoryId ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </form>
    </div>
  );
}
