"use client";

import { SearchBar } from "@/app/characters/SearchCharacter";

export default function Characters() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Content */}
      <main className="flex-1 px-6 py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8">
          🧑‍🚀 Characters Explorer
        </h1>
        <SearchBar />

        {/* Placeholder until data fetching */}
        <div className="text-center text-white/70 mt-5">
          Character list will appear here. 🚀
        </div>
      </main>
    </div>
  );
}
