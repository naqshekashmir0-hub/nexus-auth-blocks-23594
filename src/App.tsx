import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootProvider } from "@/core/providers/RootProvider";
import { routeConfig, errorRoute, type RouteConfig } from "@/core/config/routes";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Function to render routes from configuration
const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) => {
    const Element = route.element;
    
    return (
      <Route
        key={route.path + index}
        path={route.path}
        index={route.index}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Element />
          </Suspense>
        }
      />
    );
  });
};

const App = () => {
  const ErrorElement = errorRoute.element;
  
  return (
    <RootProvider>
      <BrowserRouter>
        <Routes>
          {renderRoutes(routeConfig)}
          
          {/* Catch-all error route */}
          <Route 
            path={errorRoute.path} 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorElement />
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;
