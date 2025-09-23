import { Button } from "@/components/ui";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <main
      className="relative flex flex-col items-center justify-center flex-1 px-6 py-20 text-center bg-cover bg-center animate-fadeIn"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Title */}
        <h1
          className="
            text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg
            transition-transform duration-700 ease-out hover:scale-105
          "
        >
          🌌 Explore The <span className="text-[#97CE4C]">Mortyverse</span>
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-6 text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-lg
            transition-opacity duration-700 delay-200
          "
        >
          Step into the chaotic multiverse of Rick & Morty — discover
          characters, dimensions, and cosmic adventures in one place. 🔮
        </p>

        {/* Call To Action */}
        <Button
          size="lg"
          asChild
          className="
            mt-10 text-lg shadow-xl transition-transform duration-300
            hover:scale-110 hover:shadow-2xl
          "
        >
          <Link href="/characters">Start Exploring 🚀</Link>
        </Button>
      </div>
    </main>
  );
};
