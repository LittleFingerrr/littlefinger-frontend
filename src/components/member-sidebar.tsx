"use client"

import type * as React from "react"
import { Plus, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Organization sub-items
const organizationItems = [
  {
    title: "Organization 001",
    url: "/dashboard/organizations/001",
  },
  {
    title: "Organization 002",
    url: "/dashboard/organizations/002",
  },
  {
    title: "Tech Startup Inc",
    url: "/dashboard/organizations/tech-startup",
  },
]

// Other navigation items
const otherNavigationItems = [
  {
    title: "Organization Settings",
    url: "/dashboard/settings",
  },
]

export function MemberSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()

  const handleCreateOrganization = () => {
    router.push("/register")
  }

  return (
    <Sidebar className="border-r-1 border-gray-800 bg-inherit px-3 " {...props}>

        {/* Gradient overlay at bottom left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "267px",
          height: "267px",
          background: "radial-gradient(circle, #F3A42C4D 30%, transparent 70%)",
          borderRadius: "113.5px",
          transform: "translate(-50%, 50%)",
        }}
      />

      <SidebarHeader className="">
        <div className="flex items-center justify-center  py-1">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={100} height={100} className="mr-[-20px] ml-[-30px]" />
            <h2
                className={" text-base font-bold text-nowrap opacity-70 font-montserrat-subrayada mt-6"}
            >
                Little Finger
            </h2>
          </div>
          {/* <SidebarTrigger className="h-6 w-6 text-sidebar-foreground hover:bg-sidebar-accent" /> */}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0  ">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <div className="py-4">
              <Button
                onClick={handleCreateOrganization}
                className="w-full justify-start text-base font-bold gap-2 bg-transparent border-none opacity-80 font-lato gap-x-7"
                variant="outline"
              >
                Create Organizations
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Collapsible My Organizations */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem className="font-lato opacity-80">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between w-full">
                      <div className="flex items-center font-bold gap-2 text-base">
                        <span>My Organizations</span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-80 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {organizationItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={item.url}>
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Other navigation items */}
              {otherNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex font-lato font-bold opacity-80 items-center gap-2 mt-6">
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
