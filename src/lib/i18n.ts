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
      about: "關於我",
      contact: "聯絡我",
      menu: "選單",
      language: "EN"
    },
    common: {
      brand: "JAVIER CHIANG",
      badge: "遊戲數學模型設計師",
      description:
        "江愷翔（Javier）的作品集：9 年以上老虎機與遊戲數學模型設計經驗，提供 RTP 與波動度設計、機率分析、10 億次模擬驗證，以及通過 GLI／BMM 認證的中英文規格文件，並公開模型資料與研究筆記。",
      viewGames: "查看遊戲資料",
      viewWorks: "查看代表作品",
      downloadCv: "下載履歷 (PDF)",
      contactSubject: "遊戲數學模型合作邀約",
      contactBody: "你好 Javier，\n\n我看過你的作品集，想進一步討論合作或職缺。",
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
        { value: "65+", label: "款已上線商業遊戲" },
        { value: "GLI / BMM", label: "專案實際通過認證" }
      ],
      selectedWork: "代表作品",
      articlesTitle: "教學文章",
      articlesMore: "查看全部教學文章",
      toolsTitle: "自製工具",
      toolsMore: "查看全部工具",
      moreTitle: "延伸閱讀",
      researchTitle: "精選研究筆記",
      researchMore: "查看全部研究筆記",
      contactTitle: "合作與聯絡",
      contactText: "有遊戲數學模型、機率分析或職缺需求，歡迎直接來信。",
      catalog: "目錄",
    },
    games: {
      title: "遊戲資料",
      eyebrow: "資料庫",
      intro: "以 ID、標籤、RTP 區間與波動度篩選，並依 RTP、波動度或最大倍數排序。",
      seoDescription:
        "瀏覽 {count} 款可試玩的老虎機數學模型：每款皆附 RTP、中獎率、波動度、最大倍數、盤面與連線方式，並提供模擬數據與規格文件，可依 RTP 區間、波動度、盤面大小與標籤篩選，並依各項數據排序比較，快速找到合適的模型。",
      rtpMin: "RTP 下限",
      rtpMax: "RTP 上限",
      sortBy: "排序",
      sortOptions: {
        id: "預設（ID）",
        rtpDesc: "RTP 由高到低",
        rtpAsc: "RTP 由低到高",
        volatilityDesc: "波動度 由高到低",
        volatilityAsc: "波動度 由低到高",
        maxWinDesc: "最大倍數 由高到低",
        hitRateDesc: "中獎率 由高到低"
      },
      advanced: "進階篩選",
      showMore: "顯示更多",
      footerText: "想了解我如何分析與驗證這些模型？",
      footerResearch: "閱讀研究筆記",
      footerAbout: "關於我",
      stats: {
        models: "款可試玩模型",
        rtpRange: "RTP 範圍",
        note: "包含已上線專案與研究用遊戲，數量持續增加。"
      },
      search: "搜尋 ID",
      empty: "沒有符合條件的遊戲。",
      showingPrefix: "目前顯示",
      showingSuffix: "款遊戲"
    },
    research: {
      eyebrow: "研究筆記",
      title: "試玩心得與分析",
      intro:
        "試玩筆記與遊戲分析，聚焦機率行為、獎勵結構與玩家體驗。",
      empty: "目前沒有已發布的研究文章。",
      backToResearch: "返回研究筆記",
      notesCount: "篇研究筆記",
      featuredTitle: "精選筆記",
      allTitle: "全部筆記",
      searchPlaceholder: "搜尋遊戲名稱或機制",
      tagLegend: "[W] 百搭類　[S] 圖標類　[R] 滾輪類",
      categoryLabel: "類型",
      tagLabel: "機制",
      all: "全部",
      showMore: "顯示更多",
      noResults: "沒有符合條件的研究筆記。",
      relatedTitle: "相關筆記",
      prevNote: "上一篇",
      nextNote: "下一篇"
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
      github: sharedCopy.modalLabels.github,
      itch: sharedCopy.modalLabels.itch,
      loading: "載入中...",
      loadError: "無法載入資料。"
    },
    services: {
      eyebrow: "客製化服務",
      title: "老虎機與遊戲數學模型服務",
      intro:
        "為遊戲團隊提供從 RTP 與波動度設計、機率分析、大量模擬驗證，到可送測 GLI／BMM 規格文件的完整數學交付。",
      seoDescription:
        "為遊戲團隊提供老虎機與遊戲數學模型設計、機率分析、10 億次模擬驗證（RTP 誤差低於 0.1%），以及可送測 GLI／BMM 的中英文規格文件，專案實際通過認證，可配合跨國、跨團隊、跨框架的合作流程，從需求確認到文件交付完整支援。",
      primaryCta: "洽詢合作",
      secondaryCta: "查看模型資料",
      proofs: [
        { value: "10 億次", label: "單一模型模擬次數" },
        { value: "< 0.1%", label: "RTP 模擬誤差" },
        { value: "GLI / BMM", label: "專案實際通過認證" }
      ],
      servicesTitle: "我能為您做什麼",
      cards: [
        {
          title: "老虎機數學模型設計",
          text: "依目標市場與規範，建立完整的獎勵結構與數值目標。",
          bullets: [
            "RTP、中獎率、波動度與最大倍數設定",
            "輪帶、賠付表與特色功能（Free Game、Respin、Cascade 等）設計",
            "Line、Way、Megaways 等主流玩法"
          ]
        },
        {
          title: "機率分析",
          text: "找出數值風險，讓玩法與長期表現一致。",
          bullets: [
            "中獎頻率與賠付分布分析",
            "各特色功能對 RTP 的貢獻拆解",
            "波動度與最大倍數風險評估"
          ]
        },
        {
          title: "模擬驗證",
          text: "以大量模擬確認長期輸出與理論值一致。",
          bullets: [
            "10 億次模擬，RTP 誤差低於 0.1%",
            "試算表與驗證程式雙重核對",
            "自動調表工具縮短反覆調整時間"
          ]
        },
        {
          title: "遊戲規格文件",
          text: "整理可供溝通、實作與送測的完整文件。",
          bullets: [
            "中英文遊戲規格與數學報告",
            "符合 GLI、BMM 送測要求的文件格式",
            "專案實際通過認證的文件經驗"
          ]
        }
      ],
      experienceTitle: "涵蓋的遊戲類型",
      experienceGroups: [
        { category: "電子", games: ["老虎機", "賓果"] },
        { category: "街機", games: ["Crash", "Miles", "Plinko"] },
        { category: "押注", games: ["骰寶", "輪盤", "彩票", "百家樂"] },
        { category: "棋牌", games: ["妞妞", "5PK"] }
      ],
      processTitle: "合作流程",
      process: [
        { title: "需求確認", text: "了解玩法、目標市場、RTP 與波動度目標。" },
        { title: "模型設計", text: "建立試算表模型，提供數值方案供討論。" },
        { title: "模擬驗證", text: "程式大量模擬，確認並微調至目標值。" },
        { title: "文件交付", text: "交付試算表、驗證程式、模擬結果與規格文件。" }
      ],
      collaborationTitle: "合作方式",
      collaborationText:
        "有跨國、跨團隊、跨框架的合作經驗，可配合貴團隊既有的工具與流程，直接與企劃、工程、QA 及法規團隊溝通。",
      deliverablesTitle: "交付內容",
      deliverables: [
        { title: "數學模型試算表", text: "輪帶、賠付與特色機制以公式連動，可直接調整。" },
        { title: "驗證程式", text: "可重現的模擬程式與自動調表工具。" },
        { title: "模擬報告", text: "10 億次模擬結果，含 RTP、中獎率、波動度與最大倍數。" },
        { title: "規格文件", text: "中英文規格，格式符合 GLI／BMM 送測要求。" }
      ],
      deliverablesLink: "查看公開的規格與模擬數據範例",
      faqTitle: "常見問題",
      faq: [
        { q: "涵蓋哪些遊戲類型？", a: "老虎機、賓果、Crash、Miles、Plinko、骰寶、輪盤、彩票、百家樂、妞妞與 5PK。老虎機包含 Line、Way、Megaways，以及 Free Game、Respin、Cascade 等特色功能。" },
        { q: "RTP 如何驗證？", a: "每個模型以試算表與 10 億次模擬程式雙重核對，RTP 誤差低於 0.1%。" },
        { q: "可以準備認證用的文件嗎？", a: "可以。規格與模擬報告依 GLI／BMM 送測要求撰寫，我的專案也實際通過這兩項認證。" },
        { q: "能配合我們既有的工具與流程嗎？", a: "可以。有跨國、跨團隊、跨框架的合作經驗，可直接與企劃、工程、QA 及法規團隊溝通。" },
        { q: "如何開始合作？", a: "來信說明遊戲玩法、目標 RTP 與市場，我會回覆建議的數值方案與時程。" }
      ],
      ctaTitle: "討論您的專案",
      ctaText: "說明遊戲玩法、目標 RTP 與市場，我會回覆建議的數值方案與時程。",
      note: "交付內容為數學模型、驗證程式、模擬報告與規格文件，不包含 Unity 試玩版或前端開發；站上的可試玩作品僅作為能力佐證。其餘合作細節，請來信洽談。"
    },
    about: {
      eyebrow: "ABOUT",
      seoDescription:
        "我是 Javier，專注於老虎機與遊戲數學模型的機率工程師，擁有 9 年以上經驗與 65 款以上公司專案，專案實際通過 GLI 與 BMM 認證，也有跨國、跨團隊、跨框架的自由接案經驗，歡迎與我聯絡。",
      title: "關於我",
      role: "遊戲數學模型設計師・機率工程師",
      intro:
        "我是 Javier，專注於老虎機與遊戲數學模型，從 RTP、波動度設計到模擬驗證與認證規格文件，都能獨立完成。\n擁有 9 年以上經驗，完成 65 款以上公司專案，專案實際通過 GLI 與 BMM 認證；也有跨國、跨團隊的自由接案經驗。",
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
      careerNote: "另有 5 年以上跨國、跨團隊、跨框架的自由接案經驗。清華大學統計學碩士、應用數學學士。",
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
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
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
        { value: "65+", label: "shipped commercial games" },
        { value: "GLI / BMM", label: "certified projects delivered" }
      ],
      selectedWork: "Selected Work",
      articlesTitle: "Tutorial Articles",
      articlesMore: "View all articles",
      toolsTitle: "Tools I Built",
      toolsMore: "View all tools",
      moreTitle: "Keep Exploring",
      researchTitle: "Selected Research",
      researchMore: "View all research notes",
      contactTitle: "Collaboration & Contact",
      contactText: "Open to game math models, probability analysis and relevant roles. Feel free to email me directly.",
      catalog: "Catalog",
    },
    games: {
      title: "Game Database",
      eyebrow: "Database",
      intro: "Filter by ID, tags, RTP range and volatility, and sort by RTP, volatility or max win.",
      seoDescription:
        "Browse {count} playable slot math models. Each entry lists RTP, hit rate, volatility, max win, board size and line mechanic, with simulation data and specification documents. Filter by RTP range, volatility and tags, and sort by key stats.",
      rtpMin: "RTP min",
      rtpMax: "RTP max",
      sortBy: "Sort",
      sortOptions: {
        id: "Default (ID)",
        rtpDesc: "RTP high to low",
        rtpAsc: "RTP low to high",
        volatilityDesc: "Volatility high to low",
        volatilityAsc: "Volatility low to high",
        maxWinDesc: "Max win high to low",
        hitRateDesc: "Hit rate high to low"
      },
      advanced: "Advanced filters",
      showMore: "Show more",
      footerText: "Want to see how I analyze and validate these models?",
      footerResearch: "Read research notes",
      footerAbout: "About me",
      stats: {
        models: "playable models",
        rtpRange: "RTP range",
        note: "Includes shipped projects and research games; the catalog keeps growing."
      },
      search: "Search ID",
      empty: "No games match the current filters.",
      showingPrefix: "Showing",
      showingSuffix: "games"
    },
    research: {
      eyebrow: "Research Notes",
      title: "Research Notes",
      intro:
        "Playtest notes and game analysis, focused on probability behavior, reward structures, and player experience.",
      empty: "No published research articles are available yet.",
      backToResearch: "Back to Research",
      notesCount: "research notes",
      featuredTitle: "Featured Notes",
      allTitle: "All Notes",
      searchPlaceholder: "Search by game title or mechanic",
      tagLegend: "[W] Wild   [S] Symbol   [R] Reel",
      categoryLabel: "Type",
      tagLabel: "Mechanic",
      all: "All",
      showMore: "Show more",
      noResults: "No notes match the current filters.",
      relatedTitle: "Related Notes",
      prevNote: "Previous",
      nextNote: "Next"
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
      github: sharedCopy.modalLabels.github,
      itch: sharedCopy.modalLabels.itch,
      loading: "Loading...",
      loadError: "Unable to load content."
    },
    services: {
      eyebrow: "Client Services",
      title: "Slot & Game Math Model Design Services",
      intro:
        "End-to-end math delivery for game teams: RTP and volatility design, probability analysis, large-scale simulation validation, and specification documents ready for GLI / BMM submission.",
      seoDescription:
        "Slot and game math model design, probability analysis, and 1-billion-spin simulation validation (RTP error under 0.1%), with Chinese and English specification documents ready for GLI / BMM submission. Projects have passed certification.",
      primaryCta: "Get in Touch",
      secondaryCta: "Browse Models",
      proofs: [
        { value: "1 billion", label: "simulated spins per model" },
        { value: "< 0.1%", label: "RTP simulation error" },
        { value: "GLI / BMM", label: "certified projects delivered" }
      ],
      servicesTitle: "What I Can Do for You",
      cards: [
        {
          title: "Slot Math Model Design",
          text: "A complete reward structure and numeric targets, built for your market and regulations.",
          bullets: [
            "RTP, hit rate, volatility and max win targets",
            "Reels, paytables and features (free games, respins, cascades and more)",
            "Line, Way and Megaways mechanics"
          ]
        },
        {
          title: "Probability Analysis",
          text: "Find numeric risks and keep the design consistent with long-run behavior.",
          bullets: [
            "Hit frequency and payout distribution analysis",
            "RTP contribution breakdown by feature",
            "Volatility and max win risk assessment"
          ]
        },
        {
          title: "Simulation Validation",
          text: "Confirm with large-scale simulation that long-run output matches theory.",
          bullets: [
            "1 billion simulated spins with RTP error under 0.1%",
            "Cross-checked by spreadsheet and verification program",
            "Auto-tuning tools that shorten tuning iterations"
          ]
        },
        {
          title: "Game Specification Documents",
          text: "Complete documents for communication, implementation and certification submission.",
          bullets: [
            "Specifications and math reports in Chinese and English",
            "Formats that meet GLI and BMM submission requirements",
            "Documents from projects that passed certification"
          ]
        }
      ],
      experienceTitle: "Game Types Covered",
      experienceGroups: [
        { category: "Gaming", games: ["Slot", "Bingo"] },
        { category: "Arcade", games: ["Crash", "Miles", "Plinko"] },
        { category: "Bet Types", games: ["Dice", "Roulette", "Lottery", "Baccarat"] },
        { category: "Card Games", games: ["NiuNiu", "5PK"] }
      ],
      processTitle: "How We Work",
      process: [
        { title: "Requirements", text: "Understand the gameplay, target market, RTP and volatility goals." },
        { title: "Model design", text: "Build the spreadsheet model and propose numeric options for discussion." },
        { title: "Simulation", text: "Run large-scale simulations and tune to the target values." },
        { title: "Delivery", text: "Hand over spreadsheets, verification programs, simulation results and specifications." }
      ],
      collaborationTitle: "Collaboration",
      collaborationText:
        "Experienced across countries, teams and game frameworks. I can work with your existing tools and process, and communicate directly with design, engineering, QA and compliance teams.",
      deliverablesTitle: "What You Receive",
      deliverables: [
        { title: "Math model spreadsheet", text: "Reel strips, paytable and feature mechanics linked by formulas, ready to adjust." },
        { title: "Validation program", text: "Reproducible simulation code and auto-tuning tools." },
        { title: "Simulation report", text: "Results from 1 billion simulations: RTP, hit rate, volatility and max win." },
        { title: "Specification documents", text: "English and Chinese specs, formatted for GLI / BMM submission." }
      ],
      deliverablesLink: "See public spec and simulation examples",
      faqTitle: "FAQ",
      faq: [
        { q: "Which game types do you cover?", a: "Slots, bingo, crash, miles, plinko, dice, roulette, lottery, baccarat, NiuNiu and 5PK. Slot mechanics include Line, Way and Megaways with features such as Free Game, Respin and Cascade." },
        { q: "How is the RTP validated?", a: "Each model is checked twice: by its spreadsheet and by a simulation program running 1 billion rounds, with RTP error below 0.1%." },
        { q: "Can you prepare documents for certification?", a: "Yes. Specs and simulation reports are written to GLI / BMM submission requirements, and my projects have passed both." },
        { q: "Can you work with our tools and process?", a: "Yes. I have worked across countries, teams and frameworks, and communicate directly with design, engineering, QA and compliance." },
        { q: "How do we start?", a: "Email the gameplay, target RTP and market. I reply with a suggested numeric plan and timeline." }
      ],
      ctaTitle: "Discuss Your Project",
      ctaText: "Share the gameplay, target RTP and market, and I will reply with a proposed numeric approach and timeline.",
      note: "Deliverables are the math model, validation program, simulation report and specification documents. They do not include a Unity playable build or frontend development; the playable work on this site is supporting proof only. For all other collaboration details, please contact me by email."
    },
    about: {
      eyebrow: "ABOUT",
      seoDescription:
        "I am Javier, a probability engineer focused on slot and casino game math. With 9+ years of experience, 65+ company projects, projects certified by GLI and BMM, and freelance work across countries and teams.",
      title: "About Me",
      role: "Game Math Model Designer · Probability Engineer",
      intro:
        "I am Javier, a game math designer focused on slots and casino games. I handle everything from RTP and volatility design to simulation validation and certification-ready specifications on my own.\nWith 9+ years of experience, 65+ company projects delivered and projects that passed GLI and BMM certification, I have also worked across countries, teams and game frameworks as a freelancer.",
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
      careerNote: "Plus 5+ years of freelance experience across countries, teams and game frameworks. M.S. in Statistics and B.S. in Applied Mathematics, National Tsing Hua University.",
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
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
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
