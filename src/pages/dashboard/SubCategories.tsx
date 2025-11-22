import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Pencil, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubCategory {
  id: string;
  sub_category_name: string;
  logo: string;
}

export default function SubCategories() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      id: "1",
      sub_category_name: "Smartphones",
      logo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
    },
    {
      id: "2",
      sub_category_name: "Laptops",
      logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop",
    },
    {
      id: "3",
      sub_category_name: "Headphones",
      logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: "4",
      sub_category_name: "Cameras",
      logo: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop",
    }
  ]);

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.sub_category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSubCategory = (id: string) => {
    setSubCategories(subCategories.filter(sub => sub.id !== id));
    toast({
      title: "Success",
      description: "SubCategory deleted successfully"
    });
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SubCategories</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product subcategories
          </p>
        </div>
        
        <Button className="gap-2" onClick={() => navigate("/dashboard/subcategories/add")}>
          <Plus className="h-4 w-4" />
          Add SubCategory
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>All SubCategories</CardTitle>
              <CardDescription className="mt-1.5">
                A list of all product subcategories in your store
              </CardDescription>
            </div>
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subcategories..."
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
                <TableHead className="w-[250px]">SubCategory</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                    No subcategories found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubCategories.map((subCategory) => (
                  <TableRow key={subCategory.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={subCategory.logo} alt={subCategory.sub_category_name} />
                          <AvatarFallback>
                            <FolderOpen className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{subCategory.sub_category_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/dashboard/subcategories/edit?id=${subCategory.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSubCategory(subCategory.id)}
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
