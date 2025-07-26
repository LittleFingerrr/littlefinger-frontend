"use client";

import { useState } from "react";
import { Sidebar } from "./organization-sidebar";

export function SidebarWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Sidebar
      isCollapsed={isCollapsed}
      isMobileMenuOpen={isMobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}
