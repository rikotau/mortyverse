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
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SearchBar } from "./SearchCharacter";

const CharacterPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  // Normal Pagination Query (when no search)
  const { data, error, isLoading, isError } = useQuery({
    queryKey: charactersQueryKey({ page }),
    queryFn: () => fetchCharacters({ page }),
    enabled: search === "",
  });

  // Infinite Query (when search active)
  const {
    data: searchData,
    error: searchErr,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: searchLoading,
    isError: searchError,
  } = useInfiniteQuery({
    queryKey: ["characters-search", search],
    queryFn: ({ pageParam = 1 }) =>
      fetchCharacters({ page: pageParam, name: search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.info?.next) return undefined;
      return Number(new URL(lastPage.info.next).searchParams.get("page"));
    },
    enabled: search.trim() !== "",
  });

  // Intersection Observer for infinite scroll

  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreCallbackRef = (node: HTMLDivElement | null) => {
    // Hentikan pengamatan observer yang sudah ada jika ada
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!node || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );
    observer.observe(node);
    observerRef.current = observer;
  };

  const totalPages = data?.info?.pages ?? 1;
  const characterResults =
    search !== ""
      ? (searchData?.pages.flatMap((p) => p.results) ?? [])
      : (data?.results ?? []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8">
          🧑‍🚀 Characters Explorer
        </h1>

        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />

        {/* Counter Info */}
        {search !== "" ? (
          <p className="text-center text-sm text-gray-600 mt-2">
            {searchData?.pages?.[0]?.info?.count
              ? `${searchData.pages[0].info.count} characters found`
              : "No characters found"}
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-2">
            {data?.info?.count
              ? `${data.info.count} total characters`
              : "No characters available"}
          </p>
        )}

        {/* Pagination buttons only when not searching */}
        {search === "" && (
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

        {/* Loading State */}
        {(isLoading || searchLoading) && (
          <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <span className="animate-pulse text-gray-600">Loading...</span>
          </div>
        )}

        {/* Error State */}
        {(isError || searchError) && (
          <div className="text-red-500 text-center my-4">
            Failed to load: {(error ?? searchErr)?.message}
          </div>
        )}

        {/* Characters List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {characterResults.map((character: Character) => (
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

        {/* Infinite Scroll Trigger */}
        {search !== "" && hasNextPage && (
          <div
            ref={loadMoreCallbackRef}
            className="h-10 flex items-center justify-center"
          >
            {isFetchingNextPage && <span>Loading more...</span>}
          </div>
        )}
      </main>
    </div>
  );
};

export default CharacterPage;
