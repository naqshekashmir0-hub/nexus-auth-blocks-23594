import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Maximize2, Settings, MessageSquare, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileMenu } from "@/features/dashboard/components/ProfileMenu";
export function DashboardHeader() {
  return <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background">
      <div className="flex items-center gap-4 px-4 md:px-6">
        <SidebarTrigger className="hover:bg-sidebar-accent" />
        
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Ctrl + K" className="pl-10 w-full bg-muted/30 border-muted h-8 rounded" />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto px-4 md:px-6">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        
        <div className="ml-2 pl-2 border-l">
          <ProfileMenu />
        </div>
      </div>
    </header>;
}