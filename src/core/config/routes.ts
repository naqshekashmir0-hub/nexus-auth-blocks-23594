import { lazy } from "react";

// Lazy load page components
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Error = lazy(() => import("@/pages/Error"));
const DashboardHome = lazy(() => import("@/pages/dashboard/dashboard/DashboardHome"));
const Products = lazy(() => import("@/pages/dashboard/products/Products"));
const ProductAdd = lazy(() => import("@/pages/dashboard/products/ProductAdd"));
const ProductEdit = lazy(() => import("@/pages/dashboard/products/ProductEdit"));
const Orders = lazy(() => import("@/pages/dashboard/orders/Orders"));
const OrderDetail = lazy(() => import("@/pages/dashboard/orders/OrderDetail"));
const Categories = lazy(() => import("@/pages/dashboard/categories/Categories"));
const CategoryAdd = lazy(() => import("@/pages/dashboard/categories/CategoryAdd"));
const CategoryEdit = lazy(() => import("@/pages/dashboard/categories/CategoryEdit"));
const SubCategories = lazy(() => import("@/pages/dashboard/subcategories/SubCategories"));
const SubCategoryAdd = lazy(() => import("@/pages/dashboard/subcategories/SubCategoryAdd"));
const SubCategoryEdit = lazy(() => import("@/pages/dashboard/subcategories/SubCategoryEdit"));
const Brands = lazy(() => import("@/pages/dashboard/brands/Brands"));
const BrandAdd = lazy(() => import("@/pages/dashboard/brands/BrandAdd"));
const BrandEdit = lazy(() => import("@/pages/dashboard/brands/BrandEdit"));
const Users = lazy(() => import("@/pages/dashboard/users/Users"));
const UserAdd = lazy(() => import("@/pages/dashboard/users/UserAdd"));
const UserEdit = lazy(() => import("@/pages/dashboard/users/UserEdit"));

// Route path constants
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: {
    HOME: "/dashboard",
    USERS: "/dashboard/users",
    USERS_ADD: "/dashboard/users/add",
    USERS_EDIT: "/dashboard/users/edit",
    PRODUCTS: "/dashboard/products",
    PRODUCTS_ADD: "/dashboard/products/add",
    PRODUCTS_EDIT: (id: string) => `/dashboard/products/edit/${id}`,
    CATEGORIES: "/dashboard/categories",
    CATEGORIES_ADD: "/dashboard/categories/add",
    CATEGORIES_EDIT: "/dashboard/categories/edit",
    SUBCATEGORIES: "/dashboard/subcategories",
    SUBCATEGORIES_ADD: "/dashboard/subcategories/add",
    SUBCATEGORIES_EDIT: "/dashboard/subcategories/edit",
    BRAND: "/dashboard/brand",
    BRAND_ADD: "/dashboard/brand/add",
    BRAND_EDIT: "/dashboard/brand/edit",
    ORDERS: "/dashboard/orders",
    ORDER_DETAIL: (id: string) => `/dashboard/orders/${id}`,
  },
} as const;

// Route configuration with component mappings
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  index?: boolean;
}

export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: Login,
  },
  {
    path: ROUTES.LOGIN,
    element: Login,
  },
  {
    path: ROUTES.DASHBOARD.HOME,
    element: DashboardHome,
  },
  // Users
  {
    path: ROUTES.DASHBOARD.USERS,
    element: Users,
  },
  {
    path: ROUTES.DASHBOARD.USERS_ADD,
    element: UserAdd,
  },
  {
    path: ROUTES.DASHBOARD.USERS_EDIT,
    element: UserEdit,
  },
  // Products
  {
    path: ROUTES.DASHBOARD.PRODUCTS,
    element: Products,
  },
  {
    path: ROUTES.DASHBOARD.PRODUCTS_ADD,
    element: ProductAdd,
  },
  {
    path: "/dashboard/products/edit/:productId",
    element: ProductEdit,
  },
  // Categories
  {
    path: ROUTES.DASHBOARD.CATEGORIES,
    element: Categories,
  },
  {
    path: ROUTES.DASHBOARD.CATEGORIES_ADD,
    element: CategoryAdd,
  },
  {
    path: ROUTES.DASHBOARD.CATEGORIES_EDIT,
    element: CategoryEdit,
  },
  // SubCategories
  {
    path: ROUTES.DASHBOARD.SUBCATEGORIES,
    element: SubCategories,
  },
  {
    path: ROUTES.DASHBOARD.SUBCATEGORIES_ADD,
    element: SubCategoryAdd,
  },
  {
    path: ROUTES.DASHBOARD.SUBCATEGORIES_EDIT,
    element: SubCategoryEdit,
  },
  // Brands
  {
    path: ROUTES.DASHBOARD.BRAND,
    element: Brands,
  },
  {
    path: ROUTES.DASHBOARD.BRAND_ADD,
    element: BrandAdd,
  },
  {
    path: ROUTES.DASHBOARD.BRAND_EDIT,
    element: BrandEdit,
  },
  // Orders
  {
    path: ROUTES.DASHBOARD.ORDERS,
    element: Orders,
  },
  {
    path: "/dashboard/orders/:orderId",
    element: OrderDetail,
  },
];

// Error route
export const errorRoute: RouteConfig = {
  path: "*",
  element: Error,
};
