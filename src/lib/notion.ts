import "server-only";
import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  DataSourceObjectResponse,
  GetDataSourceResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  PartialDataSourceObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;
let dataSourceIdPromise: Promise<string | null> | null = null;
let dataSourcePromise: Promise<GetDataSourceResponse | null> | null = null;

export type ResearchArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  published: boolean;
  date: string;
  cover: string | null;
};

export type NotionBlock = BlockObjectResponse;

export function isNotionConfigured() {
  return Boolean(notion && notionDatabaseId);
}

export async function getPublishedResearchArticles(): Promise<ResearchArticle[]> {
  const dataSourceId = await getDataSourceId();

  if (!notion || !dataSourceId) {
    return [];
  }

  try {
    const dataSource = await getDataSource();
    const hasPublished = hasProperty(dataSource, "Published");
    const hasDate = hasProperty(dataSource, "Date");

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      ...(hasPublished
        ? {
            filter: {
              property: "Published",
              checkbox: {
                equals: true
              }
            }
          }
        : {}),
      sorts: [
        hasDate
          ? {
              property: "Date",
              direction: "descending"
            }
          : {
              timestamp: "last_edited_time",
              direction: "descending"
            }
      ],
      result_type: "page"
    });

    const articles = await Promise.all(
      response.results.filter(isPageObjectResponse).map(pageToArticle)
    );

    return articles
      .filter((article): article is ResearchArticle => Boolean(article))
      .filter((article) => article.published);
  } catch (error) {
    warnNotionError("Unable to fetch published research articles.", error);
    return [];
  }
}

export async function getResearchArticleBySlug(
  slug: string
): Promise<ResearchArticle | null> {
  const articles = await getPublishedResearchArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getResearchArticleBlocks(
  pageId: string
): Promise<BlockObjectResponse[]> {
  if (!notion) {
    return [];
  }

  const blocks: BlockObjectResponse[] = [];
  let startCursor: string | undefined;

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: startCursor,
        page_size: 100
      });

      blocks.push(...response.results.filter(isBlockObjectResponse));
      startCursor = response.next_cursor ?? undefined;
    } while (startCursor);
  } catch (error) {
    warnNotionError("Unable to fetch research article blocks.", error);
  }

  return blocks;
}

async function pageToArticle(
  page: PageObjectResponse
): Promise<ResearchArticle | null> {
  const title = getFirstText(page, ["Title", "Name"]);
  const explicitSlug = getFirstText(page, ["Slug"]);

  if (!title) {
    return null;
  }

  return {
    id: page.id,
    title,
    slug: explicitSlug || slugify(title),
    category: getFirstSelect(page, ["Category", "2_Game Type", "Game Type"]),
    tags: [
      ...getFirstMultiSelect(page, ["Tags", "8_Feature", "Feature"]),
      ...getEnabledCheckboxLabels(page, [
        ["3_Free Game", "Free Game"],
        ["4_Bonus Game", "Bonus Game"]
      ])
    ],
    summary: getFirstText(page, ["Summary"]),
    published: getOptionalCheckbox(page, "Published") ?? true,
    date: getDate(page, "Date") || page.last_edited_time || page.created_time,
    cover: await getArticleCover(page)
  };
}

function getDataSourceId() {
  if (!notion || !notionDatabaseId) {
    return Promise.resolve(null);
  }

  dataSourceIdPromise ??= resolveDataSourceId();

  return dataSourceIdPromise;
}

async function resolveDataSourceId() {
  if (!notion || !notionDatabaseId) {
    return null;
  }

  try {
    const database = await notion.databases.retrieve({
      database_id: notionDatabaseId
    });

    if ("data_sources" in database) {
      return database.data_sources[0]?.id ?? notionDatabaseId;
    }
  } catch {
    return notionDatabaseId;
  }

  return notionDatabaseId;
}

async function getDataSource() {
  if (!notion) {
    return null;
  }

  dataSourcePromise ??= resolveDataSource();

  return dataSourcePromise;
}

async function resolveDataSource() {
  const dataSourceId = await getDataSourceId();

  if (!notion || !dataSourceId) {
    return null;
  }

  try {
    return await notion.dataSources.retrieve({
      data_source_id: dataSourceId
    });
  } catch (error) {
    warnNotionError("Unable to fetch Notion data source schema.", error);
    return null;
  }
}

