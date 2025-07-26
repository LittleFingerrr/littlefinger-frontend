"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800 bg-black">
      {/* Organization Selector */}
      <div className="flex items-center space-x-4">
        <Select defaultValue="org001">
          <SelectTrigger className="w-[200px] bg-transparent border-none text-white text-xl font-semibold">
            <SelectValue placeholder="Select Organization" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-600">
            <SelectItem value="org001" className="text-white hover:bg-gray-800">
              Organization 001
            </SelectItem>
            <SelectItem value="org002" className="text-white hover:bg-gray-800">
              Organization 002
            </SelectItem>
            <SelectItem value="org003" className="text-white hover:bg-gray-800">
              Organization 003
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Connect Wallet Button */}
      <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-medium px-8 py-2 rounded-full">
        Connect wallet
      </Button>
    </header>
  )
}
