"use client"

import type React from "react"
import { MemberSidebar } from "@/components/member-sidebar"
import { MobileHeader } from "@/components/member-mobile-header"
import { useIsMobile } from "@/hooks/use-mobile";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isMobile = useIsMobile();

  return (
  <>
    <div className="flex min-h-screen">
      {/* Render MemberSidebar only on desktop */}
      {!isMobile && <MemberSidebar /> }

      <div className="flex flex-col flex-1">
        <MobileHeader />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  </>
  )
}
