import { ChangeEvent } from "react";
import { ActionMeta, SingleValue } from "react-select";

import { PokemonType } from "../../lib/api/Pokemon/Pokemon";
import { Select } from "../shared/Select";

interface Props {
  pokemonTypes: PokemonType | undefined;
  type: string | undefined;
  catched: boolean;
  pokemonName: string | undefined;
  handleSelectChange: (
    newValue: SingleValue<{ name: string; url: string }>,
    actionMeta: ActionMeta<{ name: string; url: string }>
  ) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Filters = (props: Props) => {
  const {
    type,
    pokemonTypes,
    catched,
    pokemonName,
    handleCheckboxChange,
    handleInputChange,
    handleSelectChange,
  } = props;
  return (
    <div className="flex items-center gap-6 m-8">
      <Select
        value={pokemonTypes?.results.find((t) => t.name === type)}
        handleOnChange={handleSelectChange}
        className="min-w-[200px]"
        options={pokemonTypes?.results}
        isSearchable={false}
      />

      <div className="relative">
        <input
          value={pokemonName || ""}
          onChange={handleInputChange}
          type="text"
          className="w-full py-2 px-4 pr-8 border border-gray-300 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline-gray focus:border-gray-400"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center">
        <input
          onChange={handleCheckboxChange}
          checked={catched}
          type="checkbox"
          className="form-checkbox h-4 w-4 text-sky-400 transition duration-150 ease-in-out"
        />
        <span className="ml-2 text-gray-700 font-medium">Catched</span>
      </div>
    </div>
  );
};
