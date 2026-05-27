"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sidebarModules } from "@/config/sidebar-routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

function AppSideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const currentSegment = pathname.split("/")[1];

  const currentModule = sidebarModules.find((module) =>
    module.items.some((item) => item.url.startsWith(`/${currentSegment}`)),
  );

  const currentModuleName = currentModule
    ? currentModule.moduleName
    : "Usuario";

  const perfilRoute = currentModule?.items.find((item) =>
    item.url.endsWith("/perfil"),
  );
  const PerfilIcon = perfilRoute?.icon;

  const usuarioNombre = "Alberto Perez";
  const usuarioIniciales = usuarioNombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar className="border-r border-[#191C1E]/10">
      <SidebarHeader className="p-0 overflow-hidden">
        <div className="bg-[#f09a1a] flex flex-col items-center justify-center py-8 px-4 text-center text-white">
          <Avatar className="h-20 w-20 border-2 border-white/50 mb-3 shadow-md">
            <AvatarImage
              src="/path-to-alberto-image.jpg"
              alt={usuarioNombre}
              className="object-cover"
            />
            <AvatarFallback className="text-black">
              {usuarioIniciales}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-lg leading-tight">{usuarioNombre}</h2>
          <p className="text-white/80 text-sm font-medium mt-0.5">
            {currentModuleName}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-1">
        <SidebarMenu>
          {currentModule?.items
            .filter((item) => !item.url.endsWith("/perfil"))
            .map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`
                      w-full h-12 justify-start gap-4 px-4 rounded-xl transition-all font-medium text-[15px]
                      ${
                        isActive
                          ? "bg-[#855300]/5 text-[#855300] hover:bg-[#855300]/8 hover:text-[#855300]"
                          : "text-[#191C1E]/70 hover:bg-[#191C1E]/5 hover:text-[#191C1E]"
                      }
                    `}
                  >
                    <Link href={item.url}>
                      <IconComponent
                        className={`h-5 w-5 shrink-0 ${isActive ? "text-[#855300]" : "text-[#191C1E]/70"}`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-[#191C1E]/5">
        <SidebarMenu>
          {perfilRoute && PerfilIcon && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === perfilRoute.url}
                className={`
                  w-full h-12 justify-start gap-4 px-4 rounded-xl font-medium text-[15px] transition-all
                  ${
                    pathname === perfilRoute.url
                      ? "bg-[#855300]/5 text-[#855300]"
                      : "text-[#191C1E]/70 hover:bg-[#191C1E]/5"
                  }
                `}
              >
                <Link href={perfilRoute.url}>
                  <PerfilIcon
                    className={`h-5 w-5 ${pathname === perfilRoute.url ? "text-[#855300]" : "text-[#191C1E]/70"}`}
                  />
                  <span>{perfilRoute.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full h-12 justify-start gap-4 px-4 rounded-xl font-semibold text-[15px] text-[#855300] hover:bg-[#855300]/5"
              onClick={() => {
                router.push("/");
              }}
            >
              <LogOut className="h-5 w-5 text-[#855300]" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
