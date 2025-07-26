"use client";

import { useState } from "react";
import { OrganizationSidebar } from "./organization-sidebar";

export function SidebarWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <OrganizationSidebar
      isCollapsed={isCollapsed}
      isMobileMenuOpen={isMobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}
