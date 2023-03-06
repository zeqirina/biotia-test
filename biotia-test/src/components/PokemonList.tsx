import { PokemonDetails } from "../lib/api/Pokemon/Pokemon";
import { useLocalStorageState } from "../lib/helpers/useLocalStorageState";
import LoadingSpinner from "./LoadingSpinner";
import { PokemonCard } from "./PokemonCard";

interface Props {
  loading: boolean;
  error: unknown;
  pokemonsData: PokemonDetails[] | undefined;
}

export const PokemonList = (props: Props) => {
  const [catchedPokemons] = useLocalStorageState<string[]>("catchedPokemons");

  if (props.loading) {
    return <LoadingSpinner />;
  }

  if (props.error) {
    return <div>Error: </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-7">
      {props.pokemonsData && props.pokemonsData?.length > 0 ? (
        props.pokemonsData?.map((pokemon) => (
          <PokemonCard
            catched={catchedPokemons?.includes(pokemon.name)}
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};
