"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { links } from "./navlinks";
import type { NavLinkProps } from "./navlinks";

type NavLinkComponentProps = NavLinkProps & {
  onLinkClick?: () => void;
};

const NavLink = ({ link, isCollapsed, onLinkClick }: NavLinkComponentProps) => {
  const pathname = usePathname();
  const isActive =
    pathname.startsWith(link.href) &&
    (link.href !== "/dashboard" || pathname === "/dashboard");
  const IconComponent = isActive ? link.filledIcon : link.icon;

  const LinkContent = (
    <Link
      href={link.href}
      onClick={onLinkClick}
      className={cn(
        "w-full justify-start gap-4 px-4 text-white rounded-md flex items-center h-10 hover:bg-primary/10",
        isCollapsed && "justify-center  px-0",
        isActive && "bg-primary text-white hover:bg-primary/90"
      )}
    >
      <IconComponent className="w-6 h-8" />

      <span
        className={cn("font-lato text-xl font-bold", isCollapsed && "hidden")}
      >
        {link.name}
      </span>
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
        <TooltipContent side="right">{link.name}</TooltipContent>
      </Tooltip>
    );
  }

  return LinkContent;
};

export const NavLinks = ({
  isCollapsed,
  onLinkClick,
}: {
  isCollapsed: boolean;
  onLinkClick?: () => void;
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <nav className="flex flex-col gap-10 p-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            link={link}
            isCollapsed={isCollapsed}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </TooltipProvider>
  );
};
