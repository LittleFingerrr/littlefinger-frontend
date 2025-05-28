"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, CheckCircle2, Plus } from "lucide-react"
import { CreateScheduleModal } from "@/components/create-schedule-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAccount, useContract, useReadContract } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { COREABI } from "@/lib/abi/core-abi"
import { contractAddressToHex, timeStampToDate } from "@/lib/utils"
import { CairoCustomEnum, CairoOption } from "starknet"

export default function SchedulesPage() {
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false)

  // Mock data for schedules
  const nextScheduled = {
    date: "May 31, 2024",
    daysRemaining: 10,
  }

  const lastCompleted = {
    date: "April 15, 2024",
    amount: "$18,700.00",
  }

  const { address: user } = useAccount()

  const { data: ContractAddresses } = useReadContract(
    user ? {
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: [user!]
  }: ({} as any))

  const {
    data: disbursementSchedules, isLoading: isLoadingDisbursementSchedules
  } = useReadContract(
    user ? {
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
    functionName: "get_disbursement_schedules",
    args: [],
    watch: true,
  }: ({} as any))

  console.log(disbursementSchedules)

  const {
    data: currentDisbursementSchedule, isLoading: isLoadingCurrentDisbursementSchedule
  } = useReadContract(
  user? {
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
    functionName: "get_current_schedule",
    args: [],
    watch: true,
  } : ({} as any))

  currentDisbursementSchedule && console.log(currentDisbursementSchedule)

  const formattedDisbursementSchedule = () => {
    if (!currentDisbursementSchedule) return

    const endTimestamp = timeStampToDate(Number(currentDisbursementSchedule?.end_timestamp?.toString()));
    const interval = Number(currentDisbursementSchedule?.interval) / 86400;
    const now = Date.now();
    // @ts-expect-error CairoOption problem
    const lastExecution: CairoOption<number> = currentDisbursementSchedule?.last_execution;
    const returnedLastExecution: number = lastExecution.Some || 0;
    const scheduleId = Number(currentDisbursementSchedule?.schedule_id);
    // @ts-expect-error CairoEnumProblem
    const scheduleType: CairoCustomEnum = currentDisbursementSchedule?.schedule_type;
    const returnedScheduleType = scheduleType?.activeVariant();
    const startTimestamp = timeStampToDate(Number(currentDisbursementSchedule?.start_timestamp?.toString()));
    let nextDate: Date | null = null;
    if (returnedLastExecution > 0) {
      nextDate = new Date(returnedLastExecution + (Number(currentDisbursementSchedule?.interval) * 1000));
    } else {
      nextDate = new Date(startTimestamp);
    }

    // Ensure next date doesn't exceed end timestamp
    if (nextDate.getTime() > Number(endTimestamp)) {
      nextDate = null;
    }
    // @ts-expect-error CairoEnum Problem
    const status: CairoCustomEnum = currentDisbursementSchedule?.status;
    const returnedStatus = status?.activeVariant();

    return {
      scheduleId, returnedScheduleType, startTimestamp, endTimestamp, interval, returnedLastExecution, returnedStatus, nextDate,
      daysRemaining: nextDate ? 
      Math.ceil((nextDate.getTime() - now) / (1000 * 60 * 60 * 24)) : 
      0,
    }
  }

  console.log(formattedDisbursementSchedule());

  const activeSchedules = [
    { id: 1, name: "Monthly Payroll", type: "Fixed", interval: "30 days", nextRun: "May 31, 2024", status: "Active" },
    {
      id: 2,
      name: "Quarterly Bonus",
      type: "Variable",
      interval: "90 days",
      nextRun: "Jun 30, 2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Project Milestone",
      type: "Variable",
      interval: "45 days",
      nextRun: "Jul 15, 2024",
      status: "Paused",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Disbursement Schedules</h1>

        { formattedDisbursementSchedule() ? (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Scheduled Disbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{(formattedDisbursementSchedule()?.nextDate)?.toDateString()}</div>
                    <p className="text-sm text-muted-foreground">in {formattedDisbursementSchedule()?.daysRemaining} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Last Disbursement Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formattedDisbursementSchedule()?.returnedLastExecution == 0 ? 'Never' : formattedDisbursementSchedule()?.returnedLastExecution}</div>
                    <p className="text-sm text-muted-foreground">{0} distributed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        ): (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Scheduled Disbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{nextScheduled.date}</div>
                    <p className="text-sm text-muted-foreground">in {nextScheduled.daysRemaining} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Last Disbursement Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{lastCompleted.date}</div>
                    <p className="text-sm text-muted-foreground">{lastCompleted.amount} distributed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        )}

      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setIsCreateScheduleOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Create Disbursement Schedule
        </Button>
        <Button variant="outline">Retry Failed</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Active Schedules</h2>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Schedule Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Interval</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                  <TableCell>{schedule.interval}</TableCell>
                  <TableCell>{schedule.nextRun}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        schedule.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Failed Disbursements</h2>

        <Alert className="bg-red-50 border-red-200">
          <AlertTitle className="text-red-800">1 failed transaction(s) pending retry</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span className="text-red-700">Please review and retry these transactions</span>
            <Button variant="outline" size="sm" className="border-red-300 text-red-700">
              View Details
            </Button>
          </AlertDescription>
        </Alert>
      </div>

      <CreateScheduleModal open={isCreateScheduleOpen} onOpenChange={setIsCreateScheduleOpen} />
    </div>
  )
}
