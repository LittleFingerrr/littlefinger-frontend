import { SidebarWrapper } from "@/components/organization-dashboard/organization-sidebar/sidebar-wrapper";
import type React from "react";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar Wrapper */}
      <SidebarWrapper />

      {/* Main Content - offset by sidebar width */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {children}
      </div>
    </div>
  );
}
