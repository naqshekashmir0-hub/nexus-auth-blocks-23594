import { RootProvider } from "@/core/providers/RootProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/core/config/routes";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboard/DashboardHome";
import Products from "./pages/dashboard/products/Products";
import ProductAdd from "./pages/dashboard/products/ProductAdd";
import ProductEdit from "./pages/dashboard/products/ProductEdit";
import Orders from "./pages/dashboard/orders/Orders";
import OrderDetail from "./pages/dashboard/orders/OrderDetail";
import Categories from "./pages/dashboard/categories/Categories";
import CategoryAdd from "./pages/dashboard/categories/CategoryAdd";
import CategoryEdit from "./pages/dashboard/categories/CategoryEdit";
import SubCategories from "./pages/dashboard/subcategories/SubCategories";
import SubCategoryAdd from "./pages/dashboard/subcategories/SubCategoryAdd";
import SubCategoryEdit from "./pages/dashboard/subcategories/SubCategoryEdit";
import Brands from "./pages/dashboard/brands/Brands";
import BrandAdd from "./pages/dashboard/brands/BrandAdd";
import BrandEdit from "./pages/dashboard/brands/BrandEdit";
import Users from "./pages/dashboard/users/Users";
import UserAdd from "./pages/dashboard/users/UserAdd";
import UserEdit from "./pages/dashboard/users/UserEdit";


const App = () => (
  <RootProvider>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Login />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DASHBOARD.HOME} element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<UserAdd />} />
          <Route path="users/edit" element={<UserEdit />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:productId" element={<ProductEdit />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories/edit" element={<CategoryEdit />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="subcategories/add" element={<SubCategoryAdd />} />
          <Route path="subcategories/edit" element={<SubCategoryEdit />} />
          <Route path="brand" element={<Brands />} />
          <Route path="brand/add" element={<BrandAdd />} />
          <Route path="brand/edit" element={<BrandEdit />} />
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
