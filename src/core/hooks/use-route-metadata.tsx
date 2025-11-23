import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { routeConfig, errorRoute, type RouteMetadata } from "@/core/config/routes";

/**
 * Hook to get metadata for the current route
 */
export const useRouteMetadata = (): RouteMetadata | null => {
  const location = useLocation();

  const findMetadata = (routes: typeof routeConfig, parentPath = ""): RouteMetadata | null => {
    for (const route of routes) {
      const fullPath = parentPath + route.path;
      
      // Check if current path matches this route
      if (matchPath(fullPath, location.pathname) || (route.index && matchPath(parentPath, location.pathname))) {
        if (route.metadata) {
          return route.metadata;
        }
      }

      // Check children
      if (route.children) {
        const childMetadata = findMetadata(route.children, fullPath + (fullPath.endsWith("/") ? "" : "/"));
        if (childMetadata) {
          return childMetadata;
        }
      }
    }
    return null;
  };

  const metadata = findMetadata(routeConfig) || errorRoute.metadata || null;
  return metadata;
};

/**
 * Hook to set document metadata based on route configuration
 */
export const useDocumentMetadata = () => {
  const metadata = useRouteMetadata();

  useEffect(() => {
    if (!metadata) return;

    // Set document title
    document.title = metadata.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement("meta");
        if (property) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute("content", content);
    };

    // Update description
    updateMetaTag("description", metadata.description);
    
    // Update keywords if provided
    if (metadata.keywords && metadata.keywords.length > 0) {
      updateMetaTag("keywords", metadata.keywords.join(", "));
    }

    // Update Open Graph tags
    updateMetaTag("og:title", metadata.title, "og:title");
    updateMetaTag("og:description", metadata.description, "og:description");
    
    if (metadata.ogImage) {
      updateMetaTag("og:image", metadata.ogImage, "og:image");
    }

    // Update Twitter Card tags
    updateMetaTag("twitter:title", metadata.title, "twitter:title");
    updateMetaTag("twitter:description", metadata.description, "twitter:description");
    
    if (metadata.ogImage) {
      updateMetaTag("twitter:image", metadata.ogImage, "twitter:image");
    }
  }, [metadata]);
};
