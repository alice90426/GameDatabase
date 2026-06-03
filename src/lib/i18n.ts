import type { Locale } from "@/types/game";

export const locales: Locale[] = ["zh", "en"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const sharedCopy = {
  links: {
    blogger: "https://slotmathmodel.blogspot.com/",
    notion:
      "https://magic-ellipse-ed8.notion.site/7143abd96b7340ccacc97bacf8f3ea48?v=995db3faa1ca41d3b31052f6a34bceae&source=copy_link",
    github: "https://github.com/alice90426",
    itch: "https://alice90426.itch.io"
  },
  resourceTitles: {
    blogger: "Blogger",
    notion: "Notion",
    github: "GitHub",
    itch: "itch.io"
  },
  featureLabels: {
    rtp: "RTP"
  },
  modalLabels: {
    github: "GitHub",
    itch: "itch.io"
  }
} as const;

export const dictionaries = {
  zh: {
    nav: {
      home: "首頁",
      games: "遊戲資料",
      research: "研究筆記",
      articles: "教學文章",
      services: "服務項目",
      about: "關於創作者",
      language: "EN"
    },
    common: {
      brand: "娛樂遊戲資料庫",
      badge: "數學模型資料庫",
      description: "整理遊戲規格、數值特徵與玩法分類的資料庫。",
      viewGames: "查看遊戲資料",
      viewAbout: "關於創作者",
      tags: "遊戲特色",
      reset: "重置",
      footer: "版權所有 © 2026 Javier。保留所有權利。",
      switchLanguage: "切換語言"
    },
    features: {
      rtp: sharedCopy.featureLabels.rtp,
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
      close: "關閉"
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
      allGames: "所有遊戲",
      demoOnly: "可試玩遊戲",
      showingPrefix: "目前顯示",
      showingSuffix: "款遊戲"
    },
    research: {
      eyebrow: "研究筆記",
      title: "試玩心得與分析",
      intro:
        "試玩筆記與遊戲分析，聚焦機率行為、獎勵結構與玩家體驗。",
      empty: "目前沒有已發布的研究文章。",
      backToResearch: "返回研究筆記"
    },
    modal: {
      details: "遊戲詳情",
      previousGame: "上一款遊戲",
      nextGame: "下一款遊戲",
      links: "其他連結",
      github: sharedCopy.modalLabels.github,
      itch: sharedCopy.modalLabels.itch,
      loading: "載入中...",
      loadError: "無法載入資料。"
    },
    services: {
      eyebrow: "客製化服務",
      title: "遊戲數學模型服務",
      intro: "為遊戲團隊提供老虎機數學模型設計、機率分析、模擬驗證與結構化規格文件。",
      primaryCta: "查看遊戲資料",
      secondaryCta: "關於創作者",
      cards: [
        {
          title: "老虎機數學模型設計",
          text: "建立 RTP、中獎率、波動度、最大倍數與核心獎勵結構。"
        },
        {
          title: "機率分析",
          text: "分析賠付分布、風險區間與特色機制對長期表現的影響。"
        },
        {
          title: "模擬驗證",
          text: "透過程式模擬驗證理論目標與長期輸出是否一致。"
        },
        {
          title: "遊戲規格文件",
          text: "整理可供溝通、實作與通過GLI、BMM認證的中英文遊戲規格文件。"
        }
      ],
      processTitle: "交付重點",
      process: ["試算表", "驗證程式", "模擬結果", "規格文件"],
      note: "此服務聚焦於遊戲數學與規格設計；可試玩作品與外部連結僅作為佐證，不作為主要服務項目。"
    },
    about: {
      eyebrow: "創作者",
      title: "關於創作者",
      role: "遊戲數學模型設計師",
      intro:
        "我專注於遊戲數學模型、機率結構與模擬驗證，將遊戲規則轉換為可檢查、可比較、可文件化的數值系統。",
      strengthsTitle: "專業重點",
      strengths: [
        "機率與獎勵機制研究",
        "模擬數據驗證與結果解讀",
        "中英文規格文件整理"
      ],
      resourcesTitle: "外部資源",
      resourcesIntro: "以下連結用於了解研究筆記、文章、程式工具與試玩作品。",
      resources: {
        blogger: {
          title: sharedCopy.resourceTitles.blogger,
          text: "教學文章",
          href: sharedCopy.links.blogger
        },
        notion: {
          title: sharedCopy.resourceTitles.notion,
          text: "研究筆記",
          href: sharedCopy.links.notion
        },
        github: {
          title: sharedCopy.resourceTitles.github,
          text: "程式與工具",
          href: sharedCopy.links.github
        },
        itch: {
          title: sharedCopy.resourceTitles.itch,
          text: "試玩作品",
          href: sharedCopy.links.itch
        }
      },
      contact: "合作方向",
      contactText:
        "適合需要遊戲數學模型、機率分析、模擬驗證或規格文件整理的團隊。"
    }
  },
  en: {
    nav: {
      home: "Home",
      games: "Games",
      research: "Research",
      articles: "Articles",
      services: "Services",
      about: "About",
      language: "中文"
    },
    common: {
      brand: "Casino Game Database",
      badge: "Math Model Database",
      description: "A database for game specs, numerical traits, and play categories.",
      viewGames: "Browse Games",
      viewAbout: "View About",
      tags: "Game Features",
      reset: "Reset",
      footer: "Copyright © 2026 Javier. All rights reserved.",
      switchLanguage: "Switch language"
    },
    features: {
      rtp: sharedCopy.featureLabels.rtp,
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
      close: "Close"
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
      allGames: "All Games",
      demoOnly: "Demo Only",
      showingPrefix: "Showing",
      showingSuffix: "games"
    },
    research: {
      eyebrow: "Research Notes",
      title: "Research Notes",
      intro:
        "Playtest notes and game analysis, focused on probability behavior, reward structures, and player experience.",
      empty: "No published research articles are available yet.",
      backToResearch: "Back to Research"
    },
    modal: {
      details: "Game details",
      previousGame: "Previous game",
      nextGame: "Next game",
      links: "Other links",
      github: sharedCopy.modalLabels.github,
      itch: sharedCopy.modalLabels.itch,
      loading: "Loading...",
      loadError: "Unable to load content."
    },
    services: {
      eyebrow: "Client Services",
      title: "Game Mathematics Model Services",
      intro: "I provide slot game mathematics model design, probability analysis, simulation validation, and structured specification documents for game teams.",
      primaryCta: "Browse Games",
      secondaryCta: "About Creator",
      cards: [
        {
          title: "Slot Math Model Design",
          text: "Build RTP, hit rate, volatility, max win, and core reward structures."
        },
        {
          title: "Probability Analysis",
          text: "Analyze payout distribution, risk ranges, and how features affect long-run behavior."
        },
        {
          title: "Simulation Validation",
          text: "Use programmatic simulation to verify that theoretical targets match long-run outputs."
        },
        {
          title: "Game Specification Documents",
          text: "Organize structured specification documents in English and Chinese for communication, implementation, and GLI / BMM certification."
        }
      ],
      processTitle: "Delivery Focus",
      process: ["Spreadsheet", "Validation Program", "Simulation Summary", "Specification Docs"],
      note: "This service focuses on game mathematics and specification design. Playable work and external links are supporting proof, not the primary service."
    },
    about: {
      eyebrow: "Creator",
      title: "About Creator",
      role: "Game Mathematics Model Designer",
      intro:
        "I focus on game mathematics models, probability structures, and simulation validation, turning game rules into systems that can be checked, compared, and documented.",
      strengthsTitle: "Professional Focus",
      strengths: [
        "Probability and reward-system research",
        "Simulation validation and result interpretation",
        "Chinese and English specification writing"
      ],
      resourcesTitle: "External Resources",
      resourcesIntro: "Use these links to review research notes, articles, code tools, and playable supporting work.",
      resources: {
        blogger: {
          title: sharedCopy.resourceTitles.blogger,
          text: "Tutorial Articles",
          href: sharedCopy.links.blogger
        },
        notion: {
          title: sharedCopy.resourceTitles.notion,
          text: "Research Notes",
          href: sharedCopy.links.notion
        },
        github: {
          title: sharedCopy.resourceTitles.github,
          text: "Code and Tools",
          href: sharedCopy.links.github
        },
        itch: {
          title: sharedCopy.resourceTitles.itch,
          text: "Playable Work",
          href: sharedCopy.links.itch
        }
      },
      contact: "Collaboration Fit",
      contactText:
        "Best suited for teams that need game mathematics models, probability analysis, simulation validation, or structured specification documents."
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
