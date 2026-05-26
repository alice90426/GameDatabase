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
      studio: "GAME DATABASE",
      badge: "Slot Game Database",
      viewGames: "查看資料庫",
      viewAbout: "查看說明",
      all: "全部",
      genres: "類型",
      reset: "重設",
      featured: "精選遊戲"
    },
    features: {
      hitRate: "中獎率",
      volatility: "波動度",
      rtp: "RTP",
      boardSize: "盤面大小",
      lineMechanic: "連線方式"
    },
    home: {
      title: "整理遊戲規格、數值特徵與玩法分類的資料庫",
      intro:
        "用清楚的資料欄位管理每款遊戲的中獎率、波動度、RTP、盤面大小與連線方式，方便比較、篩選與展示。",
      metricGames: "款遊戲資料",
      metricGenres: "種遊戲分類",
      metricFeatures: "個核心特徵",
      featured: "精選遊戲",
      pipeline: "資料整理流程",
      pipelineText:
        "先統一欄位，再補齊數值，最後用分類與標籤讓資料可以快速搜尋、比較和維護。"
    },
    games: {
      title: "遊戲資料",
      intro: "使用類型、波動度與關鍵字快速篩選遊戲規格。",
      search: "搜尋 ID、標籤或特徵",
      empty: "沒有符合條件的遊戲。"
    },
    about: {
      title: "關於",
      role: "遊戲資料整理 / 規格比較 / 前端展示",
      intro:
        "這個網站用來集中管理遊戲規格，讓不同遊戲可以用一致欄位呈現，方便後續擴充篩選、排序與詳細頁。",
      experience: "資料重點",
      skills: "欄位",
      contact: "備註",
      contactText:
        "目前資料卡片已改為顯示中獎率、波動度、RTP、盤面大小與連線方式。"
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
      studio: "GAME DATABASE",
      badge: "Slot Game Database",
      viewGames: "Browse Database",
      viewAbout: "View Notes",
      all: "All",
      genres: "Genres",
      reset: "Reset",
      featured: "Featured Games"
    },
    features: {
      hitRate: "Hit Rate",
      volatility: "Volatility",
      rtp: "RTP",
      boardSize: "Board Size",
      lineMechanic: "Line Mechanic"
    },
    home: {
      title: "A database for game specs, numerical traits, and play categories",
      intro:
        "Track hit rate, volatility, RTP, board size, and line mechanics in a consistent structure for comparison and filtering.",
      metricGames: "game records",
      metricGenres: "game genres",
      metricFeatures: "core features",
      featured: "Featured Games",
      pipeline: "Data Workflow",
      pipelineText:
        "Standardize fields, fill in the values, then use categories and tags to make the database searchable and maintainable."
    },
    games: {
      title: "Game Database",
      intro: "Filter game specs by genre, volatility, and keyword.",
      search: "Search ID, tags, or features",
      empty: "No games match the current filters."
    },
    about: {
      title: "About",
      role: "Game Data / Spec Comparison / Frontend Display",
      intro:
        "This site keeps game specs in a consistent structure so filtering, sorting, and detail pages can be expanded later.",
      experience: "Data Focus",
      skills: "Fields",
      contact: "Notes",
      contactText:
        "Game cards now show hit rate, volatility, RTP, board size, and line mechanic."
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
