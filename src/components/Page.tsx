"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  data: unknown;
}

export default function NasaClientView({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      // Заставляет Next.js заново запустить серверный компонент
      router.refresh();
    });
  };

  return (
    <div style={{ opacity: isPending ? 0.5 : 1 }}>
      <button onClick={handleRefresh} disabled={isPending}>
        {isPending ? "Обновление..." : "Запросить новые данные"}
      </button>

      {/* Отображение актуальных данных */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
