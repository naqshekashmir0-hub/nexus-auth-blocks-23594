import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import {
  FormPageHeader,
  ImageUploadSingle,
  ImageUploadMultiple,
  FormActions,
  TagInput
} from "@/components/shared";
import DashboardLayout from "@/layouts/DashboardLayout";

type ProductFormData = {
  name: string;
  description: string;
  brand: string;
  category: string;
  subCategory: string;
  tags: string[];
  quantity: number;
  dimensionType: string;
  price: number;
  discount: number;
  newBadge: boolean;
  salesBadge: boolean;
  featured: boolean;
  avatar: string;
  coverImages: string[];
};

const brands = ["TechBrand", "ErgoTech", "Samsung", "Apple", "Sony", "LG"];
const categories = ["Electronics", "Accessories", "Cables", "Furniture", "Food & Beverage"];

const subCategoriesByCategory: Record<string, string[]> = {
  "Electronics": ["Smartphones", "Laptops", "Tablets", "Cameras", "TVs"],
  "Accessories": ["Phone Cases", "Chargers", "Headphones", "Keyboards", "Mouse"],
  "Cables": ["USB Cables", "HDMI Cables", "Power Cables", "Audio Cables"],
  "Furniture": ["Chairs", "Desks", "Tables", "Cabinets", "Shelves"],
  "Food & Beverage": ["Snacks", "Beverages", "Dairy", "Bakery", "Frozen"]
};

const dimensionTypes = ["KG", "LITRE", "DOZEN", "PIECE"];

export default function ProductEdit() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
    tags: [],
    quantity: 0,
    dimensionType: "PIECE",
    price: 0,
    discount: 0,
    newBadge: false,
    salesBadge: false,
    featured: false,
    avatar: "",
    coverImages: [],
  });

  useEffect(() => {
    if (productId) {
      // TODO: Fetch actual product data from backend
      setFormData({
        name: "Wireless Headphones",
        description: "Premium wireless headphones",
        brand: "TechBrand",
        category: "Electronics",
        subCategory: "Headphones",
        tags: ["audio", "wireless"],
        quantity: 45,
        dimensionType: "PIECE",
        price: 79.99,
        discount: 10,
        newBadge: true,
        salesBadge: false,
        featured: true,
        avatar: "",
        coverImages: [],
      });
    }
  }, [productId]);

  const actualPrice = formData.price - (formData.price * formData.discount / 100);
  const availableSubCategories = formData.category ? subCategoriesByCategory[formData.category] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
    });
    
    navigate(ROUTES.DASHBOARD.PRODUCTS);
  };

  return (
    <DashboardLayout>
    <div className="space-y-6">
      <FormPageHeader
        title="Edit Product"
        description="Update product information"
        backPath={ROUTES.DASHBOARD.PRODUCTS}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Product Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub Category *</Label>
                <Select 
                  value={formData.subCategory} 
                  onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.category ? "Select sub category" : "Select category first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubCategories.map((subCat) => (
                      <SelectItem key={subCat} value={subCat}>
                        {subCat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TagInput
              label="Tags"
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="Type and press Enter"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quantity & Dimension</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensionType">Dimension Type *</Label>
                <Select value={formData.dimensionType} onValueChange={(value) => setFormData({ ...formData, dimensionType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Product Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actualPrice">Actual Price</Label>
                <Input
                  id="actualPrice"
                  value={actualPrice.toFixed(2)}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="newBadge" className="flex flex-col space-y-1">
                  <span>New Badge</span>
                  <span className="font-normal text-xs text-muted-foreground">Show as new product</span>
                </Label>
                <Switch
                  id="newBadge"
                  checked={formData.newBadge}
                  onCheckedChange={(checked) => setFormData({ ...formData, newBadge: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="salesBadge" className="flex flex-col space-y-1">
                  <span>Sales Badge</span>
                  <span className="font-normal text-xs text-muted-foreground">Show on sale</span>
                </Label>
                <Switch
                  id="salesBadge"
                  checked={formData.salesBadge}
                  onCheckedChange={(checked) => setFormData({ ...formData, salesBadge: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="featured" className="flex flex-col space-y-1">
                  <span>Featured</span>
                  <span className="font-normal text-xs text-muted-foreground">Highlight this product</span>
                </Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadSingle
              label="Avatar (Main Product Image)"
              value={formData.avatar}
              onChange={(value) => setFormData({ ...formData, avatar: value })}
              alt="Product avatar"
            />

            <ImageUploadMultiple
              label="Cover Images (Multiple)"
              values={formData.coverImages}
              onChange={(values) => setFormData({ ...formData, coverImages: values })}
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath={ROUTES.DASHBOARD.PRODUCTS}
          submitLabel="Update Product"
        />
      </form>
    </div>
    </DashboardLayout>
  );
}
