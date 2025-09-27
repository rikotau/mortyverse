import React from "react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <header className="w-full bg-black text-white backdrop-blur-md shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:text-[#97CE4C]"
        >
          Mortyverse
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[#97CE4C] transition">
            Home
          </Link>
          <Link href="/characters" className="hover:text-[#97CE4C] transition">
            Characters
          </Link>
          <Link href="/about" className="hover:text-[#97CE4C] transition">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};
