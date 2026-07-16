export type ToolProject = {
  slug: string;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  description: { zh: string; en: string };
  category: { zh: string; en: string };
  features: { zh: string[]; en: string[] };
  technologies: string[];
  youtubeUrl: string;
  sourceUrl?: string;
  projectUrl?: string;
  publishedAt: string;
};
