"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/index";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-secondary">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div
        className={`
          flex h-screen flex-col w-full transition-all duration-300 overflow-hidden ease-in-out relative
          ${!isCollapsed ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        <div className="absolute w-[20%] h-48 -top-10 -right-10 bg-primary-glow rounded-[5.53125rem] blur-[3.125rem]" />
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          onToggleCollapse={() => setCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
        />
        <main className="flex-grow p-6 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
