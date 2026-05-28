import type { Locale } from "@/types/game";

export const locales: Locale[] = ["zh", "en"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  zh: {
    nav: {
      home: "首頁",
      games: "遊戲資料",
      about: "關於",
      language: "EN"
    },
    common: {
      studio: "娛樂遊戲資料庫",
      badge: "娛樂遊戲資料庫",
      viewGames: "查看資料庫",
      viewAbout: "查看說明",
      all: "全部",
      genres: "類型",
      tags: "標籤",
      reset: "重設",
      featured: "精選遊戲"
    },
    features: {
      rtp: "RTP",
      hitRate: "中獎率",
      maxWin: "最大倍數",
      volatility: "波動度",
      boardSize: "盤面大小",
      lineMechanic: "連線方式"
    },
    actions: {
      gameInfo: "遊戲說明",
      simulation: "模擬數據",
      demo: "遊戲試玩"
    },
    home: {
      title: "老虎機數學模型",
      intro:
        "所有遊戲數據皆透過自建試算表模型、驗證程式與模擬測試產生，並非人工估算；\n而是以可驗證、可重現的方式建立，確保數據具備實際開發與商業使用價值。",
      metricGames: "款遊戲資料",
      metricTags: "種遊戲特色",
      metricLines: "種連線方式",
      featured: "精選遊戲",
      pipeline: "資料整理流程",
      pipelineText:
        "先建立試算表，再開發驗證程式，最後將模擬數據填進資料庫。"
    },
    games: {
      title: "遊戲資料",
      intro: "使用ID、標籤與波動度快速篩選遊戲規格。",
      search: "搜尋 ID",
      empty: "沒有符合條件的遊戲。"
    },
    about: {
      title: "關於",
      role: "遊戲規格整理 / 數據比較 / 遊戲試玩",
      intro:
        "這是一個以遊戲數學模型為核心的資料庫與展示平台，專注於遊戲系統背後的數值設計，包括機率結構、平衡模型與模擬驗證流程。所有數據皆透過試算表建模、程式化驗證與多輪模擬測試建立，而非經驗性或隨機調整。\n\n本平台的重點不在於視覺呈現或最終產品包裝，而在於數據與系統本身的可驗證性與可重現性。部分試玩內容可能仍保留開發階段的介面或效能特徵，但不影響核心數學模型的正確性與實際應用價值。\n\n這些模型可直接用於遊戲設計、經濟系統建構、數值平衡調整與完整專案授權整合，提供的是一套可驗證、可模擬並可實際投入開發的遊戲數學基礎系統。",
      experience: "資料重點",
      skills: "欄位",
      contact: "備註",
      contactText:
        "這些試玩版本主要用於展示底層數學模型與遊戲系統設計。\n視覺包裝與介面細節並非目前重點，核心價值在於遊戲數學的正確性與可靠性。"
    }
  },
  en: {
    nav: {
      home: "Home",
      games: "Games",
      about: "About",
      language: "中文"
    },
    common: {
      studio: "CASINO GAME DATABASE",
      badge: "Slot Math Model",
      viewGames: "Browse Database",
      viewAbout: "View Notes",
      all: "All",
      genres: "Genres",
      tags: "Tags",
      reset: "Reset",
      featured: "Featured Games"
    },
    features: {
      rtp: "RTP",
      hitRate: "Hit Rate",
      maxWin: "Max Win",
      volatility: "Volatility",
      boardSize: "Board Size",
      lineMechanic: "Line Mechanic"
    },
    actions: {
      gameInfo: "Game Info",
      simulation: "Simulation",
      demo: "Demo"
    },
    home: {
      title: "A database for game specs, numerical traits, and play categories",
      intro:
        "All data is generated through custom spreadsheet models, validation programs, and simulation testing.\nRather than manual estimation, the data is built through reproducible and verifiable processes to ensure practical value for real production and commercial use.",
      metricGames: "game records",
      metricTags: "game tags",
      metricLines: "line mechanisms",
      featured: "Featured Games",
      pipeline: "Data Workflow",
      pipelineText:
        "Standardize fields, fill in the values, then use categories and tags to make the database searchable and maintainable."
    },
    games: {
      title: "Game Database",
      intro: "Filter game specs by genre, volatility, and keyword.",
      search: "Search ID",
      empty: "No games match the current filters."
    },
    about: {
      title: "About",
      role: "Game Data / Spec Comparison / Frontend Display",
      intro:
        "This is a database and showcase platform centered on game mathematical models, focusing on the numerical design behind game systems, including probability structures, balancing models, and simulation-based validation. All data is constructed through spreadsheet modeling, programmatic verification, and iterative simulations rather than intuition or ad-hoc tuning.\n\nThe focus of this platform is not visual presentation or final product polish, but the verifiability and reproducibility of the underlying data and systems. Some demos may still contain development-stage UI or performance characteristics, without affecting the correctness or practical applicability of the core mathematical models.\n\nThese models can be directly applied to game design, economy system development, balancing adjustments, and full project licensing integration, providing a verifiable, simulation-driven, and production-ready mathematical foundation for game development.",
      experience: "Data Focus",
      skills: "Fields",
      contact: "Notes",
      contactText:
        "These demos are provided to demonstrate the underlying mathematical models and gameplay systems.\nVisual polish and UI refinement are outside the current scope, as the primary focus is the accuracy and reliability of the game mathematics."
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
