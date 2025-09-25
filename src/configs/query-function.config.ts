import { CharactersData, Character } from "@/interface";
import { AxiosResponse } from "axios";
import { api } from "./axios.config";

// Fetch list characters (with pagination)
export const fetchCharacters = async ({
  page = 1,
  name,
}: { page?: number; name?: string } = {}): Promise<CharactersData> => {
  const res: AxiosResponse<CharactersData> = await api.get("/character", {
    params: { page, name },
  });
  return res.data;
};

// Query key for characters list
export const charactersQueryKey = ({
  page,
  name,
}: {
  page?: number;
  name?: number;
}) => ["characters", page, name];

// Fetch single character by ID
export const getDetailCharacter = async (
  id: string | number,
): Promise<Character> => {
  const res: AxiosResponse<Character> = await api.get(`/character/${id}`);
  return res.data;
};

// Query key for single character
export const detailCharacterQueryKey = (id: string | number) => [
  "character",
  id,
];
