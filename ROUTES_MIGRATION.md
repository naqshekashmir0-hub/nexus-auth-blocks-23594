# ROUTES Constants Migration Summary

This document tracks the migration from hardcoded route strings to the centralized ROUTES constants from `src/core/config/routes.ts`.

## Completed Files ✅

### Core Files
- ✅ `src/App.tsx` - All routes now use ROUTES constants
- ✅ `src/features/dashboard/components/AppSidebar.tsx` - Navigation menu uses ROUTES
- ✅ `src/pages/Index.tsx` - Landing page links use ROUTES
- ✅ `src/features/auth/components/AuthTabs.tsx` - Auth tabs use ROUTES
- ✅ `src/features/auth/components/AuthCard.tsx` - Auth card logic uses ROUTES
- ✅ `src/pages/auth/Login.tsx` - Login navigation uses ROUTES
- ✅ `src/pages/auth/Register.tsx` - Register navigation uses ROUTES

### Dashboard - Brands
- ✅ `src/pages/dashboard/brands/BrandAdd.tsx` - Uses ROUTES.DASHBOARD.BRAND
- ✅ `src/pages/dashboard/brands/BrandEdit.tsx` - Uses ROUTES.DASHBOARD.BRAND
- ✅ `src/pages/dashboard/brands/Brands.tsx` - Uses ROUTES.DASHBOARD.BRAND_ADD and BRAND_EDIT

## Files Requiring Updates 🔄

The following files still contain hardcoded routes and should be updated to use ROUTES constants:

### Dashboard - Categories
- `src/pages/dashboard/categories/CategoryAdd.tsx`
  - Replace `/dashboard/categories` with `ROUTES.DASHBOARD.CATEGORIES`
- `src/pages/dashboard/categories/CategoryEdit.tsx`
  - Replace `/dashboard/categories` with `ROUTES.DASHBOARD.CATEGORIES`
- `src/pages/dashboard/categories/Categories.tsx`
  - Replace `/dashboard/categories/add` with `ROUTES.DASHBOARD.CATEGORIES_ADD`
  - Replace `/dashboard/categories/edit` with `ROUTES.DASHBOARD.CATEGORIES_EDIT`

### Dashboard - SubCategories
- `src/pages/dashboard/subcategories/SubCategoryAdd.tsx`
  - Replace `/dashboard/subcategories` with `ROUTES.DASHBOARD.SUBCATEGORIES`
- `src/pages/dashboard/subcategories/SubCategoryEdit.tsx`
  - Replace `/dashboard/subcategories` with `ROUTES.DASHBOARD.SUBCATEGORIES`
- `src/pages/dashboard/subcategories/SubCategories.tsx`
  - Replace `/dashboard/subcategories/add` with `ROUTES.DASHBOARD.SUBCATEGORIES_ADD`
  - Replace `/dashboard/subcategories/edit` with `ROUTES.DASHBOARD.SUBCATEGORIES_EDIT`

### Dashboard - Products
- `src/pages/dashboard/products/ProductAdd.tsx`
  - Replace `/dashboard/products` with `ROUTES.DASHBOARD.PRODUCTS`
- `src/pages/dashboard/products/ProductEdit.tsx`
  - Replace `/dashboard/products` with `ROUTES.DASHBOARD.PRODUCTS`
- `src/pages/dashboard/products/Products.tsx`
  - Replace `/dashboard/products/add` with `ROUTES.DASHBOARD.PRODUCTS_ADD`
  - Replace `/dashboard/products/edit/${id}` with `ROUTES.DASHBOARD.PRODUCTS_EDIT(id)`

### Dashboard - Users
- `src/pages/dashboard/users/UserAdd.tsx`
  - Replace `/dashboard/users` with `ROUTES.DASHBOARD.USERS`
- `src/pages/dashboard/users/UserEdit.tsx`
  - Replace `/dashboard/users` with `ROUTES.DASHBOARD.USERS`
- `src/pages/dashboard/users/Users.tsx`
  - Replace `/dashboard/users/add` with `ROUTES.DASHBOARD.USERS_ADD`
  - Replace `/dashboard/users/edit` with `ROUTES.DASHBOARD.USERS_EDIT`

### Dashboard - Orders
- `src/pages/dashboard/orders/OrderDetail.tsx`
  - Replace `/dashboard/orders` with `ROUTES.DASHBOARD.ORDERS`
- `src/pages/dashboard/orders/Orders.tsx`
  - Replace `/dashboard/orders/${id}` with `ROUTES.DASHBOARD.ORDER_DETAIL(id)`
- `src/pages/dashboard/dashboard/DashboardHome.tsx`
  - Replace `/dashboard/orders` with `ROUTES.DASHBOARD.ORDERS`
  - Replace `/dashboard/orders/${id}` with `ROUTES.DASHBOARD.ORDER_DETAIL(id)`

## Migration Pattern

### 1. Add Import Statement
```typescript
import { ROUTES } from "@/core/config/routes";
```

### 2. Replace Hardcoded Strings

**Static Routes:**
```typescript
// Before
navigate("/dashboard/products");
backPath="/dashboard/products"
to="/login"

// After
navigate(ROUTES.DASHBOARD.PRODUCTS);
backPath={ROUTES.DASHBOARD.PRODUCTS}
to={ROUTES.LOGIN}
```

**Dynamic Routes (with parameters):**
```typescript
// Before
navigate(`/dashboard/products/edit/${productId}`);
navigate(`/dashboard/orders/${orderId}`);

// After
navigate(ROUTES.DASHBOARD.PRODUCTS_EDIT(productId));
navigate(ROUTES.DASHBOARD.ORDER_DETAIL(orderId));
```

**Query Parameters:**
```typescript
// Before
navigate(`/dashboard/brand/edit?id=${brandId}`);

// After
navigate(`${ROUTES.DASHBOARD.BRAND_EDIT}?id=${brandId}`);
```

## Benefits of Using ROUTES Constants

1. **Type Safety**: TypeScript ensures route names are valid
2. **Single Source of Truth**: All routes defined in one place
3. **Easier Refactoring**: Change routes in one file, updates everywhere
4. **Prevents Typos**: Auto-complete helps avoid route typos
5. **Better IDE Support**: Go-to-definition works for routes
6. **Consistency**: Ensures same route format across the app

## Testing After Migration

After updating files, verify:
- [ ] All navigation works correctly
- [ ] No TypeScript errors
- [ ] No hardcoded route strings remain (search for `"/dashboard`)
- [ ] Dynamic routes with parameters work
- [ ] Query parameters still function correctly

## Search Commands to Find Remaining Hardcoded Routes

```bash
# Find hardcoded dashboard routes
grep -r '"/dashboard' src/

# Find hardcoded auth routes
grep -r '"/login"\|"/register"' src/

# Find navigate calls with strings
grep -r 'navigate("/' src/
```
