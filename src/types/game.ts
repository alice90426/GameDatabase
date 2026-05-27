export type Locale = "zh" | "en";

export type VolatilityLevel = 1 | 2 | 3 | 4 | 5;

export type Game = {
  id: string;
  genre: string[];
  rtp: number;
  hitRate: number;
  maxWin: number;
  volatility: number;
  boardSize: string;
  lineMechanic: string;
  demoUrl?: string;
  tags: string[];
};
