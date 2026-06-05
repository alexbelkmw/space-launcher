import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  title?: string;
  className?: string;
}

export const LucideIcon = ({ icon, title, className }: Props) => {
  return (
    <div title={title} className={cn("flex justify-center", className)}>
      {icon}
    </div>
  );
};
