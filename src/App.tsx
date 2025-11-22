import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Products from "./pages/dashboard/Products";
import ProductForm from "./pages/dashboard/ProductForm";
import Orders from "./pages/dashboard/Orders";
import Categories from "./pages/dashboard/Categories";
import CategoryForm from "./pages/dashboard/CategoryForm";
import SubCategories from "./pages/dashboard/SubCategories";
import Brand from "./pages/dashboard/Brand";
import Users from "./pages/dashboard/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/edit" element={<ProductForm />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<CategoryForm />} />
            <Route path="categories/edit" element={<CategoryForm />} />
            <Route path="subcategories" element={<SubCategories />} />
            <Route path="brand" element={<Brand />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
