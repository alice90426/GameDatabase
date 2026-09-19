import type { Metadata } from "next";
import type { Locale } from "@/types/game";
import { localizedPath } from "@/lib/routes";

// Set alternates on each page so child routes cannot inherit a home canonical.
export function localizedAlternates(locale: Locale, path = ""): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      "zh-Hant": localizedPath("zh", path),
      en: localizedPath("en", path)
    }
  };
}
