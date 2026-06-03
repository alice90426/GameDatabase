import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/types/game";

export default async function CareerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;

  redirect(`/${locale}/services`);
}
