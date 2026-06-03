import "server-only";
import { unstable_cache } from "next/cache";

const bloggerApiKey = process.env.BLOGGER_API_KEY;
const bloggerBlogId = process.env.BLOGGER_BLOG_ID;
const BLOGGER_REVALIDATE_SECONDS = 60 * 60 * 24;
const BLOGGER_API_BASE = "https://www.googleapis.com/blogger/v3";
const BLOGGER_REQUEST_DELAY_MS = 300;
const BLOGGER_ARTICLE_TITLE_PREFIX = "Parsheet";
let bloggerQueue: Promise<void> = Promise.resolve();

type BloggerPostListResponse = {
  items?: BloggerPostResponse[];
};

type BloggerPostResponse = {
  id: string;
  published?: string;
  updated?: string;
  url?: string;
  title: string;
  content?: string;
  labels?: string[];
  images?: Array<{ url?: string }>;
};

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  date: string;
  labels: string[];
  thumbnail: string | null;
};

export type ArticlePost = ArticleSummary & {
  content: string;
};

export function isBloggerConfigured() {
  return Boolean(bloggerApiKey && bloggerBlogId);
}

export const getBloggerArticles = unstable_cache(
  fetchBloggerArticles,
  ["blogger-article-list"],
  { revalidate: BLOGGER_REVALIDATE_SECONDS }
);

export const getBloggerPostById = unstable_cache(
  fetchBloggerPostById,
  ["blogger-article-detail"],
  { revalidate: BLOGGER_REVALIDATE_SECONDS }
);

export async function getBloggerArticleBySlug(slug: string) {
  const articles = await getBloggerArticles();
  const article = articles.find((post) => post.slug === slug);

  if (!article) {
    return null;
  }

  return getBloggerPostById(article.id);
}

async function fetchBloggerArticles(): Promise<ArticleSummary[]> {
  if (!isBloggerConfigured()) {
    return [];
  }

  try {
    const response = await queuedBloggerFetch(
      bloggerUrl(`/blogs/${bloggerBlogId}/posts`, {
        fetchBodies: "false",
        fetchImages: "true",
        maxResults: "50",
        status: "live"
      })
    );

    if (!response.ok) {
      warnBloggerError(
        "Unable to fetch Blogger post list.",
        `${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = (await response.json()) as BloggerPostListResponse;

    return (data.items ?? [])
      .filter((post) => post.title.startsWith(BLOGGER_ARTICLE_TITLE_PREFIX))
      .map(postToArticleSummary);
  } catch (error) {
    warnBloggerError("Unable to fetch Blogger post list.", error);
    return [];
  }
}

async function fetchBloggerPostById(id: string): Promise<ArticlePost | null> {
  if (!isBloggerConfigured()) {
    return null;
  }

  try {
    const response = await queuedBloggerFetch(
      bloggerUrl(`/blogs/${bloggerBlogId}/posts/${id}`, {
        fetchImages: "true"
      })
    );

    if (!response.ok) {
      warnBloggerError(
        `Unable to fetch Blogger post "${id}".`,
        `${response.status} ${response.statusText}`
      );
      return null;
    }

    const post = (await response.json()) as BloggerPostResponse;

    return {
      ...postToArticleSummary(post),
      content: post.content ?? ""
    };
  } catch (error) {
    warnBloggerError(`Unable to fetch Blogger post "${id}".`, error);
    return null;
  }
}

function queuedBloggerFetch(url: URL) {
  const result = bloggerQueue.then(async () => {
    await delay(BLOGGER_REQUEST_DELAY_MS);

    return fetch(url, { next: { revalidate: BLOGGER_REVALIDATE_SECONDS } });
  });

  bloggerQueue = result
    .catch(() => undefined)
    .then(() => undefined);

  return result;
}

function bloggerUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${BLOGGER_API_BASE}${path}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  url.searchParams.set("key", bloggerApiKey ?? "");

  return url;
}

function postToArticleSummary(post: BloggerPostResponse): ArticleSummary {
  return {
    id: post.id,
    slug: getPostSlug(post),
    title: post.title,
    date: post.published ?? post.updated ?? "",
    labels: post.labels ?? [],
    thumbnail: getPostThumbnail(post)
  };
}

function getPostSlug(post: BloggerPostResponse) {
  if (post.url) {
    const pathname = new URL(post.url).pathname;
    const filename = pathname.split("/").filter(Boolean).at(-1);
    const slug = filename?.replace(/\.html$/i, "");

    if (slug) {
      return slug;
    }
  }

  return `${slugify(post.title)}-${post.id}`;
}

function getPostThumbnail(post: BloggerPostResponse) {
  return post.images?.find((image) => image.url)?.url ?? null;
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "article";
}

function warnBloggerError(message: string, error: unknown) {
  const detail =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Unknown Blogger API error.";

  console.warn(`[Blogger] ${message} ${detail}`);
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
