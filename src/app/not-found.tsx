"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <Image
        src="/rick-404.png"
        alt="Rick & Morty Lost"
        width={300}
        height={300}
        className="mb-6 drop-shadow-xl"
        priority
      />

      <h1 className="text-4xl md:text-6xl font-bold text-[#97CE4C] drop-shadow-md">
        404 – You’re Lost in the Multiverse! 🌀
      </h1>

      <p className="mt-4 text-white/80 max-w-lg leading-relaxed">
        Seems like you just jumped to an unknown dimension... Don’t worry, Rick
        will guide you back. 🚀
      </p>

      <div className="mt-8 flex gap-4">
        {/* Back to Home */}
        <Button
          asChild
          className="text-lg hover:scale-105 transition-transform duration-300"
        >
          <Link href="/">Back to Home</Link>
        </Button>

        {/* Navigate Back */}
        <Button
          variant="secondary"
          className="text-lg hover:scale-105 transition-transform duration-300"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </main>
  );
}
