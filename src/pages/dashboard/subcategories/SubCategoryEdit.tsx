import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useToast } from "@/core/hooks/use-toast";

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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/subcategories")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit SubCategory</h1>
          <p className="text-muted-foreground mt-1">Update subcategory information</p>
        </div>
      </div>

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
            <div className="space-y-2">
              <Label>SubCategory Logo</Label>
              <div className="flex items-center gap-4">
                {formData.logo ? (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img src={formData.logo} alt="SubCategory logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logo: "" })}
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
                          setFormData({ ...formData, logo: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/subcategories")}>
            Cancel
          </Button>
          <Button type="submit">Update SubCategory</Button>
        </div>
      </form>
    </div>
  );
}
