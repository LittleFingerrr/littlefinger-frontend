import type React from "react"
import { MemberSidebar } from "@/components/member-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MobileHeader } from "@/components/member-mobile"

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <MemberSidebar />
      <SidebarInset>
        <MobileHeader />
        <main className="flex flex-1 flex-col min-h-screen overflow-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
