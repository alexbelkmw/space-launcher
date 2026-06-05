import { AsteroidChart } from "@/components/AsteroidChart";
import { AsteroidList } from "@/components/AsteroidList";
import { getAsteroids } from "@/lib/api/nasa";

export const revalidate = 86400;

export default async function Asteroids() {
  const result = await getAsteroids({});

  return (
    <div className="max-w-200 mx-auto h-full flex flex-col">
      <h1 className="text-center text-3xl my-3">Asteroids</h1>
      <AsteroidList asteroids={result.asteroids} />
      <AsteroidChart asteroids={result.asteroids} />
    </div>
  );
}
