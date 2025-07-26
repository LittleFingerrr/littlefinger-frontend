"use client"

import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export function NavLinks({
  isCollapsed,
  onLinkClick,
}: {
  isCollapsed: boolean
  onLinkClick?: () => void
}) {
  const [isOrganizationsOpen, setIsOrganizationsOpen] = useState(true)

  return (
    <nav className="flex-1 px-4 py-6 space-y-4">
      {/* Add organizations */}
      <Button
        variant="ghost"
        className="w-full justify-start text-white hover:bg-gray-800 hover:text-white"
        onClick={onLinkClick}
      >
        <span className="text-sm">Add organizations</span>
        <Plus className="ml-auto w-4 h-4" />
      </Button>

      {/* My organizations */}
      <Collapsible open={isOrganizationsOpen} onOpenChange={setIsOrganizationsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white">
            <span className="text-sm">My organizations</span>
            <ChevronDown
              className={`ml-auto w-4 h-4 transition-transform ${isOrganizationsOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">{/* Organization items would go here */}</CollapsibleContent>
      </Collapsible>

      {/* Organization Settings */}
      <Button
        variant="ghost"
        className="w-full justify-start text-white hover:bg-gray-800 hover:text-white"
        onClick={onLinkClick}
      >
        <span className="text-sm">Organization Settings</span>
      </Button>
    </nav>
  )
}
