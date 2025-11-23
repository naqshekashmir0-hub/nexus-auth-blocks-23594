import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/AppSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-background overflow-x-hidden">
            <Breadcrumbs />
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
