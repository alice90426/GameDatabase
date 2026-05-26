import { readFileSync } from "node:fs";

const gamesPath = new URL("../src/data/games.json", import.meta.url);
const games = JSON.parse(readFileSync(gamesPath, "utf8"));

const ranges = {
  rtp: [94, 97],
  hitRate: [10, 42],
  maxWin: [100, 100000],
  volatility: [4, 16]
};
// npm.cmd run validate:data

const errors = [];
const seenIds = new Map();

function gameLabel(game, index) {
  return game && typeof game.id === "string" && game.id.trim().length > 0
    ? game.id
    : `row ${index + 1}`;
}

function checkRange(game, index, field, min, max) {
  const value = game?.[field];
  const label = gameLabel(game, index);

  if (typeof value !== "number" || !Number.isFinite(value)) {
    errors.push(`${label}: ${field} must be a number.`);
    return;
  }

  if (value < min || value > max) {
    errors.push(`${label}: ${field}=${value} is outside ${min}~${max}.`);
  }
}

if (!Array.isArray(games)) {
  errors.push("src/data/games.json must be an array.");
} else {
  games.forEach((game, index) => {
    const id = game?.id;
    const label = gameLabel(game, index);

    if (typeof id !== "string" || id.trim().length === 0) {
      errors.push(`${label}: id is required.`);
    } else if (seenIds.has(id)) {
      errors.push(`${id}: duplicate id, first seen at row ${seenIds.get(id) + 1}.`);
    } else {
      seenIds.set(id, index);
    }

    for (const [field, [min, max]] of Object.entries(ranges)) {
      checkRange(game, index, field, min, max);
    }
  });
}

if (errors.length > 0) {
  console.error(`Game data validation failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Game data validation passed (${games.length} records).`);
