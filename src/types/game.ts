export type Locale = "zh" | "en";

export type VolatilityLevel = 1 | 2 | 3 | 4 | 5;

export type Game = {
  id: string;
  genre: string[];
  hitRate: number;
  volatility: number;
  rtp: number;
  boardSize: string;
  lineMechanic: string;
  tags: string[];
};
