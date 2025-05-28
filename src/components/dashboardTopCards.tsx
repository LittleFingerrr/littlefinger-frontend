import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Users, Wallet } from "lucide-react"

type DashboardTopCardsProps = {
    vaultBalance: any,
    nextPayoutDate: string,
    activeMembers: number
}

export function DashboardTopCards({ vaultBalance, nextPayoutDate, activeMembers }: DashboardTopCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Vault Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">{vaultBalance}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payout Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">{nextPayoutDate ? `${nextPayoutDate}`: "No schedules Set"}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{""}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">{activeMembers}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}