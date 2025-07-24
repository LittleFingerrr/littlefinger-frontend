import {
    DashboardIcon,
    DashboardIconFilled,
    ScheduleIcon,
    ScheduleIconFilled,
    SettingsIcon,
    SettingsIconFilled,
    UsersIcon,
    UsersIconFilled,
    VaultIcon,
    VaultIconFilled,
  } from "@/components/ui/icons/icon";
  
  export type NavLinkProps = {
    link: {
      name: string;
      href: string;
      icon: React.ComponentType<any>;
      filledIcon: React.ComponentType<any>;
    };
    isCollapsed: boolean;
  };
  
  export const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon,
      filledIcon: DashboardIconFilled,
    },
    {
      name: "Members",
      href: "/dashboard/members",
      icon: UsersIcon,
      filledIcon: UsersIconFilled,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: ScheduleIcon,
      filledIcon: ScheduleIconFilled,
    },
    {
      name: "Vault",
      href: "/dashboard/vault",
      icon: VaultIcon,
      filledIcon: VaultIconFilled,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      filledIcon: SettingsIconFilled,
    },
  ];
  