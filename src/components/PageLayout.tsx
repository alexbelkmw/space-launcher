import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
}
export const PageLayout = ({ title, children }: Props) => {
  return (
    <div className="px-3 max-w-200 mx-auto h-full flex flex-col">
      <h1 className="text-center text-white text-3xl font-bold my-3">
        {title}
      </h1>
      {children}
    </div>
  );
};
