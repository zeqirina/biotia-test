import { Link } from "react-router-dom";
import { PokemonDetails } from "../lib/api/Pokemon/Pokemon";

interface Props {
  catched?: boolean;
  key: number;
  pokemon: PokemonDetails;
}

export const PokemonCard = (props: Props) => {
  const { name, sprites, types, height, weight, abilities } = props.pokemon;
  const { catched } = props;
  return (
    <Link to={`pokemon/${name}`}>
      <div
        className={`max-w-md h-72 mx-auto bg-white border-2 flex items-center gap-2 p-3 ${
          catched && "border-indigo-400"
        } rounded-xl drop-shadow-lg overflow-hidden`}
      >
        <div className="flex-shrink-0 my-auto">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={sprites.other["official-artwork"].front_default}
            alt={name}
          />
        </div>
        <div className="">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {name}
          </div>
          <p className="mt-2 text-gray-500">
            Type: {types.map((type) => type.type.name).join(", ")}
          </p>
          <p className="mt-2 text-gray-500">Height: {height}m</p>
          <p className="mt-2 text-gray-500">Weight: {weight}kg</p>
          <p className="mt-2 text-gray-500">
            Abilities:
            {abilities.map((ability) => {
              if (ability.is_hidden) return ability.ability.name;
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};
