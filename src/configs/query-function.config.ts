import { CharactersData, Character } from "@/interface";
import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import { Gender, Status } from "@/enum";

type CharacterFilters = {
  page?: number;
  name?: string;
  status?: Status;
  gender?: Gender;
};

// Fetch list characters (with pagination)
export const fetchCharacters = async ({
  page = 1,
  name,
  gender,
  status,
}: CharacterFilters = {}): Promise<CharactersData> => {
  const res: AxiosResponse<CharactersData> = await api.get("/character", {
    params: { page, name, gender, status },
  });
  return res.data;
};

// Query key for characters list
export const charactersQueryKey = ({
  page,
  name,
  status,
  gender,
}: CharacterFilters) => ["characters", page, name, status, gender];

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
