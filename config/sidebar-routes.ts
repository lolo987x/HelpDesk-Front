import {
  LayoutDashboard,
  Ticket,
  CalendarDays,
  LucideIcon,
  LaptopMinimal,
  Users,
  Headset,
  User,
  Settings,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavModule {
  moduleName: string;
  items: NavItem[];
}

export const sidebarModules: NavModule[] = [
  {
    moduleName: "Administrador",
    items: [
      {
        title: "Inicio",
        url: "/Administrador/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Lista de Tickets",
        url: "/Administrador/tickets",
        icon: Ticket,
      },
      {
        title: "Cronograma de Citas",
        url: "/Administrador/citas",
        icon: CalendarDays,
      },
      { title: "Equipos", url: "/Administrador/equipos", icon: LaptopMinimal },
      { title: "Clientes", url: "/Administrador/clientes", icon: Users },
      { title: "Soporte", url: "/Administrador/soporte", icon: Headset },
      { title: "Usuarios", url: "/Administrador/usuarios", icon: User },
      { title: "Perfil", url: "/Administrador/perfil", icon: Settings },
    ],
  },
];
