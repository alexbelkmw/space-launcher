// import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center text-[#D800A6]">
      <h2 className="mb-3">404 - Page not found</h2>
      <Link className="bg-[#CCFF00] text-[#D800A6] p-2" href="/">
        Return to Home
      </Link>
    </div>
  );
}
