import { Spinner } from "@/components/Spinner";

export default async function LoadingAPOD() {
  return (
    <div className="w-full h-full grow flex items-center justify-center">
      <Spinner />
    </div>
  );
}
