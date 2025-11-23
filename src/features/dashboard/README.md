# Dashboard Feature Structure

This directory contains all dashboard-related features organized by domain.

## Structure

```
src/features/dashboard/
├── components/           # Common dashboard components
│   ├── AppSidebar.tsx
│   ├── DashboardHeader.tsx
│   ├── ProfileMenu.tsx
│   └── index.ts
├── orders/              # Order management feature
│   ├── components/
│   │   ├── CustomerDetailsCard.tsx
│   │   ├── ShippingInformationCard.tsx
│   │   ├── OrderItemsCard.tsx
│   │   ├── PriceSummaryCard.tsx
│   │   ├── OrderHistoryCard.tsx
│   │   └── index.ts
│   └── index.ts
├── products/            # Product management feature
│   ├── components/
│   │   └── index.ts
│   └── index.ts
├── categories/          # Category management feature
│   ├── components/
│   │   └── index.ts
│   └── index.ts
├── subcategories/       # SubCategory management feature
│   ├── components/
│   │   └── index.ts
│   └── index.ts
├── brands/              # Brand management feature
│   ├── components/
│   │   └── index.ts
│   └── index.ts
├── users/               # User management feature
│   ├── components/
│   │   └── index.ts
│   └── index.ts
└── index.ts             # Main export file
```

## Organization Principles

### 1. Common Components
Components used across multiple dashboard features stay in `src/features/dashboard/components/`:
- `AppSidebar`: Navigation sidebar
- `DashboardHeader`: Top header with breadcrumbs
- `ProfileMenu`: User profile menu

### 2. Feature-Specific Components
Each feature (orders, products, categories, etc.) has its own folder with:
- `components/`: Feature-specific UI components
- `index.ts`: Export barrel for the feature

### 3. Shared Components
Generic reusable components (forms, image uploads) remain in `src/components/shared/`:
- `FormPageHeader`
- `ImageUploadSingle`
- `ImageUploadMultiple`
- `FormActions`
- `TagInput`

## Import Examples

```typescript
// Common dashboard components
import { AppSidebar, DashboardHeader, ProfileMenu } from "@/features/dashboard";

// Order-specific components
import { CustomerDetailsCard, OrderItemsCard } from "@/features/dashboard/orders";
// or
import { CustomerDetailsCard, OrderItemsCard } from "@/features/dashboard";

// Shared form components
import { FormPageHeader, ImageUploadSingle } from "@/components/shared";
```

## Adding New Feature Components

When adding components specific to a feature:

1. Create the component in the feature's `components/` folder
2. Export it from the feature's `components/index.ts`
3. The component will automatically be available through the main export

Example for a new ProductCard component:

```typescript
// src/features/dashboard/products/components/ProductCard.tsx
export function ProductCard({ product }) {
  // component logic
}

// src/features/dashboard/products/components/index.ts
export { ProductCard } from "./ProductCard";

// Usage in pages
import { ProductCard } from "@/features/dashboard/products";
```
