import { Link, useLocation } from "react-router-dom";
import { cn } from "@/core/utils";

export const AuthTabs = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="flex gap-1 mb-8 p-1 bg-muted rounded-lg">
      <Link
        to="/login"
        className={cn(
          "flex-1 py-2.5 text-center text-sm font-medium rounded-md transition-all",
          isLogin
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={cn(
          "flex-1 py-2.5 text-center text-sm font-medium rounded-md transition-all",
          !isLogin
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Sign up
      </Link>
    </div>
  );
};
