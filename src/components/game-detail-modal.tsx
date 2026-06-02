"use client";

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Github,
  Play,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import type { Game, Locale } from "@/types/game";

type DetailTab = "info" | "simulation" | "demo";

type GameDetailModalProps = {
  game: Game;
  locale: Locale;
  hasPrevious: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function GameDetailModal({
  game,
  locale,
  hasPrevious,
  hasNext,
  onClose,
  onPrevious,
  onNext
}: GameDetailModalProps) {
  const dictionary = getDictionary(locale);
  const [activeTab, setActiveTab] = useState<DetailTab>("info");

  useEffect(() => {
    setActiveTab("info");
  }, [game.id]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      }

      if (event.key === "ArrowRight" && hasNext) {
        onNext();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasNext, hasPrevious, onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-label={`${game.id} details`}
        aria-modal="true"
        className="flex h-[min(88vh,860px)] w-full max-w-6xl flex-col overflow-hidden rounded border border-white/15 bg-panel shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="flex items-center gap-2 border-b border-white/10 bg-void/70 px-3 py-3 sm:px-4">
          <button
            type="button"
            aria-label={locale === "zh" ? "\u4e0a\u4e00\u6b3e\u904a\u6232" : "Previous game"}
            disabled={!hasPrevious}
            onClick={onPrevious}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded border border-white/10 text-slate-200 transition hover:border-neon/50 hover:text-neon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold uppercase tracking-[0.16em] text-neon">
              {game.genre.join(" / ")}
            </p>
            <h2 className="truncate text-lg font-black text-white sm:text-xl">
              {formatGameName(game.id)}
            </h2>
          </div>
          <button
            type="button"
            aria-label={locale === "zh" ? "\u4e0b\u4e00\u6b3e\u904a\u6232" : "Next game"}
            disabled={!hasNext}
            onClick={onNext}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded border border-white/10 text-slate-200 transition hover:border-neon/50 hover:text-neon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            aria-label={dictionary.actions.close}
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded border border-white/10 text-slate-200 transition hover:border-ember/70 hover:text-ember"
          >
            <X size={18} />
          </button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-white/10 bg-void/40 px-3 pt-3 sm:px-4">
          <TabButton
            active={activeTab === "info"}
            icon={<FileText size={16} />}
            label={dictionary.actions.gameInfo}
            onClick={() => setActiveTab("info")}
          />
          <TabButton
            active={activeTab === "simulation"}
            icon={<BarChart3 size={16} />}
            label={dictionary.actions.simulation}
            onClick={() => setActiveTab("simulation")}
          />
          {game.githubUrl ? (
            <TabButton
              active={activeTab === "demo"}
              icon={<Play size={16} />}
              label={dictionary.actions.demo}
              onClick={() => setActiveTab("demo")}
            />
          ) : null}
        </nav>

        <div
          className={`min-h-0 flex-1 bg-void/60 ${activeTab === "demo" ? "overflow-hidden" : "overflow-auto"
            }`}
        >
          {activeTab === "info" ? (
            <TextContent
              key={`${game.id}-${locale}-info`}
              src={`/premium/${game.id}/spec-${locale}.md`}
              locale={locale}
            />
          ) : null}
          {activeTab === "simulation" ? (
            <TextContent
              key={`${game.id}-simulation`}
              src={`/premium/${game.id}/simulation.txt`}
              locale={locale}
            />
          ) : null}
          {activeTab === "demo" && game.githubUrl ? (
            <div className="flex h-full flex-col">
              {game.githubUrl || game.itchUrl ? (
                <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-white/10 bg-void/80 px-3 py-2 sm:px-4">
                  <span className="mr-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {locale === "zh" ? "其他連結" : "LINKS"}
                  </span>
                  {game.githubUrl ? (
                    <SourceLink
                      href={game.githubUrl}
                      icon={<Github size={15} />}
                      label="GitHub"
                    />
                  ) : null}
                  {game.itchUrl ? (
                    <SourceLink
                      href={game.itchUrl}
                      icon={<ExternalLink size={15} />}
                      label="itch.io"
                    />
                  ) : null}
                </div>
              ) : null}
              <iframe
                src={game.githubUrl}
                title={`${game.id} demo`}
                className="block min-h-0 flex-1 w-full border-0 bg-black"
                allow="fullscreen; autoplay"
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function SourceLink({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-8 items-center gap-2 rounded border border-white/10 bg-white/[0.04] px-2.5 text-xs font-black text-slate-200 transition hover:border-neon/50 hover:text-neon"
    >
      {icon}
      {label}
    </a>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex h-10 shrink-0 items-center gap-2 border-b-2 border-neon px-3 text-sm font-black text-neon"
          : "inline-flex h-10 shrink-0 items-center gap-2 border-b-2 border-transparent px-3 text-sm font-black text-slate-400 transition hover:text-white"
      }
    >
      {icon}
      {label}
    </button>
  );
}

function TextContent({ src, locale }: { src: string; locale: Locale }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadContent() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch(src);

        if (!response.ok) {
          throw new Error(`Unable to load ${src}`);
        }

        const text = await response.text();

        if (isCurrent) {
          setContent(text);
        }
      } catch {
        if (isCurrent) {
          setHasError(true);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      isCurrent = false;
    };
  }, [src]);

  if (isLoading) {
    return <ContentMessage>{locale === "zh" ? "\u8f09\u5165\u4e2d..." : "Loading..."}</ContentMessage>;
  }

  if (hasError) {
    return (
      <ContentMessage>
        {locale === "zh" ? "\u7121\u6cd5\u8f09\u5165\u8cc7\u6599\u3002" : "Unable to load content."}
      </ContentMessage>
    );
  }

  return (
    <pre className="whitespace-pre-wrap break-words p-5 font-sans text-sm leading-7 text-slate-200 sm:p-7">
      {content}
    </pre>
  );
}

function ContentMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-48 items-center justify-center p-6 text-sm font-bold text-slate-400">
      {children}
    </div>
  );
}

function formatGameName(id: string) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
