export interface PokemonType {
  count: number;
  next: null;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemons {
  pokemon: { name: string; url: string };
  slot: number;
}

export interface PokemonByType {
  damage_relations: {}[];
  game_indices: {}[];
  generation: {}[];
  id: number;
  move_damage_class: {}[];
  moves: {}[];
  name: string;
  names: {}[];
  past_damage_relations: {}[];
  pokemon: Pokemons[];
}

export interface PokemonDetails {
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: [{}];
  game_indices: [{}];
  height: number;
  weight: string;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {}[];
  name: string;
  order: 1;
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: [];
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
}
