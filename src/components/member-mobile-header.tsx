"use client"

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MemberSidebar } from "@/components/member-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileHeader() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isMobile) return null

  return (
    <header className="flex h-14 items-center gap-4 bg-background px-4 md:hidden">
      <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="h-8 w-8 p-0">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <MemberSidebar />
        </SheetContent>
      </Sheet>
    </header>
  )
}
