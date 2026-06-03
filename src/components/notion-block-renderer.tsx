import Image from "next/image";
import { richTextToPlainText, type NotionBlock } from "@/lib/notion";

type NotionBlockRendererProps = {
  blocks: NotionBlock[];
};

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => (
        <NotionBlockView key={block.id} block={block} index={index} />
      ))}
    </div>
  );
}

function NotionBlockView({
  block,
  index
}: {
  block: NotionBlock;
  index: number;
}) {
  switch (block.type) {
    case "paragraph": {
      const text = richTextToPlainText(block.paragraph.rich_text);

      if (!text) {
        return null;
      }

      return <p className="leading-8 text-slate-300">{text}</p>;
    }
    case "heading_1":
      return (
        <h2 className="pt-4 text-3xl font-black text-white">
          {richTextToPlainText(block.heading_1.rich_text)}
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="pt-3 text-2xl font-black text-white">
          {richTextToPlainText(block.heading_2.rich_text)}
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="pt-2 text-xl font-black text-white">
          {richTextToPlainText(block.heading_3.rich_text)}
        </h4>
      );
    case "bulleted_list_item":
      return (
        <div className="flex gap-3 leading-8 text-slate-300">
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-neon" />
          <span>{richTextToPlainText(block.bulleted_list_item.rich_text)}</span>
        </div>
      );
    case "numbered_list_item":
      return (
        <div className="flex gap-3 leading-8 text-slate-300">
          <span className="min-w-6 shrink-0 font-black text-neon">
            {index + 1}.
          </span>
          <span>{richTextToPlainText(block.numbered_list_item.rich_text)}</span>
        </div>
      );
    case "image": {
      const image = getImage(block);

      if (!image) {
        return null;
      }

      return (
        <figure className="overflow-hidden rounded border border-white/10 bg-panel/70">
          <Image
            src={image.src}
            alt={image.caption || "Research image"}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            unoptimized
          />
          {image.caption ? (
            <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-2 border-neon bg-white/[0.04] px-5 py-4 leading-8 text-slate-200">
          {richTextToPlainText(block.quote.rich_text)}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded border border-white/10 bg-void/80 p-4 text-sm leading-7 text-slate-200">
          <code>{richTextToPlainText(block.code.rich_text)}</code>
        </pre>
      );
    case "divider":
      return <hr className="border-white/10" />;
    default:
      return null;
  }
}

function getImage(block: Extract<NotionBlock, { type: "image" }>) {
  const image = block.image;
  const caption = richTextToPlainText(image.caption);

  if (image.type === "external") {
    return { src: image.external.url, caption };
  }

  return { src: image.file.url, caption };
}
