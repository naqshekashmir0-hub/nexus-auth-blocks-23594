import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Pencil, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  category_name: string;
  category_logo: string;
  productCount: number;
  status: "active" | "inactive";
}

export default function Categories() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      category_name: "Electronics",
      category_logo: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop",
      productCount: 45,
      status: "active"
    },
    {
      id: "2",
      category_name: "Clothing",
      category_logo: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&h=100&fit=crop",
      productCount: 128,
      status: "active"
    },
    {
      id: "3",
      category_name: "Home & Garden",
      category_logo: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
      productCount: 67,
      status: "active"
    },
    {
      id: "4",
      category_name: "Sports",
      category_logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop",
      productCount: 34,
      status: "inactive"
    }
  ]);

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Success",
      description: "Category deleted successfully"
    });
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product categories
          </p>
        </div>
        
        <Button className="gap-2" onClick={() => navigate("/dashboard/categories/add")}>
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>All Categories</CardTitle>
              <CardDescription className="mt-1.5">
                A list of all product categories in your store
              </CardDescription>
            </div>
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-full inline-block align-middle">
            <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Category</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={category.category_logo} alt={category.category_name} />
                          <AvatarFallback>
                            <FolderOpen className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{category.category_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{category.productCount} items</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        category.status === "active" 
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}>
                        {category.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/dashboard/categories/edit?id=${category.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
