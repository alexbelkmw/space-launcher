"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type Launch } from "@/lib/schemas/launches";
import { formatIsoDate } from "@/lib/utils/dateFormat";
import { LaunchCard } from "./LaunchCard";

export const LaunchList = ({ launches }: { launches: Launch[] }) => {
  return (
    <Table className="table-fixed ">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Window Start</TableHead>
          <TableHead className="text-center">Window End</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {launches.map((launch) => {
          return (
            <Dialog key={launch.id}>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                  <TableCell>{launch.name}</TableCell>
                  <TableCell>{formatIsoDate(launch.last_updated)}</TableCell>
                  <TableCell>{launch.status.name}</TableCell>
                  <TableCell>{formatIsoDate(launch.window_start)}</TableCell>
                  <TableCell className="text-right">
                    {formatIsoDate(launch.window_end)}
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <LaunchCard launch={launch} />
            </Dialog>
          );
        })}
      </TableBody>
    </Table>
  );
};
