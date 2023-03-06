import { apiRequest } from "../Api";
import { PokemonByType, PokemonDetails, PokemonType } from "./Pokemon";

export const getPokemonTypes = async () => {
  return apiRequest<null, PokemonType>("get", "type");
};

export const getPokemonByType = async (type: string) =>
  apiRequest<null, PokemonByType>("get", `type/${type}`);

export const getPokemon = async (name: string) =>
  apiRequest<null, PokemonDetails>("get", `pokemon/${name}`);
