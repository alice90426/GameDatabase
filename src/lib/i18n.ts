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
      about: "關於本站",
      career: "服務項目",
      language: "EN"
    },
    common: {
      brand: "老虎機數學模型",
      studio: "Javier",
      badge: "娛樂遊戲資料庫",
      description: "整理遊戲規格、數值特徵與玩法分類的資料庫。",
      viewGames: "查看遊戲資料",
      viewAbout: "關於本站",
      all: "全部",
      genres: "類型",
      tags: "遊戲特色",
      reset: "重置",
      featured: "精選遊戲",
      footer: "老虎機數學模型由 Javier 建立",
      switchLanguage: "切換語言"
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
      demo: "遊戲試玩",
      // close: "關閉"
    },
    home: {
      title: "老虎機數學模型",
      intro:
        "所有遊戲數據皆透過自建試算表模型、驗證程式與模擬測試產生，並非人工估算；\n而是以可驗證、可重現的方式建立，確保數據具備實際開發與使用價值。",
      metricGames: "款遊戲資料",
      metricTags: "種遊戲特色",
      metricLines: "種連線方式",
      featured: "精選遊戲",
      pipeline: "資料整理流程",
      pipelineText:
        "所有資料透過試算表建模定義規格，並以程式化模擬進行驗證與調整，以確保數值結果的一致性與可重現性。",
      dataFields: "資料欄位",
      catalog: "目錄",
      workflow: "流程",
      collect: "蒐集",
      classify: "分類",
      compare: "比較"
    },
    games: {
      title: "遊戲資料",
      eyebrow: "資料庫",
      intro: "使用ID、標籤與波動度快速篩選遊戲規格。",
      search: "搜尋 ID",
      empty: "沒有符合條件的遊戲。",
      hasDemo: "有 Demo",
      allGames: "所有遊戲",
      demoOnly: "可試玩遊戲",
      showingPrefix: "目前顯示",
      showingSuffix: "款遊戲"
    },
    modal: {
      details: "遊戲詳情",
      previousGame: "上一款遊戲",
      nextGame: "下一款遊戲",
      links: "其他連結",
      github: "GitHub",
      itch: "itch.io",
      loading: "載入中...",
      loadError: "無法載入資料。"
    },
    about: {
      title: "關於本站",
      role: "遊戲規格整理 / 數據比較 / 遊戲試玩",
      intro:
        "這是一個以遊戲數學模型為核心的資料庫與展示平台，專注於遊戲系統背後的數值設計，包括機率結構、平衡模型與模擬驗證流程。所有數據皆透過試算表建模、程式化驗證與多輪模擬測試建立，而非經驗性或隨機調整。\n\n本平台的重點不在於視覺呈現或最終產品包裝，而在於數據與系統本身的可驗證性與可重現性。部分試玩內容可能仍保留開發階段的介面或效能特徵，但不影響核心數學模型的正確性與實際應用價值。\n\n這些模型可直接用於遊戲設計、經濟系統建構、數值平衡調整與完整專案授權整合，提供的是一套可驗證、可模擬並可實際投入開發的遊戲數學基礎系統。",
      experience: "資料重點",
      skills: "欄位",
      contact: "備註",
      contactText:
        "這些試玩版本主要用於展示底層數學模型與遊戲系統設計。\n視覺包裝與介面細節並非目前重點，核心價值在於遊戲數學的正確性與可靠性。",
      dataFocus: [
        "六種核心數值模型，用於完整描述一款遊戲的數學行為與風險分布。",
        "遊戲規格文件與模擬數據，包含完整規則定義、參數設定與大量模擬結果。",
        "特色標籤系統，用於快速分類遊戲特性，方便快速檢索與比較不同模型。"
      ]
    },
    career: {
      eyebrow: "服務定位",
      position: "數學模型設計師",
      intro: "提供遊戲數學模型設計、機率分析、模擬驗證與結構化遊戲規格文件。",
      metrics: ["100+ 遊戲模型", "模擬數據", "雙語文件", "機率研究"],
      browseModels: "查看遊戲資料",
      contactMe: "聯絡我",
      servicesEyebrow: "服務項目",
      servicesTitle: "符合 GLI、BMM 認證標準",
      services: {
        model: { title: "數學模型", items: ["RTP", "中獎率", "波動度", "最大倍數"] },
        simulation: { title: "模擬驗證", items: ["模擬測試", "數據分析", "長期表現驗證"] },
        specification: { title: "規格文件", items: ["遊戲規則", "特色說明", "中英文文件"] }
      },
      workEyebrow: "作品",
      workTitle: "代表作品",
      work: {
        database: { title: "遊戲模型資料庫", items: ["100+ 遊戲模型", "六大核心數值", "模擬數據"] },
        research: { title: "機率系統研究", items: ["Slot 與非 Slot 遊戲研究", "機率與獎勵機制分析"] }
      },
      resourcesEyebrow: "佐證資料",
      resourcesTitle: "外部資源",
      resources: {
        blogger: { title: "Blogger", text: "教學文章" },
        notion: { title: "Notion", text: "研究筆記" },
        github: { title: "GitHub", text: "程式與工具" },
        itch: { title: "itch.io", text: "試玩作品" }
      },
      contactEyebrow: "合作",
      contactTitle: "聯絡我",
      contactText: "可提供數學模型設計、模擬驗證與遊戲規格文件。",
      contactItems: ["數學模型設計", "模擬驗證", "遊戲規格文件"],
      contactButton: "聯絡方式待補"
    }
  },
  en: {
    nav: {
      home: "Home",
      games: "Games",
      about: "About",
      career: "Career",
      language: "中文"
    },
    common: {
      brand: "Slot Math Model",
      studio: "Javier",
      badge: "Casino Game Database",
      description: "A database for game specs, numerical traits, and play categories.",
      viewGames: "Browse Games",
      viewAbout: "View About",
      all: "All",
      genres: "Genres",
      tags: "Game Features",
      reset: "Reset",
      featured: "Featured Games",
      footer: "Slot Math Model created by Javier",
      switchLanguage: "Switch language"
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
      demo: "Demo",
      // close: "Close"
    },
    home: {
      title: "Slot Math Model",
      intro:
        "All data is generated through custom spreadsheet models, validation programs, and simulation testing.\nRather than manual estimation, the data is built through reproducible and verifiable processes to ensure practical value for real production use.",
      metricGames: "game records",
      metricTags: "game tags",
      metricLines: "line mechanisms",
      featured: "Featured Games",
      pipeline: "Data Workflow",
      pipelineText:
        "All data is defined through spreadsheet-based modeling and validated via programmatic simulation, ensuring consistency and reproducibility of results.",
      dataFields: "Data Fields",
      catalog: "Catalog",
      workflow: "Workflow",
      collect: "Collect",
      classify: "Classify",
      compare: "Compare"
    },
    games: {
      title: "Game Database",
      eyebrow: "Database",
      intro: "Filter game specs by ID, tags and volatility.",
      search: "Search ID",
      empty: "No games match the current filters.",
      hasDemo: "Has demo",
      allGames: "All Games",
      demoOnly: "Demo Only",
      showingPrefix: "Showing",
      showingSuffix: "games"
    },
    modal: {
      details: "Game details",
      previousGame: "Previous game",
      nextGame: "Next game",
      links: "Links",
      github: "GitHub",
      itch: "itch.io",
      loading: "Loading...",
      loadError: "Unable to load content."
    },
    about: {
      title: "About",
      role: "Game Spec / Data Comparison / Game Demo",
      intro:
        "This is a database and showcase platform centered on game mathematical models, focusing on the numerical design behind game systems, including probability structures, balancing models, and simulation-based validation. All data is constructed through spreadsheet modeling, programmatic verification, and iterative simulations rather than intuition or ad-hoc tuning.\n\nThe focus of this platform is not visual presentation or final product polish, but the verifiability and reproducibility of the underlying data and systems. Some demos may still contain development-stage UI or performance characteristics, without affecting the correctness or practical applicability of the core mathematical models.\n\nThese models can be directly applied to game design, economy system development, balancing adjustments, and full project licensing integration, providing a verifiable, simulation-driven, and production-ready mathematical foundation for game development.",
      experience: "Data Focus",
      skills: "Fields",
      contact: "Notes",
      contactText:
        "These demos are provided to demonstrate the underlying mathematical models and gameplay systems.\nVisual polish and UI refinement are outside the current scope, as the primary focus is the accuracy and reliability of the game mathematics.",
      dataFocus: [
        "Six core numerical metrics used to fully describe a game’s mathematical behavior and risk distribution.",
        "Game specification documents and simulation data, including complete rule definitions, parameter settings, and large-scale simulation results.",
        "A feature tagging system for quickly categorizing game characteristics, enabling fast retrieval and comparison across different models."
      ]
    },
    career: {
      eyebrow: "Service Profile",
      position: "Math Model Designer",
      intro: "I provide game mathematics model design, probability analysis, simulation validation, and structured game specification documents.",
      metrics: ["100+ Game Models", "Simulation Data", "Bilingual Docs", "Probability Research"],
      browseModels: "Browse Games",
      contactMe: "Contact Me",
      servicesEyebrow: "Services",
      servicesTitle: "GLI and BMM Compliant",
      services: {
        model: { title: "Mathematics Models", items: ["RTP", "Hit Rate", "Volatility", "Max Win"] },
        simulation: { title: "Simulation Validation", items: ["Simulation Testing", "Data Analysis", "Long-run Validation"] },
        specification: { title: "Specification Documents", items: ["Game Rules", "Feature Definitions", "Chinese and English Docs"] }
      },
      workEyebrow: "Portfolio",
      workTitle: "Selected Work",
      work: {
        database: { title: "Game Model Database", items: ["100+ Game Models", "Six Core Metrics", "Simulation Data"] },
        research: { title: "Probability System Research", items: ["Slot and Non-slot Game Research", "Probability and Reward Mechanism Analysis"] }
      },
      resourcesEyebrow: "Supporting Proof",
      resourcesTitle: "External Resources",
      resources: {
        blogger: { title: "Blogger", text: "Tutorial Articles" },
        notion: { title: "Notion", text: "Research Notes" },
        github: { title: "GitHub", text: "Code and Tools" },
        itch: { title: "itch.io", text: "Playable Work" }
      },
      contactEyebrow: "Collaboration",
      contactTitle: "Contact Me",
      contactText: "Available for mathematics model design, simulation validation, and structured game specification documents.",
      contactItems: ["Mathematics Model Design", "Simulation Validation", "Game Specification Documents"],
      contactButton: "Contact details pending"
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
