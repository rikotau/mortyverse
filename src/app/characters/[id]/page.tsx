"use client";

import { detailCharacterQueryKey, getDetailCharacter } from "@/configs";
import { Character } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";

const DetailCharacterPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, error, isLoading, isError } = useQuery<Character>({
    queryKey: detailCharacterQueryKey(id),
    queryFn: () => getDetailCharacter(id),
    enabled: !!id, // run query when params has id
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-center">Character not found.</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Image
        src={data.image}
        alt={data.name}
        width={300}
        height={300}
        className="rounded-2xl shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{data.name}</h1>
      <p className="text-lg text-gray-700">
        {data.status} - {data.species}
      </p>
      <p className="text-gray-600">Gender: {data.gender}</p>
      <p className="text-gray-600">Origin: {data.origin?.name}</p>
      <p className="text-gray-600">Location: {data.location?.name}</p>
    </div>
  );
};

export default DetailCharacterPage;
