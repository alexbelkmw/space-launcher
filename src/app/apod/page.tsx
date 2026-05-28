import { getApod } from "@/lib/api/nasa";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getApod({});
  return {
    title: data.title,
    description: data.explanation.slice(0, 160),
  };
}

export const revalidate = 86400;

export default async function APOD() {
  const { title, copyright, media_type, url, explanation } = await getApod(
    {},
  ).then((res) => res);

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="text-center space-y-4  shrink-0">
        <h1 className="font-bold text-3xl pt-3">{title}</h1>
        <p className="text-sm text-muted-foreground h-5">
          {copyright && `© ${copyright}`}
        </p>
      </header>
      <div className="max-w-200 left-1/2 -translate-x-1/2 h-3/5 relative overflow-hidden shrink-0">
        {media_type === "video" ? (
          <iframe src={url} title={title} />
        ) : (
          <Image
            src={url}
            fill
            alt={title}
            unoptimized
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="my-10 max-w-200 mx-auto overflow-y-auto flex-1">
        {explanation}
      </div>
    </div>
  );
}
