"use client";

import { useState } from "react";
import { GameCard } from "@/components/game-card";
import { GameDetailModal } from "@/components/game-detail-modal";
import type { Game, Locale } from "@/types/game";

export function FeaturedGames({
  games,
  locale
}: {
  games: Game[];
  locale: Locale;
}) {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const selectedIndex = games.findIndex((game) => game.id === selectedGameId);
  const selectedGame = selectedIndex >= 0 ? games[selectedIndex] : null;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            locale={locale}
            onOpen={() => setSelectedGameId(game.id)}
          />
        ))}
      </div>

      {selectedGame ? (
        <GameDetailModal
          game={selectedGame}
          locale={locale}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < games.length - 1}
          onClose={() => setSelectedGameId(null)}
          onPrevious={() => setSelectedGameId(games[selectedIndex - 1]?.id ?? null)}
          onNext={() => setSelectedGameId(games[selectedIndex + 1]?.id ?? null)}
        />
      ) : null}
    </>
  );
}
