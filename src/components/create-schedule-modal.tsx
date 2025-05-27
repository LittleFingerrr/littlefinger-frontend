"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, contractAddressToHex } from "@/lib/utils"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { COREABI } from "@/lib/abi/core-abi"
import { useOrgAddress } from "@/components/contract-provider"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"

interface CreateScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateScheduleModal({ open, onOpenChange }: CreateScheduleModalProps) {
  
  const [formData, setFormData] = useState({
    scheduleType: "", // "0" for RECURRING, "1" for ONETIME 
    startDate: new Date(),
    endDate: undefined as Date | undefined,
    intervalValue: "30",
    intervalUnit: "days", // days, weeks, months
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { address: user } = useAccount();
  
  const { data: ContractAddresses } = useReadContract(
    user ? {
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: [user!],
    watch: true
  }: ({} as any))

  const { contract } = useContract({
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
  })

  // Convert interval to seconds based on unit

  const getIntervalInSeconds = (value: string, unit: string): number => {
    const numValue = Number.parseInt(value)
    switch (unit) {
      case "days":
        return numValue * 24 * 60 * 60
      case "weeks":
        return numValue * 7 * 24 * 60 * 60
      case "months":
        return numValue * 30 * 24 * 60 * 60 // Approximate 30 days per month
      default:
        return numValue * 24 * 60 * 60 // Default to days
    }
  }

  // Convert Date to Unix timestamp
  const dateToTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000)
  }

  const calls = useMemo(() => {
    const inputIsValid = formData.scheduleType !== "" && formData.startDate;

    if (!inputIsValid || !contract || !user) return

    const startTimestamp = dateToTimestamp(formData.startDate)
    const endTimestamp = formData.endDate ? dateToTimestamp(formData?.endDate) : startTimestamp + 365 * 24 * 60 * 60;
    const intervalInSeconds = formData.intervalValue ? getIntervalInSeconds(formData.intervalValue, formData.intervalUnit) : 0


    return [
      contract.populate("initialize_disbursement_schedule", [
        parseInt(formData.scheduleType), startTimestamp, endTimestamp, intervalInSeconds
      ])
    ]
  }, [contract, user, formData])

  const { sendAsync } = useSendTransaction({ calls })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    try {
      // console.log("Creating schedule with data:", {
      //   scheduleType: Number.parseInt(formData.scheduleType),
      //   startTimestamp: dateToTimestamp(formData.startDate),
      //   endTimestamp: formData.endDate
      //     ? dateToTimestamp(formData.endDate)
      //     : dateToTimestamp(formData.startDate) + 365 * 24 * 60 * 60,
      //   intervalSeconds: getIntervalInSeconds(formData.intervalValue, formData.intervalUnit),
      // })
      await sendAsync();
      // console.log("Schedule created successfully:", result)

      // Reset form and close modal
      setFormData({
        scheduleType: "",
        startDate: new Date(),
        endDate: undefined,
        intervalValue: "30",
        intervalUnit: "days",
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating schedule:", error)
      alert("Failed to create schedule. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Disbursement Schedule</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scheduleType">Schedule Type*</Label>
            <Select onValueChange={(value) => handleSelectChange("scheduleType", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select schedule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Recurring (Repeats at regular intervals)</SelectItem>
                <SelectItem value="1">One-time (Single execution)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => handleDateChange("startDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Select end date..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleDateChange("endDate", date)}
                    disabled={(date) => date < (formData.startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">Leave empty for 1 year duration</p>
            </div>
          </div>

          {formData.scheduleType === "0" && (
            <div className="space-y-2">
              <Label htmlFor="interval">Interval* (for recurring schedules)</Label>
              <div className="flex gap-2">
                <Input
                  id="intervalValue"
                  name="intervalValue"
                  type="number"
                  min="1"
                  value={formData.intervalValue}
                  onChange={handleChange}
                  className="flex-1"
                  required
                />
                <Select
                  value={formData.intervalUnit}
                  onValueChange={(value) => handleSelectChange("intervalUnit", value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">How often the schedule should execute</p>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting || !formData.scheduleType || !formData.startDate}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Creating..." : "Create Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
