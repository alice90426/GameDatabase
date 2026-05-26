import type { VolatilityLevel } from "@/types/game";

export function getVolatilityLevel(value: number): VolatilityLevel {
  if (value < 6) return 1;
  if (value <= 7) return 2;
  if (value <= 9) return 3;
  if (value <= 11) return 4;
  return 5;
}
