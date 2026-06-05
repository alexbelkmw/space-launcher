import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full min-h-15 bg-[#00D2C4]  shadow-[0_0_20px_rgba(0,240,255,0.7)] hover:shadow-[0_0_35px_rgba(0,240,255,1)] transition-shadow">
      <div className="max-w-200 m-auto flex h-full items-center gap-4 text-[#D800A6] text-xl font-extrabold drop-shadow-[0_0_12px_#FF007F]">
        <Link href={"/apod"}>APOD</Link>
        <Link href={"/asteroids"}>Asteroids</Link>
        <Link href={"/launches"}>Launches</Link>
      </div>
    </header>
  );
};
