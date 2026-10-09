"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type MobileNavProps = {
  items: { label: string; href: string }[];
  menuLabel: string;
};

export function MobileNav({ items, menuLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={menuLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/10 text-slate-200"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-void/95 px-5 py-3 backdrop-blur-xl">
          <ul className="mx-auto flex max-w-7xl flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-base font-semibold text-slate-200 last:border-b-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
