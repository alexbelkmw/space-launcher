import { APODParameters, getApod } from "@/lib/api/nasa";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

const getApodCached = cache(async (params: Partial<APODParameters>) =>
  getApod(params),
);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getApodCached({});
  return {
    title: data.title,
    description: data.explanation.slice(0, 160),
  };
}

export const revalidate = 86400;

export default async function APOD() {
  const { title, copyright, media_type, url, explanation } =
    await getApodCached({});

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
          <iframe
            src={url}
            title={title}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <Image src={url} fill alt={title} style={{ objectFit: "cover" }} />
        )}
      </div>
      <div className="my-10 max-w-200 mx-auto overflow-y-auto flex-1">
        {explanation}
      </div>
    </div>
  );
}
