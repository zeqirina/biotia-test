import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import { handleError } from "./helpers/handleError";
import { PokemonType } from "./api/Pokemon/Pokemon";
import { getPokemonTypes } from "./api/Pokemon/Pokemon.client";

export const usePokemonTypes = (
  options?: UseQueryOptions<PokemonType, AxiosError>
) => {
  return useQuery<PokemonType, AxiosError>("pokemonTypes", getPokemonTypes, {
    onError: (e) => {
      const error = handleError(e);
      toast.error(error);
    },
    ...options,
  });
};