function hasProperty(dataSource: GetDataSourceResponse | null, key: string) {
  return "properties" in (dataSource ?? {}) && Boolean(dataSource?.properties[key]);
}

function getProperty(page: PageObjectResponse, key: string) {
  return page.properties[key];
}

function getSelect(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type !== "select") {
    return "";
  }

  return property.select?.name ?? "";
}

function getMultiSelect(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type !== "multi_select") {
    return [];
  }

  return property.multi_select.map((option) => option.name);
}

function getCheckbox(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type !== "checkbox") {
    return false;
  }

  return property.checkbox;
}

function getDate(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type !== "date") {
    return "";
  }

  return property.date?.start ?? "";
}

function getFirstText(page: PageObjectResponse, keys: string[]) {
  for (const key of keys) {
    const text = getText(page, key);

    if (text) {
      return text;
    }
  }

  return "";
}

function getText(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type === "title") {
    return richTextToPlainText(property.title);
  }

  if (property?.type === "rich_text") {
    return richTextToPlainText(property.rich_text);
  }

  if (property?.type === "url") {
    return property.url ?? "";
  }

  return "";
}

function getFirstSelect(page: PageObjectResponse, keys: string[]) {
  for (const key of keys) {
    const value = getSelect(page, key);

    if (value) {
      return value;
    }
  }

  return "";
}

function getFirstMultiSelect(page: PageObjectResponse, keys: string[]) {
  for (const key of keys) {
    const value = getMultiSelect(page, key);

    if (value.length > 0) {
      return value;
    }
  }

  return [];
}

function getEnabledCheckboxLabels(
  page: PageObjectResponse,
  fields: Array<[key: string, label: string]>
) {
  return fields
    .filter(([key]) => getCheckbox(page, key))
    .map(([, label]) => label);
}

function getOptionalCheckbox(page: PageObjectResponse, key: string) {
  const property = getProperty(page, key);

  if (property?.type !== "checkbox") {
    return null;
  }

  return property.checkbox;
}

function getCover(page: PageObjectResponse) {
  if (!page.cover) {
    return null;
  }

  if (page.cover.type === "external") {
    return page.cover.external.url;
  }

  return page.cover.file.url;
}

async function getArticleCover(page: PageObjectResponse) {
  return (
    getCover(page) ||
    getFirstFileCover(page, ["Cover", "cover"]) ||
    getFirstUrlCover(page, ["Cover", "cover"]) ||
    (await getFirstImageBlockCover(page.id))
  );
}

function getFirstFileCover(page: PageObjectResponse, keys: string[]) {
  for (const key of keys) {
    const property = getProperty(page, key);

    if (property?.type !== "files") {
      continue;
    }

    const file = property.files[0];

    if (!file) {
      continue;
    }

    if (file.type === "external") {
      return file.external.url;
    }

    return file.file.url;
  }

  return null;
}

function getFirstUrlCover(page: PageObjectResponse, keys: string[]) {
  for (const key of keys) {
    const property = getProperty(page, key);

    if (property?.type === "url" && property.url) {
      return property.url;
    }
  }

  return null;
}

async function getFirstImageBlockCover(pageId: string) {
  if (!notion) {
    return null;
  }

  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 20
    });
    const image = response.results
      .filter(isBlockObjectResponse)
      .find((block) => block.type === "image");

    if (!image || image.type !== "image") {
      return null;
    }

    if (image.image.type === "external") {
      return image.image.external.url;
    }

    return image.image.file.url;
  } catch (error) {
    warnNotionError("Unable to fetch first Notion image as cover.", error);
    return null;
  }
}

export function richTextToPlainText(richText: RichTextItemResponse[]) {
  return richText.map((item) => item.plain_text).join("");
}

function warnNotionError(message: string, error: unknown) {
  const detail =
    error instanceof Error
      ? error.message
      : "Unknown Notion API error.";

  console.warn(`[Notion] ${message} ${detail}`);
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "research-note";
}

function isPageObjectResponse(
  page:
    | PageObjectResponse
    | PartialPageObjectResponse
    | DataSourceObjectResponse
    | PartialDataSourceObjectResponse
): page is PageObjectResponse {
  return page.object === "page" && "properties" in page;
}

function isBlockObjectResponse(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return "type" in block;
}
