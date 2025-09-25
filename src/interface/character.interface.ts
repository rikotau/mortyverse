import { Gender, Status } from "@/enum";

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface LocationInfo {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersData {
  info: Info;
  results: Character[];
}
