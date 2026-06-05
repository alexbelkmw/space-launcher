"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type NearEarthObject } from "@/lib/schemas/asteroids";
import { cn, round } from "@/lib/utils";
import {
  Calendar,
  Diameter,
  Earth,
  MapPin,
  Skull,
  Telescope,
  Turtle,
} from "lucide-react";
import { LucideIcon } from "./LucideIcon";

export const AsteroidList = ({
  asteroids,
}: {
  asteroids: NearEarthObject[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <LucideIcon icon={<Telescope />} title="Name" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Diameter />} title="Diameter Min, m" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Diameter />} title="Diameter Max, m" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Skull />} title="Hazardous" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Turtle />} title="Speed, km/sec" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Calendar />} title="Closest approach" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<MapPin />} title="Distance" />
          </TableHead>
          <TableHead>
            <LucideIcon icon={<Earth />} title="Orbiting" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {asteroids.map((asteroid) => {
          return (
            <TableRow key={asteroid.id} className="cursor-pointer">
              <TableCell>{asteroid.name}</TableCell>
              <TableCell>
                {round(
                  asteroid.estimated_diameter.meters.estimated_diameter_min,
                )}
              </TableCell>
              <TableCell>
                {round(
                  asteroid.estimated_diameter.meters.estimated_diameter_max,
                )}
              </TableCell>
              <TableCell
                className={cn(
                  "",
                  asteroid.is_potentially_hazardous_asteroid && "text-red-500",
                )}
              >
                {asteroid.is_potentially_hazardous_asteroid.toString()}
              </TableCell>
              <TableCell>
                {round(
                  asteroid.close_approach_data[0]?.relative_velocity
                    .kilometers_per_second,
                )}
              </TableCell>
              <TableCell>
                {asteroid.close_approach_data[0]?.close_approach_date}
              </TableCell>
              <TableCell>
                {round(
                  asteroid.close_approach_data[0]?.miss_distance.kilometers,
                )}
              </TableCell>
              <TableCell>
                {asteroid.close_approach_data[0]?.orbiting_body}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
