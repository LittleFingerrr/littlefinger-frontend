"use client"

import type * as React from "react"
import { Plus, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

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
    title: "Organization 003",
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

export function MemberSidebar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleCreateOrganization = () => {
    router.push("/register")
  }

  return (
    <aside className="border-r-1  bg-inherit px-3  border-r border-gray-700" >

      {/* Gradient overlay at bottom left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "367px",
          height: "367px",
          background: "radial-gradient(circle, #F3A42C4D 30%, transparent 75%)",
          borderRadius: "10.5px",
          transform: "translate(-50%, 50%)",
        }}
      />

        {/* Logo */}
        <div className="flex items-center justify-center  py-1">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={100} height={100} className="mr-[-20px] ml-[-30px]" />
            <h2
                className={"text-base font-bold font-montserrat-subrayada mt-6 opacity-70"}
            >
                Little Finger
            </h2>
          </div>
        </div>

        {/* Create Button */}
        <div className="py-4">
          <Button
            onClick={handleCreateOrganization}
            className="w-full justify-start text-base font-bold gap-2 bg-transparent opacity-80 font-lato gap-x-7"
            variant="ghost"
          >
            Create Organizations
            <Plus className="h-4 w-4 " />
          </Button>
        </div>

      {/* My Organizations Collapsible */}
      <div className="py-3">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center font-bold gap-2 text-base justify-between w-full opacity-80"
          variant="ghost"
        >
          <span>My Organizations</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          />
        </Button>

        {isOpen && (
          <ul className="mt-2 text-left space-y-1 text-base font-bold">
            {organizationItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className="flex pl-7 items-center py-1 hover:bg-muted opacity-80 font-lato"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* Other Links */}
      <div className="space-y-2 flex items-center">
        {otherNavigationItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="block font-lato font-bold opacity-80 pl-4 mt-6 text-base"
          >
            {item.title}
          </Link>
        ))}
      </div>

    </aside>
  )
}
