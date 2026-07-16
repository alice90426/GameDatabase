import type { ToolProject } from "@/types/tool";

// Add each published utility here. The list page and detail pages are generated
// from this single source of truth.
export const tools: ToolProject[] = [
  {
    slug: "math-model-generator",
    title: {
      zh: "Math Model Generator 數學模型產生器",
      en: "Math Model Generator"
    },
    summary: {
      zh: "快速建立可連動更新的老虎機數學模型表格，支援多種主流盤面與連線玩法。",
      en: "Quickly generate linked slot math model spreadsheets for several common reel and line formats."
    },
    description: {
      zh: "將建立老虎機數學模型所需的重複設定集中到單一介面。產生的表格保留公式，調整儲存格後，相關數據會同步更新，便於後續設計、驗證與溝通。",
      en: "This desktop utility brings repetitive slot math model setup into one interface. Generated spreadsheets retain their formulas, so related values update together when cells are adjusted, supporting later design, validation, and communication."
    },
    category: { zh: "數學模型自動化", en: "Math Model Automation" },
    features: {
      zh: [
        "約 3 秒完成基礎數學模型",
        "支援 Line Game、Ways Game 與 Megaways",
        "可調整配分、走線與圖標數量",
        "內建輪帶產生與中獎率顯示功能"
      ],
      en: [
        "Generate a base math model in about three seconds",
        "Support for Line Game, Ways Game, and Megaways formats",
        "Configurable payouts, paylines, and symbol counts",
        "Built-in reel strip generation and hit-rate display"
      ]
    },
    technologies: ["Excel", "Python", "xlwings", "Math"],
    youtubeUrl: "https://www.youtube.com/watch?v=wSrb05_Ti28",
    publishedAt: "2026-07-16"
  },
  {
    slug: "auto-adjust-strip-tool",
    title: {
      zh: "Auto Adjust Strip Tool 自動調表工具",
      en: "Auto Adjust Strip Tool"
    },
    summary: {
      zh: "透過反覆模擬、比較與篩選，自動調整多組輪帶並保留表現最佳的結果。",
      en: "Automatically refine multiple reel strips through repeated simulation, comparison, and selection."
    },
    description: {
      zh: "把輪帶調整流程自動化：每輪修改多組候選輪帶，執行模擬並比較結果，再留下表現較佳的組合繼續迭代，直到結果收斂。",
      en: "The tool automates reel-strip tuning by modifying multiple candidates, simulating and comparing their results, and carrying the strongest combinations into the next iteration until performance converges."
    },
    category: { zh: "輪帶模擬與最佳化", en: "Reel Simulation & Optimization" },
    features: {
      zh: [
        "同時調整多組輪帶",
        "自動執行模擬並比較數據",
        "保留表現最佳的候選結果",
        "循環迭代直到數據收斂"
      ],
      en: [
        "Adjust multiple reel-strip candidates",
        "Run simulations and compare results automatically",
        "Retain the best-performing candidates",
        "Iterate until the result converges"
      ]
    },
    technologies: ["C#", "Validation", "Statistic", "Evolution", "Optimization"],
    youtubeUrl: "https://www.youtube.com/watch?v=-j6i2jvJsxU",
    publishedAt: "2026-07-16"
  }
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be")
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get("v") ??
      (parsed.pathname.startsWith("/shorts/")
        ? parsed.pathname.split("/")[2]
        : parsed.pathname.startsWith("/embed/")
          ? parsed.pathname.split("/")[2]
          : null);

    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
