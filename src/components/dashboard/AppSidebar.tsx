import { LayoutDashboard, Package, ShoppingCart, List, ChevronRight, FolderOpen } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
const dashboardItems = [{
  title: "Dashboard",
  url: "/dashboard",
  icon: LayoutDashboard
}, {
  title: "Products",
  url: "/dashboard/products",
  icon: Package
}, {
  title: "Orders",
  url: "/dashboard/orders",
  icon: ShoppingCart
}, {
  title: "Categories",
  url: "/dashboard/categories",
  icon: FolderOpen
}, {
  title: "Items",
  url: "/dashboard/items",
  icon: List
}];
export function AppSidebar() {
  const {
    open,
    isMobile,
    setOpenMobile
  } = useSidebar();

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return <Sidebar collapsible="icon" className="border-r border-border/10 shadow-lg bg-card data-[state=collapsed]:w-20 data-[state=expanded]:w-48">
      <SidebarContent>
        {/* Logo/Brand Section */}
        <div className="px-4 py-6">
          {open ? <div className="flex items-baseline gap-1">
              <h1 className="text-2xl font-bold text-primary">Able</h1>
              <span className="text-xs text-muted-foreground font-semibold px-1.5 py-0.5 bg-primary/10 rounded">
                PRO
              </span>
            </div> : <div className="flex justify-center">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                A
              </div>
            </div>}
        </div>

        {/* Dashboard Section */}
        <SidebarGroup>
          {open}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {dashboardItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="h-11">
                    <NavLink to={item.url} end={item.url === "/dashboard"} className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" activeClassName="bg-sidebar-accent text-primary font-medium" onClick={handleItemClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Profile Section */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto p-3 hover:bg-sidebar-accent">
              <div className={`flex items-center gap-3 w-full ${!open && "justify-center"}`}>
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                {open && <>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sidebar-foreground truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        UI/UX Designer
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </>}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>;
}