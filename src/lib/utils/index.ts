import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const round: (info?: string | number) => number = (info) => {
  if (!info) return 0;

  const number = Number(info);

  if (isNaN(number)) return NaN;

  return Math.round(number);
};
