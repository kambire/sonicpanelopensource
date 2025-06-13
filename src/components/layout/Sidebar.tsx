
import * as React from "react"
import {
  BarChart3,
  Building2,
  ChevronUp,
  Code2,
  Database,
  Download,
  Home,
  Mail,
  Music,
  Podcast,
  Radio,
  ShoppingCart,
  CreditCard,
  Users,
  User,
} from "lucide-react"

import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAdmin } = useAuth();

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "AutoDJ",
      url: "/autodj",
      icon: Music,
    },
    {
      title: "Estaciones",
      url: "/stations",
      icon: Radio,
    },
    {
      title: "Streaming",
      url: "/streaming",
      icon: Podcast,
    },
    {
      title: "Estadísticas",
      url: "/statistics",
      icon: BarChart3,
    },
  ];

  const adminItems = [
    {
      title: "Usuarios",
      url: "/users",
      icon: Users,
    },
    {
      title: "Base de Datos",
      url: "/database",
      icon: Database,
    },
    {
      title: "Email Manager",
      url: "/email",
      icon: Mail,
    },
    {
      title: "Resellers",
      url: "/resellers",
      icon: Building2,
    },
    {
      title: "Tienda",
      url: "/store",
      icon: ShoppingCart,
    },
    {
      title: "Facturación",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "API Integration",
      url: "/api",
      icon: Code2,
    },
    {
      title: "Script Instalación",
      url: "/install",
      icon: Download,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Radio className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Sonic Panel</span>
                  <span className="truncate text-xs">
                    {user?.role === "admin" ? "Administración" : user?.stationName || "Panel de Radio"}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        {/* Mostrar sección de administración solo para admins */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User />
              <span>{user?.name || "Usuario"}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
