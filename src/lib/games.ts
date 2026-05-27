import games from "@/data/games.json";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, VolatilityLevel } from "@/types/game";

export const allGames = games as Game[];

export function getFeaturedGames() {
  return allGames.slice(0, 3);
}

export function getGameGenres() {
  return Array.from(new Set(allGames.flatMap((game) => game.genre))).sort();
}

export function getGameTags() {
  return Array.from(new Set(allGames.flatMap((game) => game.tags))).sort();
}

export function getGameLines() {
  return Array.from(new Set(allGames.flatMap((game) => game.lineMechanic))).sort();
}

export function getGameVolatilities() {
  const order: VolatilityLevel[] = [1, 2, 3, 4, 5];
  const values = new Set(
    allGames.map((game) => getVolatilityLevel(game.volatility))
  );

  return order.filter((value) => values.has(value));
}
