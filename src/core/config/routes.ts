import { lazy } from "react";

// Lazy load page components
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Error = lazy(() => import("@/pages/Error"));
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard/Dashboard"));
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
  REGISTER: "/register",
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

// Route metadata for SEO
export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string[];
  breadcrumb?: string;
  ogImage?: string;
}

// Route configuration with component mappings
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  index?: boolean;
  children?: RouteConfig[];
  metadata?: RouteMetadata;
}

export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: Login,
    metadata: {
      title: "Login - Dashboard",
      description: "Sign in to access your dashboard and manage your application",
      keywords: ["login", "sign in", "authentication"],
      breadcrumb: "Home",
    },
  },
  {
    path: ROUTES.LOGIN,
    element: Login,
    metadata: {
      title: "Login - Dashboard",
      description: "Sign in to access your dashboard and manage your application",
      keywords: ["login", "sign in", "authentication"],
      breadcrumb: "Login",
    },
  },
  {
    path: ROUTES.REGISTER,
    element: Register,
    metadata: {
      title: "Register - Create Account",
      description: "Create a new account to get started with the dashboard",
      keywords: ["register", "sign up", "create account"],
      breadcrumb: "Register",
    },
  },
  {
    path: ROUTES.DASHBOARD.HOME,
    element: Dashboard,
    metadata: {
      title: "Dashboard",
      description: "Manage your application data, users, products, and orders",
      keywords: ["dashboard", "admin", "management"],
      breadcrumb: "Dashboard",
    },
    children: [
      {
        path: "",
        element: DashboardHome,
        index: true,
        metadata: {
          title: "Dashboard Home",
          description: "Overview of your application statistics and recent activity",
          keywords: ["dashboard", "overview", "statistics"],
          breadcrumb: "Home",
        },
      },
      // Users
      {
        path: "users",
        element: Users,
        metadata: {
          title: "Users - User Management",
          description: "View and manage all users in your application",
          keywords: ["users", "user management", "accounts"],
          breadcrumb: "Users",
        },
      },
      {
        path: "users/add",
        element: UserAdd,
        metadata: {
          title: "Add User - User Management",
          description: "Create a new user account",
          keywords: ["add user", "create user", "new account"],
          breadcrumb: "Add User",
        },
      },
      {
        path: "users/edit",
        element: UserEdit,
        metadata: {
          title: "Edit User - User Management",
          description: "Edit user account details and permissions",
          keywords: ["edit user", "update user", "user settings"],
          breadcrumb: "Edit User",
        },
      },
      // Products
      {
        path: "products",
        element: Products,
        metadata: {
          title: "Products - Product Management",
          description: "Browse and manage your product catalog",
          keywords: ["products", "product management", "catalog", "inventory"],
          breadcrumb: "Products",
        },
      },
      {
        path: "products/add",
        element: ProductAdd,
        metadata: {
          title: "Add Product - Product Management",
          description: "Create a new product in your catalog",
          keywords: ["add product", "create product", "new product"],
          breadcrumb: "Add Product",
        },
      },
      {
        path: "products/edit/:productId",
        element: ProductEdit,
        metadata: {
          title: "Edit Product - Product Management",
          description: "Edit product details, pricing, and availability",
          keywords: ["edit product", "update product", "product details"],
          breadcrumb: "Edit Product",
        },
      },
      // Categories
      {
        path: "categories",
        element: Categories,
        metadata: {
          title: "Categories - Category Management",
          description: "Organize your products with categories",
          keywords: ["categories", "product categories", "organization"],
          breadcrumb: "Categories",
        },
      },
      {
        path: "categories/add",
        element: CategoryAdd,
        metadata: {
          title: "Add Category - Category Management",
          description: "Create a new product category",
          keywords: ["add category", "create category", "new category"],
          breadcrumb: "Add Category",
        },
      },
      {
        path: "categories/edit",
        element: CategoryEdit,
        metadata: {
          title: "Edit Category - Category Management",
          description: "Edit category details and settings",
          keywords: ["edit category", "update category", "category settings"],
          breadcrumb: "Edit Category",
        },
      },
      // SubCategories
      {
        path: "subcategories",
        element: SubCategories,
        metadata: {
          title: "Subcategories - Subcategory Management",
          description: "Manage subcategories for better product organization",
          keywords: ["subcategories", "product subcategories", "organization"],
          breadcrumb: "Subcategories",
        },
      },
      {
        path: "subcategories/add",
        element: SubCategoryAdd,
        metadata: {
          title: "Add Subcategory - Subcategory Management",
          description: "Create a new product subcategory",
          keywords: ["add subcategory", "create subcategory", "new subcategory"],
          breadcrumb: "Add Subcategory",
        },
      },
      {
        path: "subcategories/edit",
        element: SubCategoryEdit,
        metadata: {
          title: "Edit Subcategory - Subcategory Management",
          description: "Edit subcategory details and settings",
          keywords: ["edit subcategory", "update subcategory", "subcategory settings"],
          breadcrumb: "Edit Subcategory",
        },
      },
      // Brands
      {
        path: "brand",
        element: Brands,
        metadata: {
          title: "Brands - Brand Management",
          description: "Manage product brands and manufacturers",
          keywords: ["brands", "brand management", "manufacturers"],
          breadcrumb: "Brands",
        },
      },
      {
        path: "brand/add",
        element: BrandAdd,
        metadata: {
          title: "Add Brand - Brand Management",
          description: "Create a new brand or manufacturer",
          keywords: ["add brand", "create brand", "new brand"],
          breadcrumb: "Add Brand",
        },
      },
      {
        path: "brand/edit",
        element: BrandEdit,
        metadata: {
          title: "Edit Brand - Brand Management",
          description: "Edit brand details and information",
          keywords: ["edit brand", "update brand", "brand settings"],
          breadcrumb: "Edit Brand",
        },
      },
      // Orders
      {
        path: "orders",
        element: Orders,
        metadata: {
          title: "Orders - Order Management",
          description: "View and manage customer orders and fulfillment",
          keywords: ["orders", "order management", "fulfillment", "purchases"],
          breadcrumb: "Orders",
        },
      },
      {
        path: "orders/:orderId",
        element: OrderDetail,
        metadata: {
          title: "Order Details - Order Management",
          description: "View detailed information about a specific order",
          keywords: ["order details", "order information", "order status"],
          breadcrumb: "Order Details",
        },
      },
    ],
  },
];

// Error route
export const errorRoute: RouteConfig = {
  path: "*",
  element: Error,
  metadata: {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist",
    keywords: ["404", "not found", "error"],
    breadcrumb: "Error",
  },
};
