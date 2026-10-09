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
    itch: "https://alice90426.itch.io",
    email: "alice90426@yahoo.com.tw",
    linkedin: "https://www.linkedin.com/in/javier-chiang-43241911a/"
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
      tools: "輔助工具",
      services: "服務項目",
      about: "關於創作者",
      contact: "聯絡我",
      menu: "選單",
      language: "EN"
    },
    common: {
      brand: "JAVIER CHIANG",
      badge: "遊戲數學模型設計師",
      description:
        "江愷翔（Javier）的作品集：老虎機與遊戲數學模型設計、RTP 與波動度分析、模擬驗證，以及 GLI／BMM 規格文件。",
      viewGames: "查看遊戲資料",
      viewWorks: "查看代表作品",
      downloadCv: "下載履歷 (PDF)",
      contactSubject: "遊戲數學模型合作邀約",
      contactBody: "你好 Javier，\n\n我看過你的作品集，想進一步討論合作或職缺。",
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
      name: "Javier 江愷翔",
      title: "老虎機與遊戲數學模型設計",
      intro:
        "9 年以上遊戲數值經驗，涵蓋 RTP 與波動度設計、模擬驗證，以及通過 GLI／BMM 認證的規格文件，能獨立交付完整、可上線的數學模型。",
      proofs: [
        { value: "9+", label: "年遊戲數值經驗" },
        { value: "65+", label: "款商業遊戲數學模型" },
        { value: "GLI / BMM", label: "專案實際通過認證" }
      ],
      capabilityTitle: "核心能力",
      capabilities: [
        "RTP 結構與派彩分布設計",
        "波動度控制與中獎率調校",
        "程式模擬與自動驗證",
        "自動調表與試算表生成工具",
        "中英文規格文件"
      ],
      selectedWork: "代表作品",
      method: {
        title: "從設計到送測的完整流程",
        text: "每個模型都經過同一套可重現的流程，數據可追溯、可驗證。",
        steps: [
          { title: "數學設計", text: "定義 RTP、中獎率、波動度與最大倍數，規劃獎勵結構。" },
          { title: "試算表建模", text: "以公式連動的試算表建立輪帶、賠付與特色機制。" },
          { title: "模擬驗證", text: "以程式進行 10 億次模擬，RTP 誤差低於 0.1%，確認長期輸出與理論值一致。" },
          { title: "規格文件", text: "整理可送測 GLI／BMM 的中英文規格與模擬報告。" }
        ]
      },
      researchTitle: "精選研究筆記",
      researchMore: "查看全部研究筆記",
      contactTitle: "合作與聯絡",
      contactText: "有遊戲數學模型、機率分析或職缺需求，歡迎直接來信。",
      metricGames: "款遊戲資料",
      metricResearch: "款研究筆記",
      metricArticles: "款教學文章",
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
    articles: {
      eyebrow: "Blogger Articles",
      title: "教學文章",
      intro:
        "建立老虎機數學模型試算表教學與分享。",
      empty: "目前沒有符合條件的 Blogger 文章。",
      backToArticles: "返回教學文章",
      description: "從 Blogger 匯入的教學與長篇文章。",
      fallbackDescription: "Blogger 教學文章"
    },
    tools: {
      eyebrow: "Utility Projects",
      title: "輔助工具",
      intro: "整理我為解決實際問題所製作的輔助工具，包含操作影片、功能重點與技術說明。",
      viewTool: "查看工具詳情",
      emptyTitle: "工具展示頁已準備完成",
      empty: "加入工具名稱、說明與 YouTube 影片連結後，作品會顯示在這裡。",
      backToTools: "返回輔助工具",
      overview: "工具介紹",
      features: "主要功能",
      technologies: "使用技術",
      watchYouTube: "在 YouTube 觀看",
      sourceCode: "查看原始碼",
      openProject: "開啟工具"
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
      experienceTitle: "開發經驗",
      experienceIntro: "",
      experienceGroups: [
        { category: "電子", games: ["老虎機", "賓果"] },
        { category: "街機", games: ["Crash", "Miles", "Plinko"] },
        { category: "押注", games: ["骰寶", "輪盤", "彩票", "百家樂"] },
        { category: "棋牌", games: ["妞妞", "5PK"] }
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
        "專注於遊戲數學模型、機率系統分析與模擬驗證。\n透過遊戲模型資料庫、規格文件、模擬數據與研究文章，將遊戲機制轉化為可量化、可分析、可比較的資料。",
      strengthsTitle: "專業重點",
      strengths: [
        "遊戲數學模型設計",
        "RTP 與波動度分析",
        "中獎率與獎勵結構設計",
        "模擬驗證與數據分析",
        "遊戲規格文件撰寫",
        "機率系統研究"
      ],
      careerTitle: "經歷",
      career: [
        { period: "2026/10 – 至今", role: "機率工程師", org: "遊戲產業（公司名稱暫不公開）" },
        { period: "2023 – 2026", role: "資深數值企劃", org: "浩天遊戲" },
        { period: "2018 – 2023", role: "數值工程師", org: "長青資訊" },
        { period: "2017 – 2018", role: "數值工程師", org: "德聚科技" }
      ],
      careerNote: "另有 5 年以上海外自由接案經驗。清華大學統計學碩士、應用數學學士。",
      websitePurposeTitle: "關於這個網站",
      websitePurpose:
        "將遊戲數學模型、模擬數據與研究筆記結構化整理，呈現從分析、設計到驗證的完整流程。",
      researchDirectionTitle: "研究方向",
      researchDirections: [
        "老虎機數學模型",
        "機率設計與分析",
        "獎勵結構設計",
        "波動度分析",
        "玩家體驗",
        "非老虎機遊戲機制"
      ],
      resourcesTitle: "外部資源",
      resourcesIntro: "以下連結用於了解研究筆記、文章、程式工具與試玩作品。",
      resources: {
        blogger: {
          title: sharedCopy.resourceTitles.blogger,
          text: "教學文章與遊戲分析",
          href: sharedCopy.links.blogger
        },
        notion: {
          title: sharedCopy.resourceTitles.notion,
          text: "研究筆記與試玩心得",
          href: sharedCopy.links.notion
        },
        github: {
          title: sharedCopy.resourceTitles.github,
          text: "網站與工具開發",
          href: sharedCopy.links.github
        },
        itch: {
          title: sharedCopy.resourceTitles.itch,
          text: "互動作品與實驗專案",
          href: sharedCopy.links.itch
        }
      },
      contact: "合作方向",
      contactText:
        "適合需要遊戲數學模型、機率分析、模擬驗證或規格文件整理的團隊。",
      connectTitle: "與我聯絡",
      connectText:
        "對遊戲數學模型、機率系統設計與分析、或模擬驗證有興趣嗎？",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      contactPurposes: [
        {
          label: "遊戲數學模型合作",
          subject: "遊戲數學模型合作邀約",
          body:
            "你好 Javier，\n\n我對遊戲數學模型設計合作有興趣，想進一步討論相關細節。"
        },
        {
          label: "機率系統與模擬驗證",
          subject: "機率系統與模擬驗證合作邀約",
          body:
            "你好 Javier，\n\n我對機率系統與模擬驗證合作有興趣，想進一步討論相關細節。"
        },
        {
          label: "規格文件與顧問服務",
          subject: "規格文件與顧問服務合作邀約",
          body:
            "你好 Javier，\n\n我對規格文件與顧問服務合作有興趣，想進一步討論相關細節。"
        }
      ],
      contactLinks: {
        email: sharedCopy.links.email,
        linkedin: sharedCopy.links.linkedin
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      games: "Games",
      research: "Research",
      articles: "Articles",
      tools: "Tools",
      services: "Services",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      language: "中文"
    },
    common: {
      brand: "JAVIER CHIANG",
      badge: "Game Math Model Designer",
      description:
        "Portfolio of Javier Chiang, game math model designer: slot math design, RTP and volatility analysis, simulation validation, and GLI / BMM specification documents.",
      viewGames: "Browse Games",
      viewWorks: "View Selected Work",
      downloadCv: "Download CV (PDF)",
      contactSubject: "Game math model inquiry",
      contactBody: "Hi Javier,\n\nI reviewed your portfolio and would like to discuss a collaboration or an open role.",
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
      name: "Javier Chiang",
      title: "Slot & Game Math Model Design",
      intro:
        "9+ years of game math experience: RTP and volatility design, simulation-based validation, and specification documents for projects that have passed GLI / BMM certification. I deliver complete, release-ready math models on my own.",
      proofs: [
        { value: "9+", label: "years in game math" },
        { value: "65+", label: "commercial game math models" },
        { value: "GLI / BMM", label: "certified projects delivered" }
      ],
      capabilityTitle: "Core Capabilities",
      capabilities: [
        "RTP structure and payout distribution design",
        "Volatility control and hit-rate tuning",
        "Simulation programs and automated validation",
        "Auto-tuning and spreadsheet generation tools",
        "Specification documents in Chinese and English"
      ],
      selectedWork: "Selected Work",
      method: {
        title: "From design to certification submission",
        text: "Every model follows the same reproducible process, so the numbers are traceable and verifiable.",
        steps: [
          { title: "Math design", text: "Define RTP, hit rate, volatility and max win, and plan the reward structure." },
          { title: "Spreadsheet model", text: "Build reels, paytable and feature mechanics in formula-linked spreadsheets." },
          { title: "Simulation", text: "Run 1 billion simulated spins with RTP error under 0.1%, confirming long-run output matches the theoretical values." },
          { title: "Specification", text: "Prepare bilingual specs and simulation reports ready for GLI / BMM submission." }
        ]
      },
      researchTitle: "Selected Research",
      researchMore: "View all research notes",
      contactTitle: "Collaboration & Contact",
      contactText: "Open to game math models, probability analysis and relevant roles. Feel free to email me directly.",
      metricGames: "game records",
      metricResearch: "research notes",
      metricArticles: "tutorial articles",
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
    articles: {
      eyebrow: "Blogger Articles",
      title: "Articles",
      intro:
        "Tutorials and long-form posts imported from Blogger, kept separate from Notion research notes and the game model catalog.",
      empty: "No Blogger articles are available yet.",
      backToArticles: "Back to Articles",
      description: "Blogger tutorials and long-form posts.",
      fallbackDescription: "Blogger article."
    },
    tools: {
      eyebrow: "Utility Projects",
      title: "Tools",
      intro: "Small utilities built to solve practical problems, with video walkthroughs, key features, and technical notes.",
      viewTool: "View tool details",
      emptyTitle: "The tool showcase is ready",
      empty: "Add a tool name, description, and YouTube URL to publish it here.",
      backToTools: "Back to Tools",
      overview: "Overview",
      features: "Key Features",
      technologies: "Technologies",
      watchYouTube: "Watch on YouTube",
      sourceCode: "View Source",
      openProject: "Open Tool"
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
      experienceTitle: "Game Experience",
      experienceIntro: "",
      experienceGroups: [
        { category: "Gaming", games: ["Slot", "Bingo"] },
        { category: "Arcade", games: ["Crash", "Miles", "Plinko"] },
        { category: "Bet Types", games: ["Dice", "Roulette", "Lottery", "Baccarat"] },
        { category: "Card Games", games: ["NiuNiu", "5PK"] }
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
        "Game Mathematics Model Design",
        "RTP and Volatility Analysis",
        "Hit Rate and Reward Structure Design",
        "Simulation Validation and Data Analysis",
        "Game Specification Document Writing",
        "Probability Systems Research"
      ],
      careerTitle: "Experience",
      career: [
        { period: "Oct 2026 – Present", role: "Probability Engineer", org: "Gaming industry (undisclosed)" },
        { period: "2023 – 2026", role: "Senior Game Math Designer", org: "Audere Gaming Co., Ltd." },
        { period: "2018 – 2023", role: "Game Math Engineer", org: "CC TECH" },
        { period: "2017 – 2018", role: "Game Math Engineer", org: "De Gather Technology Co., Ltd." }
      ],
      careerNote: "Plus 5+ years of overseas freelance experience. M.S. in Statistics and B.S. in Applied Mathematics, National Tsing Hua University.",
      websitePurposeTitle: "About This Website",
      websitePurpose:
        "A structured collection of game math models, simulation data and research notes, showing the full workflow from analysis and design to validation.",
      researchDirectionTitle: "Research Direction",
      researchDirections: [
        "Slot Game Mathematics",
        "Probability Systems",
        "Reward Structure Design",
        "Volatility Analysis",
        "Player Experience",
        "Non-Slot Game Mechanics"
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
        "Best suited for teams that need game mathematics models, probability analysis, simulation validation, or structured specification documents.",
      connectTitle: "Let's Connect",
      connectText:
        "Interested in game mathematics models, probability systems, or simulation-based game design?",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      contactPurposes: [
        {
          label: "Game math model design",
          subject: "Game Mathematics Model Inquiry",
          body:
            "Hello Javier,\n\nI am interested in discussing game mathematics model design."
        },
        {
          label: "Probability and simulation",
          subject: "Probability System and Simulation Validation Inquiry",
          body:
            "Hello Javier,\n\nI would like to discuss probability systems or simulation validation."
        },
        {
          label: "Specification documents",
          subject: "Game Specification Document Inquiry",
          body:
            "Hello Javier,\n\nI would like to discuss game specification documents or consulting."
        }
      ],
      contactLinks: {
        email: sharedCopy.links.email,
        linkedin: sharedCopy.links.linkedin
      }
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
