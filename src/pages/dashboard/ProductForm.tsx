import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export default function ProductForm() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");

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

  // Load product data when editing
  useEffect(() => {
    if (productId) {
      // TODO: Fetch actual product data from backend
      // Mock data for now
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
    
    // TODO: Implement actual save logic
    toast({
      title: productId ? "Product updated" : "Product added",
      description: productId ? "The product has been updated successfully." : "The new product has been added successfully.",
    });
    
    navigate("/dashboard/products");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/products")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {productId ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {productId ? "Update product information" : "Fill in the details to add a new product"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 - Basic Product Info */}
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

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type and press Enter"
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Quantity & Dimension */}
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

        {/* Section 3 - Pricing Details */}
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

        {/* Section 4 - Status & Flags */}
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

        {/* Section 5 - Media */}
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Avatar (Main Product Image)</Label>
              <div className="flex items-center gap-4">
                {formData.avatar ? (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img src={formData.avatar} alt="Product avatar" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: "" })}
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
                          // TODO: Implement actual file upload
                          setFormData({ ...formData, avatar: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Images (Multiple)</Label>
              <div className="flex flex-wrap gap-4">
                {formData.coverImages.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img src={img} alt={`Cover ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ 
                        ...formData, 
                        coverImages: formData.coverImages.filter((_, i) => i !== idx) 
                      })}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      // TODO: Implement actual file upload
                      const newImages = files.map(file => URL.createObjectURL(file));
                      setFormData({ ...formData, coverImages: [...formData.coverImages, ...newImages] });
                    }}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/products")}>
            Cancel
          </Button>
          <Button type="submit">
            {productId ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
