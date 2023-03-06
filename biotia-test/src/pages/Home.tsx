import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {  SingleValue } from "react-select";
import { useSearchParams } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import { Filters } from "../components/layout/Filters";
import { PokemonList } from "../components/PokemonList";

import { usePokemonByType } from "../lib/usePokemonByType";
import { usePokemonTypes } from "../lib/usePokemonTypes";
import { useLocalStorageState } from "../lib/helpers/useLocalStorageState";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<string>("normal");
  const [pokemonName, setPokemonName] = useState<string>();
  const [catched, setCatched] = useState<boolean>(false);

  const [catchedPokemons] = useLocalStorageState<string[]>("catchedPokemons");

  // Get the value of parameters
  const typeParam = searchParams.get("type");

  const nameParam = searchParams.get("name");

  const checkedParam = searchParams.get("catched");

  const { data } = usePokemonTypes();

  const pokemonsData = usePokemonByType(type);

  const handleSelectChange = (
    newValue: SingleValue<{ name: string; url: string }>
  ) => {
    setType(newValue?.name || "");
    updateSearchParams("type", newValue?.name || "");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
    updateSearchParams("name", e.target.value, pokemonName !== "");
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCatched(e.target.checked);
    updateSearchParams("catched", e.target.checked.toString());
  };

  const updateSearchParams = (
    key: string,
    value: string,
    removeIfEmpty = false
  ) => {
    if (value === "" && removeIfEmpty) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (typeParam) {
      setType(typeParam);
    }
    if (nameParam) {
      setPokemonName(nameParam);
    }
    if (checkedParam) {
      setCatched(JSON.parse(checkedParam));
    }
  }, []);

  const filterPokemons = useMemo(() => {
    let filteredPokemons = pokemonsData.data;
    if (pokemonName) {
      filteredPokemons = filteredPokemons?.filter((pokemon) =>
        pokemon.name.includes(pokemonName)
      );
    }
    if (catched  && catchedPokemons && catchedPokemons.length > 0) {
      filteredPokemons = filteredPokemons?.filter((pokemon) =>
        catchedPokemons.includes(pokemon.name)
      );
    }
    return filteredPokemons;
  }, [pokemonsData.data, catched, pokemonName]);

  return (
    <Layout>
      <Filters
        pokemonTypes={data}
        type={type}
        catched={catched}
        pokemonName={pokemonName}
        handleSelectChange={handleSelectChange}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <PokemonList
        loading={pokemonsData.isLoading}
        error={pokemonsData.error}
        pokemonsData={filterPokemons}
      />
    </Layout>
  );
};
