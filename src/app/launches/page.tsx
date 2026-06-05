import { LaunchList } from "@/components/LaunchList";
import { PageLayout } from "@/components/PageLayout";
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
    <PageLayout title="Launches">
      <LaunchList launches={results} />
    </PageLayout>
  );
}
