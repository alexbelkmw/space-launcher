import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Launch } from "@/lib/schemas/launches";
import { formatIsoDate } from "@/lib/utils/dateFormat";
import Image from "next/image";

export const LaunchCard = ({ launch }: { launch: Launch }) => {
  return (
    <DialogContent className="flex flex-col items-center bg-[#1C1A27]">
      <DialogHeader>
        <DialogTitle className="text-white">{launch.name}</DialogTitle>
      </DialogHeader>
      <div className="size-60 relative text-white">
        {launch.image ? (
          <Image
            src={launch.image.image_url ?? ""}
            alt={launch.image.name}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <p className="w-full h-full flex items-center justify-center">
            No Image
          </p>
        )}
      </div>
      <div className="w-full px-5 text-white">
        <div className="flex justify-between border-b border-b-gray-200 py-1">
          <p>Start</p>
          {formatIsoDate(launch.window_start)}
        </div>
        <div className="flex justify-between  py-1">
          <p>End</p>
          {formatIsoDate(launch.window_end)}
        </div>
      </div>
    </DialogContent>
  );
};
