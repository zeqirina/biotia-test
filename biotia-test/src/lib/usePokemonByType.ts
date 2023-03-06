import { useQuery, UseQueryOptions } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { getPokemonByType } from "./api/Pokemon/Pokemon.client";
import { PokemonDetails } from "./api/Pokemon/Pokemon";
import { handleError } from "./helpers/handleError";

export const usePokemonByType = (
  type: string,
  options?: UseQueryOptions<any[], unknown>
) => {
  const queryKey = ["pokemonByType", type];

  const fetchPokemonData = async () => {
    const pokemonResponse = await getPokemonByType(type);

    const pokemonData = pokemonResponse.pokemon;

    const pokemonDetails: AxiosResponse<PokemonDetails, AxiosError>[] =
      await Promise.all(
        pokemonData.map((pokemon) => axios.get(pokemon.pokemon.url))
      );

    const allPokemon = pokemonDetails.map((response) => response.data);

    return allPokemon;
  };

  return useQuery<PokemonDetails[], unknown>({
    queryKey,
    queryFn: fetchPokemonData,
    keepPreviousData: true,
    onError: (e) => {
      const error = handleError(e);
      toast.error(error);
    },
    ...options,
  });
};
