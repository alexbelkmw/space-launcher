import NasaClientView from "@/components/Page";
import { getApod, getAsteroids } from "@/lib/api/nasa";
import { getLaunches } from "@/lib/api/tsd";

export default async function Home() {
  // const result = await getLaunches({}).then((res) => res);
  // const result = await getApod({}).then((res) => res);
  const result = await getAsteroids({}).then((res) => res);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <NasaClientView data={result} />
      </main>
    </div>
  );
}
