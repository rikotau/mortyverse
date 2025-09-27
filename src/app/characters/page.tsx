"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { charactersQueryKey, fetchCharacters } from "@/configs";
import { Character } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchCharacter";
import { Gender, Status } from "@/enum";

const CharacterPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // helper toggle function
  const toggleSelection = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList((prev) => (prev.includes(value) ? [] : [value]));
    setPage(1);
  };

  const filters = {
    gender:
      selectedGenders.length > 0 ? (selectedGenders[0] as Gender) : undefined,
    status:
      selectedStatuses.length > 0 ? (selectedStatuses[0] as Status) : undefined,
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: charactersQueryKey({ page, name: search, ...filters }),
    queryFn: () => fetchCharacters({ page, name: search, ...filters }),
  });

  const totalPages = data?.info?.pages ?? 1;
  const characters = data?.results ?? [];

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20
          transform transition-transform duration-300
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col md:w-56 md:space-y-6 md:p-4
        `}
      >
        {/* Close button untuk mobile */}
        <div className="flex justify-between items-center md:hidden p-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFilterOpen(false)}
          >
            ✕
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(Status).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={
                    selectedStatuses.includes(status) ? "default" : "outline"
                  }
                  onClick={() =>
                    toggleSelection(
                      status,
                      selectedStatuses,
                      setSelectedStatuses,
                    )
                  }
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Gender</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(Gender).map((gender) => (
                <Button
                  key={gender}
                  size="sm"
                  variant={
                    selectedGenders.includes(gender) ? "default" : "outline"
                  }
                  onClick={() =>
                    toggleSelection(gender, selectedGenders, setSelectedGenders)
                  }
                  className="capitalize"
                >
                  {gender}
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSelectedGenders([]);
              setSelectedStatuses([]);
              setPage(1);
            }}
          >
            Reset Filters
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Explore Character of Mortyverse
          </h1>
          <div className="p-4">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <p className="text-center text-sm text-gray-600 mt-2">
            {data?.info?.count
              ? `${data.info.count} characters found`
              : "No characters available"}
          </p>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <span className="animate-pulse text-gray-600">Loading...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-red-500 text-center my-4">
              Failed to load: {error?.message}
            </div>
          )}

          {/* Characters List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {characters.map((character: Character) => (
              <Link key={character.id} href={`/characters/${character.id}`}>
                <Card className="w-full cursor-pointer hover:scale-101 transition-transform">
                  <CardHeader className="flex justify-center">
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={200}
                      height={200}
                      className="rounded-xl"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{character.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      {character.species} — {character.status}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 m-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharacterPage;
