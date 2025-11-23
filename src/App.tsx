import { RootProvider } from "@/core/providers/RootProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboard/DashboardHome";
import Products from "./pages/dashboard/products/Products";
import ProductForm from "./pages/dashboard/products/ProductForm";
import Orders from "./pages/dashboard/orders/Orders";
import OrderDetail from "./pages/dashboard/orders/OrderDetail";
import Categories from "./pages/dashboard/categories/Categories";
import CategoryForm from "./pages/dashboard/categories/CategoryForm";
import SubCategories from "./pages/dashboard/subcategories/SubCategories";
import SubCategoryForm from "./pages/dashboard/subcategories/SubCategoryForm";
import Brands from "./pages/dashboard/brands/Brands";
import BrandForm from "./pages/dashboard/brands/BrandForm";
import Users from "./pages/dashboard/users/Users";
import UserForm from "./pages/dashboard/users/UserForm";


const App = () => (
  <RootProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<UserForm />} />
          <Route path="users/edit" element={<UserForm />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/edit/:productId" element={<ProductForm />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<CategoryForm />} />
          <Route path="categories/edit" element={<CategoryForm />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="subcategories/add" element={<SubCategoryForm />} />
          <Route path="subcategories/edit" element={<SubCategoryForm />} />
          <Route path="brand" element={<Brands />} />
          <Route path="brand/add" element={<BrandForm />} />
          <Route path="brand/edit" element={<BrandForm />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </RootProvider>
);

export default App;
