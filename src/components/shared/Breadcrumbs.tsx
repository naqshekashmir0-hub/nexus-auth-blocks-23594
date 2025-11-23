import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { matchPath } from "react-router-dom";
import { routeConfig, ROUTES } from "@/core/config/routes";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Dashboard", path: ROUTES.DASHBOARD.HOME },
    ];

    const findBreadcrumb = (routes: typeof routeConfig, parentPath = "", parentBreadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] | null => {
      for (const route of routes) {
        const fullPath = parentPath + route.path;
        
        if (matchPath(fullPath, location.pathname) || (route.index && matchPath(parentPath, location.pathname))) {
          if (route.metadata?.breadcrumb) {
            return [
              ...parentBreadcrumbs,
              { label: route.metadata.breadcrumb, path: fullPath },
            ];
          }
        }

        if (route.children) {
          const childBreadcrumbs = findBreadcrumb(
            route.children,
            fullPath + (fullPath.endsWith("/") ? "" : "/"),
            route.metadata?.breadcrumb
              ? [...parentBreadcrumbs, { label: route.metadata.breadcrumb, path: fullPath }]
              : parentBreadcrumbs
          );
          if (childBreadcrumbs) {
            return childBreadcrumbs;
          }
        }
      }
      return null;
    };

    const foundBreadcrumbs = findBreadcrumb(routeConfig);
    if (foundBreadcrumbs && foundBreadcrumbs.length > 0) {
      return foundBreadcrumbs;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs if only one item (dashboard home)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link
            to={ROUTES.DASHBOARD.HOME}
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard Home</span>
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
