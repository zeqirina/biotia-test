import { useNavigate, useParams } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import LoadingSpinner from "../components/LoadingSpinner";

import { usePokemon } from "../lib/usePokemon";
import { useLocalStorageState } from "../lib/helpers/useLocalStorageState";

export const Pokemon = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = usePokemon(name || "", {
    enabled: Boolean(name),
  });

  const [catched, setCatched] = useLocalStorageState<string[]>(
    "catchedPokemons",
    []
  );

  const handleCatchRelease = () => {
    if (!data?.name) return;
    if (catched.includes(data.name)) {
      // Remove from local storage
      setCatched((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite !== data.name)
      );
    } else {
      // Add to local storage
      setCatched((prevFavorites) => [...prevFavorites, data.name]);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Layout>
      <>
        <button
          className="m-6 ml-auto bg-indigo-500 hover:bg-indgo-700 w-20 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className="m-auto flex flex-col md:flex-row w-full  items-center justify-evenly">
          <div className="md:flex-shrink-0 rounded-full bg-white p-10">
            <img
              className="h-96 max-w-md "
              src={data?.sprites?.other?.dream_world?.front_default}
              alt={name}
            />
          </div>
          <div>
            <div className="uppercase tracking-wide my-4 text-3xl text-indigo-500 font-semibold">
              {name}
            </div>
            <div className="">
              <p className="mt-2 text-gray-500">
                Type:{" "}
                {data?.types.map((type: any) => type.type.name).join(", ")}
              </p>
              <p className="mt-2 text-gray-500">Height: {data?.height}</p>
              <p className="mt-2 text-gray-500">Weight: {data?.weight}</p>
              <p className="mt-2 text-gray-500">
                Abilities:{" "}
                {data?.abilities.map((ability) => {
                  if (ability.is_hidden) return ability.ability.name;
                })}
              </p>
            </div>
            <button
              onClick={handleCatchRelease}
              className="rounded-2xl bg-indigo-600 my-4 px-4 py-3"
            >
              {catched.includes(data?.name || "") ? "Release" : "Catch"}
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};
