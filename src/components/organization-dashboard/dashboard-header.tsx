"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800 bg-black">
      {/* Organization Selector */}
      <div className="flex items-center space-x-4">
        <Select defaultValue="org001">
          <SelectTrigger className="w-[200px] bg-[#131313A6] border border-gray-700 text-white text-xl font-semibold hover:bg-[#1a1a1a] transition-colors duration-200">
            <SelectValue placeholder="Select Organization" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border border-gray-700">
            <SelectItem
              value="org001"
              className="text-white hover:text-white hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] cursor-pointer"
            >
              Organization 001
            </SelectItem>
            <SelectItem
              value="org002"
              className="text-white hover:text-white hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] cursor-pointer"
            >
              Organization 002
            </SelectItem>
            <SelectItem
              value="org003"
              className="text-white hover:text-white hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] cursor-pointer"
            >
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
  );
}
