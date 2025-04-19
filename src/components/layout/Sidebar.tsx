import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Radio,
  Music,
  Settings,
  Server,
  Database,
  Users,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, title, to, isActive = false }: NavItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      {title}
    </Button>
  </Link>
);

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link to="/" className="flex items-center gap-2">
          <Radio className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-sidebar-foreground">
            Geeks Streaming Panel
          </span>
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          <p className="mb-2 px-2 text-xs font-medium text-sidebar-foreground/60">
            PRINCIPAL
          </p>
          <NavItem
            icon={<BarChart3 className="h-5 w-5" />}
            title="Panel de Control"
            to="/"
            isActive
          />
          <NavItem
            icon={<Radio className="h-5 w-5" />}
            title="Mis Estaciones"
            to="/stations"
            isActive={location.pathname === '/stations'}
          />
          <NavItem
            icon={<Music className="h-5 w-5" />}
            title="AutoDJ"
            to="/autodj"
          />
          <NavItem
            icon={<BarChart3 className="h-5 w-5" />}
            title="Estadísticas"
            to="/statistics"
          />

          <p className="mb-2 mt-6 px-2 text-xs font-medium text-sidebar-foreground/60">
            CONFIGURACIÓN
          </p>
          <NavItem
            icon={<Server className="h-5 w-5" />}
            title="Transmisión"
            to="/streaming"
          />
          <NavItem
            icon={<Database className="h-5 w-5" />}
            title="Base de Datos"
            to="/database"
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            title="Usuarios"
            to="/users"
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            title="Configuraciones"
            to="/settings"
          />
          <NavItem
            icon={<Server className="h-5 w-5" />}
            title="Instalación"
            to="/install"
            isActive={location.pathname === '/install'}
          />
        </div>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-4">
        <Button className="w-full gap-2">
          <PlusCircle className="h-5 w-5" />
          Nueva Estación
        </Button>
      </div>
    </>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed left-4 top-3 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      {isMobile ? (
        <div
          className={cn(
            "fixed inset-0 z-40 transform bg-background/80 backdrop-blur-sm transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div
            className={cn(
              "fixed bottom-0 left-0 top-0 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {sidebarContent}
          </div>
        </div>
      ) : (
        <div className="hidden w-64 flex-col bg-sidebar md:flex">
          {sidebarContent}
        </div>
      )}
    </>
  );
};

export default Sidebar;
