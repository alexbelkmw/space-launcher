import { AsteroidChart } from "@/components/AsteroidChart";
import { AsteroidList } from "@/components/AsteroidList";
import { PageLayout } from "@/components/PageLayout";
import { getAsteroids } from "@/lib/api/nasa";

export const revalidate = 86400;

export default async function Asteroids() {
  const result = await getAsteroids({});

  return (
    <PageLayout title="Asteroids">
      <AsteroidList asteroids={result.asteroids} />
      <AsteroidChart asteroids={result.asteroids} />
    </PageLayout>
  );
}
