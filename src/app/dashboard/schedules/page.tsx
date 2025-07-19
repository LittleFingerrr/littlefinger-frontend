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
import { LITTLEFINGER_FACTORY_ADDRESS, SAMPLE_VAULT_ADDRESS } from "@/lib/constants"
import { COREABI } from "@/lib/abi/core-abi"
import { contractAddressToHex, timeStampToDate } from "@/lib/utils"
import { BigNumberish, CairoCustomEnum, CairoOption } from "starknet"

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

  const safeDisbursementSchedules = Array.isArray(disbursementSchedules) ? disbursementSchedules : [];
  console.log(safeDisbursementSchedules)

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

  console.log(currentDisbursementSchedule)

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

  const parsedSchedules = safeDisbursementSchedules.map((schedule) => {
    const id = schedule?.schedule_id;
    const interval = Number(schedule?.interval);
    const start_timestamp = Number(schedule?.start_timestamp) * 1000;
    const end_timestamp = Number(schedule?.end_timestamp) * 1000;
    const status = (schedule?.status as CairoCustomEnum)?.activeVariant();
    const schedule_type = (schedule?.schedule_type as CairoCustomEnum)?.activeVariant();
    const last_execution = (schedule?.last_execution as CairoOption<BigNumberish>).unwrap() || 0;
    console.log("last execution: ", last_execution);
    console.log("schedule_type: ", schedule_type);
    console.log("status: ", status);
    return {
      id,
      name: `Schedule ${id}`,
      type: schedule_type,
      interval: `${Math.floor(interval / 86400)} Days`,
      nextRun: Number(last_execution) + interval,
      status,
    }
  })

  console.log(parsedSchedules)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Disbursement Schedules</h1>

        {contractAddressToHex(SAMPLE_VAULT_ADDRESS) ? (
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
                    <div className="text-2xl font-bold">{new Date(Number(currentDisbursementSchedule?.start_timestamp) *1000 + Number(currentDisbursementSchedule?.interval)).toDateString()}</div>
                    <p className="text-sm text-muted-foreground">in {Math.floor(Number(currentDisbursementSchedule?.interval) * 1000 / 86400)} days</p>
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
                    <div className="text-2xl font-bold">{Math.floor(Number(currentDisbursementSchedule?.last_execution)) || "Never"} days</div>
                    <p className="text-sm text-muted-foreground">{0} distributed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        ) : (
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
              {parsedSchedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                  <TableCell>{schedule.interval}</TableCell>
                  <TableCell>{schedule.nextRun}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        (schedule.status as string).toLocaleLowerCase === ("Active").toLocaleLowerCase ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
