// components/ActiveSchedulesTable.tsx
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

interface Schedule {
  name: string;
  type: string;
  interval: string;
  nextRun: string;
  status: string;
}

interface ActiveSchedulesTableProps {
  schedules: Schedule[];
}

const ActiveSchedulesTable: React.FC<ActiveSchedulesTableProps> = ({ schedules }) => {
  return (
    <Card 
      className="relative border-none rounded-lg p-6 mb-8 overflow-hidden"
      style={{ backgroundColor: "#131313A6" }}
    >
      {/* Glow effects */}
      <div
        className="absolute top-[-80px] left-[45%] transform -translate-x-1/2 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)",
          filter: "blur(25px)",
          opacity: 0.6,
          zIndex: 1
        }}
      />
      <div
        className="absolute top-[-50px] right-[-25px] w-28 h-28 rounded-full"
        style={{
          background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: 0.5,
          zIndex: 1
        }}
      />
      
      <CardHeader className="p-0 mb-4 relative z-10">
        <CardTitle className="text-2xl font-extrabold font-lato text-white">
          Active Schedules
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative z-10">
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Schedule Name
              </TableHead>
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Type
              </TableHead>
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Interval
              </TableHead>
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Next Run
              </TableHead>
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Status
              </TableHead>
              <TableHead
                className="text-dark-text-muted"
                style={{ color: "#A0A0A0" }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule, index) => (
              <TableRow
                key={index}
                className="border-none hover:bg-transparent transition-none"
              >
                <TableCell className="font-medium text-white">
                  {schedule.name}
                </TableCell>
                <TableCell
                  className="text-dark-text-muted"
                  style={{ color: "#A0A0A0" }}
                >
                  {schedule.type}
                </TableCell>
                <TableCell
                  className="text-dark-text-muted"
                  style={{ color: "#A0A0A0" }}
                >
                  {schedule.interval}
                </TableCell>
                <TableCell
                  className="text-dark-text-muted"
                  style={{ color: "#A0A0A0" }}
                >
                  {schedule.nextRun}
                </TableCell>
                <TableCell
                  className="text-dark-text-muted"
                  style={{ color: "#A0A0A0" }}
                >
                  {schedule.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto transition-none"
                    style={{ color: "rgba(150, 118, 35, 1)" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActiveSchedulesTable;