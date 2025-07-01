import type { Character, House } from "./types.ts";

const API_URL = "https://hp-api.onrender.com/api/characters";

// Mapea los datos de la API a nuestro tipo Character
async function fetchAllCharacters(): Promise<Character[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener personajes");

  const data: any[] = await res.json();

  return data.map((c, index) => ({
    id: String(index + 1),
    name: c.name,
    alternate_names: c.alternate_names ?? [],
    species: c.species,
    gender: c.gender,
    house: c.house
      ? {
          name: c.house,
          characters: [], // se rellenará en el resolver
        }
      : null,
  }));
}

export const resolvers = {
  Query: {
    getCharacter: async (_: unknown, { id }: { id: string }): Promise<Character | null> => {
      const characters = await fetchAllCharacters();
      return characters.find((c) => c.id === id) ?? null;
    },

    getCharacters: async (_: unknown, { ids }: { ids?: string[] }): Promise<Character[]> => {
      const characters = await fetchAllCharacters();
      if (!ids || ids.length === 0) return characters;
      return characters.filter((c) => ids.includes(c.id));
    },
  },

  Character: {
    house: async (parent: Character): Promise<House | null> => {
      if (!parent.house) return null;

      const characters = await fetchAllCharacters();
      const houseCharacters = characters.filter(
        (c) => c.house?.name === parent.house?.name,
      );

      return {
        name: parent.house.name,
        characters: houseCharacters,
      };
    },
  },

  House: {
    characters: async (parent: House): Promise<Character[]> => {
      const characters = await fetchAllCharacters();
      return characters.filter((c) => c.house?.name === parent.name);
    },
  },
};
