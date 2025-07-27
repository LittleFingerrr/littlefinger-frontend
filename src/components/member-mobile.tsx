"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileHeader() {
  const { toggleSidebar, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <header className="flex h-14 items-center gap-4   bg-background px-4 md:hidden">
      <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </header>
  )
}
