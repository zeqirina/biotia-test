import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import { handleError } from "./helpers/handleError";
import { PokemonDetails } from "./api/Pokemon/Pokemon";
import { getPokemon } from "./api/Pokemon/Pokemon.client";

export const usePokemon = (
  name: string,
  options?: UseQueryOptions<PokemonDetails, AxiosError>
) => {
  return useQuery<PokemonDetails, AxiosError>(
    ["pokemon", name],
    () => getPokemon(name),
    {
      onError: (e) => {
        const error = handleError(e);
        toast.error(error);
      },
      ...options,
    }
  );
};
