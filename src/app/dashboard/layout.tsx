import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ContractProvider } from "@/components/contract-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContractProvider>
      <div className="flex min-h-screen bg-slate-100">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1">
            <Header />
            <main className="p-4 md:p-6">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </ContractProvider>
  )
}
