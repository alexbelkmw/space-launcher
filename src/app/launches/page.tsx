import { LaunchList } from "@/components/LaunchList";
import { getLaunches } from "@/lib/api/tsd";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Launches",
  };
}

export default async function Launches() {
  const { results } = await getLaunches({ limit: "100" });

  return (
    <div className="max-w-200 mx-auto h-full flex flex-col">
      <h1 className="text-center text-3xl my-3">Launches</h1>
      <LaunchList launches={results} />
    </div>
  );
}
