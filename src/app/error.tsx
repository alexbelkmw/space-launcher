"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center text-[#D800A6]">
      <h2>Something went wrong!</h2>
      <Button
        variant="destructive"
        className="bg-[#CCFF00] text-[#D800A6] mt-4"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
