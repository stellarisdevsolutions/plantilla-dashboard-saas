"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, PanelLeft, Settings2, Shield } from "lucide-react";
import { toast } from "sonner";
import { PaletteSwitcher } from "@/components/palette-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { demoUser } from "@/config/dashboard";
import { navigationGroups } from "@/config/navigation";
import { useDemoRoleStore, type DemoRole } from "@/lib/demo-role-store";
import { ModuleSearch } from "./module-search";
import { NotificationsMenu } from "./notifications-menu";

const roleDescriptions: Record<DemoRole, string> = {
  Administrador: "Acceso visual completo (crear, editar y eliminar).",
  Editor: "Puede crear y editar registros; eliminación bloqueada.",
  Lectura: "Solo lectura: acciones de modificación deshabilitadas.",
};

export function Header({ onToggleSidebar, collapsed, mobileNavigation }: {
  onToggleSidebar: () => void;
  collapsed: boolean;
  mobileNavigation: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole } = useDemoRoleStore();

  const activeGroup = navigationGroups.find((group) =>
    group.items.some((item) => item.href === pathname)
  );
  const activeItem = activeGroup?.items.find((item) => item.href === pathname);

  return (
    <header className="dashboard-header">
      <div className="shell-header-start">
        {mobileNavigation}
        <Button
          variant="ghost"
          size="icon"
          className="hidden shrink-0 md:inline-flex"
          onClick={onToggleSidebar}
          aria-label={collapsed ? "Expandir navegación" : "Contraer navegación"}
          aria-expanded={!collapsed}
        >
          <PanelLeft aria-hidden />
        </Button>

        <Breadcrumb className="shell-breadcrumb">
          <BreadcrumbList>
            {activeGroup && (
              <>
                <BreadcrumbItem className="shell-breadcrumb-group">
                  <BreadcrumbLink href={activeGroup.items[0].href}>
                    {activeGroup.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="shell-breadcrumb-group" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="shell-section">
                {activeItem?.title ?? "Panel"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="shell-header-tools">
        <ModuleSearch />
        <NotificationsMenu />
        <PaletteSwitcher />
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            className="shell-profile"
            aria-label="Menú de cuenta y rol"
          >
            <span className="shell-initials">{demoUser.initials}</span>
            <span className="shell-profile-name">
              {demoUser.name}
              {role !== "Administrador" && (
                <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                  {role}
                </Badge>
              )}
              <ChevronDown size={13} aria-hidden />
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <div className="px-2 py-1.5">
              <p className="text-xs font-semibold text-foreground">{demoUser.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{demoUser.email}</p>
            </div>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center gap-1.5">
                <Shield className="size-3" aria-hidden />
                Rol de demostración (RBAC)
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={role}
                onValueChange={(nextRole) => {
                  const typed = nextRole as DemoRole;
                  setRole(typed);
                  toast.info(`Vista cambiada a ${typed}`, {
                    description: roleDescriptions[typed],
                  });
                }}
              >
                <DropdownMenuRadioItem value="Administrador" className="text-xs">
                  Administrador
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Editor" className="text-xs">
                  Editor
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Lectura" className="text-xs">
                  Solo lectura
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-xs cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <Settings2 className="size-3.5" aria-hidden />
              Ajustes de cuenta
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 text-xs cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <LogOut className="size-3.5" aria-hidden />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
