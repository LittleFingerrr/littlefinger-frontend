"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import DisbursementCard from "@/components/DisbursementCard";
import ActiveSchedulesTable from "@/components/ActiveSchedulesTable";
import { useContractPair } from "../ContractPairContext"; // Adjust path as needed

interface Schedule {
  name: string;
  type: string;
  interval: string;
  nextRun: string;
  status: string;
}

const SchedulePage: React.FC = () => {
  const { contractPair, isLoading, error, refetch } = useContractPair();
  
  const activeSchedules: Schedule[] = [
    {
      name: "Monthly Payroll",
      type: "Fixed",
      interval: "30 days",
      nextRun: "May 31, 2024",
      status: "Active",
    },
    {
      name: "Quarterly Bonus",
      type: "Variable",
      interval: "90 days",
      nextRun: "May 31, 2024",
      status: "Active",
    },
    {
      name: "Project Milestone",
      type: "Variable",
      interval: "45 days",
      nextRun: "May 31, 2024",
      status: "Paused",
    },
  ];

  const handleCreateSchedule = () => {
    // You now have access to contract addresses for blockchain interactions
    console.log("Vault Address:", contractPair.vaultAddress);
    console.log("Org Core Address:", contractPair.orgCoreAddress);
    
    // Implement your create schedule logic here
    // This could involve calling smart contract functions
  };

  const handleRetryFailed = () => {
    console.log("Retrying with contracts:", contractPair);
    
    // Implement retry logic here
  };

  return (
    <div className="p-10 text-white">
      <div className="mb-4 p-4 bg-gray-800 rounded-lg text-xs">
        <p><strong>Debug Info:</strong></p>
        <p>Vault: {contractPair.vaultAddress || "Not loaded"}</p>
        <p>OrgCore: {contractPair.orgCoreAddress || "Not loaded"}</p>
        <p>Loading: {isLoading ? "Yes" : "No"}</p>
        <p>Error: {error || "None"}</p>
      </div>

      {/* Disbursement Cards */}
      <div className="grid md:grid-cols-2 gap-10 mb-8">
        <DisbursementCard
          title="Next Scheduled Disbursement"
          mainText="May 31, 2024"
          subText="in 10 days"
          iconSrc="/images/calendar-icon.png"
          iconAlt="Calendar Icon"
          backgroundColor="#131313A6"
        />

        <DisbursementCard
          title="Last Disbursement Completed"
          mainText="April 15, 2024"
          subText="$18,700.00 distributed"
          iconSrc="/images/checkmark-circle-icon.png"
          iconAlt="Checkmark Icon"
          backgroundColor="#131313A6"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <Button
          onClick={handleCreateSchedule}
          className="text-white w-[238px] h-[36px] rounded-[61px] flex items-center space-x-2 transition-none"
          style={{ backgroundColor: "rgba(150, 118, 35, 1)" }}
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs font-normal leading-none">
            Create Disbursement Schedule
          </span>
        </Button>
        <Button
          onClick={handleRetryFailed}
          className="text-white w-[160px] h-[36px] rounded-[61px] transition-none"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.13)" }}
        >
          Retry Failed
        </Button>
      </div>
      
      {/* Active Schedules Table */}
      <ActiveSchedulesTable schedules={activeSchedules} />
      
      {/* Failed Disbursement Section */}
      <h2 className="text-xl font-extrabold font-lato text-white mb-4">
        Failed Disbursement
      </h2>
      <Card
        className="rounded-lg p-6 flex justify-between items-center border"
        style={{
          backgroundColor: "rgba(255, 7, 7, 0.04)",
          borderColor: "rgba(253, 0, 0, 1)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div>
          <p
            className="text-xs font-normal leading-none"
            style={{ color: "rgba(255, 179, 180, 1)" }}
          >
            1 failed transaction(s) pending retry
          </p>
          <p
            className="text-xs font-normal leading-none"
            style={{ color: "rgba(255, 179, 180, 1)" }}
          >
            Please review and retry these transactions,
          </p>
        </div>
        <Button
          className="px-6 py-2 w-[168px] h-[38px] rounded-[61px] transition-none backdrop-blur-lg text-xs font-normal leading-none"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            color: "rgba(255, 179, 180, 1)",
          }}
        >
          view details
        </Button>
      </Card>
    </div>
  );
};

export default SchedulePage;