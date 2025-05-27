"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { CalendarClock, LayoutDashboard, Settings, Users, Wallet } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Members",
      href: "/dashboard/members",
      icon: Users,
      active: pathname === "/dashboard/members",
    },
    {
      title: "Schedules",
      href: "/dashboard/schedules",
      icon: CalendarClock,
      active: pathname === "/dashboard/schedules",
    },
    {
      title: "Vault",
      href: "/dashboard/vault",
      icon: Wallet,
      active: pathname === "/dashboard/vault",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold">LittleFinger</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
